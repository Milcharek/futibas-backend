import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';

import CreateUserService from '../services/CreateUserService';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
    try {
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
    }
    catch (err: any) {
        return response.status(400).json({ error: err.message });
    }
})

usersRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'), async (request, response) => {
    try {
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

        return response.json(userWithoutPassword)
    }
    catch (err: any) {
        return response.status(400).json({ error: err.message });
    }
})

export default usersRouter;