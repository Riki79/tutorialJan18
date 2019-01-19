import {Routes} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MessagesComponent } from './messages/messages.component';
import { ListsComponent } from './lists/lists.component';
import { AuthGuard } from './_guards/auth.guard';
export const appRoutes: Routes = [
        { path: '', component: HomeComponent },
        // Example of guarding a list of routes
        { path: '', runGuardsAndResolvers: 'always', canActivate: [AuthGuard], children: [
                { path: 'members', component: MemberListComponent},
                { path: 'messages', component: MessagesComponent}
        ]},
        // Example of guarding a single route
        { path: 'lists', component: ListsComponent, canActivate: [AuthGuard]},
        { path: '**', redirectTo: '', pathMatch: 'full' }
        ];
