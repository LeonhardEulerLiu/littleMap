var hostIp = 'localhost';
var hostPort = '8080';
var urlHead = 'http://' + hostIp + ':' + hostPort + '/';

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
  //注意时间格式已经改为 yyyy-mm-dd hh:mm:ss
}

const formatYesterdayTime = date => {
  var today = date;
  var yesterday_ms = today.getTime() - 1000*60*60*24;
  var yesterday = date;
  yesterday.setTime(yesterday_ms);

  const year = yesterday.getFullYear()
  const month = yesterday.getMonth() + 1
  const day = yesterday.getDate()
  const hour = yesterday.getHours()
  const minute = yesterday.getMinutes()
  const second = yesterday.getSeconds()

  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
  //注意时间格式已经改为 yyyy-mm-dd hh:mm:ss
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function chooseLocation(page)
{
  var that = page;
  wx.chooseLocation({
    success: function (res) {
      store('location', res.name);
      store('latitude', res.latitude);
      store('longitude', res.longitude);
      wx.navigateTo({
        url: "/pages/map/map?isBack='true'"
      })
    }
  })
}

function store(key, value) {
  wx.setStorageSync(key, value);
}

function load(key) {
  return wx.getStorageSync(key);
}

function addSite() {
  var userId = load('userId');
  var time = load('bufferTime');
  var lat = load('bufferLat');
  var long = load('bufferLong');
  var alt = load('bufferAlt');
  var acc = load('bufferAcc');
  
  wx.request({
    url: urlHead + "map/front/addSite",   //使用传统的data方案（带有?）
    method: "GET",
    data: {
      userId: userId,
      time: time,     //自动生成坐标点，而非人工搜索；在后台自动type=1
      latitude: lat,
      longitude: long,
      altitude: alt,
      accuracy: acc
    },
    success: function(res) {
      console.log("Add ok!");
    },
    fail: function() {
      console.log("Add site failed!");
    }
  })
}

module.exports = {
  formatTime: formatTime,
  formatYesterdayTime: formatYesterdayTime,
  chooseLocation: chooseLocation,
  store: store,
  load: load,
  hostIp: hostIp,
  hostPort: hostPort,
  urlHead: urlHead,
  addSite: addSite
}
