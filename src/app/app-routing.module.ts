import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostTableComponent } from './post-table/post-table.component';
import { PostDatailComponent } from './post-datail/post-datail.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'data-list', pathMatch: 'full' },
  {
    path: 'data-list',
    component: PostTableComponent,
  },
  {
    path: 'detail/:id',
    component: PostDatailComponent,
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
