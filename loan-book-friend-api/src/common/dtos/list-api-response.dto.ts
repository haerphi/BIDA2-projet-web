import { ApiProperty } from '@nestjs/swagger';

export class ListApiResponseDto<T> {
    @ApiProperty({
        isArray: true,
    })
    data: T[];

    @ApiProperty()
    total: number;
}
