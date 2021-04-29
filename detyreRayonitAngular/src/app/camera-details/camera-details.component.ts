import { Camera } from '../Camera';
import { Component, OnInit, Input } from '@angular/core';
import { CameraService } from '../camera.service';
import { CameraListComponent } from '../camera-list/camera-list.component';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-Camera-details',
  templateUrl: './Camera-details.component.html',
  styleUrls: ['./Camera-details.component.css']
})
export class CameraDetailsComponent implements OnInit {

  id!: number;
  Camera!: Camera;

  constructor(private route: ActivatedRoute,private router: Router,
    private CameraService: CameraService) { }

  ngOnInit() {
    this.Camera = new Camera();

    this.id = this.route.snapshot.params['id'];
    
    this.CameraService.getCamera(this.id)
      .subscribe(data => {
        console.log(data)
        this.Camera = data;
      }, error => console.log(error));
  }

  list(){
    this.router.navigate(['cameras']);
  }
}