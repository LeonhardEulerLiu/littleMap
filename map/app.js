//app.js
var utils = require('utils/util.js');
var api = require('./libs/api');

App({
  onLaunch: function () {
    wx.hideShareMenu();
    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let custom = wx.getMenuButtonBoundingClientRect();
        this.globalData.Custom = custom;
        this.globalData.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
      }
    })

    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })

    console.log(this.globalData);

    this.loadWeatherData();
    this.getUserInfo();
  },

  loadWeatherData: function () {
    var citySelected = wx.getStorageSync('citySelected') || [];
    if (citySelected.length == 0) {
      citySelected.unshift("__location__");
      wx.setStorageSync('citySelected', citySelected);
    }

    var that = this
    for (var idx in citySelected) {
      var cityCode = citySelected[idx];
      api.loadWeatherData(cityCode, function (cityCode, data) {
        var weatherData = wx.getStorageSync('weatherData') || {};
        weatherData[cityCode] = data;
        wx.setStorageSync('weatherData', weatherData);
      });
    }
  },

  getUserInfo: function () {
    var that = this
    wx.getUserInfo({
      withCredentials: false,
      success: function (res) {
        that.globalData.userInfo = res.userInfo
      }
    })
  },

  globalData: {
    userInfo: null,
    inc: 0,
    ColorList: [{
      title: '嫣红',
      name: 'red',
      color: '#e54d42'
    },
    {
      title: '桔橙',
      name: 'orange',
      color: '#f37b1d'
    },
    {
      title: '明黄',
      name: 'yellow',
      color: '#fbbd08'
    },
    {
      title: '橄榄',
      name: 'olive',
      color: '#8dc63f'
    },
    {
      title: '森绿',
      name: 'green',
      color: '#39b54a'
    },
    {
      title: '天青',
      name: 'cyan',
      color: '#1cbbb4'
    },
    {
      title: '海蓝',
      name: 'blue',
      color: '#0081ff'
    },
    {
      title: '姹紫',
      name: 'purple',
      color: '#6739b6'
    },
    {
      title: '木槿',
      name: 'mauve',
      color: '#9c26b0'
    },
    {
      title: '桃粉',
      name: 'pink',
      color: '#e03997'
    },
    {
      title: '棕褐',
      name: 'brown',
      color: '#a5673f'
    },
    {
      title: '玄灰',
      name: 'grey',
      color: '#8799a3'
    },
    {
      title: '草灰',
      name: 'gray',
      color: '#aaaaaa'
    },
    {
      title: '墨黑',
      name: 'black',
      color: '#333333'
    },
    {
      title: '雅白',
      name: 'white',
      color: '#ffffff'
    },
    ]
  },

  startTimer: function() {
    this.timer = setInterval(repeat, 1000*30);
  }
})

function repeat() {
  getApp().globalData.inc = getApp().globalData.inc + 1;
  buffering();
  console.log("半分钟了呀:" + getApp().globalData.inc);
  utils.addSite();
}

function getRand() {
  return 0.0006 - 0.001 * Math.random();    //一个方向
}

function randGen(lat, long) {
  var y1 = lat + getRand();
  var y2 = long + getRand();
  return [y1, y2];
}

function buffering() {
  var coord = randGen(utils.load('bufferLat'), utils.load('bufferLong'));
  utils.store('bufferTime', utils.formatTime(new Date()));
  utils.store('bufferLat', coord[0]);
  utils.store('bufferLong', coord[1]);
  utils.store('bufferAlt', utils.load('bufferAlt'));
  utils.store('bufferAcc', utils.load('bufferAcc'));
}

function buffering2() {
  wx.getLocation({
    type: 'gcj02',
    altitude: true,
    success: function (res) {
      //buffer update
      utils.store('bufferTime', utils.formatTime(new Date()));
      utils.store('bufferLat', res.latitude);
      utils.store('bufferLong', res.longitude);
      utils.store('bufferAlt', res.altitude);
      utils.store('bufferAcc', res.accuracy);
    }
  });
}