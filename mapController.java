package com.example.littleMap;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.List;
import java.util.Map;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping(value="/map")
public class mapController {
	@Autowired
	private mapServiceImpl service;

	@ResponseBody
	@RequestMapping(value="/front/searchUser/{nickName}", method=RequestMethod.GET)
	public List<users> lookupUser(@PathVariable String nickName) throws UnsupportedEncodingException {
		return service.checkUser(URLDecoder.decode(nickName, "UTF-8"));
	}
	
	@ResponseBody
	@RequestMapping(value="/front/addUser", method=RequestMethod.GET)
	public int appendUser(String nickName, String avatar) throws UnsupportedEncodingException {
		return service.addUser(URLDecoder.decode(nickName, "UTF-8"),
				URLDecoder.decode(avatar, "UTF-8"));
	}
	
	@ResponseBody
	@RequestMapping(value="/front/addSite", method=RequestMethod.GET)
	public int appendSite(Integer userId, String time, Double latitude, Double longitude, Double altitude, Integer accuracy) {
		return service.addSite(userId, time, latitude, longitude, altitude, accuracy);
	}
	
	@ResponseBody
	@RequestMapping(value="/front/searchRoute", method=RequestMethod.GET)
	public List<site> lookupRoute(String startTime, String endTime, Integer userId) {
		return service.paintRoute(startTime, endTime, userId);
	}
	
	@ResponseBody
	@RequestMapping(value="/back/addUser", method=RequestMethod.POST)
	public int addUserSupCon(@RequestBody users user) {
		return service.addUserSupSer(user);
	}
	
	@ResponseBody
	@RequestMapping(value="/back/removeUser", method=RequestMethod.POST)
	public int removeUserSupCon(@RequestBody Map map) {
		return service.removeUserSupSer(Integer.parseInt(map.get("id")+""));
	}
	
	@ResponseBody
	@RequestMapping(value="/back/removeUserGroup", method=RequestMethod.POST)
	public int removeUserGroup(@RequestBody Map<String, Object> map) {
		List<Integer> a = (List<Integer>)map.get("deleted");
		for(int i=0; i<a.size(); i++) {
			service.removeUserSupSer(a.get(i));
		}
		return 200;
	}
	
	@ResponseBody
	@RequestMapping(value="/back/updPreUser", method=RequestMethod.POST)
	public users updPreUserSupCon(@RequestBody Map map) {
		return service.updPreUserSupSer(Integer.parseInt(map.get("id")+""));
	}
	
	@ResponseBody
	@RequestMapping(value="/back/updateUser", method=RequestMethod.POST)
	public int updateUserSupCon(@RequestBody users user) {
		return service.updateUserSupSer(user);
	}
	
	@ResponseBody
	@RequestMapping(value="/back/searchAllUser")
	public List<users> searchAllUserCon(Integer page, Integer limit) {
		return service.searchAllUserSer(page, limit);
	}
	
	@ResponseBody
	@RequestMapping(value="/back/addSite", method=RequestMethod.POST)
	public int addSiteSupCon(@RequestBody site site) {
		return service.addSiteSupSer(site);
	}
	
	@ResponseBody
	@RequestMapping(value="/back/removeSite", method=RequestMethod.POST)
	public int removeSiteSupCon(@RequestBody Map map) {
		return service.removeSiteSupSer(Integer.parseInt(map.get("id")+""));
	}
	
	@ResponseBody
	@RequestMapping(value="/back/removeSiteGroup", method=RequestMethod.POST)
	public int removeSiteGroup(@RequestBody Map<String, Object> map) {
		List<Integer> a = (List<Integer>)map.get("deleted");
		for(int i=0; i<a.size(); i++) {
			service.removeSiteSupSer(a.get(i));
		}
		return 200;
	}
	
	@ResponseBody
	@RequestMapping(value="/back/updPreSite", method=RequestMethod.POST)
	public site updPreSiteSupCon(@RequestBody Map map) {
		return service.updPreSiteSupSer(Integer.parseInt(map.get("id")+""));
	}
	
	@ResponseBody
	@RequestMapping(value="/back/updateSite", method=RequestMethod.POST)
	public int updateSiteSupCon(@RequestBody site site) {
		return service.updateSiteSupSer(site);
	}
	
	@ResponseBody
	@RequestMapping(value="/back/searchAllSite")
	public List<site> searchAllSiteCon(Integer page, Integer limit) {
		return service.searchAllSiteSer(page, limit);
	}
	
	@RequestMapping(value="/backpage/login")
	public String login() {
		return "login";
	}
	
	@RequestMapping(value = "/backpage/timoTool")
	public String timoTool() {
		return "timoTool";
	}
	
	@RequestMapping(value="/backpage/selectUserPage")
	public String selectUserPage() {
		return "selectUserPage";
	}
	
	@RequestMapping(value="/backpage/insertUserPage")
	public String insertUserPage() {
		return "insertUserPage";
	}
	
	@RequestMapping(value="/backpage/updateUserPage")
	public String updateUserPage() {
		return "updateUserPage";
	}
	
	@RequestMapping(value="/backpage/selectSitePage")
	public String selectSitePage() {
		return "selectSitePage";
	}
	
	@RequestMapping(value="/backpage/insertSitePage")
	public String insertSitePage() {
		return "insertSitePage";
	}
	
	@RequestMapping(value="/backpage/updateSitePage")
	public String updateSitePage() {
		return "updateSitePage";
	}
	
	@RequestMapping(value="/backpage/showLocationPage")
	public String showLocationPage() {
		return "showLocationPage";
	}
}
