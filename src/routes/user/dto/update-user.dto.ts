import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, Length } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsNotEmpty()
    @Length(24, 24)
    _id: string;
}
