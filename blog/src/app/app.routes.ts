
import { NgrxOperatorsComponent } from './posts/ngrx-operators/ngrx-operators.component';
import { AsyncComponent } from './posts/async/async.component';
import { Routes } from '@angular/router';


export const routes: Routes = [
  { path: 'ngrx-operators', component: NgrxOperatorsComponent },
  { path: 'async', component: AsyncComponent },
];