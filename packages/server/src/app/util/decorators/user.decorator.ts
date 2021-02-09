import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayload } from '@dragonfish/models/auth';

export const User = createParamDecorator((_data: unknown, ctx: ExecutionContext) => {
    return ctx.switchToHttp().getRequest().user as JwtPayload;
});
