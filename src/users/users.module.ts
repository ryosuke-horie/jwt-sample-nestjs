import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { UsersService } from './users.service';

@Module({
  // UsersEntityをUsersServiceで使用できるようにする
  imports: [TypeOrmModule.forFeature([Users])],

  providers: [UsersService],

  // UsersServiceを他のクラスでも使用できるようにする
  exports: [UsersService],
})
export class UsersModule {}
