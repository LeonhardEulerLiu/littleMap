package com.example.littleMap;

public class routePara {
	private String startTime;
	private String endTime;
	private Integer userId;
	
	public routePara(String startTime, String endTime, Integer userId) {
		super();
		this.startTime = startTime;
		this.endTime = endTime;
		this.userId = userId;
	}

	public String getStartTime() {
		return startTime;
	}

	public void setStartTime(String startTime) {
		this.startTime = startTime;
	}

	public String getEndTime() {
		return endTime;
	}

	public void setEndTime(String endTime) {
		this.endTime = endTime;
	}

	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	@Override
	public String toString() {
		return "routePara {startTime: " + startTime + ", endTime: " + endTime + ", userId: " + userId + "}";
	}
}
