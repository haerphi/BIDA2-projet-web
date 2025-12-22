import {
    ApiOperationOptions,
    ApiResponseOptions,
    ApiParamOptions,
} from '@nestjs/swagger';
import {
    FriendGetListDto,
    ReceivedFriendRequestDto,
    SentFriendRequestDto,
} from '@friend/dtos';

// POST /friend
export const SendFriendRequestOperation: ApiOperationOptions = {
    summary: "Envoyer une demande d'ami",
    description:
        "Permet d'envoyer une invitation via le nom ou l'email de l'utilisateur.",
};

export const SendFriendRequestResponse: ApiResponseOptions = {
    status: 201,
    description: "La demande d'ami a été envoyée avec succès.",
};

// GET /friend/sent-requests
export const GetSentRequestsOperation: ApiOperationOptions = {
    summary: 'Lister les demandes envoyées',
    description:
        "Récupère toutes les demandes d'amis en attente envoyées par l'utilisateur.",
};

export const GetSentRequestsResponse: ApiResponseOptions = {
    status: 200,
    description: 'Liste des demandes envoyées récupérée.',
    type: SentFriendRequestDto,
};

// GET /friend/received-requests
export const GetReceivedRequestsOperation: ApiOperationOptions = {
    summary: 'Lister les demandes reçues',
    description:
        "Récupère toutes les demandes d'amis en attente reçues par l'utilisateur.",
};

export const GetReceivedRequestsResponse: ApiResponseOptions = {
    status: 200,
    description: 'Liste des demandes reçues récupérée.',
    type: ReceivedFriendRequestDto,
};

// PATCH /friend/accept-request/:friendId
export const AcceptFriendRequestOperation: ApiOperationOptions = {
    summary: "Accepter une demande d'ami",
    description: 'Change le statut d\'une demande reçue en "acceptée".',
};

// DELETE /friend/deny-request/:friendId
export const DenyFriendRequestOperation: ApiOperationOptions = {
    summary: "Refuser/Annuler une demande d'ami",
    description: "Supprime une demande d'ami entrante ou sortante.",
};

// Paramètre commun pour les routes avec :friendId
export const FriendIdParam: ApiParamOptions = {
    name: 'friendId',
    description: "L'identifiant de la relation ou de l'utilisateur concerné",
    example: 'uuid-6789-abcd',
};

// GET /friend
export const GetFriendsOperation: ApiOperationOptions = {
    summary: 'Lister mes amis',
    description:
        'Récupère la liste des amis confirmés avec les compteurs de prêts et de retards.',
};

export const GetFriendsResponse: ApiResponseOptions = {
    status: 200,
    description: "Liste d'amis récupérée.",
    type: FriendGetListDto,
};
