import { Body, ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { AuthDto } from './dto';
import { hash, compare } from 'bcrypt';
import { Tokens } from './types';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepositroy: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signupLocal(@Body() dto: AuthDto): Promise<Tokens> {
    const hashPassword = await this.hashDataHelper(dto.password);

    const user = await this.userRepositroy.save({
      email: dto.email,
      password: hashPassword,
    });
    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRtHash(user.id, tokens.refresh_token);
    return tokens;
  }

  async signinLocal(@Body() dto: AuthDto): Promise<Tokens> {
    const find = await this.userRepositroy.findOneBy({
      email: dto.email,
    });
    if (!find) throw new ForbiddenException('Access Denied!');
    const comparePassword = await compare(dto.password, find.password);
    if (!comparePassword) throw new ForbiddenException('Access Denied!');
    // otherwise create tokens
    const tokens = await this.getTokens(find.id, find.email);
    await this.updateRtHash(find.id, tokens.refresh_token);
    return tokens;
  }

  async logout(id: number) {
    await this.userRepositroy.query(
      `UPDATE user SET hashedRt = ''  WHERE id = ${id} AND hashedRt IS NOT NULL`,
    );
  }
  async refreshToken(id: number, at: string) {
    const find = await this.userRepositroy.findOneBy({
      id: id,
    });
    if (!find || !find.hashedRt) throw new ForbiddenException('Access Denied!');
    const compareHash = await compare(at, String(find.hashedRt));
    if (!compareHash) throw new ForbiddenException('Access Denied!');
    // return new tokens
    const tokens = await this.getTokens(id, find.email);
    await this.updateRtHash(find.id, tokens.refresh_token);
    return tokens;
  }

  async updateRtHash(user_id: number, rt: string) {
    // store the hash of refresh token in database.
    const hash = await this.hashDataHelper(rt);
    await this.userRepositroy.update(
      {
        id: user_id,
      },
      {
        hashedRt: hash,
      },
    );
  }
  //utils functions
  hashDataHelper(data: string): Promise<string> {
    return hash(data, 10);
  }
  // info put in jwt
  async getTokens(user_id: number, email: string) {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: user_id,
          email,
        },
        {
          expiresIn: 60 * 15, // 15 minutes
          secret: 'at-secret',
        },
      ),
      this.jwtService.signAsync(
        {
          sub: user_id,
          email,
        },
        {
          expiresIn: 60 * 60 * 24 * 7, // 1 weak for refreshToken
          secret: 'rt-secret',
        },
      ),
    ]);
    return {
      access_token: at,
      refresh_token: rt,
    };
  }
}
