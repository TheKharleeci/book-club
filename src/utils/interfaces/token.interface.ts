import { Schema } from 'mongoose';

interface IToken extends Object {
    id: Schema.Types.ObjectId;
    expiresIn: number;
    type: string;
}

export default IToken;