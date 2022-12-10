import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import {Data} from '../data';
import {Item} from '../item';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit {

  constructor(private apiService: ApiService) { }

  data:Data = {};
  items:Item[] = [];
  media:string = ""
  ngOnInit(): void {
    this.loadData();
    this.apiService.passedMedia$.subscribe(val => {if(val=== "tv") this.media="Tv Shows"; else this.media="Movies";});
  }

  loadData(){
    this.apiService.getData().subscribe(response =>{
      this.data=response;
      this.items = [];
      this.data.results?.forEach(element => {
        this.items.push(element);
      });
    })
  }

  changeMedia(items:Item[]){
    this.items = [];
    this.items = items;
  }
  onSearchChange(change:any){
      if(change.target.value.length >=3){
        setTimeout(() => {
          
          this.apiService.setSearchParameters(change.target.value);
          this.apiService.searchData().subscribe(response =>{
            this.data = {};
            this.data = response;
            this.items = [];
            this.data.results?.forEach(element =>{
              this.items.push(element);
            })
          })
        }, 3000);
      }
      else{
        this.loadData();
      }
    
  }


}
