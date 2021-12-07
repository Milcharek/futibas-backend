import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import User from '../infra/typeorm/entities/User';

import AppError from '@shared/errors/AppError';

interface ICreateUserRequest {
    name: string,
    email: string,
    password: string
}

class CreateUserService {
    async execute({ name, email, password }: ICreateUserRequest): Promise<User> {
        const usersRepository = getRepository(User);

        const checkUserExists = await usersRepository.findOne({
            where: { email },
        });

        if (checkUserExists) {
            throw new AppError('Email address already used.')
        }

        const hashedPassword = await hash(password, 8);

        const user = usersRepository.create({
            name,
            email,
            password: hashedPassword,
            isManager: false
        })

        await usersRepository.save(user);

        return user;
    }
}

export default CreateUserService;