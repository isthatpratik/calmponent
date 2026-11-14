// Code shown in the Preview / Code toggles. A plain module, so server
// components receive the strings themselves, not client references.

export const pullRequestCode = `
<TimelineHeader title="Update pricing page" meta="Ines · main / a3f91c2" total="42s" />
<Timeline proportional>
  <TimelineGroup label="Build" total="24s">
    <TimelineItem status="done" time="00:00" title="Clone repository" duration="2s" />
    <TimelineItem status="skipped" time="00:02" title="Restore build cache" duration="skipped" />
    <TimelineItem
      status="done"
      time="00:02"
      title="Run build commands"
      duration="19s"
      seconds={19}
      previousSeconds={31}
    />
    <TimelineItem status="done" time="00:21" title="Collect build output" duration="3s" />
  </TimelineGroup>
  <TimelineGroup label="Deploy" total="18s">
    <TimelineItem
      status="done"
      time="00:24"
      title="Upload build output"
      duration="12s"
      seconds={12}
      previousSeconds={21}
    />
    <TimelineItem status="done" time="00:36" title="Assign calmponent.dev" duration="3s" />
  </TimelineGroup>
</Timeline>
`

export const glanceCode = `
const steps = [
  { id: "clone", label: "Clone repository", seconds: 2, group: "Build" },
  { id: "build", label: "Run build commands", seconds: 27, group: "Build" },
  { id: "upload", label: "Upload build output", seconds: 11, group: "Deploy", status: "failed" },
]

<TimelineHeader title="Publish Halo case study" meta="Maya · main / 7be04d1" total="50s" />
<TimelineBar segments={steps} />
`
