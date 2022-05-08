import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../../common/middleware/jwt/constants';
import { AuthController } from './auth.controller';
import { JwtStrategy } from 'src/common/middleware/jwt/jwt.strategy';

@Module({
  imports: [
    // PassportModule,
    // UserModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule {
  
}
