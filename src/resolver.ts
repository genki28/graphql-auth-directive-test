// TODO: テストなのでとりあえずany
const resolvers = {
  User: {
    message: (_: any, args: any, context: any) => context.Message.getById(args.id)
  },
  Query: {
    currentUser: (_: any, __: any, context: any) => context.user
  },
};
export default resolvers;
