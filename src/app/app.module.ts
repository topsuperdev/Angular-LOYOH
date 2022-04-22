import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';

import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';

import { ComponentsModule } from './components/components.module';
import { ExamplesModule } from './examples/examples.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ApiException, IssuerProgramsServiceProxy, ProfileServiceProxy, TokenAuthServiceProxy } from './components/passes.service';
import { AuthInterceptor } from './auth.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    RouterModule,
    ComponentsModule,
    ExamplesModule,
    AppRoutingModule,
    HttpClientModule,
    ImageCropperModule,
    BrowserAnimationsModule
  ],
  providers: [
    TokenAuthServiceProxy,
    IssuerProgramsServiceProxy,
    ProfileServiceProxy,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    }],
  exports: [ImageCropperModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
