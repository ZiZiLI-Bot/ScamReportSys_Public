import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { TSReviewService } from './ts_review.service';
import { CreateTsReviewDto } from './dto/create-ts_review.dto';
import { UpdateTsReviewDto } from './dto/update-ts_review.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../helpers/jwt-auth.guard';
import { Role, Roles } from '../helpers/roles.decorator';
import { PaginationDto } from '../helpers/pagination.dto';

@ApiTags('Transaction Review V1')
@Controller({ path: 'ts_review', version: '1' })
export class TSReviewController {
  constructor(private readonly tsReviewService: TSReviewService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post()
  create(@Body() createTsReviewDto: CreateTsReviewDto) {
    return this.tsReviewService.create(createTsReviewDto);
  }

  @Get()
  findAll(@Query() queryProps: PaginationDto) {
    return this.tsReviewService.findAll(queryProps);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tsReviewService.findOne(id);
  }

  @Get('search/:search')
  search(@Param('search') search: string, @Query() queryProps: PaginationDto) {
    return this.tsReviewService.TSReviewSearch(search, queryProps);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Roles(Role.Admin)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTsReviewDto: UpdateTsReviewDto) {
    return this.tsReviewService.update(id, updateTsReviewDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Roles(Role.Admin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tsReviewService.remove(id);
  }
}
