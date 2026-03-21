import { Routes } from '@angular/router';
import { HomeComponent } from './FEATURES/pages/home/home.component';
import { WineNoteComponent } from './FEATURES/pages/tasting/wine-note/wine-note.component';
import { WineCatalogComponent } from './FEATURES/pages/catalog/wine-catalog/wine-catalog.component';


export const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: 'login',
    loadComponent: () =>
      import('./FEATURES/pages/login/login.component')
      .then(m => m.LoginComponent)
  },

  {
    path: 'app',
    loadComponent: () =>
      import('./FEATURES/layouts/tabs/tabs.component')
      .then(m => m.TabsComponent),

    children: [

      {
        path: 'home',
        loadComponent: () =>
          import('./FEATURES/pages/home/home.component')
            .then(m => m.HomeComponent)
      },

      {
        path: 'note',
        loadComponent: () =>
          import('./FEATURES/pages/tasting/wine-note/wine-note.component')
            .then(m => m.WineNoteComponent)
      },

      {
        path: 'catalog',
        loadComponent: () =>
          import('./FEATURES/pages/catalog/wine-catalog/wine-catalog.component')
            .then(m => m.WineCatalogComponent)
      },

      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      }

    ]
  }

];

  // {
  //   path: '',
  //   redirectTo: 'login',
  //   pathMatch: 'full'
  // },

  // {
  //   path: 'login',
  //   loadComponent: () =>
  //     import('./FEATURES/auth/pages/login/login.component')
  //       .then(m => m.LoginComponent)
  // },
  // {
  //   path: 'auth-callback',
  //   loadComponent: () =>
  //     import('./FEATURES/auth/pages/login/login.component')
  //       .then(m => m.LoginComponent)
  // },
  // {
  //   path: 'home',
  //   loadComponent: () =>
  //     import('./FEATURES/auth/pages/home/home.component')
  //       .then(m => HomeComponent)
  // },
  // {
  //   path: 'note',
  //   loadComponent: () =>
  //     import('./FEATURES/auth/pages/tasting/wine-note/wine-note.component')
  //       .then(m => WineNoteComponent)
  // },
  // {
  //   path: 'catalog',
  //   loadComponent: () =>
  //     import('./FEATURES/auth/pages/catalog/wine-catalog/wine-catalog.component')
  //       .then(m => WineCatalogComponent)
  // },    

  // {
  //   path: '**',
  //   redirectTo: 'login'
  // }

