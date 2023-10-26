import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "../users/entities/user.entity";

@Injectable()
export class UserGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  async canActivate(context: ExecutionContext) {
    try {
      const req = context.switchToHttp().getRequest();
      const authHeader = req.headers.authorization;
      if (!authHeader) throw new UnauthorizedException("User unauthorized");

      const bearer = authHeader.split(" ")[0],
        token = authHeader.split(" ")[1];
      if (bearer !== "Bearer" || !token)
        throw new UnauthorizedException("User unauthorized");

      try {
        const user: Partial<User> = await this.jwtService.verify(token, {
          secret: process.env.JWT_ACCESS_KEY,
        });

        if (!user) throw new UnauthorizedException("User unauthorized");

        return true;
      } catch (error) {
        throw new UnauthorizedException("User unauthorized");
      }
    } catch (error) {
      throw new UnauthorizedException("User unauthorized");
    }
  }
}
