import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { Observable , of} from 'rxjs';
import { mergeMap } from 'rxjs/operators';

// import 'rxjs/add/operator/mergeMap';

// import 'rxjs/add/observable/of';

@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.css']
})
export class SearchFilterComponent implements OnInit {
  @Output() onSearch = new EventEmitter();

  public keyUpSubject = new Subject<string>();
  constructor() { }

  ngOnInit() {
  this.keyUpSubject
    .pipe(mergeMap((search:any)=> {
      return of(search)
    })).subscribe((value:any) => {
      this.onSearch.emit(value)
    })
  }
}
