/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = ''
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

//柱形图的颜色
var colors = {'#4C4FCE', '#1BD56E', '#D8FF00', '#413232', '#F90000', '#BCBEC2'};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: -1,
  nowGraTime: "day"
}

/**
 * 渲染图表
 */
function renderChart() {

}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
  // 确定是否选项发生了变化 

  // 设置对应数据

  // 调用图表渲染函数
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
  // 确定是否选项发生了变化 
  alert(this.value);
  // 设置对应数据

  // 调用图表渲染函数
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {

}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
  var citySelect = document.getElementById('city-select');
  for (var city in aqiSourceData) {
    var newCity = document.createElement('option');
    newCity.innerHTML = city;
    citySelect.appendChild(newCity);
  }
  // 给select设置事件，当选项发生变化时调用函数citySelectChange
  citySelect.addEventListener('change', citySelectChange);
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  var week = 0, weekValueCount = 0, singleWeek = {},
        month = 0, monthValueCount = 0, singleMonth = {};

  for (var key in aqiSourceData) {
    var tempValue = aqiSourceData[key]; //城市污染数据
    var dayArr = Object.getOwnPropertyNames(tempValue); //日期
    var tempMonth = dayArr[0].slice(5, 7); //当前日期的月份
    var weekInit = 4, weekDaysCount = 0; //2016 - 01 - 01是星期五,因此weekInit初始化为4; weekDaysCount记录一周的天数

    for (var i = 0; i < darArr.length; ++i) {
      weekValueCount += tempValue[dayArr[i]];
      monthValueCount += tempValue[dayArr[i]];
      ++weekDaysCount;
      
    }
  }
}

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm()
  initCitySelector();
  initAqiChartData();
}

init();