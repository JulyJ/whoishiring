import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'jobs',
        loadComponent: () => import('./pages/jobs/jobs.page.component').then((m) => m.JobsPageComponent),
    },
];
