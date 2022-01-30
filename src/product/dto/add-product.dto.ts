import { ApiProperty } from "@nestjs/swagger";
import { ProductCategory } from "../schemas/product.schema";

export class AddProductDto {

    @ApiProperty() Title?: string;

    @ApiProperty({
        enum: Object.keys(ProductCategory),
        required: false,
        default:ProductCategory.Water_Bottle
    })
    Category?: ProductCategory;
    @ApiProperty() Price?: number;
    @ApiProperty() ImageUrl?: string;
}


export class AddProductToCardDto{
    
    @ApiProperty() OrderId:string;
    @ApiProperty() ProductId:string;
    @ApiProperty() Quantity:number;
    UserId?:string;
}