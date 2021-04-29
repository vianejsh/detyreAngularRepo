package com.rayonit.cameraManagement.Controller;

import com.rayonit.cameraManagement.Repository.CameraRepository;
import com.mongodb.BasicDBObject;
import com.mongodb.client.model.Accumulators;
import com.rayonit.cameraManagement.Model.*;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.bson.conversions.Bson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.TypedAggregation;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api")
public class CameraController {

  @Autowired
  CameraRepository cameraRepository;

  public CameraController (CameraRepository repository) {
	  this.cameraRepository = repository;
  }
  
  /*@GetMapping("/cameras")
  public List<Camera> getAllCameras() {
	  
      List<Camera> allCameras = cameraRepository.findAll();

      return allCameras;
  }
  */
  @GetMapping("/cameras")
  public Page<Camera> getAllCameras(Pageable pageable) {
	  
      Page<Camera> allCameras = cameraRepository.findAll(pageable);

      return allCameras;
  }
  
  @GetMapping("/cameras/chart")
  public List<ChartData> getChartData(){
	  return cameraRepository.chartData();
  }
  
  /*
  public ResponseEntity<List<Camera>> getAllCameras(@RequestParam(required = false) String name) {
    try {
      List<Camera> camera = new ArrayList<Camera>();

      if (name == null)
    	  cameraRepository.findAll().forEach(camera::add);
      else
        cameraRepository.findByName(name).forEach(camera::add);

      if (camera.isEmpty()) {
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
      }

      return new ResponseEntity<>(camera, HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }*/

  @GetMapping("/cameras/{id}")
  public ResponseEntity<Camera> getCameraById(@PathVariable("id") String id) {
    Optional<Camera> cameraData = cameraRepository.findById(id);
    if (cameraData.isPresent()) {
      return new ResponseEntity<>(cameraData.get(), HttpStatus.OK);
    } else {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
  }

 @PostMapping("/cameras")
  public ResponseEntity<Camera> createCamera(@RequestBody Camera camera) {
    try {
      Camera _camera = cameraRepository.save(new Camera(camera.getName(), camera.getResolution(), camera.getIP()));
      return new ResponseEntity<>(_camera, HttpStatus.CREATED);
    } catch (Exception e) {
      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


  @PutMapping("/cameras/{id}")
  public ResponseEntity<Camera> updateCamera(@PathVariable("id") String id, @RequestBody Camera camera) {
    Optional<Camera> cameraData = cameraRepository.findById(id);

    if (cameraData.isPresent()) {
      Camera _camera = cameraData.get();
      _camera.setName(camera.getName());
      _camera.setResolution(camera.getResolution());
      _camera.setIP(camera.getIP());
      return new ResponseEntity<>(cameraRepository.save(_camera), HttpStatus.OK);
    } else {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
  }

  @DeleteMapping("/cameras/{id}")
  public ResponseEntity<HttpStatus> deleteCamera(@PathVariable("id") String id) {
    try {
    	cameraRepository.deleteById(id);
      return new ResponseEntity<>(HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @DeleteMapping("/cameras")
  public ResponseEntity<HttpStatus> deleteAllCameras() {
    try {
    	cameraRepository.deleteAll();
      return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    } catch (Exception e) {
      return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}