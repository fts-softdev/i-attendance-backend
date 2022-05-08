import { Controller, Get, Param, Res } from '@nestjs/common';
import { ExportsService } from './exports.service';

@Controller('exports')
export class ExportsController {
  /**
   * constructor
   * @param exportsService 
   */
  constructor(private readonly exportsService: ExportsService) { }

  @Get('pdf/:filename')
  async getPDF(@Param('filename') filename:string, @Res() res: any): Promise<void> {
    const buffer = await this.exportsService.generatePDF()
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename=${filename}.pdf`,
      'Content-Length': buffer.length,
    })

    res.end(buffer)
  }
  
  @Get('xlsx/:filename')
  async getXLSX(@Param('filename') filename:string, @Res() res: any): Promise<void> {
    const buffer = await this.exportsService.generateXLSX()
    res.set({
      'Content-Type': 'application/xlsx',
      'Content-Disposition': `attachment; filename=${filename}.xlsx`,
      'Content-Length': buffer.length,
    })

    res.end(buffer)
  }
}
