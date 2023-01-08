import { Component } from '@angular/core';
import { LanguageCount } from '../services/models/waka-api';
import { ObserverHolderService } from '../services/observer-holder.service';

@Component({
  selector: 'app-languages-display',
  templateUrl: './languages-display.component.html',
  styleUrls: ['./languages-display.component.css']
})
export class LanguagesDisplayComponent {

  constructor(public observer_holder: ObserverHolderService){
  }
}
