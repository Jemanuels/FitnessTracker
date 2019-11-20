import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { UIService } from 'src/app/shared/ui.service';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../../app.reducer';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  isLoading = false;
  isLoading$: Observable<boolean>;
  private loadingSubs: Subscription;
  constructor(private authService: AuthService, private uiService: UIService, private store: Store<{ui: fromApp.State}>) {}

  ngOnInit() {
    this.isLoading$ = this.store.pipe(map(state => state.ui.isLoading));
    // this.store.subscribe(data => console.log(data));
    // this.loadingSubs = this.uiService.loadingStateChange.subscribe(isLoading => {
    //   this.isLoading = isLoading; is working
    // });
    this.loginForm = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email]
      }),
      password: new FormControl('', { validators: [Validators.required] })
    });
  }

  onSubmit(form: NgForm) {
    console.log('The lgin form data: ' + form.value);
    this.authService.login({
      email: form.value.email,
      password: form.value.password
    });
    console.log('On submit has been started');
  }

  ngOnDestroy() {
    if(this.loadingSubs) {
      this.loadingSubs.unsubscribe();
    }
    
  }
}
