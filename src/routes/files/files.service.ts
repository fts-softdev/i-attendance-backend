import { UploadedFile } from "@nestjs/common";
import path from "path";
import fs from "fs";

export class FilesService {
    /**
     * simple file upload
     * @param file - chỉ một file
     * @returns 
     */
    async simpleFileUpload(@UploadedFile() file: Express.Multer.File) {
        return file;
    }

    /**
     * multi file upload
     * @param file - chỉ nhiều file
     * @returns 
     */
    async multiFileUpload(@UploadedFile() files: Express.Multer.File[]) {
        return files;
    }

    /**
     * see file uploaded
     * @param res 
     * @param filePath 
     * @returns 
     */
    async seeUploadedFile(filename: string, res: any) {
        return await res.sendFile(filename, { root: './files/images' });
    }

    /**
     * delete simple file uploaded
     * @param res 
     * @param filePath 
     * @returns 
     */
    async deleteUploadedFile(filename: string) {
        let filepath = path.join(...['files', 'images', filename]);
        fs.unlink(filepath, resultHandler);
    }

    /**
     * update simple file uploaded
     * @param res 
     * @param filePath 
     * @returns 
     */
    async updateUploadedFile(filename: string, @UploadedFile() file: Express.Multer.File) {
        const extension: string = path.parse(file.originalname).ext;
        const name = path.parse(filename).name;
        const nameForUpdate = `${name}${extension}`;
        fs.rename(file.path, path.join('files', 'images', nameForUpdate), resultHandler);
    }
}

/**
 * Bắt error
 * @param err 
 */
const resultHandler = function (err: any) {
    if (err) {
        console.log("unlink failed", err);
    } else {
        console.log("file deleted");
    }
}