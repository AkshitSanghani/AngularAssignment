export class EmpData {
    Id!:string;
    EmployeeName!:string;
    StarTimeUtc!:Date;
    EndTimeUtc!:Date;
    EntryNotes!:string;
    DeletedOn!:null | boolean
    WorkingHours!:number
  }

  export class EmpWorkingHours{  
    EmployeeName!:string;
    TotalWorkingHours!:number;
    HoursRequired!:boolean
  }

 
  