package com.rayonit.cameraManagement.Model;

public class ChartData {

	private String id;
	private String count;
	public ChartData(String id, String count) {
		this.setId(id);
		this.setCount(count);
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getCount() {
		return count;
	}
	public void setCount(String count) {
		this.count = count;
	}
}
