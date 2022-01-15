import { Request, Response } from "express";
import { container } from 'tsyringe';

import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

export default class UserAvatarController {
    public async update(request: Request, response: Response): Promise<Response> {
        const updateUserAvatar = container.resolve(UpdateUserAvatarService)

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
    }
}