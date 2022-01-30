import { ApiProperty } from "@nestjs/swagger";
import { Genders, User } from "../schemas/user.schema";

export class ContactDetailDto {
  @ApiProperty()
  Address1?: string;

  @ApiProperty()
  Address2?: string;

  @ApiProperty()
  Country?: string;

  @ApiProperty()
  City?: string;

  @ApiProperty()
  LandLineNumber?: string;

  @ApiProperty()
  State?: string;

  @ApiProperty()
  Code?: number;

  @ApiProperty()
  MobileNumber?: string;

}