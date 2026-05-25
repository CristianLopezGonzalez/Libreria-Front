export interface UserData {
    id: string;
    nick: string;
    email: string;
    role: Role;
    book?: Books[]
    tokens?: RefreshToken[];
}

export interface RefreshToken {
    id: string;
    refreshToken: string;
    expiresAt: string;
    userId: string;
    createdAt?: string;
    updatedAt?: string;
}

export const Role = {
    USER: 'USER',
    ADMIN: 'ADMIN'
} as const;

export type Role = (typeof Role)[keyof typeof Role];

export interface Books {
    id: string;
    title: string;
    description: string;
    isbn: string;

    user:{
        id: string;
        nick: string;
    }
    
    author: {
        id: string;
        name: string;
    };

    category: {
        id: string;
        name: string;
    }

    editorial: {
        id: string;
        name: string;
    }

    createdAt?: string;
    updatedAt?: string;
}



