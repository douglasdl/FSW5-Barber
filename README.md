# FSW5-Barber
FSW5 - Barber

- [Figma](https://www.figma.com/design/P5gHjuDEyp0ADnhD6GapAF/FSW-5.0?node-id=0-1&t=zAKXkwvPEszaEcxu-0)

## Environment

- [Node.js]()
- [VS Code]()

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


## Project

Create the project:
```sh
npx create-next-app@latest web
```

Install the dependencies:
```sh
npm i prisma -D
npm i ts-node -D
npm i -D prettier prettier-plugin-tailwindcss
npm i -D husky lint-staged
npm i -D git-commit-msg-linter
```

Creating the Prisma Schema file: 
```sh
npx prisma init --datasource-provider postgresql
```

Generate the database tables in the postgresql database:
```sh
npx prisma migrate dev --name init_db
```

Seed the database:
```sh
npx prisma db seed
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

### Part 0

- [x] Database setup
- [x] Database seeding
- [x] Next.js Introduction
- [x] Tailwind
- [x] Shadcn
- [x] Git hooks

### Part 1

### Part 2

### Part 3

### Part 4

### Part 5