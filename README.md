# FSW5-Barber
FSW5 - Barber

## Environment

- [Node.js]()
- [VS Code]()

## Technologies

- [Next.js](https://nextjs.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [Prisma](https://www.prisma.io/) - Alternatives: ([Drizzle](https://orm.drizzle.team/) - [Kysely](https://kysely.dev/))
- [Docker](https://www.docker.com/) - Alternatives: ([Neon DB](https://neon.tech/), [Supabase](https://supabase.com/), [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres))
- [Docker Hub](https://hub.docker.com/)
- [Tailwind]()
- [Shadcn]()
- [Git](https://git-scm.com/) - [Github](https://github.com/) - [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)
- [Git Hooks]()


## Project

Create the project:
```sh
npx create-next-app@latest web
```

Install the dependencies:
```sh
npm i prisma -D
npm i ts-node -D
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

Start the project:
```sh

```

Create the project:
```sh

```

## Contents

### Part 0

- [x] Database setup
- [ ] Database seeding
- [ ] Next.js Introduction
- [ ] Tailwind
- [ ] Shadcn
- [ ] Git hooks

### Part 1

### Part 2

### Part 3

### Part 4

### Part 5