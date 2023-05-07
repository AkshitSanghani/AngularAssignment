import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmpData, EmpWorkingHours } from './models/empClass';
import { ApiService } from './api.service';
import { ChartDataset, ChartType } from 'chart.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  employees!:EmpData[]; 
  empWorkingHours: EmpWorkingHours[]=[];
  minRequirement:boolean = true;
  labels:string[] = [];
  values:number[] = [];
  pieChartLabels:any;
  pieChartData:any;

  constructor(private http:HttpClient,private apiService:ApiService){}
 
  pieChartOptions = {
    responsive: true,
    animationEnabled:true,
    title:{text :"Hours Worked by per employee"}    
  }

ngOnInit(){
  // FOR TABLE
  // Adding JSON Values into an array:- 
  this.apiService.getData().subscribe(data => {
  this.employees = data;

  // TO GET WORKING HOURS OF EACH EMPLOYEE
  for (let i = 0; i < this.employees.length; i++) {
    const startDate = new Date(this.employees[i].StarTimeUtc);
    const endDate = new Date(this.employees[i].EndTimeUtc);
    const diffMs = endDate.getTime() - startDate.getTime();
    const hours = diffMs / (1000 * 60 * 60);
    const rHours = Math.round(hours * 10)/10
    this.employees[i].WorkingHours = rHours
 }

// FOR CALCULATING AND AGGREGATING EMPLOYEES' TOTAL WORKED HOURS:-

 for(let emp of this.employees){

  var existingEmp = this.empWorkingHours.find(x => x.EmployeeName == emp.EmployeeName);

  if(existingEmp == null)
  {
    let e:EmpWorkingHours = new EmpWorkingHours();
    e.EmployeeName = emp.EmployeeName;
    e.TotalWorkingHours = emp.WorkingHours;
    this.empWorkingHours.push(e);
  }
  else
  {
    var idx = this.empWorkingHours.findIndex(x => x.EmployeeName == emp.EmployeeName);
    this.empWorkingHours[idx].TotalWorkingHours += emp.WorkingHours;
  }
}
// FOR CHANGING NAME OF EMPLOYEE WHOSE VALUE IS NULL
var idx = this.empWorkingHours.findIndex(x => x.EmployeeName == null);
if(idx != -1)
  this.empWorkingHours[idx].EmployeeName = "NA";

    // FOR SORTING THE EMPLOYEES
  this.empWorkingHours.sort(
    (a,b)=>{
    const result =  a.TotalWorkingHours - b.TotalWorkingHours
    return result
    })

   //FOR PIE CHART LABELS 
  this.empWorkingHours.map(x => {
    if(x.EmployeeName == null)
      this.labels.push("NA");
    else
      this.labels.push(x.EmployeeName)
  })
  
  //FOR PIE CHART DATA
  this.empWorkingHours.map(x => {
    this.values.push(x.TotalWorkingHours)
  })

  console.log("akshit");
  console.log(this.labels);
  console.log(this.values);

  this.pieChartLabels =  this.labels;
  this.pieChartData = [{
    data:this.values}];

})
  }
}