import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';

@Module({
    imports: [
        // module upload file
        MulterModule.register({
            dest: './files',
        })

    ],
    controllers: [FilesController],
    providers: [FilesService]
})
export class FileUploadModule { }
