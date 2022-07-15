import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { AuthController } from './auth.cotroller';
import { AuthService } from './auth.service';
import { ATStrategy, RTStrategy } from './strategies';

@Module({
  controllers: [AuthController],
  providers: [AuthService, ATStrategy, RTStrategy],
  imports: [TypeOrmModule.forFeature([User]), JwtModule.register({})],
})
export class AuthModule {}
