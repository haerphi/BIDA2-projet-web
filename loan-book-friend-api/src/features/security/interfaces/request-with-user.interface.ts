import { UserEntity } from '../../user/models';
import { Request } from 'express';

export interface RequestWithUser extends Request {
    user: UserEntity;
}
