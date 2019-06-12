// pages/route/route.js
var utils = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    today: '',
    yesterday: '',
    startTime: '09:01',
    startDate: '2015-08-31',
    endTime: '09:01',
    endDate: '2015-09-01',
    nickName: '???',
    avatar: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    that.setData({
      nickName: utils.load('nickName'),
      avatar: utils.load('avatar')
    })
    var time = new Date();
    var today = utils.formatTime(time);
    var yesterday = utils.formatYesterdayTime(time);
    that.setData({
      today: today,
      yesterday: yesterday,
      startTime: getTime(yesterday),
      startDate: getDate(yesterday),
      endTime: getTime(today),
      endDate: getDate(today)
    })
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

  startDateChange: function(res) {
    this.setData({
      startDate: res.detail.value
    })
  },

  startTimeChange: function (res) {
    this.setData({
      startTime: res.detail.value
    })
  },

  endDateChange: function (res) {
    this.setData({
      endDate: res.detail.value
    })
  },

  endTimeChange: function (res) {
    this.setData({
      endTime: res.detail.value
    })
  },

  toNow: function () {
    var that = this;
    var timestamp = utils.formatTime(new Date());
    console.log(timestamp);
    var list = timestamp.trim().split(/\s+/);
    var date = list[0];
    var time = list[1].substr(0, 5);
    that.setData({
      endDate: date,
      endTime: time
    })
  },
  
  searchRoute: function () {
    var that = this;
    var start = combine(that.data.startDate, that.data.startTime);
    var end = combine(that.data.endDate, that.data.endTime);
    wx.navigateTo({
      url: "/pages/routeRes/routeRes?start=" + start + "&end=" + end
    })
  },

  gotoMap: function () {
    wx.redirectTo({
      url: '/pages/map/map'
    })
  },

  gotoHome: function () {
    wx.redirectTo({
      url: '/pages/home/home'
    })
  },

  chooseLocation: function () {
    var that = this;
    utils.chooseLocation(that);
  }
})

function getDate(str) {
  var list = str.trim().split(/\s+/);
  var date = list[0];
  return date;
}

function getTime(str) {
  var list = str.trim().split(/\s+/);
  var time = list[1].substr(0, 5);
  return time;
}

function combine(date, time) {
  var res = date + " " + time + ":00";
  console.log(res);
  return res;
}