import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { CricbzzApi } from '../cricbzz-api.model';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  datas: any | CricbzzApi[]= new Array<CricbzzApi>()
  sort: any | { };
  public transactionsLog:any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get('https://cricapi.com/api/matches?apikey=Gr7yeQlLENOWzEooZkecPFAllsE3')
      .subscribe((data:any) => {
        this.datas = data.matches.map((item:any) => {
          let keys = Object.keys(item)
          let newItem = {...item, team_1:item[keys[3]],team_2:item[keys[4]]}
          return newItem
        })
      })
  }

  handleSearch(winner_team:any){
    if(winner_team == 'undefined'){
      this.ngOnInit(); 
    }else{
      this.datas = this.datas.filter((res:any) => {
        if(res.winner_team === undefined){
          return 0;
        }else if(winner_team == ''){
          this.ngOnInit();
        }else{
          return res.winner_team.toLowerCase().includes(winner_team.toLowerCase())
        }
      })
    }
  }

  handleSort(ColumnName:any, data:any){
    if(this.sort?.key === ColumnName){
      let OrderBy = this.sort.value === 1 ? -1 : 1
      this.sort.value = OrderBy

      if(this.sort.key === 'winner_team'){
        this.datas = data.sort((logA: CricbzzApi| any, logB: CricbzzApi| any) => {
          if(logA.winner_team < logB.winner_team){
            return -1 * OrderBy;
          }else if(logA.winner_team > logB.winner_team){
            return 1 * OrderBy;
          }else{
            return 0;
          } 
        })
      }else if(this.sort.key === 'date'){
        this.datas = data.sort((logA: CricbzzApi| any, logB: CricbzzApi| any) => {
          if(new Date(logA.date).getTime() < new Date(logB.date).getTime()){
            return -1 * OrderBy;
          }else if(new Date(logA.date).getTime() > new Date(logB.date).getTime()){
            return 1 * OrderBy;
          }else{
            return 0;
          }           
        })
      }
    }else{
      this.sort = {key : ColumnName, value: 1}
      if(ColumnName === 'winner_team'){
        this.datas = data.sort((logA: CricbzzApi| any, logB: CricbzzApi| any) => {
          if(logA.winner_team < logB.winner_team){
            return -1;
          }else{
            return 0;
          }           
        })
      }
    }
  }
}