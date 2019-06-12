package com.example.littleMap;

public class pager {
	private Integer start;
	private Integer limit;
	
	public pager(Integer start, Integer limit) {
		super();
		this.start = start;
		this.limit = limit;
	}

	public Integer getStart() {
		return start;
	}

	public void setStart(Integer start) {
		this.start = start;
	}

	public Integer getLimit() {
		return limit;
	}

	public void setLimit(Integer limit) {
		this.limit = limit;
	}

	@Override
	public String toString() {
		return "pager {start: " + start + ", limit: " + limit + "}";
	}
}
