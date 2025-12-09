import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookEntity } from '@book/models';
import { BookService } from '@book/services';
import { BookController } from '@book/book.controller';
import { UserModule } from '@user/user.module';
import { LoanModule } from '@loan/loan.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([BookEntity]),
        UserModule,
        forwardRef(() => LoanModule),
    ],
    providers: [BookService],
    exports: [BookService],
    controllers: [BookController],
})
export class BookModule {}
