import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../helpers/jwt-auth.guard';
import { LocalAuthGuard } from '../helpers/local-auth.guard';
import { Role, Roles } from '../helpers/roles.decorator';
import { RolesGuard } from '../helpers/roles.guard';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { changePassDto } from './dto/change-pass.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { Request } from 'express';
import { LoginDto } from './dto/login.dto';

@ApiTags('Auth V1')
@Controller({ version: '1', path: 'auth' })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @ApiBearerAuth()
  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('/me')
  findMe(@Req() request: Request & { user: { email: string; _id: string; role: string } }) {
    return this.authService.findMe(request.user);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.User)
  @ApiBearerAuth()
  @Patch('/change-password/:id')
  update(@Param('id') id: string, @Body() updateAuthDto: changePassDto) {
    return this.authService.changePass(id, updateAuthDto);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  @ApiBearerAuth()
  @Patch(':id')
  updateRole(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(id, updateAuthDto);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(id);
  }
}
