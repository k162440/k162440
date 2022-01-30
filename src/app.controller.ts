import { Controller, Request, Post, UseGuards, Get, Body, Query, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth/auth.service';
import { LoginDto } from './auth/Dto/login.dto';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { ResponseWrapper, StatusCode } from './common/dto/responce';
import { UserDto } from './user/dto/user.dto';
import { UserService } from './user/user.service';

@ApiTags('auth')
@Controller('auth')
export class AppController {

  constructor(private authService: AuthService,private userService:UserService){}

  @ApiBody({type:LoginDto})
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }


  //@UseGuards(LocalAuthGuard)
  
  @Post('SignUp/:Email/:Password/:FirstName/:ReferenceId')
  async SignUp(@Param() body:UserDto) {
    let res = new ResponseWrapper<any>();
    try{
      var d = await this.userService.SignUp(body);
      if(d){
        res.StatusCode = StatusCode.Success;
        res.Body = d;
        res.Message = "User Created Successfully";
      }else{
        res.StatusCode = StatusCode.Failed;
        res.Message = `#(${StatusCode.Failed}) User Altready Exist`;
      }
    }
    catch(e){
      res.StatusCode = StatusCode.Error;
      res.Message = `#(${StatusCode.Error}) Error: ${e}`;
    }
    return res;
  }


  
}