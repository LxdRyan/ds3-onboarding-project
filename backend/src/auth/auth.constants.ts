import { SetMetadata } from "@nestjs/common";

export const jwtConstants = {
    secret: process.env.JWT_TOKEN
};

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);