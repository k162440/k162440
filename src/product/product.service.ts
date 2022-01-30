import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Bank, BankDocument } from 'src/bank/schemas/bank.schema';
import { User, UserDocument } from 'src/user/schemas/user.schema';
import { AddProductDto, AddProductToCardDto } from './dto/add-product.dto';
import { OrderDetail, OrderDetailDocument } from './schemas/order-detail.schema';
import { Order, OrderDocument, PaymentStatusType } from './schemas/order.schema';
import { Product, ProductDocument } from './schemas/product.schema';

@Injectable()
export class ProductService {
    



    constructor(
        @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
        @InjectModel(Bank.name) private readonly bankModel: Model<BankDocument>,
        @InjectModel(Product.name) private readonly productModel: Model<ProductDocument>,
        @InjectModel(Order.name) private readonly orderModel: Model<OrderDocument>,
        @InjectModel(OrderDetail.name) private readonly orderDetailModel: Model<OrderDetailDocument>,
    ) { }

    async GetOrders(_id: any) {
        var order = await this.orderModel.find({UserId:_id,PaymentStatusId:PaymentStatusType.PAID});
        for(let o of order){
            o.orderDetail = await this.orderDetailModel.find({OrderId:o._id});
            await o.save();
            for(let od of o.orderDetail){
                od.ProductId = await this.productModel.findById(od.ProductId);
            }
        }
         order.forEach(async x=>await x.save());
        return order;
      }
  
    async MakePayment(user: any, orderId: string) {
        var check = await this.orderModel.findOne({UserId:user._id,_id:orderId});
        if(check){
            check.PaymentStatusId = PaymentStatusType.PAID;
            await check.save();
            return true;
        }else{
            return false;
        }
    }
    async GetProductToCard(_id: any, orderId: string) {
        var d = await this.orderDetailModel.find({ OrderId: orderId })
        var x = await this.orderModel.findById(orderId);
        if(!x) return null;
        x.orderDetail = d.map(x => x._id.toString());
        await x.save();
        var res = await this.orderModel.findOne({ _id: orderId, PaymentStatusType: PaymentStatusType.UNPAID }).populate('orderDetail').exec();

        for (let p of res.orderDetail) {
            p.ProductId = await this.productModel.findById(p.ProductId);
        }

        res.TotalPayment = this.Sum(res.orderDetail.map(x => x.ProductId.Price * x.Quantity));

        await res.save();
        return res;
    }

    Sum = (c: number[]) => {
        return c.reduce((a, b) => a + b, 0);
    }

    Sort = (c:any[],col:string)=>{
     return  c.sort((a,b) => {
            return a[col] === b[col] ? 0 : a[col] < b[col] ? -1 : 1
          });
    }


    async getProducts() {
        var products = await this.productModel.find().select("-__v");
        return products;
    }

    async addProduct(dto: AddProductDto) {
        var exist = await this.productModel.findOne({ Title: dto.Title });
        if (exist) return null;
        var product = new this.productModel({ ...dto });
        return await product.save();

    }

    async AddProductToCard(dto: AddProductToCardDto) {
        var order = await this.orderModel.findById(dto.OrderId);
        if (dto?.UserId !== order?.UserId._id.toString()) throw "Invalid User";

        var existorderDetail = await this.orderDetailModel.findOne({ ProductId: dto.ProductId,OrderId:dto.OrderId });
       
        if (existorderDetail) {
            existorderDetail.Quantity = existorderDetail.Quantity + dto.Quantity;
            await existorderDetail.save();
            return await this.GetProductToCard(dto.UserId, dto.OrderId);
        } else {
            var orderDetail = new this.orderDetailModel();
            orderDetail.OrderId = order;
            orderDetail.ProductId = await this.productModel.findById(dto.ProductId);
            orderDetail.Quantity = dto.Quantity;
            await orderDetail.save();
            return await this.GetProductToCard(dto.UserId, dto.OrderId);
        }
    }
 
    async CreateOrder(_user: any) {
        var exist = await this.orderModel.find({UserId:_user._id,PaymentStatusId:PaymentStatusType.UNPAID});
        if(exist){
            var _exist = this.Sort(exist,"CreatedAt")[0];
            return _exist;
        }else{
            var order = new this.orderModel();
            order.UserId = _user._id;
            order.PaymentStatusId = PaymentStatusType.UNPAID;
            return await order.save();
        }

        
    }
}
