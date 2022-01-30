import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/user/schemas/user.schema';
import { Bank } from './bank.schema';
export type UserBankDocument = UserBank & Document;

@Schema()
export class UserBank {

    _id?: string;
    
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
    UserId: User;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Bank.name })
    BankId: Bank;
}

export const UserBankSchema = SchemaFactory.createForClass(UserBank);
