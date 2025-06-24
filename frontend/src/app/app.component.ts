import { Component, OnInit } from '@angular/core'; // <-- OnInit ici
import { CheckActivityService } from './core/services/check-activity.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  // <-- implémente OnInit
  title = 'hotelManagementFrontend';

  constructor(private checkActivityService: CheckActivityService) {}

  ngOnInit() {
    this.checkActivityService.startChecking();
  }
}
