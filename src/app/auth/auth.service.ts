import { AuthData } from './auth-data.model';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { TrainingService } from '../training/training.service';
import { UIService } from '../shared/ui.service';
import { Store } from '@ngrx/store';
import * as fromRoot from '../app.reducer';
import * as UI from '../shared/ui.action';
import * as Auth from './auth.actions';

@Injectable()
export class AuthService {

  /**
   *
   */
  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private trainingService: TrainingService,
    private uiService: UIService,
    private store: Store<fromRoot.State>
  ) {}

  initAuthListener() {
    this.afAuth.authState.subscribe(user => {
      console.log(user);
      if (user) {
        this.store.dispatch(new Auth.SetAuthenticated());
        //this.authChange.next(true);
        this.router.navigate(['/training']);
      } else {
        this.trainingService.cancelSubscription();
        //this.authChange.next(false);
        this.router.navigate(['/login']);
        this.store.dispatch(new Auth.SetUnauthenticated());
      }
    });
  }

  registerUser(authData: AuthData) {
    //this.uiService.loadingStateChange.next(true);
    this.store.dispatch(new UI.StartLoading());
    this.afAuth.auth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        console.log(result);
      })
      .catch(error => {
        //this.uiService.loadingStateChange.next(false);
        this.store.dispatch(new UI.StopLoading());
        console.log(error);
        this.uiService.showSnackbar(error.message, null, 3000);
      });
  }

  login(authData: AuthData) {
    //this.uiService.loadingStateChange.next(true);
    this.store.dispatch(new UI.StartLoading());
    this.afAuth.auth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        console.log(result);
        this.store.dispatch(new UI.StopLoading());
      })
      .catch(error => {
        //this.uiService.loadingStateChange.next(false);
        this.store.dispatch(new UI.StopLoading());
        console.log(error);
        this.uiService.showSnackbar(error.message, null, 3000);
      });
  }

  logout() {
    this.afAuth.auth.signOut();
  }

}
