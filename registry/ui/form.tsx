"use client"

import { Form as FormPrimitive } from "@base-ui/react/form"
import {
  type ComponentProps,
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react"

import { Button, type ButtonProps } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type FormStatus = "idle" | "loading" | "success" | "error"

/** What `onFormSubmit` may return. */
type FormResult = {
  /** Server errors per field name. Each shows in that field's `FieldError`. */
  errors?: Record<string, string | string[]>
  /** An error for the whole form, shown by `FormMessage`. */
  error?: string
  /** A confirmation, shown by `FormMessage`. */
  success?: string
}

type FormValues = Record<string, unknown>

// Returning nothing counts as success, so `async () => { await save() }` works.
// biome-ignore lint/suspicious/noConfusingVoidType: void is the intended "no result" here.
type SubmitReturn = Promise<FormResult | void> | FormResult | void

const FormStatusContext = createContext<{
  status: FormStatus
  message: string
}>({ status: "idle", message: "" })

type FormProps<Values extends FormValues = FormValues> = Omit<
  ComponentProps<typeof FormPrimitive<Values>>,
  "onFormSubmit" | "errors"
> & {
  /**
   * Runs after the fields pass validation. Return field errors, a form
   * error, or a success message. Throwing counts as a form error.
   */
  onFormSubmit: (values: Values) => SubmitReturn
  /** How long the submit button shows success before it returns. */
  successDuration?: number
}

function Form<Values extends FormValues = FormValues>({
  className,
  onFormSubmit,
  successDuration = 2000,
  ...props
}: FormProps<Values>) {
  const [status, setStatus] = useState<FormStatus>("idle")
  const [message, setMessage] = useState("")
  const [errors, setErrors] = useState<Record<string, string | string[]>>({})
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined)
  useEffect(() => () => clearTimeout(timer.current), [])

  async function submit(values: Values) {
    if (status === "loading") return
    clearTimeout(timer.current)
    setErrors({})
    setMessage("")
    setStatus("loading")
    try {
      const result = (await onFormSubmit(values)) ?? {}
      if (result.errors && Object.keys(result.errors).length > 0) {
        setErrors(result.errors)
        setStatus("error")
        setMessage(result.error ?? "")
        return
      }
      if (result.error) {
        setStatus("error")
        setMessage(result.error)
        return
      }
      setStatus("success")
      setMessage(result.success ?? "")
      timer.current = setTimeout(() => setStatus("idle"), successDuration)
    } catch (error) {
      setStatus("error")
      setMessage(
        error instanceof Error && error.message
          ? error.message
          : "Something went wrong. Try again.",
      )
    }
  }

  return (
    <FormStatusContext.Provider value={{ status, message }}>
      <FormPrimitive<Values>
        data-slot="form"
        data-status={status}
        aria-busy={status === "loading" || undefined}
        errors={errors}
        onFormSubmit={(values) => {
          void submit(values)
        }}
        className={cn("flex flex-col gap-6", className)}
        {...props}
      />
    </FormStatusContext.Provider>
  )
}

/** The form's submit button. Its status follows the form. */
function FormSubmit({ children, ...props }: Omit<ButtonProps, "status">) {
  const { status } = useContext(FormStatusContext)
  return (
    <Button type="submit" data-slot="form-submit" status={status} {...props}>
      {children}
    </Button>
  )
}

/** Keeps the last message on screen while the banner animates out. */
function useLastValue<T>(value: T, keep: boolean) {
  const last = useRef(value)
  if (keep) last.current = value
  return last.current
}

/**
 * The form-level error or success. It grows in above the submit button and
 * shrinks away on the next submit, without moving the page in a jump.
 */
function FormMessage({
  className,
  children,
  ...props
}: Omit<ComponentProps<"div">, "children"> & { children?: ReactNode }) {
  const { status, message } = useContext(FormStatusContext)
  const tone = status === "success" ? "success" : "error"
  const visible =
    Boolean(children ?? message) && (status === "error" || status === "success")
  const shownTone = useLastValue(tone, visible)
  const shownText = useLastValue(children ?? message, visible)

  return (
    <div
      data-slot="form-message"
      data-open={visible || undefined}
      data-tone={shownTone}
      className={cn(
        "-mt-6 grid grid-rows-[0fr] opacity-0",
        "transition-[grid-template-rows,opacity] duration-300 ease-calm",
        "data-[open]:grid-rows-[1fr] data-[open]:opacity-100",
        "motion-reduce:transition-opacity",
        className,
      )}
      {...props}
    >
      <div className="min-h-0 overflow-hidden">
        <p
          role={shownTone === "error" ? "alert" : "status"}
          className={cn(
            "caption-1 mt-6 flex items-start gap-2 rounded-lg border px-3 py-2.5",
            shownTone === "error"
              ? "border-destructive/30 bg-destructive/10 text-destructive"
              : "border-success/30 bg-success/10 text-success",
          )}
        >
          {shownText}
        </p>
      </div>
    </div>
  )
}

export {
  Form,
  FormMessage,
  type FormProps,
  type FormResult,
  type FormStatus,
  FormSubmit,
}
