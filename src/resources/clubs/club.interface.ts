import { Document } from 'mongoose';

export interface IClub extends Document {
    name: string;
    leader: string;
    status: string;
}

export default IClub;
