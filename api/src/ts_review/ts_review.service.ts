import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cache } from 'cache-manager';
import { Model } from 'mongoose';
import { GA_TSReview } from '../analytics_tsreview/analytics_tsreview.schema';
import { CreateTsReviewDto } from './dto/create-ts_review.dto';
import { UpdateTsReviewDto } from './dto/update-ts_review.dto';
import { TSReview } from './ts_review.schema';
import { HttpRes } from '../helpers/HttpRes.utils';
import { PaginationDto } from '../helpers/pagination.dto';
import { getFilterQuery } from '../helpers/get-filter-query.utils';

@Injectable()
export class TSReviewService {
  constructor(
    @InjectModel(TSReview.name) private TSReviewModel: Model<TSReview>,
    @InjectModel(GA_TSReview.name) private TSReviewCommentsModel: Model<GA_TSReview>,
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
  ) {}

  async create(createTsReviewDto: CreateTsReviewDto) {
    try {
      const tsReview = new this.TSReviewModel(createTsReviewDto);
      const gaTsReview = new this.TSReviewCommentsModel({ TSReview: tsReview._id });
      await gaTsReview.save();
      await this.cacheManager.reset();
      return HttpRes.success(await tsReview.save());
    } catch (err) {
      throw new BadRequestException([err.message]);
    }
  }

  async findAll(query: PaginationDto) {
    const cacheKey = `tsReview:${JSON.stringify(query)}`;
    const { limit = 10, page = 1, sort = 'asc', sortBy = '_id' } = query;
    const filter = getFilterQuery(query);
    try {
      const cached = await this.cacheManager.get(cacheKey);
      if (cached) return cached;

      const tsReview = await this.TSReviewModel.find(filter)
        .sort(sort === 'asc' ? sortBy : `-${sortBy}`)
        .skip(limit * (page - 1))
        .populate('userCreated')
        .limit(limit)
        .lean()
        .exec();
      const total = await this.TSReviewModel.countDocuments().lean().exec();
      const pagination: PaginationDto = {
        page,
        limit,
        sort,
        sortBy,
        total,
      };
      if (!tsReview) throw new NotFoundException(['TSReview not found']);
      const response = HttpRes.success(tsReview, 200, pagination);
      await this.cacheManager.set(cacheKey, response);
      return response;
    } catch (err) {
      throw new BadRequestException([err.message]);
    }
  }

  async findOne(id: string) {
    const cacheKey = `tsReview:${id}`;
    try {
      const cached = await this.cacheManager.get(cacheKey);
      if (cached) return cached;

      const tsReview = await this.TSReviewModel.findById(id).populate('userCreated').lean().exec();
      if (!tsReview) throw new NotFoundException(['TSReview not found']);
      const response = HttpRes.success(tsReview);
      await this.cacheManager.set(cacheKey, response);
      return response;
    } catch (err) {
      throw new BadRequestException([err.message]);
    }
  }

  async TSReviewSearch(searchKey: string, query: PaginationDto) {
    const cacheKey = `tsreviewSearch/search/${searchKey}:${JSON.stringify(query)}`;
    const { limit = 10, page = 1, sort = 'asc', sortBy = '_id' } = query;
    const filter = getFilterQuery(query);
    try {
      const cached = await this.cacheManager.get(cacheKey);
      if (cached) return cached;

      const tsReview = await this.TSReviewModel.find({
        search_key: { $regex: searchKey, $options: 'i' },
        ...filter,
      })
        .sort(sort === 'asc' ? sortBy : `-${sortBy}`)
        .skip(limit * (page - 1))
        .limit(limit)
        .lean()
        .exec();

      const total = await this.TSReviewModel.countDocuments({
        search_key: { $regex: searchKey, $options: 'i' },
        ...filter,
      })
        .lean()
        .exec();

      const pagination: PaginationDto = {
        page,
        limit,
        sort,
        sortBy,
        total,
      };
      const response = HttpRes.success(tsReview, 200, pagination);
      await this.cacheManager.set(cacheKey, response);
      return response;
    } catch (err) {
      throw new BadRequestException([err.message]);
    }
  }

  async update(id: string, updateTsReviewDto: UpdateTsReviewDto) {
    try {
      const tsReview = await this.TSReviewModel.findByIdAndUpdate(id, updateTsReviewDto, { new: true });
      if (!tsReview) throw new NotFoundException(['TSReview not found']);
      await this.cacheManager.reset();
      return HttpRes.success(tsReview);
    } catch (err) {
      throw new BadRequestException([err.message]);
    }
  }

  async remove(id: string) {
    try {
      const tsReview = await this.TSReviewModel.findByIdAndDelete(id).exec();
      if (!tsReview) throw new NotFoundException(['TSReview not found']);
      await this.cacheManager.reset();
      return HttpRes.success(tsReview);
    } catch (error) {
      throw new BadRequestException([error.message]);
    }
  }
}
