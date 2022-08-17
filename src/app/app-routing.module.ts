import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommanTableComponent } from './Components/comman-table/comman-table.component';
import { DispalyComponent } from './Components/dispaly/dispaly.component';
import { FormsComponent } from './Components/forms/forms.component';
import { CustomeComponent } from './ReuseableTable/custome/custome.component';

const routes: Routes = [
  { path: 'home', component: FormsComponent },
  { path: 'display', component: DispalyComponent },
  { path: 'comman', component: CommanTableComponent },
  { path: 'custome', component: CustomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
