import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../helpers/jwt-auth.guard';
import { PaginationDto } from '../helpers/pagination.dto';
import { Role, Roles } from '../helpers/roles.decorator';
import { RolesGuard } from '../helpers/roles.guard';
import { CreateTsReviewRatingDto } from './dto/create-ts_review_rating.dto';
import { UpdateTsReviewRatingDto } from './dto/update-ts_review_rating.dto';
import { TsReviewRatingService } from './ts_review_rating.service';

@ApiTags('Transaction Review Rating V1')
@Controller({ version: '1', path: 'tsreview-rating' })
export class TsReviewRatingController {
  constructor(private readonly tsReviewRatingService: TsReviewRatingService) {}

  @Post()
  create(@Body() createTsReviewRatingDto: CreateTsReviewRatingDto) {
    return this.tsReviewRatingService.create(createTsReviewRatingDto);
  }

  @Get()
  findAll(@Query() query: PaginationDto) {
    return this.tsReviewRatingService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tsReviewRatingService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @ApiBearerAuth()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTsReviewRatingDto: UpdateTsReviewRatingDto) {
    return this.tsReviewRatingService.update(id, updateTsReviewRatingDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tsReviewRatingService.remove(id);
  }
}
