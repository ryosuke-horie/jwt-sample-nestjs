import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'postgres',       // DBの種類
      port: 5432,             // 使用ポート
      database: 'postgres',   // データベース名
      host: 'localhost',      // DBホスト名
      username: 'postgres',   // DBユーザ名
      password: 'password',   // DBパスワード
      synchronize: true,      // モデル同期(trueで同期)
      entities: [__dirname + '/**/*.entity.{js,ts}'],  // ロードするエンティティ
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
