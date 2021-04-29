import { CameraService } from '../camera.service';
import { Camera } from '../Camera';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-camera',
  templateUrl: './create-camera.component.html',
  styleUrls: ['./create-camera.component.css']
})
export class CreateCameraComponent implements OnInit {

  camera: Camera = new Camera();

  ipPattern = "^([0-9]{1,3}\.){3}[0-9]{1,3}$";
  resPattern = "([0-9]+)x([0-9]+)";

  constructor(private cameraService: CameraService,
    private router: Router) { }

  ngOnInit() {
  }

  newCamera(): void {
    this.camera = new Camera();
  }

  save() {
    
    this.cameraService.createCamera(this.camera)
      .subscribe(data => console.log(data), error => console.log(error));
    this.camera = new Camera();
    this.gotoList();
  }

  onSubmit() {
    //this.submitted = true;
    this.save();    
  }

  gotoList() {
    this.router.navigate(['/cameras']);
  }
}