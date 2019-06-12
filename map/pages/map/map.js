// pages/map/map.js
var utils = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    scale: 16,
    latitude: 36.667197,
    longitude: 117.140007,
    lat_abs: 36.667197,
    long_abs: 117.140007,
    lat_direc: '北纬',
    long_direc: '东经',
    location: '我的位置'
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
    this.mapCtx = wx.createMapContext('bigMap');
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    var lat = utils.load('latitude');
    that.setData({
      latitude: utils.load('latitude'),
      longitude: utils.load('longitude'),
      lat_abs: utils.load('latitude'),
      long_abs: utils.load('longitude'),
      location: utils.load('location')
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

  //与utils不同
  chooseLocation: function(){
    var that = this;
    utils.chooseLocation(that);
  },

  magni: function () {
    var that = this;
    var sc = that.data.scale;
    that.setData({
      scale: sc + 1
    })
  },

  reduce: function () {
    var that = this;
    var sc = that.data.scale;
    that.setData({
      scale: sc - 1
    })
  },
  
  backToMe: function () {
    this.mapCtx.moveToLocation();
  }
})