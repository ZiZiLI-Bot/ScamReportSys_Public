import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export type TUser = {
  _id: string;
  email: string;
  role: string;
};

export const User = createParamDecorator((data: unknown, ctx: ExecutionContext): TUser => {
  const request = ctx.switchToHttp().getRequest();
  return request.user;
});
