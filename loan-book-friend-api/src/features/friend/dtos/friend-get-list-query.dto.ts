import { PaginationQueryDto } from '@common/dtos';
import { ApiProperty } from '@nestjs/swagger';

export class FriendGetListQueryDto extends PaginationQueryDto {
    @ApiProperty({ required: false })
    name?: string;
}
