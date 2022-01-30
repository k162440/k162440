import { Body, Controller, Get, Post, Query, Req, UseGuards} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ResponseWrapper, StatusCode } from 'src/common/dto/responce';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { PersonalDetailDto } from './dto/personal-detail.dto';
import { ContactDetailDto } from './dto/contact-detail.dto';

 // @ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('user')
@ApiBearerAuth('JWT')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {} 
 
  @Get('profile')
  async getProfile(@Req() req) {
    let res = new ResponseWrapper<any>();
    try{
      var d = await this.userService.GetPorfile(req.user?._id);
      if(d){
        res.StatusCode = StatusCode.Success;
        res.Body = d;
      }else{
        res.StatusCode = StatusCode.Failed;
        res.Message = `#(${StatusCode.Failed}) User Not Found`;
      }
    }
    catch(e){
      res.StatusCode = StatusCode.Error;
      res.Message = `#(${StatusCode.Error}) Error: ${e}`;
    }
    return res;
  }

  @Post('updatePersonalDetail')
  async updatePersonalDetail(@Req() req,@Query() query:PersonalDetailDto) {
    let res = new ResponseWrapper<any>();
    try{
      var d = await this.userService.updatePersonalDetail(query,req.user?._id);
      if(d){
        res.StatusCode = StatusCode.Success;
        res.Body = `User Update Successfully`;
      }else{
        res.StatusCode = StatusCode.Failed;
        res.Message = `#(${StatusCode.Failed}) User Not Found`;
      }
    }
    catch(e){
      res.StatusCode = StatusCode.Error;
      res.Message = `#(${StatusCode.Error}) Error: ${e}`;
    }
    return res;
  }

  @Post('updateContactDetail')
  async updateContactDetail(@Req() req,@Query() query:ContactDetailDto) {
    let res = new ResponseWrapper<any>();
    try{
      var d = await this.userService.updateContactDetail(query,req.user?._id);
      if(d){
        res.StatusCode = StatusCode.Success;
        res.Body = `User Update Successfully`;
      }else{
        res.StatusCode = StatusCode.Failed;
        res.Message = `#(${StatusCode.Failed}) User Not Found`;
      }
    }
    catch(e){
      res.StatusCode = StatusCode.Error;
      res.Message = `#(${StatusCode.Error}) Error: ${e}`;
    }
    return res;
  }
}
