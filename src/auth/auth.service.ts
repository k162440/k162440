import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UserService,private jwtService: JwtService) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(username,password);
    if (user?._id?.toString()) {
      
      return user;
    }
    return null;
  }

  async login(user: any) {
    var payload = user;
    return {
      access_token: this.jwtService.sign({payload:payload}),
    };
  }
}