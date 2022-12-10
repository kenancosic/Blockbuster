import { Component, OnInit,Output, EventEmitter } from '@angular/core';
import { ApiService } from '../api.service';
import {Item} from '../item';
import { Data } from '../data';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private apiService:ApiService) { }

  ngOnInit(): void {   
  }


}
