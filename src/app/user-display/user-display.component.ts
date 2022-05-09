import { Component, Input, OnInit } from '@angular/core';
import { Language, LeaderJson } from '../services/models/waka-api';

@Component({
  selector: 'app-user-display',
  templateUrl: './user-display.component.html',
  styleUrls: ['./user-display.component.css']
})
export class UserDisplayComponent implements OnInit {

  @Input() leader?: LeaderJson =  undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
