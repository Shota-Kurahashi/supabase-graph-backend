import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt } from 'passport-jwt';
import { SupabaseAuthStrategy } from 'nestjs-supabase-auth';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SupabaseStrategy extends PassportStrategy(
  SupabaseAuthStrategy,
  'supabase',
) {
  public constructor(
    private readonly config: ConfigService,
    private readonly prisma: PrismaService,
  ) {
    super({
      supabaseUrl: config.get('SUPABASE_URL'),
      supabaseKey: config.get('SUPABASE_ANON_KEY'),
      supabaseOptions: {},
      supabaseJwtSecret: config.get('JWT_SCRET'),
      extractor: ExtractJwt.fromExtractors([
        (req) => {
          let jwt = null;
          //cookieを使う場合
          if (req && req.headers['authorization']) {
            jwt = req.headers['authorization'];
          }
          return jwt;
        },
      ]),
    });
  }

  async validate(payload: any): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: payload.id,
      },
    });

    delete user.createdAt;
    delete user.updatedAt;
    return user;
  }
}
