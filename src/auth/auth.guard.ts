import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const ctx = context.switchToHttp();
    const { user } = ctx.getRequest();
    if (user.role.includes("ADMIN")) return true;
    return false;;
  }
}

@Injectable()
export class SuperAdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const ctx = context.switchToHttp();
    const { user } = ctx.getRequest();
    if (user.role.includes("SUPER_ADMIN")) return true;
    return false;;
  }
}
