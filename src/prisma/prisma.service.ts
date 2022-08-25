import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(private readonly config: ConfigService) {
    super({
      datasources: {
        db: {
          url: 'postgresql://postgres:h4s!duKCfJ@6DCQ@db.upijagvouezcvknhhrkh.supabase.co:5432/postgres',
        },
      },
    });
  }
}
