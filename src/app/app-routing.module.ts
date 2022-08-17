import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommanTableComponent } from './Components/comman-table/comman-table.component';
import { DispalyComponent } from './Components/dispaly/dispaly.component';
import { FormsComponent } from './Components/forms/forms.component';

const routes: Routes = [
  { path: '', component: FormsComponent },
  { path: 'home', component: FormsComponent },
  { path: 'display', component: DispalyComponent },
  { path: 'comman', component: CommanTableComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
