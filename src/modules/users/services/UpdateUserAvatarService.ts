import path from 'path';
import fs from 'fs';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import { ErrorCode } from '@config/constants';

import uploadConfig from '@config/upload';
import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';


interface IRequest {
  user_id: string;
  avatarFilename: string;
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) { };

  public async execute({ user_id, avatarFilename }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id)

    if (!user) {
      throw new AppError('Only authenticated user can change avatar', ErrorCode.Unauthorized);
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFilename;

    await this.usersRepository.save(user);

    return user;
  }
}


export default UpdateUserAvatarService;