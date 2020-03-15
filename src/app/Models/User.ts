export class User{
    id: string;
    username: string;
    email: string;
    password: string;
    userType: Role;
    date_created: Date;
}

export class Role{
    type: string;
}