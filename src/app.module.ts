import { BankModule } from './bank/bank.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
const UserName = 'MultiLevelMarketing';
const Password = 'Admin123';

@Module({
  imports: [
    BankModule,
    AuthModule,
    UserModule,
    MongooseModule.forRoot(`mongodb+srv://MultiLevelMarketing:${Password}@cluster0.ytosi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`),
    ProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {



}
