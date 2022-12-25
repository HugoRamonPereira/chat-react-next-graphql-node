import { GraphQLContext, CreateUsernameResponse } from './../../utils/types';
const resolvers = {
  Query: {
    searchUsers: () => {},
  },
  Mutation: {
    createUsername: async (
      _: any, 
      args: { username: string }, 
      context: GraphQLContext): Promise<CreateUsernameResponse> => {
      const { username } = args;
      const { session, prisma } =  context;

      if (!session?.user) {
        return {
          error: 'Not Authorized'
        }
      }

      const { id: userId } = session.user;

      try {
        // Check if username is not taken
        const existingUser = await prisma.user.findUnique({
          where: {
            username
          },
        });

        if (existingUser) {
          return {
            error: 'Username already taken. Please try another'
          };
        }

        await prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            username
          }
        });

        return { success: true }

      } catch (error: any) {
        console.log('Create username error', error);
        return {
          error: error?.message
        }
      }
    },
  } 
}

export default resolvers;