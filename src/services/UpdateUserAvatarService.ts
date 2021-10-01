import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';

import AppError from '../errors/AppError';
import { ErrorCode } from '../config/constants';

import uploadConfig from '../config/upload';
import User from '../models/User';


interface IRequest {
    user_id: string;
    avatarFilename: string;
}

class UpdateUserAvatarService {
    public async execute({ user_id, avatarFilename }: IRequest): Promise<User> {
      const usersRepository = getRepository(User);
  
      const user = await usersRepository.findOne(user_id);
  
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
  
      await usersRepository.save(user);
  
      return user;
    }
  }
  

export default UpdateUserAvatarService;