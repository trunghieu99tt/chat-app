export interface iUser {
    _id?: string;
    username: string;
    password: string;
    bio: string;
    photo: string;
    phone: string;
    email: string;
    firstName: string;
    lastName: string;
    isThirdParty?: boolean;
    google?: {
        id: string
    };
    lastJoining: {
        _id: string,
        roomId: string,
        time: Date
    }[]
}