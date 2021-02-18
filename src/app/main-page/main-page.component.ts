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
  public sortByDate = true;
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

  handleSort(datas:any){
    this.sortByDate = !this.sortByDate;
    this.datas = datas.sort((logA: CricbzzApi| any, logB: CricbzzApi| any) => {      
      if (this.sortByDate) {
        return (new Date(logA.date).getTime() > new Date(logB.date).getTime() ? 1 : -1 );
      } else {
        return (new Date(logA.date).getTime() < new Date(logB.date).getTime() ? 1 : -1 );
      }
    });
  }
}