import {Routes} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MessagesComponent } from './messages/messages.component';
import { ListsComponent } from './lists/lists.component';
import { AuthGuard } from './_guards/auth.guard';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberDetailResolver } from './_resolvers/member-detail-resolver';
import { MemberListResolver } from './_resolvers/member-list-resolver';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberEditResolver } from './_resolvers/member-edit-resolver';

export const appRoutes: Routes = [
        { path: '', component: HomeComponent },
        // Example of guarding a list of routes
        { path: '', runGuardsAndResolvers: 'always',
                canActivate: [AuthGuard],
                children: [
                { path: 'members', component: MemberListComponent,
                resolve: {users: MemberListResolver}},
                { path: 'members/:id', component: MemberDetailComponent,
                        resolve: {user: MemberDetailResolver}},         // Adding the :id will defines a route parameter
                { path: 'member/edit', component: MemberEditComponent,
                resolve: {user: MemberEditResolver} },
                { path: 'messages', component: MessagesComponent}
        ]},
        // Example of guarding a single route
        { path: 'lists', component: ListsComponent, canActivate: [AuthGuard]},
        { path: '**', redirectTo: '', pathMatch: 'full' }
        ];
