import { iMessage } from "./message.types";
import { iUser } from "./user.types";

export interface iChannel {
    _id: string;
    name: string;
    image?: string;
    description: string;
    createdAt: Date,
    updatedAt: Date,
    isPrivate?: boolean,
    owner: iUser,
    messages: iMessage[],
    members: iUser[]
}

export interface iChannelDTO {
    name: string;
    description: string;
    image?: File;
}