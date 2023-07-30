import { ExtractJwt, Strategy as BaseJwtStrategy } from 'passport-jwt';

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Users } from 'src/users/users.entity';

// JwtについているPayload情報の型
interface JWTPayload {
    userId: Users['id'];
    username: Users['name'];
}

/**
 * @description JWTを利用した認証処理を行うクラス
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(BaseJwtStrategy) {
    constructor(private configService: ConfigService) {
        super({
            // Authorization bearerからトークンを読み込む関数を返す
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            // 有効期限を無視するかどうか
            // envファイルから秘密鍵を渡す
            secretOrKey: configService.get<string>('JWT_SECRET_KEY'),
        })
    }
    // ここでPayloadを使ったバリデーション処理を実行できる
    // Payloadは、AuthService.login()で定義した値
    async validate(payload: JWTPayload): Promise<JWTPayload> {
        return { userId: payload.userId, username: payload.username };
    }
}