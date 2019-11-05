import { Component, ViewChild, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'fitness-tracker';
  openSidenav = false;
  subdomain: string;

  onToggle() {
   // @ViewChild('sidenav')
  }

ngOnInit() {
  this.getSubdomain();
}

// This method will get the sub domain which will be send to the server for the client details.
  getSubdomain() {
    const domain = window.location.hostname;
    if (domain.indexOf('.') < 0 || 
      domain.split('.')[0] === 'example' || domain.split('.')[0] === 'lvh' || domain.split('.')[0] === 'www') {
      this.subdomain = '';
    } else {
      this.subdomain = domain.split('.')[0];
    }
    console.log('The client subdomain: ', this.subdomain);
  }
}
