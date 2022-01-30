/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ResponseWrapper, StatusCode } from 'src/common/dto/responce';
import { BankService } from './bank.service';
import { AddbankDto } from './dto/add-bank.dto';

@UseGuards(JwtAuthGuard)
@ApiTags('bank')
@ApiBearerAuth('JWT')
@Controller('bank')
export class BankController {
    constructor(private readonly bankService: BankService) { }

    @Post('addBank')
    async addBank(@Req() req,@Query() query:AddbankDto) {
        let res = new ResponseWrapper<any>();
        try {
            var d = await this.bankService.addBank(req.user?._id,query);
            if (d) {
                res.StatusCode = StatusCode.Success;
                res.Body = d;
            } else {
                res.StatusCode = StatusCode.Failed;
                res.Message = `#(${StatusCode.Failed}) User Not Found`;
            }
        }
        catch (e) {
            
            res.StatusCode = StatusCode.Error;
            res.Message = `#(${StatusCode.Error}) Error: ${e}`;
        }
        return res;
    }


    @Post('getUserBanks')
    async getUserBanks(@Req() req) {
        let res = new ResponseWrapper<any>();
        try {
            var d = await this.bankService.getUserBanks(req.user?._id);
            if (d) {
                res.StatusCode = StatusCode.Success;
                res.Body = d;
            } else {
                res.StatusCode = StatusCode.Failed;
                res.Message = `#(${StatusCode.Failed}) Bank Not Found`;
            }
        }
        catch (e) {
            
            res.StatusCode = StatusCode.Error;
            res.Message = `#(${StatusCode.Error}) Error: ${e}`;
        }
        return res;
    }

}
