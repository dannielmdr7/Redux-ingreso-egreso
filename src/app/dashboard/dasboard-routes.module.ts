import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../services/auth.guard';
import { DashboardComponent } from './dashboard.component';
import { dashBoardRoutes } from './dashboard.routes';


const rutasHijas = [ 
  {
      path:'',
      component:DashboardComponent,
      children:dashBoardRoutes,
      // canActivate:[AuthGuard]
    },
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(rutasHijas)
  ],
  exports:[
    RouterModule  
  ]
})
export class DasboardRoutesModule { }
