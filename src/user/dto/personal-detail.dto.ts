import { ApiProperty } from "@nestjs/swagger";
import { Genders, User } from "../schemas/user.schema";

export class PersonalDetailDto {
  @ApiProperty({ required: false })
  FirstName?: string;

  @ApiProperty({ required: false })
  LastName?: string;

  @ApiProperty({
    enum: Object.keys(Genders),
    required: false
  })
  Gender?: string;

  @ApiProperty({
    required: false,
    type: Date
  })
  DateOfBirth?: Date;
}