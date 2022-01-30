import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Bank } from 'src/bank/schemas/bank.schema';
import { User } from './user.schema';
export type UserAgentDocument = UserAgent & Document;

@Schema()
export class UserAgent {
    // @Prop()
    _id?: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    UserId: User;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User'})
    UserAgent: User;

    @Prop({ default: new Date().toUTCString() })
    CreatedAt: Date;

}

export const UserAgentSchema = SchemaFactory.createForClass(UserAgent);

