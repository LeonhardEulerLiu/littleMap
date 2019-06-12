// pages/home/home.js
var utils = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isBack: 'false',
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

  chooseLocation: function () {
    var that = this;
    utils.chooseLocation(that);
  },

  gotoRoute: function() {
    wx.navigateTo({
      url: "/pages/route/route"
    })
  },

  gotoAbout: function () {
    wx.navigateTo({
      url: "/pages/about/about"
    })
  },

  gotoMap: function () {
    wx.redirectTo({
      url: '/pages/map/map'
    })
  },

  gotoWeather: function () {
    wx.navigateTo({
      url: '/pages/weather/weather'
    })
  }
})