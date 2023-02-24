import { Document } from 'mongoose';

export interface IUser extends Document {
    email: string;
    name: string;
    password: string;
    user_type: string;
    club: string[];

    isValidPassword(password: string) : Promise<Error | boolean >
}

export default IUser;
