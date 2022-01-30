import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/user/schemas/user.schema';
import { Bank, BankSchema } from 'src/bank/schemas/bank.schema';
import { Product, ProductSchema } from './schemas/product.schema';
import { Order, OrderSchema } from './schemas/order.schema';
import { OrderDetail, OrderDetailSchema } from './schemas/order-detail.schema';

@Module({
  imports:[
    MongooseModule.forFeature([
      { name: OrderDetail.name, schema: OrderDetailSchema },
      { name: User.name, schema: UserSchema },
      { name: Bank.name, schema: BankSchema },
      { name: Product.name, schema: ProductSchema },
      { name: Order.name, schema: OrderSchema },
  ]),
  ],
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule {}
