package com.example.littleMap;
import java.util.List;

public interface mapMapper {
	List<users> selectUserFront(String nickName);
	int insertUserFront(String nickName, String avatar);
	int insertSiteFront(Integer userId, String time, Double latitude, Double longitude, Double altitude, Integer accuracy);
	List<site> paintRouteFront(String startTime, String endTime, Integer userId);
	
	int insertUserBack(users user);
	int deleteUserBack(Integer id);
	users updPreUserBack(Integer id);
	int updateUserBack(users user);
	List<users> selectAllUserBack(Integer start, Integer limit);
	
	int insertSiteBack(site site);
	int deleteSiteBack(Integer id);
	site updPreSiteBack(Integer id);
	int updateSiteBack(site site);
	List<site> selectAllSiteBack(Integer start, Integer limit);
}
