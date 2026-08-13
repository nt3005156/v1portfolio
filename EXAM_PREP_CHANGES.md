# Exam Preparation — what changed

Integrated into `v1portfolio`. Everything is static: no database, no API,
no admin panel, no auth, no new dependencies.

## Files added

```
public/exam-prep/class-9-practice-question-set.pdf     (406,153 bytes)
public/exam-prep/class-10-practice-question-set.pdf    (434,908 bytes)
src/components/sections/ExamPreparation.jsx
```

Both PDFs are **byte-for-byte identical** to the files you supplied
(MD5 verified end-to-end, including after the production build).
Nothing was regenerated, re-compressed, or edited.

## Files modified

### 1. `src/pages/LearningHub.jsx`

- Imported and rendered `<ExamPreparation />` on the hub landing view,
  directly after the class cards and before the "Easy to expand" strip.
- **Fixed the `/learn` crash** (details below).
- Hardened the search filter against chapters missing `title`/`subtitle`/tags.

### 2. `vercel.json` — required for the PDFs to work in production

Your SPA catch-all rewrote **every** path to `index.html`:

```json
{ "source": "/(.*)", "destination": "/index.html" }
```

On Vercel that rule would have intercepted the PDF URLs and returned the
HTML page instead of the file — the links would have worked in local dev
and silently broken after deploy. Now scoped to exclude the PDF folder:

```json
{ "source": "/((?!exam-prep/).*)", "destination": "/index.html" }
```

Verified: `/`, `/learn`, `/learn/:class/:subject/:chapter`, `/admin`, and
`/admin/login` all still rewrite to `index.html`; only `/exam-prep/*`
serves as a static file.

### 3. `vite.config.js`

Added `allowedHosts: true` so the dev server can be previewed through a
proxied host. Dev-only — no effect on the production build.

---

## The `/learn` crash (pre-existing, now fixed)

`/learn` was failing in production with
`TypeError: [] is not a function`. Cause — a missing semicolon in
`getAllChaptersFromData()`:

```js
const chapters = []
(learningData.classes || []).forEach(...)
```

With no semicolon, JS parses this as `[](learningData.classes || [])` —
calling an empty array as a function. Because `getAllChaptersFromData` ran
inside a `useMemo` during render, it threw on **every** visit to `/learn`,
so the ErrorBoundary replaced the entire Learning Hub with "Something went
wrong". Fixed by terminating the statement and adding an optional chain:

```js
const chapters = [];
(learningData?.classes || []).forEach(...)
```

This is unrelated to the Exam Preparation work, but the section lives on
`/learn` — it could not have been reached until this was fixed.

---

## Design integration

The section reuses the Learning Hub's own card language rather than
inventing a new style: the nested `rounded-[1.8rem]` / `rounded-[1.4rem]`
shell with a tinted gradient wash, `bg-[#0a0a0f]` / `bg-[#0f0f12]` surfaces,
Instrument Serif headings, the violet→cyan gradient italic accent,
JetBrains Mono body copy, `glass` pills, and white primary buttons —
identical to the class cards directly above it.

Icons come from `lucide-react`, animation from `framer-motion`
`whileInView` — both already dependencies.

## Verified

Tested with headless Chromium against both the dev server and the
**production build** (`npm run build` + `vite preview`):

- ✅ `npm run build` succeeds
- ✅ Both PDFs return HTTP 200 as `application/pdf`, bytes MD5-identical
- ✅ "View Practice Set" opens the correct PDF in a new tab
- ✅ "Download" saves as `Class-9-Examination-Practice-Question-Set.pdf`
- ✅ Renders at 1440 / 834 / 390 px, no horizontal overflow
- ✅ All tap targets ≥ 44 px
- ✅ Deep link `/learn#exam-prep` scrolls to the section (`scroll-mt-24`
  keeps it clear of the fixed navbar)
- ✅ No regressions: `/`, `/learn`, `/admin/login` all render, zero console errors

## Optional follow-up

To surface it in the navbar, add to the `links` array in
`src/components/layout/Navbar.jsx`:

```js
{ label: 'Exam Prep', href: '/learn#exam-prep' },
```

## Changing content later

Replace a file in `public/exam-prep/` keeping the same name, then redeploy.
To edit titles or descriptions, see the `PRACTICE_SETS` array at the top of
`src/components/sections/ExamPreparation.jsx`.
