import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { NgrxOperatorsComponent } from './posts/ngrx-operators/ngrx-operators.component';
import { AsyncComponent } from './posts/async/async.component';

const routes: Routes = [
  { path: 'ngrx-operators', component: NgrxOperatorsComponent },
  { path: 'async', component: AsyncComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
