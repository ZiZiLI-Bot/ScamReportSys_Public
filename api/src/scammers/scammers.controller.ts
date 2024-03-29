import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../helpers/jwt-auth.guard';
import { Role, Roles } from '../helpers/roles.decorator';
import { RolesGuard } from '../helpers/roles.guard';
import { CreateScammerDto } from './dto/create-scammer.dto';
import { UpdateScammerDto } from './dto/update-scammer.dto';
import { ScammersService } from './scammers.service';
import { PaginationDto } from '../helpers/pagination.dto';

@ApiTags('Scammer V1')
@Controller({ version: '1', path: 'scammers' })
export class ScammersController {
  constructor(private readonly scammersService: ScammersService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post()
  create(@Body() createScammerDto: CreateScammerDto) {
    return this.scammersService.create(createScammerDto);
  }

  @Get()
  findAll(@Query() query: PaginationDto) {
    return this.scammersService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.scammersService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateScammerDto: UpdateScammerDto) {
    return this.scammersService.update(id, updateScammerDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.scammersService.remove(id);
  }
}
