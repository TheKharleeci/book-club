import User from '@/resources/user/user.interface';
import exp from 'constants';

declare global {
    namespace Express {
        export interface Request {
            user: User;
        }
    }
}