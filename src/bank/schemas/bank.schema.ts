import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/user/schemas/user.schema';
export type BankDocument = Bank & Document;

@Schema()
export class Bank {
    // @Prop()
    _id?: string;

    @Prop()
    BankName: string;

    @Prop()
    BranchName: string;

    @Prop()
    AccountHolder: string;

    @Prop()
    AccountNumber: string;

    @Prop()
    PanNumber: string;

    @Prop()
    PaypalAccount?: string;

    @Prop()
    BlockChainAddress?: string;

    @Prop()
    BitgoAddress: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User.name' })
    UserId: User;
    
}

export const BankSchema = SchemaFactory.createForClass(Bank);



export enum BankType {
    'Bank' = 1,
    'Paypal' = 2
}