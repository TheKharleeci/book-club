import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import validationMiddleware from '@/middleware/validation.middleware';
import validate from '@/resources/clubs/club.validation';
import ClubService from '@/resources/clubs/club.service';
import authenticated from '@/middleware/authenticated.middleware';

class ClubController implements Controller {
    public path = '/club';
    public router = Router();
    private ClubService = new ClubService();

    constructor() {
        this.initialiseRoutes()
    }

    private initialiseRoutes() : void {
        this.router.post(
            `${this.path}/`,
            validationMiddleware(validate.registerClub),
            authenticated,
            this.createClub
        );
    }

    private createClub = async( 
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response |void> => {
        try {
            const { body: { name }, user: { id } } = req;
            const token = await this.ClubService.createClub(name, id);
            res.status(201).json({ token })
        } catch (error) {
            next(new HttpException(400, 'Cannot create club'))
        }
    }
}

export default ClubController;