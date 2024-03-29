import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PaginationDto } from '../helpers/pagination.dto';
import { AnalyticsReportsService } from './analytics_reports.service';

@ApiTags('Analytics Report V1')
@Controller({ version: '1', path: 'analytics-reports' })
export class AnalyticsReportsController {
  constructor(private readonly analyticsReportsService: AnalyticsReportsService) {}

  // @Post('fix')
  // fix() {
  //   return this.analyticsReportsService.fix();
  // }

  @Post('view_report/:report_id')
  updateOneView(@Param('report_id') id: string) {
    return this.analyticsReportsService.updateOneView(id);
  }

  @Get()
  findAll(@Query() queryProps: PaginationDto) {
    return this.analyticsReportsService.findAll(queryProps);
  }
}
