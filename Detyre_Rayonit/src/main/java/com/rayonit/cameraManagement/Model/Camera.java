package com.rayonit.cameraManagement.Model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Cameras")
public class Camera {
  @Id
  private String id;

  private String name;
  private String resolution;
  
  
  private String IP;
  
  public Camera (String name, String resolution, String IP) {
	  this.name = name;
	  this.resolution = resolution;
	  this.IP = IP;
  }
  public String getId() {
	return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getResolution() {
		return resolution;
	}
	public void setResolution(String resolution) {
		this.resolution = resolution;
	}
	public String getIP() {
		return IP;
	}
	public void setIP(String iP) {
		IP = iP;
	}


@Override
public String toString() {
	return "Camera [Id=" + id + ", Name=" + name + ", Resolution=" + resolution + ", Ip=" + IP
			+ "]";
}
 
}
