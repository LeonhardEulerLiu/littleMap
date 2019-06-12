// pages/welcome/welcome.js
var utils = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    btn_color_user: 'blue',
    btn_text_user: '授予用户信息权限',
    btn_icon_user: '',
    btn_color_map: 'blue',
    btn_text_map: '授予位置权限',
    btn_icon_map: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getSetting({
      success(res) {
        console.log(res);
        if (res.authSetting['scope.userInfo'] && res.authSetting['scope.userLocation']) {
          beforeMap();
          console.log("请关注onLoad");
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  bindGetUserInfo: function (e) {
    console.log(e.detail.userInfo)
    var that = this;
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      that.setData({
        btn_color_user: 'green',
        btn_text_user: '已授权',
        btn_icon_user: 'cuIcon-check'
      })
    } else {
      //用户按了拒绝按钮
      that.setData({
        btn_color_user: 'red',
        btn_text_user: '未授权',
        btn_icon_user: 'cuIcon-close'
      })
    }
  },

  getGeo: function(event) {
    var that = this;
    wx.getLocation({
      success: function (res) {
        that.setData({
          btn_color_map: 'green',
          btn_text_map: '已授权',
          btn_icon_map: 'cuIcon-check'
        })
      },
      fail: function (res) {
        that.setData({
          btn_color_map: 'red',
          btn_text_map: '未授权',
          btn_icon_map: 'cuIcon-close'
        })
      }
    });
  },

  checkEntry: function(){
    var that = this;
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo'] && res.authSetting['scope.userLocation']) {
          beforeMap();
          console.log("请关注checkEntry");
        }
        else {
          wx.showModal({
            title: '授权不成功',
            content: '授权不成功，无法进入小程序。是否要改变权限？',
            success: function(res){
              if(res.confirm){
                wx.openSetting({
                  success: function(res){}
                })
              }
            }
          })
        }
      }
    });
  }
})

function getUser() {
    wx.getUserInfo({
      success: function (res) {
        var userInfo = res.userInfo;
        utils.store('nickName', userInfo.nickName);
        utils.store('avatar', userInfo.avatarUrl);
        console.log("向用户请求身份成功！");
        getGeo();
      },
      fail: function () {
        console.log("向用户请求身份失败！");
      }
    });
}

function getGeo() {
  wx.getLocation({
    type: 'gcj02',
    altitude: true,
    success: function (res) {
      utils.store('time', utils.formatTime(new Date()));
      utils.store('location', '我的位置');    //默认地点值
      utils.store('latitude', res.latitude);
      utils.store('longitude', res.longitude);
      utils.store('altitude', res.altitude);
      utils.store('accuracy', res.accuracy);

      //buffer initialize
      utils.store('bufferTime', utils.formatTime(new Date()));
      utils.store('bufferLat', res.latitude);
      utils.store('bufferLong', res.longitude);
      utils.store('bufferAlt', res.altitude);
      utils.store('bufferAcc', res.accuracy);

      console.log("向用户请求位置成功！");
      requestUser1();
    },
    fail: function (res) {
      console.log("向用户请求位置失败！");
    }
  });
}

function requestUser1() {
    var nickName = utils.load('nickName');
    wx.request({
      url: utils.urlHead + "map/front/searchUser/" + nickName,
      method: "GET",
      success: function (res) {
        console.log("数据库查询用户名中...1");
        console.log(res.data);
        if (res.data.length == 0) {
          console.log("数据库没有此人1");
          utils.store('isHere', 0);
          addUser();
        }
        else {
          console.log("res.data: " + res.data);
          console.log("数据库有这个人1，是" + res.data[0].id);
          utils.store("userId", res.data[0].id);
          utils.store('isHere', 1);
          addOriSite();
        }
      },
      fail: function () {
        console.log("数据库查询失败！1");
      }
    })
}

function requestUser2() {
  var nickName = utils.load('nickName');
  wx.request({
    url: utils.urlHead + "map/front/searchUser/" + nickName,
    method: "GET",
    success: function (res) {
      console.log("数据库查询用户名中...2");
      console.log(res.data);
      if (res.data.length == 0) {
        console.log("数据库没有此人2");
        utils.store('isHere', 0);
      }
      else {
        console.log("res.data: " + res.data);
        console.log("数据库有这个人2，是" + res.data[0].id);
        utils.store("userId", res.data[0].id);
        utils.store('isHere', 1);
        addOriSite();
      }
    },
    fail: function () {
      console.log("数据库查询失败！2");
    }
  })
}

function addUser() {
    var nickName = utils.load('nickName');
    var avatar = utils.load('avatar');
    wx.request({
      url: utils.urlHead + "map/front/addUser", //使用传统的data方案（带有?）
      method: 'GET',
      data: {
        nickName: nickName,
        avatar: avatar
      },
      success: function (res) {
        console.log("添加新用户成功!");
        requestUser2();
      },
      fail: function () {
        console.log("添加新用户失败!");
      }
    })
}

function addOriSite() {
    var userId = utils.load('userId');
    var time = utils.load('bufferTime');
    var lat = utils.load('bufferLat');
    var long = utils.load('bufferLong');
    var alt = utils.load('bufferAlt');
    var acc = utils.load('bufferAcc');

    wx.request({
      url: utils.urlHead + "map/front/addSite",   //使用传统的data方案（带有?）
      method: "GET",
      data: {
        userId: userId,
        time: time,     //自动生成坐标点，而非人工搜索；在后台自动type=1
        latitude: lat,
        longitude: long,
        altitude: alt,
        accuracy: acc
      },
      success: function (res) {
        console.log("添加初始地点成功!");
        startAccess();
      },
      fail: function () {
        console.log("添加初始地点失败!");
      }
    })
}

function startAccess() {
  getApp().startTimer();
  wx.redirectTo({
    url: '/pages/map/map'
  })
}

function beforeMap() {
  getUser();
}