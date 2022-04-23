import { NgModule } from '@angular/core';
import { CommonModule, LocationStrategy, PathLocationStrategy, HashLocationStrategy} from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { ComponentsComponent } from './components/components.component';
// import { ProfileComponent } from './examples/profile/profile.component';
// import { SignupComponent } from './examples/signup/signup.component';
// import { LandingComponent } from './examples/landing/landing.component';
// import { NucleoiconsComponent } from './components/nucleoicons/nucleoicons.component';
import { CustomerIssuerComponent } from './components/customer-issuer/customer-issuer.component';

const routes: Routes = [
  
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: ComponentsComponent },
  // { path: 'user-profile', component: ProfileComponent },
  // { path: 'signup', component: SignupComponent },
  // { path: 'landing', component: LandingComponent },
  // { path: 'nucleoicons', component: NucleoiconsComponent },
  { path: 'register', component: CustomerIssuerComponent },
  {
    path: 'register',
    component: CustomerIssuerComponent,
    children:[
               {
                 path:':type', //:type is dynamic here
                 component:CustomerIssuerComponent
               }
             ]
  },  
  // {
  //   path: ':type',
  //   component: CustomerIssuerComponent,    
  //   children:[
  //     {
  //       path:'register', 
  //       component:CustomerIssuerComponent
  //     }
  //   ]
  // },
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true
    })
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy} 
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
