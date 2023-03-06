import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppShellComponent } from './components/app-shell/app-shell.component';
import { AuthGuard } from './services/auth/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  },
  {
    path: '',
    component: AppShellComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
      { path: 'attendance', loadChildren: () => import('./pages/attendance/attendance.module').then(m => m.AttendanceModule) },
      { path: 'timetable', loadChildren: () => import('./pages/timetable/timetable.module').then(m => m.TimetableModule) },
      { path: 'notes', loadChildren: () => import('./pages/notes/notes.module').then(m => m.NotesModule) },
      { path: 'marks', loadChildren: () => import('./pages/marks/marks.module').then(m => m.MarksModule) },
      { path: 'profile', loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfileModule) },
      { path: 'menties', loadChildren: () => import('./pages/menties/menties.module').then(m => m.MentiesModule) },
      { path: 'assignments', loadChildren: () => import('./pages/assignments/assignments.module').then(m => m.AssignmentsModule) },
      { path: 'placement', loadChildren: () => import('./pages/placement/placement.module').then(m => m.PlacementModule) },
      {
        path: '**',
        redirectTo: '/home',
      },
    ],
  },
  {
    path: '**',
    redirectTo: '/home',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
