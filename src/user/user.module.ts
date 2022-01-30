import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { UserAgent, UserAgentSchema } from './schemas/user-agents.schema';
// import { UserSchema } from './entities/user.entity';

@Module({
  imports:[
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: UserAgent.name, schema: UserAgentSchema }
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports:[UserService]
})
export class UserModule {}
