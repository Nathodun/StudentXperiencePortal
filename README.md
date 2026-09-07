# NBU Student Experience Office Platform

A Netlify-friendly React/Vite starter platform for the Nigerian British University Student Experience Office.

## What is included

- Executive dashboard
- Student case management
- Student directory/search
- Attendance and engagement risk view
- Feedback and complaints tracking
- Events and student activities
- Task/follow-up Kanban
- Reports and insights
- Responsive UI
- Netlify-ready static build

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

The production files are generated in `dist/`.

## Netlify

The repository can be deployed as a Vite site:

- Build command: `npm run build`
- Publish directory: `dist`

For a real deployment, connect the UI to a backend such as Supabase/Postgres, Firebase, or the university's existing MIS/SIS. Do not store student personal data in browser localStorage.

## Recommended production integrations

1. University SSO / Microsoft Entra ID
2. Student Information System / MIS
3. Attendance system
4. Email/WhatsApp/SMS provider
5. Calendar integration
6. File/document storage
7. Role-based access control
8. Audit logging
9. Consent/privacy controls
10. Scheduled reports and alerts

The current forms are intentionally UI-only. Replace the mock actions with secure API calls or Netlify Functions before handling real student records.
