import { ApiProperty } from "@nestjs/swagger";
import { BankType } from "../schemas/bank.schema";

export class AddbankDto{
    
    @ApiProperty({required:false}) BankName?: string;
    @ApiProperty({required:false}) BranchName?: string;
    @ApiProperty({required:false}) AccountHolder?: string;
    @ApiProperty({required:false}) AccountNumber?: string;
    @ApiProperty({required:false}) PanNumber?: string;
    @ApiProperty({required:false}) PaypalAccount?: string;
    @ApiProperty({required:false}) BlockChainAddress?: string;
    @ApiProperty({required:false}) BitgoAddress?: string;
    

}