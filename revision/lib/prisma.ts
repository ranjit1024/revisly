// Create a new file at /lib/prisma.js

import { PrismaClient } from '@prisma/client';

// This declaration is to satisfy TypeScript in a JavaScript file.
// It tells TypeScript about the global `prisma` property we're creating.
declare global {
  var prisma: PrismaClient | undefined;
}

/**
 * Creates a single, reusable instance of the Prisma Client.
 * * In development, Node.js can clear the require cache on hot reloads,
 * leading to new PrismaClient instances being created. This pattern
 * stores the instance on a global object to prevent this, ensuring
 * we don't exhaust the database connection pool.
 */
const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV === 'development') {
  global.prisma = prisma;
}

export default prisma;