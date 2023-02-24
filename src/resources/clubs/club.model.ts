import { Schema, model } from 'mongoose';
import {v4 as uuidv4} from 'uuid';
import Club from '@/resources/clubs/club.interface';

const ClubSchema = new Schema ({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    leader: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    status: { type: String, default: 'pending', enum: ['pending', 'active', 'deactivated'] },
}, { timestamps: true }
)

export default model<Club>('Club', ClubSchema);