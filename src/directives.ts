import { AuthenticationError } from "apollo-server-express";
import { SchemaDirectiveVisitor } from "graphql-tools";
import { defaultFieldResolver } from "graphql";

class AuthDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field: any) {
    const requiredRole = this.args.requires;
    const originalResolve = field.resolve || defaultFieldResolver;

    field.resolve = function(...args: any) {
      console.log(args)
      const context = args[2];
      const user = context.getUser() || {};
      const isAuthorized = user.role === requiredRole;

      if (!isAuthorized) {
        throw new AuthenticationError(`You need following role: ${requiredRole}`)
      }

      return originalResolve.apply(this, args)
    }
  }
}

export default AuthDirective;
