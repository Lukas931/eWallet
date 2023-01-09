import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DetailItemComponent } from './components/detail-item/detail-item.component';
import { OverviewComponent } from './components/overview/overview.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { ItemsComponent } from './components/items/items.component';

const routes: Routes = [
  {path:'', redirectTo:'/dashboard', pathMatch:'full'},
  {path: 'dashboard', component:DashboardComponent, data: { reuseRoute: true }},
  {path: 'detail/:id', component:DetailItemComponent},
  {path: 'overview', component:OverviewComponent},
  {path: 'categories', component:CategoriesComponent},
  {path: 'items', component:ItemsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
