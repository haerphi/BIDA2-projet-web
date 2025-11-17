import { PaginationQueryDto } from '@common/dtos';
import { ObjectLiteral, SelectQueryBuilder } from 'typeorm';

export function executePagination<T extends ObjectLiteral>(
    query: SelectQueryBuilder<T>,
    pagination: PaginationQueryDto,
): [Promise<number>, Promise<T[]>] {
    const queryCopy = new SelectQueryBuilder(query);
    const total = queryCopy.getCount();

    if (pagination.page !== undefined && pagination.limit !== undefined) {
        query = query
            .skip((pagination.page - 1) * pagination.limit)
            .take(pagination.limit);
    }

    if (pagination.orderBy) {
        const orderDirection = pagination.orderDirection || 'ASC';
        query = query.orderBy(
            `${query.alias}.${pagination.orderBy}`,
            orderDirection,
        );
    }

    return [total, query.getMany()];
}
