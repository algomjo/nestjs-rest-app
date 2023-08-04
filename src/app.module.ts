/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';
import { UserAvatarSchema } from './schemas/user-avatar.schema';
import { UserMappingSchema } from './schemas/user-mapping.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1/nestjs-rest-app'),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'UserAvatar', schema: UserAvatarSchema }]),
    MongooseModule.forFeature([{ name: 'UserMapping', schema: UserMappingSchema }])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
