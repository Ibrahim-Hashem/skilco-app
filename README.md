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

Features:

- Multi-Media Post Creation: Users can create posts containing images, code snippets, and text content, enriching project discussions.
- Ownership Association: Each post is linked to project owners, offering clear attribution and accountability.
- User Interaction: Users have the ability to express their opinions by liking or disliking posts, fostering community engagement.
- Commenting: Users can engage in discussions by leaving comments on posts, encouraging valuable interactions.
- Project Management: Skilco allows users to create and manage project pages, promoting a structured approach to collaboration.
- Project Following: Users can follow project pages they're interested in, ensuring they stay up-to-date with project developments.
- Home Screen Feed: The home screen aggregates posts from followed projects, creating a centralized hub for users to access project-related content.
- Search Functionality: A robust search feature enables users to discover and explore a wide range of projects.
- Profile Customization: Users have the freedom to personalize their profiles, tailoring their online presence.
- And More: Skilco boasts a plethora of additional features that enhance the overall user experience and facilitate effective project collaboration.

This project serves as a testament to my proficiency in building complex systems that seamlessly integrate both frontend and backend components, providing users with a comprehensive and engaging platform for entrepreneurial endeavors.

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

