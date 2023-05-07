import { Injectable } from '@angular/core';
import { EmpData, EmpWorkingHours } from './models/empClass';
import { HttpClient } from '@angular/common/http';
import{ map } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class ApiService {
constructor(private http:HttpClient) { }

getData(){
  const url:string ='https://rc-vault-fap-live-1.azurewebsites.net/api/gettimeentries?code=vO17RnE8vuzXzPJo5eaLLjXjmRW07law99QTD90zat9FfOQJKKUcgQ=='
  return this.http.get<EmpData[]>(url)

}
  
}
