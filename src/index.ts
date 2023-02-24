import 'dotenv/config';
import 'module-alias/register';
import validateEnv from '@/utils/helpers/validateEnv.helper';
import App from './app';
import UserController from '@/resources/user/user.controller';
import ClubController from '@/resources/clubs/club.controller';

validateEnv();
const app = new App([ new UserController(), new ClubController() ], Number(process.env.PORT));

app.listen();
