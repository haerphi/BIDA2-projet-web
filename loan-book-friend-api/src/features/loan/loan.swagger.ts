import {
    ApiOperationOptions,
    ApiResponseOptions,
    ApiParamOptions,
} from '@nestjs/swagger';
import { LoanGetListWithBookDto, BorrowedGetListDto } from './dtos';

// POST /loan
export const CreateLoanOperation: ApiOperationOptions = {
    summary: 'Enregistrer un prêt',
    description:
        "Permet de créer un nouvel emprunt en spécifiant le livre, l'emprunteur et la date de retour prévue.",
};

export const CreateLoanResponse: ApiResponseOptions = {
    status: 201,
    description: 'Le prêt a été enregistré avec succès.',
};

// PATCH /loan/:loanId/return
export const ReturnLoanOperation: ApiOperationOptions = {
    summary: 'Marquer un livre comme retourné',
    description: "Met à jour la date de retour effective d'un prêt en cours.",
};

export const ReturnLoanParam: ApiParamOptions = {
    name: 'loanId',
    description: "L'identifiant unique de la transaction de prêt",
    example: 'loan-123-abc',
};

// GET /loan/loaned-books
export const GetLoanedBooksOperation: ApiOperationOptions = {
    summary: 'Lister les livres que je prête',
    description:
        "Récupère la liste des livres de l'utilisateur actuellement prêtés à d'autres personnes.",
};

export const GetLoanedBooksResponse: ApiResponseOptions = {
    status: 200,
    description: 'Liste des livres prêtés récupérée.',
    type: LoanGetListWithBookDto,
};

// GET /loan/borrowed-books
export const GetBorrowedBooksOperation: ApiOperationOptions = {
    summary: "Lister les livres que j'emprunte",
    description:
        "Récupère la liste des livres appartenant à d'autres personnes que l'utilisateur a en sa possession.",
};

export const GetBorrowedBooksResponse: ApiResponseOptions = {
    status: 200,
    description: 'Liste des livres empruntés récupérée.',
    type: BorrowedGetListDto,
};
