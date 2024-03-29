import { Module } from '@nestjs/common';
import { ReportCommentsService } from './report_comments.service';
import { ReportCommentsController } from './report_comments.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ReportComments, ReportCommentsSchema } from './report_comments.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: ReportComments.name, schema: ReportCommentsSchema }])],
  controllers: [ReportCommentsController],
  providers: [ReportCommentsService],
})
export class ReportCommentsModule {}
