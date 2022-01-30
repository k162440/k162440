import { Body, Controller, Get, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ResponseWrapper, StatusCode } from 'src/common/dto/responce';
import { AddProductDto, AddProductToCardDto } from './dto/add-product.dto';
import { ProductService } from './product.service';


@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT')
@ApiTags('product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Get('getProducts')
  async getProducts() {
    let res = new ResponseWrapper<any>();
    try {
      var d = await this.productService.getProducts();
      if (d) {
        res.StatusCode = StatusCode.Success;
        res.Body = d;
      } else {
        res.StatusCode = StatusCode.Failed;
        res.Message = `#(${StatusCode.Failed}) No Row Found`;
      }
    }
    catch (e) {

      res.StatusCode = StatusCode.Error;
      res.Message = `#(${StatusCode.Error}) Error: ${e}`;
    }
    return res;
  }

  @Post('addProduct')
  async addProduct(@Query() dto:AddProductDto ) {
    let res = new ResponseWrapper<any>();
    try {
      var d = await this.productService.addProduct(dto);
      if (d) {
        res.StatusCode = StatusCode.Success;
        res.Body = d;
      } else {
        res.StatusCode = StatusCode.Failed;
        res.Message = `#(${StatusCode.Failed}) Product Already Exist`;
      }
    }
    catch (e) {

      res.StatusCode = StatusCode.Error;
      res.Message = `#(${StatusCode.Error}) Error: ${e}`;
    }
    return res;
  }

  @Post('CreateOrder')
  async CreateOrder(@Req() req) {
    let res = new ResponseWrapper<any>()
    try {
      var d = await this.productService.CreateOrder(req.user);
      if (d) {
        res.StatusCode = StatusCode.Success;
        res.Body = d;
      } else {
        res.StatusCode = StatusCode.Failed;
        res.Message = `#(${StatusCode.Failed}) No Row Found`;
      }
    }
    catch (e) {

      res.StatusCode = StatusCode.Error;
      res.Message = `#(${StatusCode.Error}) Error: ${e}`;
    }
    return res;
  }



  @Post('AddProductToCard')
  async AddProductToCard(@Req() req,@Body() dto:AddProductToCardDto) {
    let res = new ResponseWrapper<any>()
    try {
      dto.UserId = req.user._id;
      var d = await this.productService.AddProductToCard(dto);
      if (d) {
        res.StatusCode = StatusCode.Success;
        res.Body = d;
      } else {
        res.StatusCode = StatusCode.Failed;
        res.Message = `#(${StatusCode.Failed}) No Row Found`;
      }
    }
    catch (e) {

      res.StatusCode = StatusCode.Error;
      res.Message = `#(${StatusCode.Error}) Error: ${e}`;
    }
    return res;
  }

  @Get('GetCardProducts/:OrderId')
  async GetProductToCard(@Req() req,@Param('OrderId') orderId:string) {
    let res = new ResponseWrapper<any>()
    try {
      var d = await this.productService.GetProductToCard(req.user._id,orderId);
      if (d) {
        res.StatusCode = StatusCode.Success;
        res.Body = d;
      } else {
        res.StatusCode = StatusCode.Failed;
        res.Message = `#(${StatusCode.Failed}) Cart is Empty`;
      }
    }
    catch (e) {

      res.StatusCode = StatusCode.Error;
      res.Message = `#(${StatusCode.Error}) Error: ${e}`;
    }
    return res;
  }

  @Get('GetOrders')
  async GetOrders(@Req() req) {
    let res = new ResponseWrapper<any>()
    try {
      var d = await this.productService.GetOrders(req.user._id);
      if (d) {
        res.StatusCode = StatusCode.Success;
        res.Body = d;
      } else {
        res.StatusCode = StatusCode.Failed;
        res.Message = `#(${StatusCode.Failed}) Cart is Empty`;
      }
    }
    catch (e) {

      res.StatusCode = StatusCode.Error;
      res.Message = `#(${StatusCode.Error}) Error: ${e}`;
    }
    return res;
  }

  @Post('MakePayment/:OrderId')
  async MakePayment(@Req() req,@Param('OrderId') orderId:string) {
    let res = new ResponseWrapper<any>()
    try {
      var d = await this.productService.MakePayment(req.user,orderId);
      if (d) {
        res.StatusCode = StatusCode.Success;
        res.Message = "Payment Successfull";
      } else {
        res.StatusCode = StatusCode.Failed;
        res.Message = `#(${StatusCode.Failed}) Payment Failed`;
      }
    }
    catch (e) {

      res.StatusCode = StatusCode.Error;
      res.Message = `#(${StatusCode.Error}) Error: ${e}`;
    }
    return res;
  }

}
