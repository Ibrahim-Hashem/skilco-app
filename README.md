This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started
## PROJECT DEPLOYED HERE:
[https://skilco-app.vercel.app/](https://skilco-app.vercel.app/)

Built a platfom which allows users to create projects or start up and collaborate on them together. 
Techstack:
- Typescript
- nextjs v13 framework
- prisma MySQL
- Tailwindcss
- editorjs
- zod: parsing data
- shadcn: ui components
- uploadthings: file storage bucket (alternative is aws S3 once scaled)
- tanstack: simplifies making api request on the client (clean approach)
- upstash: redis for caching.
- nextAuth: Authentication and authorisation (google provider currently implemented). 

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```


Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

