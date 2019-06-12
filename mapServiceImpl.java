package com.example.littleMap;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class mapServiceImpl implements mapService {
	@Autowired
	private mapMapper map;
	
	@Override
	public List<users> checkUser(String nickName) {
		// TODO Auto-generated method stub
		return map.selectUserFront(nickName);
	}

	@Override
	public int addUser(String nickName, String avatar) {
		// TODO Auto-generated method stub
		return map.insertUserFront(nickName, avatar);
	}

	@Override
	public int addSite(Integer userId, String time, Double latitude, Double longitude, Double altitude,
			Integer accuracy) {
		// TODO Auto-generated method stub
		return map.insertSiteFront(userId, time, latitude, longitude, altitude, accuracy);
	}

	@Override
	public List<site> paintRoute(String startTime, String endTime, Integer userId) {
		// TODO Auto-generated method stub
		return map.paintRouteFront(startTime, endTime, userId);
	}

	@Override
	public int addUserSupSer(users user) {
		// TODO Auto-generated method stub
		return map.insertUserBack(user);
	}

	@Override
	public int removeUserSupSer(Integer id) {
		// TODO Auto-generated method stub
		return map.deleteUserBack(id);
	}

	@Override
	public users updPreUserSupSer(Integer id) {
		// TODO Auto-generated method stub
		return map.updPreUserBack(id);
	}
	
	@Override
	public int updateUserSupSer(users user) {
		// TODO Auto-generated method stub
		return map.updateUserBack(user);
	}

	@Override
	public List<users> searchAllUserSer(Integer page, Integer limit) {
		// TODO Auto-generated method stub
		return map.selectAllUserBack((page-1)*limit, limit);
	}

	@Override
	public int addSiteSupSer(site site) {
		// TODO Auto-generated method stub
		return map.insertSiteBack(site);
	}

	@Override
	public int removeSiteSupSer(Integer id) {
		// TODO Auto-generated method stub
		return map.deleteSiteBack(id);
	}

	@Override
	public site updPreSiteSupSer(Integer id) {
		// TODO Auto-generated method stub
		return map.updPreSiteBack(id);
	}
	
	@Override
	public int updateSiteSupSer(site site) {
		// TODO Auto-generated method stub
		return map.updateSiteBack(site);
	}

	@Override
	public List<site> searchAllSiteSer(Integer page, Integer limit) {
		// TODO Auto-generated method stub
		return map.selectAllSiteBack((page-1)*limit, limit);
	}

}
