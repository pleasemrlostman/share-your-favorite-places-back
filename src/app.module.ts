import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env['SERVER_HOST'], // Lightsail PostgreSQL 서버의 호스트
      port: parseInt(process.env['PORT_NUMBER']), // 기본 포트
      username: process.env['POSTGRESQL_USERNAME'], // PostgreSQL 사용자 이름
      password: process.env['POSTGRESQL_PASSWORD'], // PostgreSQL 비밀번호
      database: process.env['POSTGRESQL_DATABASE'], // 데이터베이스 이름
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
