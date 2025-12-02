import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query,
} from '@nestjs/common';
import {
    ApiCookieAuth,
    ApiExtraModels,
    ApiOperation,
    ApiResponse,
} from '@nestjs/swagger';
import { BookService } from '@book/services';
import {
    bookCreateDtoToEntity,
    bookUpdateDtoToEntity,
    toBookDetailsDto,
    toBookListDto,
    toBookUserListDto,
} from '@book/mappers';
import { RequireRoles } from '@security/guards';
import { User } from '@security/metadata';
import { UserEntity } from '@user/models';
import {
    BookCreateDto,
    BookDetailsDto,
    BookListDto,
    BookListQueryDto,
    BookOwnedListQueryDto,
    BookUpdateDto,
    BookUserListDto,
} from '@book/dtos';
import {
    CreateBookApiOperationDocumentation,
    CreateBookApiResponseDocumentation,
    DeleteBookApiOperationDocumentation,
    DeleteBookApiResponseDocumentation,
    GetAllBooksApiOperationDocumentation,
    GetAllBooksApiResponseDocumentation,
    GetAllBooksByOwnerApiOperationDocumentation,
    GetAllBooksByOwnerApiResponseDocumentation,
    GetAllBooksFromCurrentUserApiOperationDocumentation,
    GetAllBooksFromCurrentUserApiResponseDocumentation,
    UpdateBookByIdApiOperationDocumentation,
    UpdateBookByIdApiResponseDocumentation,
} from '@book/book.swagger';
import { UserRole } from '@security/enums';
import { ListApiResponseDto } from '@common/dtos';

@ApiCookieAuth('access_token')
@ApiExtraModels(BookListDto, BookUserListDto)
@Controller('book')
export class BookController {
    constructor(private readonly bookService: BookService) {}

    @ApiOperation(GetAllBooksFromCurrentUserApiOperationDocumentation)
    @ApiResponse(GetAllBooksFromCurrentUserApiResponseDocumentation)
    @RequireRoles()
    @Get('owned')
    public async getAllBooksFromCurrentUser(
        @User() user: UserEntity,
        @Query() query: BookOwnedListQueryDto,
    ): Promise<ListApiResponseDto<BookUserListDto>> {
        const { books, total } = await this.bookService.findAllByOwnerId(
            user.user_id,
            query,
        );
        return { data: books.map(toBookUserListDto), total };
    }

    @ApiOperation(GetAllBooksByOwnerApiOperationDocumentation)
    @ApiResponse(GetAllBooksByOwnerApiResponseDocumentation)
    @RequireRoles(UserRole.Admin)
    @Get('ownedby/:id')
    public async getAllBooksByOwner(
        @Param('id') id: string,
        @Query() query: BookOwnedListQueryDto,
    ): Promise<ListApiResponseDto<BookUserListDto>> {
        const { books, total } = await this.bookService.findAllByOwnerId(
            id,
            query,
        );
        return { data: books.map(toBookUserListDto), total };
    }

    @ApiOperation(GetAllBooksApiOperationDocumentation)
    @ApiResponse(GetAllBooksApiResponseDocumentation)
    @Get()
    public async getAllBooks(
        @Query() query: BookListQueryDto,
    ): Promise<ListApiResponseDto<BookListDto>> {
        const { books, total } = await this.bookService.findAll(query);
        return { data: books.map(toBookListDto), total };
    }

    @ApiOperation(CreateBookApiOperationDocumentation)
    @ApiResponse(CreateBookApiResponseDocumentation)
    @RequireRoles()
    @Post()
    public async createBook(
        @User() user: UserEntity,
        @Body() book: BookCreateDto,
    ): Promise<BookUserListDto> {
        const createdBook = await this.bookService.create(
            bookCreateDtoToEntity(book, user),
        );
        return toBookUserListDto(createdBook);
    }

    @ApiOperation(DeleteBookApiOperationDocumentation)
    @ApiResponse(DeleteBookApiResponseDocumentation)
    @RequireRoles()
    @Delete(':id')
    public async deleteBook(
        @User() user: UserEntity,
        @Param('id') id: string,
    ): Promise<void> {
        await this.bookService.deleteById(id, user);
    }

    @ApiOperation(DeleteBookApiOperationDocumentation)
    @ApiResponse(DeleteBookApiResponseDocumentation)
    @RequireRoles()
    @Get(':id')
    public async getBookById(
        @User() requester: UserEntity,
        @Param('id') id: string,
    ): Promise<BookDetailsDto> {
        const book = await this.bookService.findById(id, requester.user_id);
        return toBookDetailsDto(book);
    }

    @ApiOperation(UpdateBookByIdApiOperationDocumentation)
    @ApiResponse(UpdateBookByIdApiResponseDocumentation)
    @RequireRoles()
    @Put(':id')
    public async updateBookById(
        @User() user: UserEntity,
        @Param('id') id: string,
        @Body() bookData: Partial<BookUpdateDto>,
    ): Promise<void> {
        await this.bookService.update(
            id,
            bookUpdateDtoToEntity(bookData),
            user,
        );
    }
}
