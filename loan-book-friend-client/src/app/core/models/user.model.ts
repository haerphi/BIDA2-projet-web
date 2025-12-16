export interface UserList {
    userId: string;
    name: string;
    email: string;
    role: string;
}

export interface UserDetails extends UserList {
    created_at: string;
    updated_at: string;
}
