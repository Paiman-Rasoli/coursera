import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AtGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride('isPublic', [
      context.getHandler(),
      context.getClass(),
    ]);
    // if public decorator use skip the validation
    if (isPublic) return true;
    // console.log(context);
    // check context
    if (context.getType<GqlContextType>() === 'graphql') {
      const ctx = GqlExecutionContext.create(context);
      const myargs = ctx.getArgByIndex(2);
      const customStructure = {
        ...myargs?.req,
        ...myargs?.res,
        switchToHttp() {
          const getRequest = () => {
            return myargs?.req;
          };
          const getResponse = () => {
            return myargs?.res;
          };

          return { getRequest, getResponse };
        },
      };

      return super.canActivate(customStructure);
    }
    // correctly work for REST API
    return super.canActivate(context);
  }
}
