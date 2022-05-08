import { Injectable } from '@nestjs/common';
import PDFDocument from 'pdfkit';

@Injectable()
export class ExportsService {
  /**
   * generate pdf file
   * @returns 
   */
  async generatePDF(): Promise<Buffer> {    
    const pdfBuffer: Buffer = await new Promise(resolve => {
      const doc = new PDFDocument({
        size: 'LETTER',
        bufferPages: true,
      })

      doc.text(
        'hello world',
        100, // x position
        50 // y
      );
      doc.end()

      let buffer: any[] = [];
      doc.on('data', buffer.push.bind(buffer))
      doc.on('end', () => {
        const data = Buffer.concat(buffer)
        resolve(data)
      })
    })

    return pdfBuffer
  }

  /**
   * generate xlsx file
   * @returns 
   */
  async generateXLSX(): Promise<Buffer> {
    const excel = require('node-excel-export');

    const styles = {
      headerDark: {
        fill: {
          fgColor: {
            rgb: 'FF000000'
          }
        },
        font: {
          color: {
            rgb: 'FFFFFFFF'
          },
          sz: 14,
          bold: true,
          underline: true
        }
      },
      cellPink: {
        fill: {
          fgColor: {
            rgb: 'FFFFCCFF'
          }
        }
      },
      cellGreen: {
        fill: {
          fgColor: {
            rgb: 'FF00FF00'
          }
        }
      }
    };

    const heading = [
      [{ value: 'a1', style: styles.headerDark }, { value: 'b1', style: styles.headerDark }, { value: 'c1', style: styles.headerDark }],
      ['a2', 'b2', 'c2'] 
    ];

    const specification = {
      customer_name: { 
        displayName: 'Customer',
        headerStyle: styles.headerDark,
        cellStyle: function (_value: any, row: any) {
          return (row.status_id == 1) ? styles.cellGreen : { fill: { fgColor: { rgb: 'FFFF0000' } } };
        },
        width: 120 
      },
      status_id: {
        displayName: 'Status',
        headerStyle: styles.headerDark,
        cellFormat: function (value: any, _row: any) {
          return (value == 1) ? 'Active' : 'Inactive';
        },
        width: '10'
      },
      note: {
        displayName: 'Description',
        headerStyle: styles.headerDark,
        cellStyle: styles.cellPink,
        width: 220
      }
    }

    const dataset = [
      { customer_name: 'IBM', status_id: 1, note: 'some note', misc: 'not shown' },
      { customer_name: 'HP', status_id: 0, note: 'some note' },
      { customer_name: 'MS', status_id: 0, note: 'some note', misc: 'not shown' }
    ]

    const merges = [
      { start: { row: 1, column: 1 }, end: { row: 1, column: 10 } },
      { start: { row: 2, column: 1 }, end: { row: 2, column: 5 } },
      { start: { row: 2, column: 6 }, end: { row: 2, column: 10 } }
    ];

    const report = excel.buildExport(
      [ 
        {
          name: 'Report', 
          heading: heading, 
          merges: merges, 
          specification: specification,
          data: dataset 
        }
      ]
    );

    return report;
  }
}
