package com.example.littleMap;

public class site {
	private Integer id;
	private Integer userId;
	private String time;
	private Integer type;
	private Double latitude;
	private Double longitude;
	private Double altitude;
	private Integer accuracy;
	
	public site(Integer id, Integer userId, String time, Integer type, Double latitude, Double longitude,
			Double altitude, Integer accuracy) {
		super();
		this.id = id;
		this.userId = userId;
		this.time = time;
		this.type = type;
		this.latitude = latitude;
		this.longitude = longitude;
		this.altitude = altitude;
		this.accuracy = accuracy;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	public String getTime() {
		return time;
	}

	public void setTime(String time) {
		this.time = time;
	}

	public Integer getType() {
		return type;
	}

	public void setType(Integer type) {
		this.type = type;
	}

	public Double getLatitude() {
		return latitude;
	}

	public void setLatitude(Double latitude) {
		this.latitude = latitude;
	}

	public Double getLongitude() {
		return longitude;
	}

	public void setLongitude(Double longitude) {
		this.longitude = longitude;
	}

	public Double getAltitude() {
		return altitude;
	}

	public void setAltitude(Double altitude) {
		this.altitude = altitude;
	}

	public Integer getAccuracy() {
		return accuracy;
	}

	public void setAccuracy(Integer accuracy) {
		this.accuracy = accuracy;
	}

	@Override
	public String toString() {
		return "site {id: " + id + ", userId: " + userId + ", time: " + time + ", type: " + type + ", latitude: "
				+ latitude + ", longitude: " + longitude + ", altitude: " + altitude + ", accuracy: " + accuracy + "}";
	}
	
}
