import {Component} from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

@Component({
    selector: 'app-export',
    template: ``
})
export class AppExportComponent {
    fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    fileExtension = '.xlsx';
    filename = 'Báo cáo';

    constructor() {
    }

    public exportExcel(jsonData: any[], header: any[], fileName?: string): void {
        const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(jsonData);

        // Set columns header
        const range = XLSX.utils.decode_range(ws['!ref']);
        for (let i = range.s.c; i <= range.e.c; i++) {
            const address = XLSX.utils.encode_col(i) + '1';
            if (!ws[address]) {
                continue;
            }
            ws[address].v = header[i];
        }

        const wb: XLSX.WorkBook = { Sheets: { data: ws }, SheetNames: ['data'] };
        const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        fileName = fileName !== undefined ? fileName : this.filename;
        this.saveExcelFile(excelBuffer, fileName);
    }

    private saveExcelFile(buffer: any, fileName: string): void {
        const data: Blob = new Blob([buffer], {type: this.fileType});
        FileSaver.saveAs(data, fileName + this.fileExtension);
    }
}
