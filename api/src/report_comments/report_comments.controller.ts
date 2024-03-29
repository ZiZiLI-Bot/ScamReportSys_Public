import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Role, Roles } from '../helpers/roles.decorator';
import { RolesGuard } from '../helpers/roles.guard';
import { JwtAuthGuard } from '../helpers/jwt-auth.guard';
import { CreateReportCommentDto } from './dto/create-report_comment.dto';
import { UpdateReportCommentDto } from './dto/update-report_comment.dto';
import { ReportCommentsService } from './report_comments.service';
import { PaginationDto } from '../helpers/pagination.dto';

@ApiTags('Report Comments V1')
@Controller({ version: '1', path: 'report_comments' })
export class ReportCommentsController {
  constructor(private readonly reportCommentsService: ReportCommentsService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post()
  create(@Body() createReportCommentDto: CreateReportCommentDto) {
    return this.reportCommentsService.create(createReportCommentDto);
  }

  @Get()
  findAll(@Query() query: PaginationDto) {
    return this.reportCommentsService.findAll(query);
  }

  // @Get('report/:id')
  // findAllByReport(@Param('id') id: string, @Query() query: PaginationDto) {
  //   return this.reportCommentsService.findAllByReport(id, query);
  // }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reportCommentsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReportCommentDto: UpdateReportCommentDto) {
    return this.reportCommentsService.update(id, updateReportCommentDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reportCommentsService.remove(id);
  }
}
