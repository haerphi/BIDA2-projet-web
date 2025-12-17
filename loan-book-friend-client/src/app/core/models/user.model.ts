export interface UserList {
    userId: string;
    name: string;
    email: string;
}

export interface UserListWithRole extends UserList {
    role: string;
}
