# MAYAN TASK MANAGEMENT

A basic task management web application with tracking active, inactive, and completed tasks.

## TECH STACK

### FRONTEND

- ReactJS
- TailwindCSS (Styling)

### BACKEND

- NodeJS
- ExpressJS
- PostgreSQL (Database)
- Prisma (Database ORM)

### MUST HAVE BEFORE INSTALLING TO LOCAL MACHINE:

- NodeJS
- npm
- pnpm (optional)
- PostgreSQL (Locally or on cloud)

## SETUP & INSTALLATION

Follow these steps to run the application:

### 1. CLONE THE REPOSITORY

- ```bash https://github.com/air091/mayan_task_management.git

  ```

### 2. INSTALL PROJECT DEPENDENCIES

Run the following command in your terminal to download all necessary packages

- npm install or pnpm install (In client and root directory)

### 3. ENVIROMENT VARIABLES

Create a ".env" file in the root directory of the project and add your local/cloud database connection string and port

- DATABASE_URL="postgresql://username:password@localhost:5432/task_db?schema=public"
- PORT=3000 (optional)

### 4. INITIALIZE THE DATABASE

Run prisma migrations to sync your schema with your local/cloud postgreSQL database

- npx prisma migrate dev --name init

### 5. FINALLY, RUN THE APPLICATION

- npm run dev or pnpm run dev (In both client and root directory)
