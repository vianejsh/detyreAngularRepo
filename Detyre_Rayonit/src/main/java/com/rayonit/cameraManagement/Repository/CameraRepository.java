package com.rayonit.cameraManagement.Repository;

import com.rayonit.cameraManagement.Model.*;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface CameraRepository extends MongoRepository<Camera, String> {
  List<Camera> findByName(String name);
  List<Camera> findByIP(String IP);
  Optional<Camera> findById(String id);
  
  Page<Camera> findAll(Pageable pageable);
  
  @Aggregation("{'$group': {'_id':'$resolution', 'count' :{$sum: 1}} }")
  List<ChartData> chartData();
}
