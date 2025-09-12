import type { UserDto } from './userDto';

export type LoginResponse = {
    token: string;
    userDto: UserDto;
};
