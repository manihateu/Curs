import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {
    constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
     ) {}    
    
    async create (dto) {
        return await this.userRepository.create(dto)
    }

    async findByEmail (email: string) {
        return await this.userRepository.findOne({where: {
            email: email
        }})
    }

    async comparePasswords(password: string, hash_password: string) {
        return bcrypt.compareSync(password, hash_password);
    }
}
