import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import * as mongoose from 'mongoose';
import { Product } from './product.schema';
import { Order } from './order.schema';
export type OrderDetailDocument = OrderDetail & Document;

@Schema()
export class OrderDetail {
    // @Prop()
    // @Prop({type: Types.ObjectId})
    _id?: string;

    // @Prop({ type: Types.ObjectId, ref: Order.name })
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Order' })
    OrderId: Order;

    // @Prop({ type: Types.ObjectId, ref: 'Product' })
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Product' })
    ProductId: Product;

    @Prop({default:0})
    Quantity: number;
    
}


export const OrderDetailSchema = SchemaFactory.createForClass(OrderDetail);
