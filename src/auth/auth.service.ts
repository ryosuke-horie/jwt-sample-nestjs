import bcrypt = require('bcrypt');
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Users } from 'src/users/users.entity';
import { UsersService } from 'src/users/users.service';

type passwordOmitUser = Omit<Users, 'password'>;

interface JWTPayload {
    userId: Users['id'];
    userName: Users['name'];
}

/**
 * @description Passportではできない認証を行うクラス
 */
@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private usersService: UsersService,
    ) {}

    // ユーザーを認証する
    async validateUser(name: Users['name'], pass: Users['password']): Promise<passwordOmitUser | null> {
        // DBからユーザーを取得する
        const user = await this.usersService.findOne(name);

        // DBに保存されるパスワードはハッシュ化されているため、bcryptを利用して判定する
        if (user && bcrypt.compareSync(pass, user.password)) {
            const { password, ...result } = user; // パスワード情報を外部に出さないようにする

            return result;
        }

        return null;
    }

    // JWT tokenを発行する
    async login(user: passwordOmitUser) {
        // jwtにつけるPayload情報
        const payload: JWTPayload = {
            userId: user.id,
            userName: user.name,
        }

        return {
            access_token: this.jwtService.sign(payload),
        }
    }
}

