import { PrismaClient } from '@prisma/client';
import { ISODateString } from 'next-auth';

export interface GraphQLContext {
  session: Session | null;
  prisma: PrismaClient;
  // pubsub
}

export interface Session {
  user: User;
  expires: ISODateString;
}

export interface User {
  id: string;
  username: string;
  image: string;
}

export interface CreateUsernameResponse {
  success?: boolean;
  error?: string;
}