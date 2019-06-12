// pages/routeRes/routeRes.js
var utils = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    startTime: '',
    endTime: '',
    latitude: 36.667197,
    longitude: 117.140007,
    scale: 16,
    points:
    [
      { latitude: 36.667197, longitude: 117.140007 },
      { latitude: 36.666990, longitude: 117.139471 },
      { latitude: 36.666440, longitude: 117.141809 },
      { latitude: 36.666646, longitude: 117.143569 },
      { latitude: 36.669951, longitude: 117.141294 },
      { latitude: 36.667197, longitude: 117.140007 }
    ],
    polyline:
    [
      {
        points:
        [
            { latitude: 36.667197, longitude: 117.140007 },
            { latitude: 36.666990, longitude: 117.139471 },
            { latitude: 36.666440, longitude: 117.141809 },
            { latitude: 36.666646, longitude: 117.143669 },
            { latitude: 36.669951, longitude: 117.141294 },
            { latitude: 36.667197, longitude: 117.140007 }
        ],
        color: "#ff6600",
        width: 2,
        arrowLine: "true"
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      startTime: options.start,
      endTime: options.end,
      latitude: utils.load('latitude'),
      longitude: utils.load('longitude')
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
    var that = this;
    that.mapCtx = wx.createMapContext('myMap');
    that.setData({
      latitude: that.data.points[0].latitude,
      longitude: that.data.points[0].longitude
    });
    getReady(that);
    console.log("Init ok!");
    console.log(that.data);
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

  magni: function() {
    var that = this;
    var sc = that.data.scale;
    that.setData({
      scale: sc+1
    })
  },

  reduce: function() {
    var that = this;
    var sc = that.data.scale;
    that.setData({
      scale: sc - 1
    })
  },

  getReady: function () {
    var that = this;
    //这是点击home图标后的行为，不必更新坐标点
    that.mapCtx.includePoints({
      padding: [10, 10, 10, 10],
      points: that.data.points
    });
    that.mapCtx.getScale({
      success: function (res) {
        let scale = res.scale;
        that.setData({
          scale: scale
        })
      }
    });
  }

})

function getReady(page) {
  var that = page;
  searchRoute(that);
  that.mapCtx.includePoints({
    padding: [10, 10, 10, 10],
    points: that.data.points
  });
  that.mapCtx.getScale({
    success: function (res) {
      let scale = res.scale;
      that.setData({
        scale: scale
      })
    }
  });
}

function searchRoute(page){
  var that = page;
  wx.request({
    url: utils.urlHead + "map/front/searchRoute", //使用传统的data方案（带有?）
    method: "GET",
    data:{
      startTime: that.data.startTime,
      endTime: that.data.endTime,
      userId: utils.load('userId')    //不用担心，日期中空格会自动被编码
    },
    success: function(res){
      console.log("Search route request ok!");
      var result = res.data;
      console.log(result);
      var coordList = [];
      for(var i=0; i<result.length; i++){
        coordList.push({
          latitude: result[i].latitude,
          longitude: result[i].longitude
        })
      }

      var poly = "polyline[0].points";
      that.setData({
        points: coordList,
        [poly]: coordList,
        latitude: coordList[0].latitude,
        longitude: coordList[0].longitude
      })
      console.log(that.data);
      console.log("Search route finished!");
    },
    fail: function() {
      console.log("Search route request failed!");
    }
  })
}
