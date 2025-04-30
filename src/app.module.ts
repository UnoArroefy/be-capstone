import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DataModule } from './data/data.module';
import { AuthModule } from './auth/auth.module';
import { DbModule } from './db/db.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DataModule,
    AuthModule,
    DbModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
