import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from "./home/home.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { EditServerComponent } from "./servers/edit-server/edit-server.component";
import { ServerComponent } from "./servers/server/server.component";
import { ServersComponent } from "./servers/servers.component";
import { UserComponent } from "./users/user/user.component";
import { UsersComponent } from "./users/users.component";

const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'users', component: UsersComponent, children:[
      { path: ':id/:name', component: UserComponent }
    ]},
    { path: 'servers', component: ServersComponent, children: [
      //add child routes
      { path: ':id', component: ServerComponent },
      { path: ':id/edit', component: EditServerComponent },
    ]},
    {path: 'not-found', component: PageNotFoundComponent},
    //use wildcard to catch all unknown routes, routes checked top to bottom ::keep last
    {path: '**', redirectTo: '/not-found'}
  ];

  
@NgModule({
    imports:[
        RouterModule.forRoot(appRoutes)
    ],
    //specify what inside this module is accessible if it(this module) is imported by something
    exports:[RouterModule]
})
export class AppRoutingModule{

}