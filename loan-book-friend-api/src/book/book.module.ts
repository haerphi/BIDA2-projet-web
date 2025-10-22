import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookEntity } from './models';
import { BookService } from './services';
import { BookController } from './book.controller';

@Module({
    imports: [TypeOrmModule.forFeature([BookEntity])],
    providers: [BookService],
    exports: [BookService],
    controllers: [BookController],
})
export class BookModule {}
