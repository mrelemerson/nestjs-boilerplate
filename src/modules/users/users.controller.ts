import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { JwtAuthGuard } from '../authentication/guards';
import { CriteriaDto, IdDto } from '../shared/dto';
import { JoiValidationPipe } from '../shared/pipes';
import { CriteriaSchema, IdSchema } from '../shared/schemas';
import { CreateUserDto, UpdateUserDto } from './dto';
import { CreateUserSchema, UpdateUserSchema } from './schemas';
import { UsersService } from './users.service';
import { TraceInterceptor } from '~/providers/trace/trace.interceptor';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async create(
    @Param(new JoiValidationPipe(IdSchema))
    idDto: IdDto,
    @Body(new JoiValidationPipe(CreateUserSchema))
    createUserDto: Omit<CreateUserDto, 'id'>,
  ) {
    await this.usersService.create({ ...idDto, ...createUserDto });
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @UseInterceptors(TraceInterceptor)
  async getById(
    @Param(new JoiValidationPipe(IdSchema))
    idDto: IdDto,
  ) {
    return this.usersService.getById(idDto.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('criteria')
  findByCriteria(
    @Body(new JoiValidationPipe(CriteriaSchema)) criteriaDto: CriteriaDto,
  ) {
    return this.usersService.findByCriteria(criteriaDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async update(
    @Param(new JoiValidationPipe(IdSchema))
    idDto: IdDto,
    @Body(new JoiValidationPipe(UpdateUserSchema))
    updateUserDto: UpdateUserDto,
  ) {
    await this.usersService.update(idDto.id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(
    @Param(new JoiValidationPipe(IdSchema))
    idDto: IdDto,
  ) {
    return this.usersService.remove(idDto.id);
  }
}
