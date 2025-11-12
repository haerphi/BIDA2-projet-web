import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
} from '@nestjs/common';
import { ApiCookieAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { BookService } from './services';
import {
    bookCreateDtoToEntity,
    bookUpdateDtoToEntity,
    toBookDetailsDto,
    toBookListDto,
    toBookUserListDto,
} from './mappers';
import { RequireRoles } from '../security/guards';
import { User } from '../security/metadata';
import { UserEntity } from '../user/models';
import { BookCreateDto, BookUpdateDto } from './dtos';
import {
    CreateBookApiOperationDocumentation,
    CreateBookApiResponseDocumentation,
    DeleteBookApiOperationDocumentation,
    DeleteBookApiResponseDocumentation,
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

    @ApiOperation(DeleteBookApiOperationDocumentation)
    @ApiResponse(DeleteBookApiResponseDocumentation)
    @RequireRoles()
    @Delete(':id')
    public async deleteBook(@User() user: UserEntity, @Param('id') id: string) {
        await this.bookService.deleteById(id, user);
    }

    @RequireRoles()
    @Get(':id')
    public async getBookById(
        @User() requester: UserEntity,
        @Param('id') id: string,
    ) {
        const book = await this.bookService.findById(id, requester);
        return toBookDetailsDto(book);
    }

    @RequireRoles()
    @Put(':id')
    public async updateBookById(
        @User() user: UserEntity,
        @Param('id') id: string,
        @Body() bookData: Partial<BookUpdateDto>,
    ) {
        await this.bookService.update(
            id,
            bookUpdateDtoToEntity(bookData),
            user,
        );
    }
}
