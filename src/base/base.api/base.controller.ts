import { ForbiddenException, Patch, UseFilters, UseGuards } from '@nestjs/common';
import { HttpCode } from '@nestjs/common';
import { Get, Post, Body, Param, Delete } from '@nestjs/common';
import { HttpExceptionFilter } from 'src/common/filters/http-exception.filter';
import { LocalAuthGuard } from 'src/routes/auth/local-auth.guard';
import { BaseService } from './base.service';

export class BaseController<Base> {
  constructor(private readonly baseService: BaseService<Base>) { }

  @Post()
  @HttpCode(201)
  @UseFilters(new HttpExceptionFilter())
  create(@Body() createDto: any) {
    try {
      return this.baseService.create(createDto);
    } catch (err) {
      throw new ForbiddenException();
    }
  }

  // @UseGuards(LocalAuthGuard)
  @Get()
  @HttpCode(200)
  @UseFilters(new HttpExceptionFilter())
  async get() {
    try {
      const data = await this.baseService.get();
      return data;
    } catch (err) {
      throw new ForbiddenException();
    }
  }

  @Get(':id')
  @HttpCode(200)
  @UseFilters(new HttpExceptionFilter())
  async find(@Param('id') id: string) {
    try {
      return this.baseService.find(id);
    } catch (err) {
      throw new ForbiddenException();
    }
  }

  @Patch()
  @HttpCode(200)
  @UseFilters(new HttpExceptionFilter())
  async update(@Body() updateDto: any) {
    try {
      return this.baseService.update(updateDto);
    } catch (err) {
      throw new ForbiddenException();
    }
  }

  @Delete(':id')
  @HttpCode(200)
  @UseFilters(new HttpExceptionFilter())
  async remove(@Param('id') id: string) {
    try {
      return this.baseService.remove(id);
    } catch (err) {
      throw new ForbiddenException();
    }
  }

  @Delete()
  @HttpCode(200)
  @UseFilters(new HttpExceptionFilter())
  async removeList(@Body() ids: string[]) {
    try {
      return this.baseService.removeList(ids);
    } catch (err) {
      throw new ForbiddenException();
    }
  }
}
