

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/user/schemas/user.schema';
import { AddbankDto } from './dto/add-bank.dto';
import { Bank, BankDocument, BankType } from './schemas/bank.schema';
import { UserBank, UserBankDocument } from './schemas/user-bank.schema';

@Injectable()
export class BankService {
    
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
        @InjectModel(Bank.name) private readonly bankModel: Model<BankDocument>,
        @InjectModel(UserBank.name) private readonly userBankModel: Model<UserBankDocument>,
    ) { }


    async addBank(_id: any,dto:AddbankDto) {

        if(!_id) throw 'User Not Found';
        if(await this.bankModel.findOne({UserId:_id})) throw 'Bank Already Exist';
        var d =new this.bankModel({...dto});
        d.UserId = _id;
        var bank = await d.save();
        await this.userModel.findById(_id).then(async x=>{
            x.Bank = d._id
            await x.save();
        });

        return true;
    }      

    async getUserBanks(_id: any) {

        if(!_id) throw 'User Not Found';
        
        var bank =await this.bankModel.findOne({UserId:_id});
        let res = {
            Bank:{
                BankName: bank.BankName,
                BranchName: bank.BranchName,
                AccountHolder: bank.AccountHolder,
                AccountNumber: bank.AccountNumber,
                PanNumber: bank.PanNumber,
                BankTypeId:BankType.Bank
            },
            PayPal:{
                PaypalAccount:bank.PaypalAccount,
                BlockChainAddress:bank.BlockChainAddress,
                BitgoAddress:bank.BitgoAddress,
                BankTypeId:BankType.Paypal
            }
        }
        return res;
    }  
}
