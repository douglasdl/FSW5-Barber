# FSW5-Barber
FSW5 - Barber

- [Figma](https://www.figma.com/design/P5gHjuDEyp0ADnhD6GapAF/FSW-5.0?node-id=0-1&t=zAKXkwvPEszaEcxu-0)

## Environment

- [Node.js]()
- [VS Code]()

## VS Code Extensions

- [Simple React Snippets](https://marketplace.visualstudio.com/items?itemName=burkeholland.simple-react-snippets)

## Technologies

- [Next.js](https://nextjs.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [Prisma](https://www.prisma.io/) - Alternatives: ([Drizzle](https://orm.drizzle.team/) - [Kysely](https://kysely.dev/))
- [Docker](https://www.docker.com/) - Alternatives: ([Neon DB](https://neon.tech/), [Supabase](https://supabase.com/), [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres))
- [Docker Hub](https://hub.docker.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Prettier Plugin Tailwindcss](https://github.com/tailwindlabs/prettier-plugin-tailwindcss)
- [Shadcn](https://ui.shadcn.com/)
- [Git](https://git-scm.com/) - [Github](https://github.com/) - [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)
- [Husky](https://github.com/typicode/husky#readme) - Git Hooks
- [git-commit-msg-linter](https://www.npmjs.com/package/git-commit-msg-linter)
- [NextAuth.js](https://next-auth.js.org/)
- [Google Developer Console](https://console.cloud.google.com/)
- [React Hook Form](https://react-hook-form.com/)

## Project

Create the project:
```sh
npx create-next-app@latest web
```

Install the dependencies:
```sh
npm i -D prisma
npm i -D prisma@latest
npm i -D ts-node 
npm i -D prettier prettier-plugin-tailwindcss
npm i -D husky lint-staged
npm i -D git-commit-msg-linter
npm i @prisma/client@latest
npm i next-auth
npm i @auth/prisma-adapter
```

Creating the Prisma Schema file: 
```sh
npx prisma init --datasource-provider postgresql
```

Generate the database tables in the postgresql database:
```sh
npx prisma migrate dev --name init_db
npx prisma migrate dev --name add_auth_tables_google
```

Seed the database:
```sh
npx prisma db seed
```

View the database:
```sh
npx prisma studio
```

Formar the Prisma schema:
```sh
npx prisma format
```


Setup the Chadcn in the project:
```sh
npx shadcn-ui@latest init
```

Install the Chadcn components:
```sh
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
npx shadcn-ui@latest add input
npx shadcn-ui@latest add badge
npx shadcn-ui@latest add avatar
npx shadcn-ui@latest add sonner
npx shadcn-ui@latest add sheet
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add form
npx shadcn-ui@latest add calendar
```

Create the Husky setup:
```sh
npx husky init
```

Start the project:
```sh
npm run dev
```


## Contents

### Part 0 - Project Setup
<!-- https://www.youtube.com/watch?v=XRMvPCfh2U0 -->

- [x] Database setup
- [x] Database seeding
- [x] Next.js Introduction
- [x] Tailwind
- [x] Shadcn
- [x] Git hooks

### Part 1 - Home Page
<!-- https://www.youtube.com/watch?v=moVcvu-P4vM -->

### Part 2 - Barbershop Details Page
<!-- https://www.youtube.com/watch?v=hFPecJrEQIY -->

### Part 3 - Login with Google
<!-- https://www.youtube.com/watch?v=aIWSXdFggJQ -->

### Part 4 - Barbershop Booking
<!-- https://www.youtube.com/watch?v=WpmD7Zh-4jY -->

### Part 5 - Bookings Page
<!-- https://www.youtube.com/watch?v=5r6V0-Zc7Fo&list=PLm-VCNNTu3Lkx9pkUW-8SAdMfQn7WiqA1&index=6 -->

### Part 6 - Deploy and Review
<!--  -->