import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateCameraComponent } from './create-camera/create-camera.component';
import { CameraListComponent } from './camera-list/camera-list.component';
import { CameraDetailsComponent } from './camera-details/camera-details.component';
import { UpdateCameraComponent } from './update-camera/update-camera.component';
import { HttpClientModule } from '@angular/common/http'; 
import {NgxPaginationModule} from 'ngx-pagination';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    CreateCameraComponent,
    CameraListComponent,
    CameraDetailsComponent,
    UpdateCameraComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
