package com.example.littleMap;

import java.util.List;

public interface mapService {
	List<users> checkUser(String nickName);
	int addUser(String nickName, String avatar);
	int addSite(Integer userId, String time, Double latitude, Double longitude, Double altitude, Integer accuracy);
	List<site> paintRoute(String startTime, String endTime, Integer userId);
	
	int addUserSupSer(users user);
	int removeUserSupSer(Integer id);
	users updPreUserSupSer(Integer id);
	int updateUserSupSer(users user);
	List<users> searchAllUserSer(Integer page, Integer limit);
	
	int addSiteSupSer(site site);
	int removeSiteSupSer(Integer id);
	site updPreSiteSupSer(Integer id);
	int updateSiteSupSer(site site);
	List<site> searchAllSiteSer(Integer page, Integer limit);
	
//	List<users> searchUserSupSer(Integer page, Integer limit, String id, String nickName, String type);
//	List<site> searchSiteSupSer(Integer page, Integer limit, String id, String userId, String startTime, String endTime,
//			String type, String latitude, String longitude, String altitude);
}
