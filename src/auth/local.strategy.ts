import { Strategy as BaseLocalStrategy } from 'passport-local';

import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Users } from 'src/users/users.entity'

type passwordOmitUser = Omit<Users, 'password'>;

/**
 * @description userNameとpasswordで認証するクラス
 */
@Injectable()
export class LocalStrategy extends PassportStrategy(BaseLocalStrategy) {
    constructor(private authService: AuthService) {
        super();
    }

    // passport-localは、デフォルトで username と password をパラメーターで受け取る
    async validate(name: Users['name'], pass: Users['password']): Promise<passwordOmitUser> {
        // 認証して結果を受け取る
        const user = await this.authService.validateUser(name, pass);

        // 認証に失敗した場合はエラーを返す
        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }

}