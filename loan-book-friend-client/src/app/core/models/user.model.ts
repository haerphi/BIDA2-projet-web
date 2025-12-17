import {ApiPaginationQueryParams} from '@core/models/api.model';
import {UserRole} from '@core/constants';

export interface UserList {
  userId: string;
  name: string;
  email: string;
}

export interface UserListWithRole extends UserList {
  role: UserRole;
}

export interface UserListQueryParams extends ApiPaginationQueryParams {
}

export interface UserDetailsDto {
  userId: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: Date;
}
