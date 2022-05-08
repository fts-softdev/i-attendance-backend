// from @nestjs
import {
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Res,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common';
import { AnyFilesInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';

// from services
import { FilesService } from './files.service';

// from lib nodejs
import { v4 as uuidv4 } from 'uuid';
import { diskStorage } from 'multer';
import * as path from 'path';

const storage = {
    storage: diskStorage({
        destination: './files/temp',
        filename: (_req, file, cb) => {
            const filename: string = path.parse(file.originalname).name.replace(/\s/g, ' ') + "." + uuidv4();
            const extension: string = path.parse(file.originalname).ext;
            cb(
                null,
                `${filename}${extension}`
            );
        }
    })
};

@Controller('files')
@ApiTags('files')
export class FilesController {
    constructor(private readonly filesService: FilesService) { }

    /**
     * see file uploaded
     * @param path - image path 
     * @param res - response when exec get method
     * @method GET
     * @returns 
     */
    @Get('simple-upload/:filename')
    async seeUploadedFile(@Param('filename') filename: string, @Res() res: any) {
        return await this.filesService.seeUploadedFile(filename, res);
    }

    /**
     * see file uploaded
     * @param path - image path 
     * @param res - response when exec get method
     * @method DELETE
     * @returns 
     */
    @Delete('simple-upload/:filename')
    async deleteUploadedFile(@Param('filename') filename: string) {
        return await this.filesService.deleteUploadedFile(filename);
    }

    /**
    * see file uploaded
    * @param path - image path 
    * @param res - response when exec get method
    * @method DELETE
    * @returns 
    */
    @Put('simple-upload/:filename')
    // @UseInterceptors(AnyFilesInterceptor(storage))
    @UseInterceptors(FileInterceptor('file'))
    @ApiConsumes('multipart/form-data')
    async updateUploadedFile(@Param('filename') filename: string, @UploadedFile() file: Express.Multer.File) {
        this.deleteUploadedFile(filename);
        this.simpleFileUpload(file);

        this.filesService.updateUploadedFile(filename, file);
    }

    /**
     * upload simple file 
     * @name simpleFileUpload
     * @method GET
     * @param file 
     * @returns 
     */
    // @UseInterceptors(AnyFilesInterceptor(storage))
    @Post('simple-upload')
    @UseInterceptors(FileInterceptor('file'))
    @ApiConsumes('multipart/form-data')
    simpleFileUpload(
        @UploadedFile() file: Express.Multer.File,
        // @Req() _req: Request
    ): Promise<Express.Multer.File> {
        return this.filesService.simpleFileUpload(file).then(data=>{
            return data;
        });
    }

    /**
     * upload multi file 
     * @name multiFileUpload
     * @method GET
     * @param file 
     * @returns 
     */
    @Post('multi-upload')
    @UseInterceptors(FileInterceptor('file'))
    @ApiConsumes('multipart/form-data')
    mutliFileUpload(
        @UploadedFile() files: Express.Multer.File[],
        // @Req() _req: Request
    ): Promise<Express.Multer.File[]> {
        return this.filesService.multiFileUpload(files);
    }

}