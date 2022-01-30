import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ContactDetailDto } from './dto/contact-detail.dto';
import { PersonalDetailDto } from './dto/personal-detail.dto';
import { UserDto } from './dto/user.dto';
import { UserAgent, UserAgentDocument } from './schemas/user-agents.schema';
import { User, UserDocument } from './schemas/user.schema';
// import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  
  constructor(
    // @InjectModel('User') private readonly userModel: Model<User>,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    @InjectModel(UserAgent.name) private readonly userAgentModel: Model<UserAgentDocument>,
  ){}


  async SignUp(body: UserDto) {

    let isExist:User =await this.userModel.findOne(
      {
        Email:body.Email,
        Password:body.Password
      }
    ).exec();

    if(isExist?._id?.toString()){
      return null
    }

    let ReferenceUser = await this.userModel.findOne({_id:body.ReferenceId});

    if(!ReferenceUser) throw 'ReferenceId not Found';

    


    const newUser = new this.userModel(body)
    
    // newUser.ReferenceId = ReferenceUser._id;\
    var userAgent = new this.userAgentModel();
    userAgent.UserId = newUser._id;
    userAgent.UserAgent = ReferenceUser._id;
     await userAgent.save();
    const result = await newUser.save();
    return result.id as string;
  }

  async updatePersonalDetail(body: PersonalDetailDto, _id: any) {
    let user = await this.userModel.findById(_id);
    if(user){
      user.FirstName = body.FirstName;
      user.LastName = body.LastName;
      user.Gender = body.Gender;
      user.DateOfBirth = body.DateOfBirth;
      user.save();
      return true;
    }else{
      return false;
    }

  }

  async updateContactDetail(body: ContactDetailDto, _id: any) {
    let user = await this.userModel.findById(_id);
    if(user){
      user.Address1 = body.Address1;
      user.Address2 = body.Address2;
      user.Country = body.Country;
      user.City = body.City;
      user.LandLineNumber = body.LandLineNumber;
      user.State = body.State;
      user.Code = body.Code;
      user.MobileNumber = body.MobileNumber;
      user.save();
      return true;
    }else{
      return false;
    }

  }


  async GetPorfile(userId: string) {
    var user:User = await this.userModel.findById(userId).select('-__v'); 
    return user;
  }

  async findOne(EmailAddress: string,Password: string):Promise<User> {
    var user:User = await this.userModel.findOne({Email:EmailAddress,Password:Password}).exec();
    if(user){
      let _user = new User();
      _user.Email = user.Email;
      _user.FirstName = user.FirstName;
      _user._id = user._id.toString();
      user = _user;
    }
    return user;
  }
}
