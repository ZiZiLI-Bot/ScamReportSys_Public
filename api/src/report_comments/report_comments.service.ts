import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cache } from 'cache-manager';
import { Model } from 'mongoose';
import { getFilterQuery } from '../helpers/get-filter-query.utils';
import { HttpRes } from '../helpers/HttpRes.utils';
import { PaginationDto } from '../helpers/pagination.dto';
import { CreateReportCommentDto } from './dto/create-report_comment.dto';
import { UpdateReportCommentDto } from './dto/update-report_comment.dto';
import { ReportComments } from './report_comments.schema';

@Injectable()
export class ReportCommentsService {
  constructor(
    @InjectModel(ReportComments.name) private ReportCommentsModel: Model<ReportComments>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}
  async create(createReportCommentDto: CreateReportCommentDto) {
    try {
      const reportComment = new this.ReportCommentsModel(createReportCommentDto);
      await this.cacheManager.reset();
      return HttpRes.success(await reportComment.save());
    } catch (error) {
      throw new BadRequestException([error.message]);
    }
  }

  async findAll(param: PaginationDto) {
    const { page = 1, limit = 10, sort = 'asc', sortBy = '_id' } = param;
    const filter = getFilterQuery(param);
    try {
      const cacheKey = `reportComments:${JSON.stringify(param)}`;
      const cached = await this.cacheManager.get(cacheKey);
      if (cached) return cached;

      const reportComments = await this.ReportCommentsModel.find(filter)
        .sort(sort === 'asc' ? sortBy : `-${sortBy}`)
        .skip(limit * (page - 1))
        .limit(limit)
        .populate('user')
        .lean()
        .exec();

      const total = await this.ReportCommentsModel.countDocuments(filter).lean().exec();
      if (!reportComments) throw new NotFoundException(['Report Comments not found']);
      const response = HttpRes.success(reportComments, 200, { page, limit, sort, sortBy, total });
      await this.cacheManager.set(cacheKey, response);
      return response;
    } catch (error) {
      throw new BadRequestException([error.message]);
    }
  }

  async findOne(id: string) {
    try {
      const cacheKey = `reportComment:${id}`;
      const cached = await this.cacheManager.get(cacheKey);
      if (cached) return cached;

      const reportComment = await this.ReportCommentsModel.findById(id).exec();
      if (!reportComment) throw new NotFoundException(['Report Comment not found']);
      const response = HttpRes.success(reportComment);
      await this.cacheManager.set(cacheKey, response);
      return response;
    } catch (error) {
      throw new BadRequestException([error.message]);
    }
  }

  async update(id: string, updateReportCommentDto: UpdateReportCommentDto) {
    try {
      const comment = this.ReportCommentsModel.findByIdAndUpdate(id, updateReportCommentDto, { new: true }).exec();
      if (!comment) throw new NotFoundException(['Report Comment not found']);
      await this.cacheManager.reset();
      return HttpRes.success(comment);
    } catch (error) {
      throw new BadRequestException([error.message]);
    }
  }

  async remove(id: string) {
    try {
      const comment = await this.ReportCommentsModel.findByIdAndDelete(id).exec();
      if (!comment) throw new NotFoundException(['Report Comment not found']);
      await this.cacheManager.reset();
      return HttpRes.success(comment);
    } catch (error) {
      throw new BadRequestException([error.message]);
    }
  }
}
