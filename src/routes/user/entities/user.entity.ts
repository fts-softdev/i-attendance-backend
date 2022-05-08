import { IsEmail, IsNotEmpty, IsNumber, IsPhoneNumber, IsString } from "class-validator";

export class User {
    @IsString()
    @IsNotEmpty()
    _id: string;

    @IsString()
    @IsNotEmpty()
    hoten: string;

    @IsPhoneNumber()
    @IsNotEmpty()
    soDienThoai: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    avatar: string;

    @IsNumber()
    @IsNotEmpty()
    role: number;
    // 1: quản lý
    // 2: thành viên
    // 3: không phải thành viên

    @IsString()
    @IsNotEmpty()
    viTien: number = 0.0;

    @IsNotEmpty()
    password: string;

    access_token: string;

    createdAt: string;
    updatedAt: string;
}
