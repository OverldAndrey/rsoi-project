import { Injectable } from '@nestjs/common';
import {Repository} from "typeorm";
import {Statistic} from "../../entities/statistic";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class StatisticsService {
    constructor(
        @InjectRepository(Statistic) private readonly statsRepository: Repository<Statistic>
    ) {}

    public getStatistics(service: string, dateFrom?: Date, dateTo?: Date) {
        let query = this.statsRepository.createQueryBuilder('st');

        query = query.where(`st.service = '${service}'`);

        if (dateFrom) {
            // query = query.andWhere(`st.timestamp >= ${dateFrom.toISOString()}`);
            query = query.andWhere('st.timestamp >= :df', { df: dateFrom });
        }

        if (dateTo) {
            // query = query.andWhere(`st.timestamp <= ${dateTo.toISOString()}`);
            query = query.andWhere('st.timestamp <= :dt', { dt: dateTo });
        }

        console.log(query.getQuery());

        return query.getMany();
    }

    public addStatistic(statistic: Partial<Statistic>) {
        return this.statsRepository.insert(statistic);
    }
}
