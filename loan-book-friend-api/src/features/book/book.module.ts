import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookEntity } from '@book/models';
import { BookService } from '@book/services';
import { BookController } from '@book/book.controller';

@Module({
    imports: [TypeOrmModule.forFeature([BookEntity])],
    providers: [BookService],
    exports: [BookService],
    controllers: [BookController],
})
export class BookModule {}
