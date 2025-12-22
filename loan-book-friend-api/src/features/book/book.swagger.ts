import {
    ApiOperationOptions,
    ApiResponseOptions,
    ApiParamOptions,
} from '@nestjs/swagger';
import { BookListDto, BookListOwnedDto } from '@book/dtos';
import { BookDetailsDto } from '@book/dtos/book-details.dto';

// Documentation pour POST /book
export const CreateBookOperation: ApiOperationOptions = {
    summary: 'Créer un nouveau livre',
    description:
        'Permet à un utilisateur connecté d’ajouter un livre à sa collection.',
};

export const CreateBookResponse: ApiResponseOptions = {
    status: 201,
    description: 'Le livre a été créé avec succès.',
};

// Documentation pour PUT /book/:id
export const UpdateBookOperation: ApiOperationOptions = {
    summary: 'Modifier un livre',
    description:
        'Permet de mettre à jour les informations d’un livre existant via son ID.',
};

export const UpdateBookParam: ApiParamOptions = {
    name: 'id',
    description: "L'identifiant unique du livre",
    example: 'uuid-1234-5678',
};

// Documentation pour GET /book (Liste publique)
export const GetBooksOperation: ApiOperationOptions = {
    summary: 'Lister tous les livres',
    description:
        'Récupère une liste paginée de livres avec filtres optionnels.',
};

export const GetBooksResponse: ApiResponseOptions = {
    status: 200,
    description: 'Liste des livres récupérée.',
    type: BookListDto, // NestJS Swagger gérera le tableau si c'est défini dans le contrôleur
};

// Documentation pour GET /book/owned
export const GetOwnedBooksOperation: ApiOperationOptions = {
    summary: 'Lister mes livres',
    description:
        'Récupère la liste des livres appartenant à l’utilisateur connecté.',
};

export const GetOwnedBooksResponse: ApiResponseOptions = {
    status: 200,
    description: 'Liste de vos livres.',
    type: BookListOwnedDto,
};

// Documentation pour GET /book/:id
export const GetBookByIdOperation: ApiOperationOptions = {
    summary: 'Détails d’un livre',
    description:
        'Récupère les informations complètes d’un livre, y compris le propriétaire et l’historique des emprunts.',
};

export const GetBookByIdResponse: ApiResponseOptions = {
    status: 200,
    description: 'Détails du livre trouvés.',
    type: BookDetailsDto,
};
