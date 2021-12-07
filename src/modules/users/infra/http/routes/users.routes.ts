import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';

import { ErrorCode } from '@config/constants';

import CreateUserService from '@modules/users/services/CreateUserService';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
    const { name, email, password } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
        name,
        email,
        password
    });

    const userToReturn = {
        name: user.name,
        email: user.email
    }

    return response.json(userToReturn);
})

usersRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'), async (request, response) => {
    const updateUserAvatar = new UpdateUserAvatarService();

    const user = await updateUserAvatar.execute({
        user_id: request.user.id,
        // [TODO]: Verificar condição abaixo, inseri pois estava reclamando que o objeto
        // request.file poderia vir vazio.
        // Versão original:
        // avatarFilename: request.file.filename,
        avatarFilename: request.file ? request.file.filename : '',
    })

    const userWithoutPassword = {
        id: user.id,
        name: user.name,
        email: user.email,
        created_at: user.created_at,
        updated_at: user.updated_at,
    };

    return response.json(userWithoutPassword);
})

export default usersRouter;