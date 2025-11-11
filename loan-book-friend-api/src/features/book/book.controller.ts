import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiCookieAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { BookService } from './services';
import {
    bookCreateDtoToEntity,
    toBookListDto,
    toBookUserListDto,
} from './mappers';
import { RequireRoles } from '../security/guards';
import { User } from '../security/metadata';
import { UserEntity } from '../user/models';
import { BookCreateDto } from './dtos';
import {
    CreateBookApiOperationDocumentation,
    CreateBookApiResponseDocumentation,
    DeleteBookApiOperationDocumentation,
    DeleteBookApiResponseDocumentation,
    DeleteOwnedBookApiOperationDocumentation,
    DeleteOwnedBookApiResponseDocumentation,
    GetBooksApiOperationDocumentation,
    GetBooksApiResponseDocumentation,
    GetBooksOwnedByIdApiOperationDocumentation,
    GetBooksOwnedByIdApiResponseDocumentation,
    GetOwnedBooksApiOperationDocumentation,
    GetOwnedBooksApiResponseDocumentation,
} from './book.swagger';
import { UserRole } from '../security/enums';

@ApiCookieAuth('access_token')
@Controller('book')
export class BookController {
    constructor(private readonly bookService: BookService) {}

    @ApiOperation(GetOwnedBooksApiOperationDocumentation)
    @ApiResponse(GetOwnedBooksApiResponseDocumentation)
    @RequireRoles()
    @Get('owned')
    public async getAllBooksFromCurrentUser(@User() user: UserEntity) {
        const books = await this.bookService.findAllByOwnerId(user.user_id);
        return books.map(toBookUserListDto);
    }

    @ApiOperation(GetBooksOwnedByIdApiOperationDocumentation)
    @ApiResponse(GetBooksOwnedByIdApiResponseDocumentation)
    @RequireRoles(UserRole.Admin)
    @Get('ownedby/:id')
    public async getAllBooksByOwner(@Param('id') id: string) {
        const books = await this.bookService.findAllByOwnerId(id);
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

    @ApiOperation(DeleteOwnedBookApiOperationDocumentation)
    @ApiResponse(DeleteOwnedBookApiResponseDocumentation)
    @RequireRoles()
    @Delete('owned/:id')
    public async deleteOwnedBook(
        @User() user: UserEntity,
        @Param('id') id: string,
    ) {
        await this.bookService.deleteByIdAndOwnerId(id, user.user_id);
    }

    @ApiOperation(DeleteBookApiOperationDocumentation)
    @ApiResponse(DeleteBookApiResponseDocumentation)
    @RequireRoles(UserRole.Admin)
    @Delete(':id')
    public async deleteBook(@Param('id') id: string) {
        await this.bookService.deleteByIdAndOwnerId(id, null);
    }
}
