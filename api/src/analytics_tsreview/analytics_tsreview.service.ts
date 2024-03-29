import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HttpRes } from '../helpers/HttpRes.utils';
import { getFilterQuery } from '../helpers/get-filter-query.utils';
import { PaginationDto } from '../helpers/pagination.dto';
import { GA_TSReview } from './analytics_tsreview.schema';

@Injectable()
export class AnalyticsTSReviewService {
  constructor(@InjectModel(GA_TSReview.name) private AnalyticsTSReviewModel: Model<GA_TSReview>) {}
  async findAll(query: PaginationDto) {
    const { limit = 10, page = 1, sort = 'asc', sortBy = '_id' } = query;
    const filter = getFilterQuery(query);
    try {
      const analyticsTSReview = await this.AnalyticsTSReviewModel.find(filter)
        .sort(sort === 'asc' ? sortBy : `-${sortBy}`)
        .skip((page - 1) * limit)
        .limit(limit)
        .populate('TSReview')
        .lean()
        .exec();

      const total = await this.AnalyticsTSReviewModel.countDocuments(filter).exec();
      const pagination: PaginationDto = {
        page,
        limit,
        sort,
        sortBy,
        total,
      };
      return HttpRes.success(analyticsTSReview, 200, pagination);
    } catch (err) {
      throw err;
    }
  }

  async updateOneView(id: string) {
    try {
      const analyticsTSReview = await this.AnalyticsTSReviewModel.findOne({ TSReview: id });
      if (!analyticsTSReview) {
        throw new Error('Analytics TSReview not found');
      }
      analyticsTSReview.total_views += 1;
      analyticsTSReview.views_day += 1;
      analyticsTSReview.views_week += 1;
      analyticsTSReview.views_month += 1;
      analyticsTSReview.views_year += 1;
      return HttpRes.success(await analyticsTSReview.save());
    } catch (err) {
      throw err;
    }
  }
}
