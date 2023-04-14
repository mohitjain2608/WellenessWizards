import { Component } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { mockObj } from 'src/assets/mock-data/mockObj';
import { DropdownOptions, GraphModel, PieChartModel } from 'src/assets/models/graphModel';
import * as XLSX from 'xlsx';
import * as pg from "pg";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent {
  

  // onSubmit(tableName: string) {
  //   const data = { tableName, csvData: this.csvData };
  //   this.http.post('/api/import', data).subscribe();
  // }


  dyeDropDownList:DropdownOptions[] = [];
  selectedDyes: DropdownOptions[] = [];
  dropdownSettings:IDropdownSettings = {};

  title = 'frontend';

  graphData :GraphModel[] =[]

  pieChartData: PieChartModel= {series:[], labels:[]}

  mockObj: any = mockObj

  uniqueDye: string[] =[];

  exceltoJson: any = {}

  dataLimit : number = 200 //temporarily using to fasting the graph plots

  lineChartData: GraphModel[] = []

  ngOnInit(){
    this.parseData(mockObj);
    

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'itemId',
      textField: 'itemText',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }


  // constructor(private http: HttpClient, private papa: Papa) {}
  // onFileSelect(input: any) {
  //   const file = input.files[0];
  //   this.papa.parse(file, {
  //     complete: (result) => {
  //       this.csvData = result.data;
  //     },
  //   });
  //   const tableName = input.file[0].name;
  //   const data = { tableName, csvData: this.csvData };
  //   this.http.post('/api/import', data).subscribe();
  // }

  // async onFileSelected(event: any) {
  //   const file = event.target.files[0];
  //   const workbook = await XLSX.readFile(file);
  //   const sheetName = workbook.SheetNames[0];
  //   const worksheet = workbook.Sheets[sheetName];
  //   const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

  //   const client = new pg.Client({
  //     user: 'postgres',
  //     password: 'Mohit@123',
  //     host: 'localhost',
  //     port: 5433,
  //     database: 'mydatabase',
  //   });

  //   await client.connect();

  //   const headerRow = data[0] as string[];
  //   const values = [];
  //   for (let i = 1; i < data.length; i++) {
  //     const row = data[i] as string[];
  //     const rowValues = [];
  //     for (let j = 0; j < headerRow.length; j++) {
  //       rowValues.push(row[j]);
  //     }
  //     values.push(rowValues);
  //   }

  //   const query = `INSERT INTO mytable (${headerRow.join(',')}) VALUES ${values
  //     .map((rowValues) => `(${rowValues.map((value) => `'${value}'`).join(',')})`)
  //     .join(',')}`;

  //   await client.query(query);

  //   await client.end();
  // }

  onFileChange(event: any) {
    this.exceltoJson = {};
    let headerJson: any = {};
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(event.target);
    // if (target.files.length !== 1) {
    //   throw new Error('Cannot use multiple files');
    // }
    const reader: FileReader = new FileReader();
    reader.readAsBinaryString(target.files[0]);
    console.log("filename", target.files[0].name);
    this.exceltoJson['filename'] = target.files[0].name;
    reader.onload = (e: any) => {
      /* create workbook */
      const binarystr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(binarystr, { type: 'binary' });
      for (var i = 0; i < wb.SheetNames.length; ++i) {
        const wsname: string = wb.SheetNames[i];
        const ws: XLSX.WorkSheet = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws); // to get 2d array pass 2nd parameter as object {header: 1}
        this.exceltoJson[`sheet${i + 1}`] = data;
        const headers = this.get_header_row(ws);
        headerJson[`header${i + 1}`] = headers;
        //  console.log("json",headers)
      }
      this.exceltoJson['headers'] = headerJson;
      console.log(this.exceltoJson);
      this.parseData(this.exceltoJson);
    };
    
  }

  get_header_row(sheet: any) {
    var headers = [];
    var range = XLSX.utils.decode_range(sheet['!ref']);
    var C, R = range.s.r; /* start in the first row */
    /* walk every column in the range */
    for (C = range.s.c; C <= range.e.c; ++C) {
      var cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })] /* find the cell in the first row */
      // console.log("cell",cell)
      var hdr = "UNKNOWN " + C; // <-- replace with your desired default 
      if (cell && cell.t) {
        hdr = XLSX.utils.format_cell(cell);
        headers.push(hdr);
      }
    }
    return headers;
  }

  parseData(data:any){
    var QuantStudio_5_Dx_System = 0;
    var QuantStudio_7_Dx_System = 0;
    let obj2 : PieChartModel={series:[], labels:''}

    if(data.sheet1){
      this.mockObj.sheet1.forEach((element: any) => {
        let obj: GraphModel={label:'' , xAxis: 0, yAxis:[],dye: ''}
        obj.label = element.Well_ID + element.Well_Position + element.Target

        element.DRn_Target = element.DRn_Target.replace("["," ")
        element.DRn_Target = element.DRn_Target.replace("]","")
        obj.yAxis = element.DRn_Target.split(',').map((x:string)=> Number(x))
        obj.xAxis = obj.yAxis.length
        obj.dye = element.Dye;

        if(!this.uniqueDye.includes(element.Dye))
        {
          this.uniqueDye.push(element.Dye);
        }
  
        this.graphData.push(obj);


        obj2.labels = element.Instrument_Type;
        if(obj2.labels=="QuantStudio™ 5 Dx System"){
          QuantStudio_5_Dx_System++;
        }
        else if(obj2.labels=="QuantStudio™ 7 Dx System"){
          QuantStudio_7_Dx_System++;
        }
      });
      this.pieChartData.series=[QuantStudio_5_Dx_System,QuantStudio_7_Dx_System];

      this.uniqueDye.map((element,index)=>{
        this.dyeDropDownList.push({itemId:index,itemText:element});
      })
    }

    this.setDataForLineChart(this.graphData);
  }

  setDataForLineChart(data:any){
    this.lineChartData = data.slice(0, this.dataLimit);
  }

  onItemSelect(item: any) {
    const selectedDyes = this.selectedDyes.map(value => value.itemText);
    this.lineChartData = this.graphData.slice(0,this.dataLimit).filter((value)=>{

        if(selectedDyes.includes(value.dye)){
          return true;
        }
        else{
          return false;
        }
    })
  }
  onSelectAll(items: any) {
    const selectedDyes = this.dyeDropDownList.map(value=>value.itemText);
    this.lineChartData = this.graphData.slice(0,this.dataLimit).filter((value)=>{

      if(selectedDyes.includes(value.dye)){
        return true;
      }
      else{
        return false;
      }
  })
  }

  onItemDeSelect(item:any){
    
    
  }

  

}
