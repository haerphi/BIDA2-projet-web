import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiCookieAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { BookService } from './services';
import {
    bookCreateDtoToEntity,
    toBookListDto,
    toBookUserListDto,
} from './mappers';
import { RequireRoles } from '@security/guards';
import { User } from '@security/metadata';
import { UserEntity } from '@user/models';
import { BookCreateDto } from './dtos';
import {
    CreateBookApiOperationDocumentation,
    CreateBookApiResponseDocumentation,
    GetBooksApiOperationDocumentation,
    GetBooksApiResponseDocumentation,
    GetOwnedBooksApiOperationDocumentation,
    GetOwnedBooksApiResponseDocumentation,
} from './book.swagger';

@ApiCookieAuth('access_token')
@Controller('book')
export class BookController {
    constructor(private readonly bookService: BookService) {}

    @ApiOperation(GetOwnedBooksApiOperationDocumentation)
    @ApiResponse(GetOwnedBooksApiResponseDocumentation)
    @RequireRoles()
    @Get('owned')
    public async getAllBooksByOwner(@User() user: UserEntity) {
        const books = await this.bookService.findAllByOwnerId(user.user_id);
        return books.map(toBookUserListDto);
    }

    @ApiOperation(GetBooksApiOperationDocumentation)
    @ApiResponse(GetBooksApiResponseDocumentation)
    @Get()
    public async getAllBooks() {
        const books = await this.bookService.findAll();
        return books.map(toBookListDto);
    }

    @ApiOperation(CreateBookApiOperationDocumentation)
    @ApiResponse(CreateBookApiResponseDocumentation)
    @RequireRoles()
    @Post()
    public async createBook(
        @User() user: UserEntity,
        @Body() book: BookCreateDto,
    ) {
        const createdBook = await this.bookService.create(
            bookCreateDtoToEntity(book, user),
        );
        return toBookUserListDto(createdBook);
    }
}
