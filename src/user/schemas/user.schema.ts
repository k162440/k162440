import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Bank } from 'src/bank/schemas/bank.schema';
export type UserDocument = User & Document;

@Schema()
export class User {
    // @Prop()
    _id?: string;

    @Prop()
    Email: string;

    @Prop()
    Password: string;

    @Prop()
    FirstName: string;

    @Prop()
    LastName: string;

    @Prop()
    Gender?: string;

    @Prop()
    ProfilePicUrl?: string;

    @Prop()
    DateOfBirth?: Date;

    @Prop()
    Country: string;

    @Prop()
    State: string;

    @Prop()
    City: string;

    @Prop()
    Code: number;

    @Prop()
    LandLineNumber: string;

    @Prop()
    MobileNumber: string;

    @Prop()
    Address1: string;

    @Prop()
    Address2: string;

    @Prop({ default: new Date().toUTCString() })
    CreatedAt: Date;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Bank.name })
    Bank: Bank;

}

export const UserSchema = SchemaFactory.createForClass(User);



export enum Genders {
    'Mail',
    'Female'
}