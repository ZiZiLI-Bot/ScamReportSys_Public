import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { ServeStaticModule } from '@nestjs/serve-static';
import { redisStore } from 'cache-manager-redis-yet';
import { join } from 'path';
import { AnalyticsReportsModule } from './analytics_reports/analytics_reports.module';
import { AnalyticsTSReviewModule } from './analytics_tsreview/analytics_tsreview.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CronTasksModule } from './cron_tasks/cron_tasks.module';
import { ReportCommentsModule } from './report_comments/report_comments.module';
import { ReportsModule } from './reports/reports.module';
import { ScammersModule } from './scammers/scammers.module';
import { TsReviewModule } from './ts_review/ts_review.module';
import { UsersModule } from './users/users.module';
import { TsReviewRatingModule } from './ts_review_rating/ts_review_rating.module';

const cacheConfig = () => {
  if (process.env.NODE_ENV === 'development') {
    return CacheModule.register({
      isGlobal: true,
      ttl: 0,
    }); // local
  } else {
    return CacheModule.registerAsync({
      isGlobal: true,
      useFactory: async () => ({
        store: await redisStore({
          socket: {
            host: process.env.REDIS_NAME || 'localhost',
            port: parseInt(process.env.REDIS_PORT ?? '6379'),
          },
        }),
      }),
    });
  }
};

@Module({
  imports: [
    cacheConfig(),
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.DATABASE_URL || ''),
    ScheduleModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../', 'public/streams'),
      serveRoot: '/api/static/streams',
      serveStaticOptions: {
        setHeaders: (res) => {
          res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
        },
      },
    }),
    CronTasksModule,
    AuthModule,
    UsersModule,
    ReportsModule,
    ScammersModule,
    ReportCommentsModule,
    AnalyticsReportsModule,
    TsReviewModule,
    AnalyticsTSReviewModule,
    TsReviewRatingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
