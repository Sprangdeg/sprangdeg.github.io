import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { NgrxOperatorsComponent } from './posts/ngrx-operators/ngrx-operators.component';

const routes: Routes = [
  { path: 'NgrxOperators', component: NgrxOperatorsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
