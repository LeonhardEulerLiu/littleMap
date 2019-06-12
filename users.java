package com.example.littleMap;

public class users {
	private Integer id;
	private String nickName;
	private String avatar;
	private Integer type;
	
	public users(Integer id, String nickName, String avatar, Integer type) {
		super();
		this.id = id;
		this.nickName = nickName;
		this.avatar = avatar;
		this.type = type;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getNickName() {
		return nickName;
	}

	public void setNickName(String nickName) {
		this.nickName = nickName;
	}

	public String getAvatar() {
		return avatar;
	}

	public void setAvatar(String avatar) {
		this.avatar = avatar;
	}

	public Integer getType() {
		return type;
	}

	public void setType(Integer type) {
		this.type = type;
	}

	@Override
	public String toString() {
		return "users {id: " + id + ", nickName: " + nickName + ", avatar: " + avatar + ", type: " + type + "}";
	}
	
}
