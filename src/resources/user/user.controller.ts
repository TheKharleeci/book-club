import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import validationMiddleware from '@/middleware/validation.middleware';
import validate from '@/resources/user/user.validation';
import UserService from '@/resources/user/user.service';
import UserMiddleware from '@/resources/user/user.middleware';
import authenticated from '@/middleware/authenticated.middleware';

class UserController implements Controller {
    public path = '/user';
    public router = Router();
    private UserService = new UserService();
    private UserMiddleware = new UserMiddleware();

    constructor() {
        this.initialiseRoutes()
    }

    private initialiseRoutes() : void {
        this.router.post(
            `${this.path}/register`,
            validationMiddleware(validate.signUp),
            this.UserMiddleware.checkIfUserExists,
            this.register
        );
        this.router.post(
            `${this.path}/login`,
            validationMiddleware(validate.login),
            this.login
        );
        this.router.get(
            `${this.path}`,
            authenticated,
            this.getUser
        );
    }

    private register = async( 
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response |void> => {
        try {
            const { name, email, password } = req.body;
            const token = await this.UserService.signUp(name, email, password );
            res.status(201).json({ token })
        } catch (error) {
            next(new HttpException(400, 'Cannot register user here'))
        }
    }

    private login = async( 
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response |void> => {
        try {
            const { email, password } = req.body;
            const token = await this.UserService.login(email, password);
            res.status(200).json({ token })
        } catch (error) {
            next(new HttpException(400, 'Cannot login user'))
        }
    }

    private getUser = ( 
        req: Request,
        res: Response,
        next: NextFunction
    ): Response | void => {
        if ( !req.user) {
            return next(new HttpException(404, 'Cannot get user'));
        }
        res.status(200).send({ data: req.user })
    }
}

export default UserController;