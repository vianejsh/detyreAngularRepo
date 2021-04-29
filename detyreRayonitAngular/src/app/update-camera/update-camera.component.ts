import { Component, OnInit } from '@angular/core';
import { Camera } from '../Camera';
import { ActivatedRoute, Router } from '@angular/router';
import { CameraService } from '../camera.service';

@Component({
  selector: 'app-update-camera',
  templateUrl: './update-camera.component.html',
  styleUrls: ['./update-camera.component.css']
})
export class UpdateCameraComponent implements OnInit {

  id: number;
  camera: Camera;

  constructor(private route: ActivatedRoute,private router: Router,
    private cameraService: CameraService) { }

  ngOnInit() {
    this.camera = new Camera();

    this.id = this.route.snapshot.params['id'];
    
    this.cameraService.getCamera(this.id)
      .subscribe(data => {
        console.log(data)
        this.camera = data;
      }, error => console.log(error));
  }

  updateCamera() {
    this.cameraService.updateCamera(this.id, this.camera)
      .subscribe(data => console.log(data), error => console.log(error));
    this.camera = new Camera();
    this.gotoList();
  }

  onSubmit() {
    this.updateCamera();    
  }

  gotoList() {
    this.router.navigate(['/cameras']);
  }
}