import { Request, Response, NextFunction } from 'express';
import UserService from '@/resources/user/user.service';
import UserModel from '@/resources/user/user.model';
import HttpException from '@/utils/exceptions/http.exception';
import IUser from '@/resources/user/user.interface';


class UserMiddleware {

    private UserService = new UserService();

    /**
     * Creates a new user in the database
     * @param email - Email of the new user
     * @returns- a next or an error 
     */
    public checkIfUserExists = async( 
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { email } = req.body;
            const user = await this.UserService.getUserByEmail(email);
            return user ? next(new HttpException(400, 'User already exists')) : next();
        } catch (error) {
            next(new HttpException(400, 'Cannot verify if user exists'))
        }
    }

    public getUser = async( 
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { email } = req.body;
            const user: IUser| null = await UserModel.findOne(email)
            if (user) {
                req.user = user
                return next();
            }    
            return next(new HttpException(400, 'User does not exists'));
        } catch (error) {
            next(new HttpException(400, 'Cannot get user'))
        }
    }
}

export default UserMiddleware;
