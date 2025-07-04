import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

// 1. Initialize Prisma Client
const prisma = new PrismaClient();

// 2. Define Prisma Middleware for password hashing
prisma.$use(async (params, next) => {
  // Check if the operation is a 'create' or 'update' on the 'User' model
  if (
    params.model === 'User' &&
    (params.action === 'create' || params.action === 'update')
  ) {
    if (params.args.data?.password) {
      const user = params.args.data;
      
      // If a password is provided, hash it
      if (typeof user.password === 'string') {
        const saltRounds = 10; // A good starting point for salt rounds
        const hashedPassword = await bcrypt.hash(user.password, saltRounds);
        user.password = hashedPassword;
        params.args.data = user;
      }
    }
  }

  // 3. Continue with the original operation
  return next(params);
});

// 4. Export the configured Prisma Client instance
//    You will import this instance in your application code
//    instead of creating a new PrismaClient()
export default prisma;