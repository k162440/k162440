import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/user/schemas/user.schema';
import { OrderDetail } from './order-detail.schema';

export type OrderDocument = Order & Document;

@Schema()
export class Order {

    // @Prop({ type: Types.ObjectId })
    _id?:string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
    UserId: User;

    @Prop()
    PaymentStatusId: PaymentStatusType;

    @Prop({ default: new Date().toUTCString() })
    CreatedAt: Date;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'OrderDetail' }] })
    orderDetail: OrderDetail[];

    @Prop({default:0})
    TotalPayment: number;

}

export const OrderSchema = SchemaFactory.createForClass(Order);


export enum PaymentStatusType {
    PAID = "Paid",
    UNPAID = "UnPaid"
}