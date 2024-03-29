import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cache } from 'cache-manager';
import { Model } from 'mongoose';
import { HttpRes } from '../helpers/HttpRes.utils';
import { getFilterQuery } from '../helpers/get-filter-query.utils';
import { PaginationDto } from '../helpers/pagination.dto';
import { TSReview } from '../ts_review/ts_review.schema';
import { CreateTsReviewRatingDto } from './dto/create-ts_review_rating.dto';
import { UpdateTsReviewRatingDto } from './dto/update-ts_review_rating.dto';
import { TSReviewRating } from './ts_review_rating.schema';

@Injectable()
export class TsReviewRatingService {
  constructor(
    @InjectModel(TSReviewRating.name) private TSReviewRatingModel: Model<TSReviewRating>,
    @InjectModel(TSReview.name) private TSReviewModel: Model<TSReview>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async create(createTsReviewRatingDto: CreateTsReviewRatingDto) {
    try {
      const tsReviewRating = new this.TSReviewRatingModel(createTsReviewRatingDto);
      const TSReview = await this.TSReviewModel.findById(createTsReviewRatingDto.TSReviewId);
      if (!TSReview) throw new NotFoundException(['TSReview not found']);
      TSReview.AV_rating =
        (TSReview.AV_rating * TSReview.count_rating + createTsReviewRatingDto.rating) / (TSReview.count_rating + 1);
      TSReview.count_rating += 1;
      await TSReview.save();
      await this.cacheManager.reset();
      return HttpRes.success(await tsReviewRating.save());
    } catch (err) {
      throw new BadRequestException(`Error: ${err.message}`);
    }
  }

  async findAll(param: PaginationDto) {
    const cacheKey = `tsReviewRating:${JSON.stringify(param)}`;
    const { page = 1, limit = 10, sort = 'asc', sortBy = '_id' } = param;
    const filter = getFilterQuery(param);
    try {
      const cached = await this.cacheManager.get(cacheKey);
      if (cached) return cached;

      const tsReviewRating = await this.TSReviewRatingModel.find(filter)
        .sort(sort === 'asc' ? sortBy : `-${sortBy}`)
        .skip(limit * (page - 1))
        .limit(limit)
        .populate('TSReviewId')
        .lean()
        .exec();
      if (!tsReviewRating) throw new NotFoundException(['Ts Review Rating not found']);
      const total = await this.TSReviewRatingModel.countDocuments(filter).lean().exec();
      const response = HttpRes.success(tsReviewRating, 200, { page, limit, sort, sortBy, total });
      await this.cacheManager.set(cacheKey, response);
      return response;
    } catch (err) {
      throw new BadRequestException(`Error: ${err.message}`);
    }
  }

  async findOne(id: string) {
    const cacheKey = `tsReviewRating:${id}`;
    try {
      const cached = await this.cacheManager.get(cacheKey);
      if (cached) return cached;

      const tsReviewRating = await this.TSReviewRatingModel.findById(id).populate('TSReviewId').lean().exec();
      if (!tsReviewRating) throw new NotFoundException(['Ts Review Rating not found']);
      const response = HttpRes.success(tsReviewRating);
      await this.cacheManager.set(cacheKey, response);
      return response;
    } catch (err) {
      throw new BadRequestException(`Error: ${err.message}`);
    }
  }

  async update(id: string, updateTsReviewRatingDto: UpdateTsReviewRatingDto) {
    try {
      const tsReviewRating = await this.TSReviewRatingModel.findByIdAndUpdate(id, updateTsReviewRatingDto, {
        new: true,
      }).exec();
      if (!tsReviewRating) throw new NotFoundException(['Ts Review Rating not found']);
      await this.cacheManager.reset();
      return HttpRes.success(tsReviewRating);
    } catch (err) {
      throw new BadRequestException(`Error: ${err.message}`);
    }
  }

  async remove(id: string) {
    try {
      const tsReviewRating = await this.TSReviewRatingModel.findByIdAndDelete(id).exec();
      if (!tsReviewRating) throw new NotFoundException(['Ts Review Rating not found']);
      await this.cacheManager.reset();
      return HttpRes.success(tsReviewRating);
    } catch (err) {
      throw new BadRequestException(`Error: ${err.message}`);
    }
  }
}
