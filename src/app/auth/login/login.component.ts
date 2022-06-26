import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { AuthService } from 'src/app/services/auth.service';
import * as uiActions from 'src/app/shared/ui.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm!: FormGroup;
  cargando = false;
  uiSubscription!: Subscription;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private store: Store<AppState>) {
    this.uiSubscription = this.store.select('ui').subscribe(ui => {


      this.cargando = ui.isLoading
    });
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

  }
  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }
  login() {
    this.store.dispatch(uiActions.isLoading());
    // Swal.fire({
    //   title: 'Espere por favor',
    //   didOpen: () => {
    //     Swal.showLoading()
    //   }
    // });
    if (this.loginForm.invalid) return;
    const { correo, password } = this.loginForm.value;
    this.authService.login(correo, password).then(user => {
      // Swal.close()
      this.store.dispatch(uiActions.stopLoading());
      this.router.navigate(['/']);
    })
      .catch(err => {
        uiActions.stopLoading();
      });

  }

}
