
import { ApiProperty } from '@nestjs/swagger';
export class UserDto{

    @ApiProperty()
    Email:string;

    @ApiProperty()
    Password:string;

    @ApiProperty()
    FirstName:string;

    @ApiProperty()
    ReferenceId:string;
}