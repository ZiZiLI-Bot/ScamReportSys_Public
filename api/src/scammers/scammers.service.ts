import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cache } from 'cache-manager';
import { Model } from 'mongoose';
import { HttpRes } from '../helpers/HttpRes.utils';
import { getFilterQuery } from '../helpers/get-filter-query.utils';
import { PaginationDto } from '../helpers/pagination.dto';
import { CreateScammerDto } from './dto/create-scammer.dto';
import { UpdateScammerDto } from './dto/update-scammer.dto';
import { Scammer } from './scammers.schema';

@Injectable()
export class ScammersService {
  constructor(
    @InjectModel(Scammer.name) private ScammerModel: Model<Scammer>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async create(createScammerDto: CreateScammerDto) {
    try {
      const createdScammer = new this.ScammerModel(createScammerDto);
      this.cacheManager.reset();
      return HttpRes.success(await createdScammer.save(), 201);
    } catch (error) {
      throw new BadRequestException([error.message]);
    }
  }

  async findAll(param: PaginationDto) {
    const { page = 1, limit = 10, sort = 'asc' } = param;
    const filter = getFilterQuery(param);
    try {
      const cacheKey = `scammers:${JSON.stringify(param)}`;
      const cached = await this.cacheManager.get(cacheKey);
      if (cached) return cached;

      const allScammers = await this.ScammerModel.find(filter)
        .sort(sort === 'asc' ? '_id' : '-_id')
        .skip(limit * (page - 1))
        .limit(limit)
        .populate('userCreated')
        .lean()
        .exec();
      if (!allScammers) throw new NotFoundException(['No scammers found']);
      const response = HttpRes.success(allScammers);
      await this.cacheManager.set(cacheKey, response);
      return response;
    } catch (error) {
      throw new BadRequestException([error.message]);
    }
  }

  async findOne(id: string) {
    try {
      const cacheKey = `scammer:${id}`;
      const cached = await this.cacheManager.get(cacheKey);
      if (cached) return cached;

      const foundScammer = await this.ScammerModel.findById(id).lean().exec();
      if (!foundScammer) throw new NotFoundException(['Scammer not found']);
      const response = HttpRes.success(foundScammer);
      await this.cacheManager.set(cacheKey, response);
      return response;
    } catch (error) {
      throw new BadRequestException([error.message]);
    }
  }

  async update(id: string, updateScammerDto: UpdateScammerDto) {
    try {
      const updateScammer = await this.ScammerModel.findByIdAndUpdate(id, updateScammerDto, { new: true }).exec();
      if (!updateScammer) throw new NotFoundException(['Scammer not found']);
      await this.cacheManager.reset();
      return HttpRes.success(updateScammer);
    } catch (error) {
      throw new BadRequestException([error.message]);
    }
  }

  async remove(id: string) {
    try {
      const deleteScammer = await this.ScammerModel.findByIdAndDelete(id).exec();
      if (!deleteScammer) throw new NotFoundException(['Scammer not found']);
      this.cacheManager.reset();
      return HttpRes.success(deleteScammer);
    } catch (error) {
      throw new BadRequestException([error.message]);
    }
  }
}
