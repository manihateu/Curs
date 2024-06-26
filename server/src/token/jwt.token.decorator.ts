import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const JwtToken = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization.split(' ')[1];
    return token;
  },
);