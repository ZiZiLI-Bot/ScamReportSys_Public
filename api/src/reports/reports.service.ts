import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cache } from 'cache-manager';
import { Model } from 'mongoose';
import { HttpRes } from '../helpers/HttpRes.utils';
import { getFilterQuery } from '../helpers/get-filter-query.utils';
import { PaginationDto } from '../helpers/pagination.dto';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { Report } from './reports.schema';
import { AnalyticsReport } from '../analytics_reports/analytics_reports.schema';

@Injectable()
export class ReportsService {
  constructor(
    @InjectModel(Report.name) private ReportModel: Model<Report>,
    @InjectModel(AnalyticsReport.name) private AnalyticsReportModel: Model<AnalyticsReport>,
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
  ) {}
  async create(createReportDto: CreateReportDto) {
    try {
      const report = new this.ReportModel(createReportDto);
      const analyticsReport = new this.AnalyticsReportModel({ report: report._id });
      await analyticsReport.save();
      await this.cacheManager.reset();
      return HttpRes.success(await report.save());
    } catch (error) {
      throw new BadRequestException([error.message]);
    }
  }

  async findAll(query: PaginationDto) {
    const cacheKey = `reports:${JSON.stringify(query)}`;
    const { limit = 10, page = 1, sort = 'asc', sortBy = '_id' } = query;
    const filter = getFilterQuery(query);
    try {
      const cached = await this.cacheManager.get(cacheKey);
      if (cached) return cached;

      const reports = await this.ReportModel.find(filter)
        .sort(sort === 'asc' ? sortBy : `-${sortBy}`)
        .skip(limit * (page - 1))
        .limit(limit)
        .populate('userCreated')
        .lean()
        .exec();
      const total = await this.ReportModel.countDocuments(filter).lean().exec();
      const pagination: PaginationDto = {
        page,
        limit,
        sort,
        sortBy,
        total,
      };
      if (!reports) throw new NotFoundException(['Reports not found']);
      const response = HttpRes.success(reports, 200, pagination);
      await this.cacheManager.set(cacheKey, response);
      return response;
    } catch (error) {
      throw new BadRequestException([error.message]);
    }
  }

  async findOne(id: string) {
    try {
      // this.AnalyticsReportModel.findOneAndUpdate(
      //   { report: id },
      //   { $inc: { total_views: 1, views_day: 1, views_month: 1, views_week: 1, views_year: 1 } },
      // ).exec();
      const cacheKey = `report/${id}`;
      const cached = await this.cacheManager.get(cacheKey);
      if (cached) return cached;
      const report = await this.ReportModel.findById(id).populate('userCreated').exec();
      if (!report) throw new NotFoundException(['Report not found']);
      const response = HttpRes.success(report);
      await this.cacheManager.set(cacheKey, response);
      return response;
    } catch (error) {
      throw new BadRequestException([error.message]);
    }
  }

  async reportSearch(searchKey: string, query: PaginationDto) {
    const cacheKey = `reports/search/${searchKey}:${JSON.stringify(query)}`;
    const { limit = 10, page = 1, sort = 'asc', sortBy = '_id' } = query;
    const filter = getFilterQuery(query);
    try {
      const cached = await this.cacheManager.get(cacheKey);
      if (cached) return cached;
      const reports = await this.ReportModel.find({
        searchKey: { $regex: searchKey, $options: 'i' },
        ...filter,
      })
        .sort(sort === 'asc' ? sortBy : `-${sortBy}`)
        .skip(limit * (page - 1))
        .limit(limit)
        .populate('userCreated')
        .lean()
        .exec();

      const total = await this.ReportModel.countDocuments({
        searchKey: { $regex: searchKey, $options: 'i' },
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

      if (!reports) throw new NotFoundException(['Reports not found']);
      const response = HttpRes.success(reports, 200, pagination);
      await this.cacheManager.set(cacheKey, response);
      return response;
    } catch (error) {
      throw new BadRequestException([error.message]);
    }
  }

  async update(id: string, updateReportDto: UpdateReportDto) {
    try {
      const report = await this.ReportModel.findByIdAndUpdate(id, updateReportDto, { new: true }).exec();
      if (!report) throw new NotFoundException(['Report not found']);
      await this.cacheManager.reset();
      return HttpRes.success(report);
    } catch (error) {
      throw new BadRequestException([error.message]);
    }
  }

  async remove(id: string) {
    try {
      const report = await this.ReportModel.findByIdAndDelete(id).exec();
      if (!report) throw new NotFoundException(['Report not found']);
      await this.cacheManager.reset();
      return HttpRes.success(report);
    } catch (error) {
      throw new BadRequestException([error.message]);
    }
  }
}
