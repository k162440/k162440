import { BankService } from './bank.service';
import { BankController } from './bank.controller';

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/user/schemas/user.schema';
import { Bank, BankSchema } from './schemas/bank.schema';
import { UserBank, UserBankSchema } from './schemas/user-bank.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: User.name, schema: UserSchema },
            { name: Bank.name, schema: BankSchema },
            { name: UserBank.name, schema: UserBankSchema },
        ]),
    ],
    controllers: [
        BankController,
    ],
    providers: [
        BankService,
    ],
})
export class BankModule { }
