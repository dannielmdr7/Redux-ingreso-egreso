import { AppState } from 'src/app/app.reducer';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit, OnDestroy {
  user = ''
  userSubscription = new Subscription

  constructor(private authService: AuthService, private router: Router, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.userSubscription = this.store.select('user').subscribe(({ user }) => {
      this.user = user.nombre
    })
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  logout() {
    this.authService.logout().then(user => {
      console.log({ user });

      this.router.navigate(['/login']);
    })

  }

}
