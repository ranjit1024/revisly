// Create a new file at /lib/prisma.js

import { PrismaClient } from '@prisma/client';

// This declaration is to satisfy TypeScript in a JavaScript file.
// It tells TypeScript about the global `prisma` property we're creating.
declare global {
  var prisma: PrismaClient | undefined;
}


const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV === 'development') {
  global.prisma = prisma;
}

export default prisma;