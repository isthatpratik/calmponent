# 0002: License

- Status: accepted
- Date: 2026-11-12
- Backlog item: D1

## Context

Calmponent code is copied into user projects (the shadcn model). The license decides what a user must keep after the copy. The license also depends on D13: whether we copy code from shadcn/ui or other projects.

## Options

### MIT

- Good: the shadcn/ui standard. Every legal team knows it. SPDX id `MIT`.
- Bad: every user who copies our files must keep our copyright and license notice. Almost nobody does this for copied component files.

### MIT-0 (MIT No Attribution)

- Good: same permissions as MIT, but no notice duty. A user can copy a file and owe us nothing. This fits copy-paste distribution.
- Good: OSI-approved (2020). SPDX id `MIT-0`. Any project that accepts MIT can accept MIT-0.
- Bad: less known. Some company legal tools may flag an unfamiliar id.
- Bad: we cannot relicense code that we copy from an MIT project. That code keeps its MIT notice (see D13).

### Other (Apache-2.0, Unlicense, CC0)

- Apache-2.0 adds notice duties and a patent grant. It does not fit the goal.
- Unlicense and CC0 are not well suited for software in some countries, and tools handle them less well. Not recommended.

## What other libraries use

Checked with the GitHub API and the LICENSE files on 2026-11-12:

| Library | License | Stars |
|---|---|---|
| shadcn/ui | MIT | 128k |
| Magic UI | MIT | 23k |
| Origin UI | MIT | 11k |
| Motion Primitives | MIT | 7k |
| cmdk | MIT | 13k |
| HeroUI | Apache-2.0 | 31k |
| React Bits | MIT + Commons Clause (GitHub shows "NOASSERTION") | 52k |
| Animate UI | MIT + Commons Clause (GitHub shows "NOASSERTION") | 5k |

None of them use MIT-0. Most use plain MIT.

React Bits and Animate UI add a Commons Clause. Users may use the code in apps and products, including paid ones. Users may not sell or redistribute the components themselves. React Bits also covers its tools and sounds. This clause is not open source (OSI does not approve it). Tools and registries that read the SPDX id cannot classify it. We do not want this: it adds legal doubt for users, and our purpose is that people use the code freely.

## Decision

Use **MIT** for the whole repository. Add a `NOTICE` line for any copied third-party MIT code (D13).

Reasons:

1. MIT is the norm in this ecosystem. Legal teams and tools accept it with no review.
2. One license for the whole repository avoids a mixed-license problem if we copy shadcn code.
3. The "users forget the notice" problem exists for every library above. It is a small risk that the ecosystem accepts.

MIT-0 is rejected for now. We can move new releases to MIT-0 later. Code already released under MIT stays MIT.

## Consequences

- We need a `LICENSE` file (MIT, copyright holder: Pratik Desai) before the first release.
- Users who copy our files should keep the notice. We can add a short license header comment to each file to make this easy. This is optional and not decided.
- No Commons Clause. Anyone may redistribute our components.
- Next: D13 (code reuse).

## Sources

Checked on 2026-11-12:

- GitHub API license data: `shadcn-ui/ui` is `MIT`; `mui/base-ui` is `MIT`.
- GitHub license text for MIT-0 (identical to MIT without the notice duty).
- [OSI: MIT No Attribution License](https://opensource.org/license/MIT-0): listed as approved, 2020-08-14.
- [OSI license-review thread](https://lists.opensource.org/pipermail/license-review_lists.opensource.org/2020-August/004917.html): approval request for MIT-0.

- GitHub `LICENSE.md` files of `DavidHDev/react-bits` and `animate-ui/animate-ui`: MIT + Commons Clause text.
- GitHub API license data for `magicuidesign/magicui`, `origin-space/originui`, `ibelick/motion-primitives`, `pacocoursey/cmdk` (MIT) and `heroui-inc/heroui` (Apache-2.0).
- [React Bits README via search](https://github.com/DavidHDev/react-bits): states MIT + Commons Clause.

Not checked: the paid tiers of Magic UI and others (pro blocks have separate terms). The OSI position on Commons Clause comes from general knowledge, not from a source I fetched.

Not checked: how company legal tools treat `MIT-0`. This is a claim from reasoning, not from a source. No lawyer reviewed this ADR.
