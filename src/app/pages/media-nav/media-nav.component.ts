import { Component, OnInit,EventEmitter,Output } from '@angular/core';
import { ApiService } from '../api.service';
import { Item } from '../item';
import { Data } from '../data';

@Component({
  selector: 'app-media-nav',
  templateUrl: './media-nav.component.html',
  styleUrls: ['./media-nav.component.scss']
})
export class MediaNavComponent implements OnInit {

  constructor(private apiService:ApiService) { }

  items: Item[] = []
  data: Data={};

  @Output() onMediaTypeChange: EventEmitter<Item[]> = new EventEmitter();


  ngOnInit(): void {
  }

  showMovies(){
    this.apiService.setMediaType("movie");
    this.refreshData();
  }
  showTvShows(){
    this.apiService.setMediaType("tv");
    this.refreshData();
  }
  refreshData(){
    this.apiService.getData().subscribe(response => {
      this.data = response;
      this.items = [];
      this.data.results?.forEach(element =>{
        this.items.push(element);
      })
      this.onMediaTypeChange.emit(this.items);
    })
  }
}
