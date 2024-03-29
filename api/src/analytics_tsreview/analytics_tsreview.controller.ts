import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PaginationDto } from '../helpers/pagination.dto';
import { AnalyticsTSReviewService } from './analytics_tsreview.service';

@ApiTags('Analytics Transaction Review V1')
@Controller({ path: 'analytics-tsreview', version: '1' })
export class AnalyticsTSReviewController {
  constructor(private readonly analyticsTSReviewService: AnalyticsTSReviewService) {}

  @Get()
  findAll(@Query() queryProps: PaginationDto) {
    return this.analyticsTSReviewService.findAll(queryProps);
  }

  @Post(':id')
  update(@Param('id') id: string) {
    return this.analyticsTSReviewService.updateOneView(id);
  }
}
