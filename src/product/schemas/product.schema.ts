import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
export type ProductDocument = Product & Document;

@Schema()
export class Product {
    // @Prop()
    _id?: string;

    @Prop()
    Title: string;

    @Prop()
    Category: ProductCategory = ProductCategory.Water_Bottle;

    @Prop()
    Price: number;
    
    @Prop()
    ImageUrl: string;
}


export const ProductSchema = SchemaFactory.createForClass(Product);

export enum ProductCategory{
    Water_Bottle = "Water Bottle",

}