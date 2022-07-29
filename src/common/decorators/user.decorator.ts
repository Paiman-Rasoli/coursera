import { createParamDecorator } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
export const CurrentUser = createParamDecorator((data, req) => {
  return GqlExecutionContext.create(req).getArgByIndex(2)?.req?.user;
});
