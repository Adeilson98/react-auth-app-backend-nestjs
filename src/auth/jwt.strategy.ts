import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { jwtContants } from "./constants";
import { UserService } from "src/user/user.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private UserService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtContants.secret
        });
    }

    async validate(payload: any) {
        const user = await this.UserService.findUserById(payload.userId);

        if(!user) {
            return null;
        }

        return {userId: user.id, username: user.username};
    }
}