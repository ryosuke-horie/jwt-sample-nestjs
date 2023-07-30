import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './users.entity';

/**
 * @description User情報を扱うクラス
 */
@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users)
        private readonly usersRepository: Repository<Users>,
    ) {}

    // ユーザーを一人返す
    findOne(username: Users['name']): Promise<Users | undefined> {
        // typeormからDBにアクセスし、ユーザーを取得する
        return this.usersRepository.findOne({ where: { name: username }})
    }
}
