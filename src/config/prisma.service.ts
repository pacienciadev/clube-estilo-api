import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { withOptimize } from '@prisma/extension-optimize';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  private prisma: PrismaClient;

  constructor() {
    super();
    this.prisma = new PrismaClient().$extends(
      withOptimize({
        apiKey: process.env.OPTIMIZE_API_KEY!,
      }),
    );
  }

  async onModuleInit() {
    await this.prisma.$connect();
  }
}