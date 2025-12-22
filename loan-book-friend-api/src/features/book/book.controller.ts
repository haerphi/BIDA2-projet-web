import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import {
    ApiCookieAuth,
    ApiOperation,
    ApiParam,
    ApiResponse,
} from '@nestjs/swagger';
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
import { BookListOwnedDto } from './dtos/book-list-owned.dto';
import { BookDetailsDto } from '@book/dtos/book-details.dto';
import { bookEntityToBookDetailsDto } from '@book/mappers/to-book-details-dto.mappers';
import * as Doc from './book.swagger';

@ApiCookieAuth('access_token')
@Controller('book')
export class BookController {
    constructor(private readonly bookService: BookService) {}

    @RequireRoles()
    @Post()
    @ApiOperation(Doc.CreateBookOperation)
    @ApiResponse(Doc.CreateBookResponse)
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
    @ApiOperation(Doc.UpdateBookOperation)
    @ApiParam(Doc.UpdateBookParam)
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
    @ApiOperation(Doc.GetBooksOperation)
    @ApiResponse(Doc.GetBooksResponse)
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
    @ApiOperation(Doc.GetOwnedBooksOperation)
    @ApiResponse(Doc.GetOwnedBooksResponse)
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

    @RequireRoles()
    @Get(':id')
    @ApiOperation(Doc.GetBookByIdOperation)
    @ApiParam(Doc.UpdateBookParam)
    @ApiResponse(Doc.GetBookByIdResponse)
    async getBookById(
        @User() requester: UserEntity,
        @Param('id') id: string,
    ): Promise<BookDetailsDto> {
        const book = await this.bookService.getBookDetailsById(id, requester);
        return bookEntityToBookDetailsDto(book);
    }
}
