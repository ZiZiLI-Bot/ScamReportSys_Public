import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AnalyticsReport } from './analytics_reports.schema';
import { HttpRes } from '../helpers/HttpRes.utils';
import { PaginationDto } from '../helpers/pagination.dto';
import { getFilterQuery } from '../helpers/get-filter-query.utils';
import { Report } from '../reports/reports.schema';

@Injectable()
export class AnalyticsReportsService {
  constructor(
    @InjectModel(AnalyticsReport.name) private AnalyticsReportModel: Model<AnalyticsReport>,
    @InjectModel(Report.name) private ReportModel: Model<Report>,
  ) {}

  async fix() {
    const listReports = await this.ReportModel.find();
    listReports.forEach(async (report) => {
      const analyticsReport = new this.AnalyticsReportModel({ report: report._id });
      await analyticsReport.save();
    });
  }

  async updateOneView(report_id: string) {
    const analyticsReport = await this.AnalyticsReportModel.findOne({ report: report_id });
    if (!analyticsReport) throw new NotFoundException(['Analytics Report not found']);
    analyticsReport.total_views += 1;
    analyticsReport.views_day += 1;
    analyticsReport.views_week += 1;
    analyticsReport.views_month += 1;
    analyticsReport.views_year += 1;
    return HttpRes.success(await analyticsReport.save());
  }

  async findAll(query: PaginationDto) {
    const { limit = 10, page = 1, sort = 'asc', sortBy = '_id' } = query;
    const filter = getFilterQuery(query);

    const analyticsReports = await this.AnalyticsReportModel.find(filter)
      .sort(sort === 'asc' ? sortBy : `-${sortBy}`)
      .populate({ path: 'report', strictPopulate: false, match: { status: 'approved', hidden: false } })
      .lean()
      .then((docs) => docs.filter((doc) => doc.report !== null));

    const total = analyticsReports.length;

    const limitOffsetArray = analyticsReports.slice((page - 1) * limit, page * limit);

    const pagination: PaginationDto = {
      page,
      limit,
      sort,
      sortBy,
      total,
    };
    return HttpRes.success(limitOffsetArray, 200, pagination);
  }
}
