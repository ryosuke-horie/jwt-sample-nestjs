import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';

import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule,

    // JWTを使うための設定をしている
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => {
        return {
          // envファイルから秘密鍵を渡す
          secret: configService.get<string>('JWT_SECRET_KEY'),
          signOptions: {
            // 有効期間を設定
            // 指定する値は以下を参照
            // https://github.com/vercel/ms
            expiresIn: '1200s'
          },
        };
      },
      inject: [ConfigService], // useFactoryで使う為にConfigServiceを注入する
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})

export class AuthModule {}
