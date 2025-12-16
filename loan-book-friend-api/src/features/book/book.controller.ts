import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiCookieAuth } from '@nestjs/swagger';
import { BookService } from '@book/services';
import { User } from '@security/metadata';
import { UserEntity } from '@user/models';
import { BookCreateFormDto, BookGetListQueryDto } from './dtos';
import { bookCreateFormDtoToBookEntity } from './mappers/to-book-entity.mappers';
import { RequireRoles } from '@security/guards';
import { ListApiResponseDto } from '@common/dtos';
import { BookListDto } from './dtos/book-list.dto';
import {
    bookEntityToBookListDto,
    bookEntityToBookListOwnedDto,
} from './mappers';
import { BookListOwnedDto } from './dtos/bookt-list-owned.dto';

@ApiCookieAuth('access_token')
@Controller('book')
export class BookController {
    constructor(private readonly bookService: BookService) {}

    @RequireRoles()
    @Post()
    async createBook(
        @User() requester: UserEntity,
        @Body() bookDto: BookCreateFormDto,
    ): Promise<void> {
        await this.bookService.createBook(
            requester,
            bookCreateFormDtoToBookEntity(bookDto),
        );
    }

    @RequireRoles()
    @Put(':id')
    async updateBook(
        @User() requester: UserEntity,
        @Param('id') id: string,
        @Body() bookDto: BookCreateFormDto,
    ): Promise<void> {
        await this.bookService.updateBook(
            requester,
            id,
            bookCreateFormDtoToBookEntity(bookDto),
        );
    }

    @Get()
    async getBooks(
        @Query() query: BookGetListQueryDto,
    ): Promise<ListApiResponseDto<BookListDto>> {
        const { total, books } = await this.bookService.getBooks(query);

        return {
            total,
            data: books.map(bookEntityToBookListDto),
        };
    }

    @RequireRoles()
    @Get('owned')
    async getOwnedBooks(
        @User() requester: UserEntity,
        @Query() query: BookGetListQueryDto,
    ): Promise<ListApiResponseDto<BookListOwnedDto>> {
        const { total, books } = await this.bookService.getBooksOwnedBy(
            query,
            requester.userId,
        );

        return {
            total,
            data: books.map(bookEntityToBookListOwnedDto),
        };
    }
}
