<template>
    <!-- 上面是意思是湿度-humidness，压差-DifPressure，温度Temperature，露点-DewPoint，颗粒度大于0.5-G0.5，颗粒度大于5-G5.0 -->

    <!-- "humidness": 38.60951066017151,
		"DifPressure-Pa": 0.11773109436035156,
		"Temperature": 30.56986093521118,
		"DewPoint-C": 13.609511852264404,
		"G0.5": 7194699,
		"G5.0": 2473 -->
    
<!-- 	<div style="color:#fff">
		v1.0.0
	</div> -->
    <router-view></router-view>
    
</template>

<script lang="ts">
	import {
BASE_URL
} from "@/api/ENV";
import URL from "@/api/URL";
import setDetail from "@/components/setDetail/setDetail.vue";
import axios from "axios";
import {
defineComponent
} from "vue";
	export default defineComponent({
		name: "EngineView",
		data() {
			return {

				selectTemplate: 1,
				audioObj: new Audio(),
				audioStatus: 0,
				// audioFilePath:[
				//   "/audio/露点.mp3",
				//   "/audio/温度.mp3",
				//   "/audio/压差.mp3",
				//   "/audio/湿度.mp3",
				//   "/audio/0.5微米尘埃粒子.mp3",
				//   "/audio/5微米尘埃粒子.mp3"
				// ],
				audioFilePath: [
					"/audio/simple.mp3",
					"/audio/simple.mp3",
					"/audio/simple.mp3",
					"/audio/simple.mp3",
					"/audio/simple.mp3",
					"/audio/simple.mp3"
				],
				warningMsgList: [],

				warningAudio: false,


				data: {
					"items": {
						"humidness": { //湿度
							"is_waring": false, // 是否报警
						},
						"temperature": { //温度
							"is_waring": false, // 是否报警
						},
						"dif_pressure_pa": { //压差
							"is_waring": false, // 是否报警
						},
						"dew_point_c": { //露点
							"is_waring": false, // 是否报警
						},
						"g05": { //g0.5
							"is_waring": false, // 是否报警
						},
						"g50": { // G5.0
							"is_waring": false, // 是否报警
						}
					}
				},
				setDetailMask: false,
				maskShow: false,
				msg: "--",
				isActive: false,
				showDetail: false,
				listData: {
					dashboard_name: "",
					dew_point_c: "",
					g05: "",
					g50: "",
					humidness: "",
					temperature: "",
					dif_pressure_pa: "",
				},
				alarmsldup: "",
				alarmsldlow: "",
				alarmswdlow: "",
				alarmswdup: "",

				alarmsyclow: "",
				alarmsycup: "",

				alarmssdlow: "",
				alarmssdup: "",

				alarmsjjdslow: "",
				alarmsjjdsup: "",

				alarmsjjdlow: "",
				alarmsjjdup: "",

				gettime: "",
				gettimes: "",
				formNum: 0,
				ldType: true,
				ldTypeShow: false, //露点闪烁状态
				ldTypeTimer: {}, //露点闪烁定时器
				wdType: true,
				wdTypeShow: false, //温度闪烁状态
				wdTypeTimer: {}, //温度闪烁定时器
				ycType: true,
				ycTypeShow: false, //压差闪烁状态
				ycTypeTimer: {}, //压差闪烁定时器
				sdType: true,
				sdTypeShow: false, //湿度闪烁状态
				sdTypeTimer: {}, //湿度闪烁定时器
				jjdsType: true,
				jjdsTypeShow: false, //洁净度闪烁状态
				jjdsTypeTimer: {}, //洁净度闪烁定时器
				jjdType: true,
				jjdTypeShow: false, //洁净度闪烁状态
				jjdTypeTimer: {}, //洁净度闪烁定时器

				nowDate: "", // 当前日期
				nowTime: "", // 当前时间

				closeBtnType: false,
			};
		},
		components: {
			setDetail,
		},

		methods: {
			openWarningAudio() {
				this.warningAudio = true
				this.playList()
			},
			closeWarningAudio() {
				this.warningAudio = false
				this.audioObj["pause"]()
				this.audioStatus = 0
				this.warningMsgList = []
			},
			playList() {
				this.audioStatus = 0
				// 暂无消息队列时，定时扫描消息列表是否有消息，有则进入播报
				let interval = setInterval(() => {
					if (this.warningMsgList.length > 0) {
						this.playAudio()
						clearInterval(interval)
					}
				})
			},
			playAudio() {
				// 循环消息队列播报
				let that = this
				this.audioObj.removeEventListener("ended", that.audioEnd)
				this.audioObj["src"] = this.audioFilePath[this.warningMsgList[0]]
				// this.audioObj["play"]()
				setTimeout(() => this.audioObj["play"](), 3000)
				this.audioStatus = 1
				this.audioObj.addEventListener("ended", that.audioEnd)
			},
			audioEnd() {
				// 播报完毕后,还有消息接着播报，没有消息进入扫描消息队列状态
				this.warningMsgList.splice(0, 1)
				if (this.warningMsgList.length > 0) {
					this.playAudio()
				} else {
					this.playList()
				}
			},
			filterNum(value: any) {
				return value == -10086.11 ? 'NA' : value;
			},
			openBtn() {
				axios
					.get(`${BASE_URL}/startalarm`)
					.then((data) => {
						this.mqttMsg()
						this.getSet()
					})
					.catch((err) => {
						console.log(err);
					});
			},
			getSet() {
				let _this = this
				axios.get(`${BASE_URL}/getconfig`, {
					params: {
						'key': 'configuration'
					}
				}).then(function(response) {

				

					if (!(response.data.data.value.items.g50.is_waring && response.data.data.value.items
							.g05.is_waring && response.data.data.value.items.dew_point_c.is_waring &&
							response.data.data.value.items.humidness.is_waring && response.data.data.value
							.items.temperature.is_waring && response.data.data.value.items.dif_pressure_pa
							.is_waring)) {
						_this.closeBtnType = true
					} else {
						_this.closeBtnType = false
					}
				}).catch(function(error) {
					console.log("error", error)
				});




			},
			closeBtn() {
				axios
					.get(`${BASE_URL}/stopalarm`)
					.then((data) => {
						this.ldTypeShow = false
						this.wdTypeShow = false
						this.ycTypeShow = false
						this.sdTypeShow = false
						this.jjdsTypeShow = false
						this.jjdTypeShow = false
						clearInterval(this.ldTypeTimer)
						clearInterval(this.wdTypeTimer)
						clearInterval(this.ycTypeTimer)
						clearInterval(this.sdTypeTimer)
						clearInterval(this.jjdsTypeTimer)
						clearInterval(this.jjdTypeTimer)
						this.ldTypeTimer = {}
						this.wdTypeTimer = {}
						this.ycTypeTimer = {}
						this.sdTypeTimer = {}
						this.jjdsTypeTimer = {}
						this.jjdTypeTimer = {}
						this.mqttMsg()
						this.getSet()
					})
					.catch((err) => {
						console.log(err);
					});
			},
			closeIco() {
				this.setDetailMask = false;
			},
			goSet() {
				this.setDetailMask = true;
				this.showDetail = false
				this.maskShow = false


				// this.$router.push("/setDetail");
			},
			setChangeDetail() {
				this.setDetailMask = false;
			},
			selectEvent(index: number) {
				this.$router.push("/engine");
			},
			clickClose() {
				this.$data.isActive = false;
				this.$data.showDetail = false;
				this.$data.maskShow = false;
			},
			clickTab() {
				this.$data.isActive = true;
				this.$data.showDetail = true;
				this.$data.maskShow = true;
				this.getSet()
			},
			mqttMsg() {
				axios
					.get(`${BASE_URL}/realtime`)
					.then((data) => {

						this.listData = data.data.data;
						this.listData.dew_point_c = Number(this.listData.dew_point_c).toFixed(2)
						this.listData.g05 = (Number(this.listData.g05)).toFixed(2)
						this.listData.g50 = (Number(this.listData.g50)).toFixed(2)
						this.listData.humidness = Number(this.listData.humidness).toFixed(2)
						this.listData.temperature = Number(this.listData.temperature).toFixed(2)
						this.listData.dif_pressure_pa = Number(this.listData.dif_pressure_pa).toFixed(2)

						this.alarmsldup = (data.data.data.alarms.dew_point_c && data.data.data.alarms
							.dew_point_c.up_limit) ? data.data.data.alarms.dew_point_c.up_limit : "NA";
						this.alarmsldlow = (data.data.data.alarms.dew_point_c && data.data.data.alarms
							.dew_point_c.low_limit) ? data.data.data.alarms.dew_point_c.low_limit : "NA";

						this.alarmswdlow = (data.data.data.alarms.temperature && data.data.data.alarms
							.temperature.low_limit) ? data.data.data.alarms.temperature.low_limit : "NA";
						this.alarmswdup = (data.data.data.alarms.temperature && data.data.data.alarms
							.temperature.up_limit) ? data.data.data.alarms.temperature.up_limit : "NA";

						this.alarmsyclow = (data.data.data.alarms.dif_pressure_pa && data.data.data.alarms
								.dif_pressure_pa.low_limit) ? data.data.data.alarms.dif_pressure_pa.low_limit :
							"NA";
						this.alarmsycup = (data.data.data.alarms.dif_pressure_pa && data.data.data.alarms
								.dif_pressure_pa.up_limit) ? data.data.data.alarms.dif_pressure_pa.up_limit :
							"NA";

						this.alarmssdlow = (data.data.data.alarms.humidness && data.data.data.alarms.humidness
							.low_limit) ? data.data.data.alarms.humidness.low_limit : "NA";
						this.alarmssdup = (data.data.data.alarms.humidness && data.data.data.alarms.humidness
							.up_limit) ? data.data.data.alarms.humidness.up_limit : "NA";

						this.alarmsjjdslow = (data.data.data.alarms.g05 && data.data.data.alarms.g05
							.low_limit) ? data.data.data.alarms.g05.low_limit : "NA";
						this.alarmsjjdsup = (data.data.data.alarms.g05 && data.data.data.alarms.g05.up_limit) ?
							data.data.data.alarms.g05.up_limit : "NA";

						this.alarmsjjdlow = (data.data.data.alarms.g50 && data.data.data.alarms.g50
							.low_limit) ? data.data.data.alarms.g50.low_limit : "NA";
						this.alarmsjjdup = (data.data.data.alarms.g50 && data.data.data.alarms.g50.up_limit) ?
							data.data.data.alarms.g50.up_limit : "NA";

						this.ldType = true
						this.wdType = true
						this.ycType = true
						this.sdType = true
						this.jjdsType = true
						this.jjdType = true

						if (data.data.data.alarms.dew_point_c) {
							this.ldType =
								data.data.data.alarms.dew_point_c.up_waring != 1 &&
								data.data.data.alarms.dew_point_c.low_waring != 1;
							if (!this.ldType && JSON.stringify(this.ldTypeTimer) == "{}") {
								this.ldTypeShow = true //第一次变红并且定时器添加闪烁
								this.ldTypeTimer = setInterval(() => {
									this.ldTypeShow = !this.ldTypeShow
								}, 1000)
							}
							if (this.ldType && JSON.stringify(this.ldTypeTimer) != "{}") {
								this.ldTypeShow = false //变为正常色，取消定时器
								clearInterval(this.ldTypeTimer)
								this.ldTypeTimer = {}
							}
						}

						if (data.data.data.alarms.temperature) {
							this.wdType =
								data.data.data.alarms.temperature.up_waring != 1 &&
								data.data.data.alarms.temperature.low_waring != 1;
							if (!this.wdType && JSON.stringify(this.wdTypeTimer) == "{}") {
								this.wdTypeShow = true //第一次变红并且定时器添加闪烁
								this.wdTypeTimer = setInterval(() => {
									this.wdTypeShow = !this.wdTypeShow
								}, 1000)
							}
							if (this.wdType && JSON.stringify(this.wdTypeTimer) != "{}") {
								this.wdTypeShow = false //变为正常色，取消定时器
								clearInterval(this.wdTypeTimer)
								this.wdTypeTimer = {}
							}
						}

						if (data.data.data.alarms.dif_pressure_pa) {
							this.ycType =
								data.data.data.alarms.dif_pressure_pa.up_waring != 1 &&
								data.data.data.alarms.dif_pressure_pa.low_waring != 1;
							if (!this.ycType && JSON.stringify(this.ycTypeTimer) == "{}") {
								this.ycTypeShow = true //第一次变红并且定时器添加闪烁
								this.ycTypeTimer = setInterval(() => {
									this.ycTypeShow = !this.ycTypeShow
								}, 1000)
							}
							if (this.ycType && JSON.stringify(this.ycTypeTimer) != "{}") {
								this.ycTypeShow = false //变为正常色，取消定时器
								clearInterval(this.ycTypeTimer)
								this.ycTypeTimer = {}
							}
						}

						if (data.data.data.alarms.humidness) {
							this.sdType =
								data.data.data.alarms.humidness.up_waring != 1 &&
								data.data.data.alarms.humidness.low_waring != 1;
							if (!this.sdType && JSON.stringify(this.sdTypeTimer) == "{}") {
								this.sdTypeShow = true //第一次变红并且定时器添加闪烁
								this.sdTypeTimer = setInterval(() => {
									this.sdTypeShow = !this.sdTypeShow
								}, 1000)
							}
							if (this.sdType && JSON.stringify(this.sdTypeTimer) != "{}") {
								this.sdTypeShow = false //变为正常色，取消定时器
								clearInterval(this.sdTypeTimer)
								this.sdTypeTimer = {}
							}
						}
						if (data.data.data.alarms.g05) {
							this.jjdsType =
								data.data.data.alarms.g05.up_waring != 1 &&
								data.data.data.alarms.g05.low_waring != 1;
							if (!this.jjdsType && JSON.stringify(this.jjdsTypeTimer) == "{}") {
								this.jjdsTypeShow = true //第一次变红并且定时器添加闪烁
								this.jjdsTypeTimer = setInterval(() => {
									this.jjdsTypeShow = !this.jjdsTypeShow
								}, 1000)
							}
							if (this.jjdsType && JSON.stringify(this.jjdsTypeTimer) != "{}") {
								this.jjdsTypeShow = false //变为正常色，取消定时器
								clearInterval(this.jjdsTypeTimer)
								this.jjdsTypeTimer = {}
							}
						}

						if (data.data.data.alarms.g50) {
							this.jjdType =
								data.data.data.alarms.g50.up_waring != 1 &&
								data.data.data.alarms.g50.low_waring != 1;
							if (!this.jjdType && JSON.stringify(this.jjdTypeTimer) == "{}") {
								this.jjdTypeShow = true //第一次变红并且定时器添加闪烁
								this.jjdTypeTimer = setInterval(() => {
									this.jjdTypeShow = !this.jjdTypeShow
								}, 1000)
							}
							if (this.jjdType && JSON.stringify(this.jjdTypeTimer) != "{}") {
								this.jjdTypeShow = false //变为正常色，取消定时器
								clearInterval(this.jjdTypeTimer)
								this.jjdTypeTimer = {}
							}
						}

						if (this.warningAudio == true) {
							let warningMsg = [this.ldType, this.wdType, this.ycType, this.sdType, this
								.jjdsType, this.jjdType
							]
							warningMsg.forEach((item, index) => {
								if (!item) {
									this.addWarningMsgList(index)
								}
							})
						}
					})
					.catch((err) => {
						this.listData.dew_point_c = "NA"
						this.listData.g05 = "NA"
						this.listData.g50 = "NA"
						this.listData.humidness = "NA"
						this.listData.temperature = "NA"
						this.listData.dif_pressure_pa = "NA"
					});
			},
			addWarningMsgList(index: never) {
				if (this.audioStatus === 0) {
					// 无播放
					this.warningMsgList.push(index)
				} else {
					// 正在播放
					if (this.warningMsgList.length == 1 && this.audioObj["src"] != this.audioFilePath[index]) {
						this.warningMsgList.push(index)
					} else if (this.warningMsgList.length >= 1 && this.warningMsgList[this.warningMsgList.length -
							1] != index) {
						this.warningMsgList.push(index)
					}
				}
			},

			currentTime() {
				setInterval(this.getDate, 500);
			},
			getDate() {
				//获取当前时间并打印
				var _this = this;
				let yy = new Date().getFullYear();
				let mm = new Date().getMonth() + 1;
				let dd = new Date().getDate();
				let hh = new Date().getHours();
				let mf =
					new Date().getMinutes() < 10 ?
					"0" + new Date().getMinutes() :
					new Date().getMinutes();
				let ss =
					new Date().getSeconds() < 10 ?
					"0" + new Date().getSeconds() :
					new Date().getSeconds();
				_this.nowDate = yy + "/" + mm + "/" + dd;
				_this.nowTime = hh + ":" + mf + ":" + ss;
			},
			getTemplate() {
				axios
					.get(BASE_URL + URL.getCollectionServer).then((data) => {
						if (data?.status === 200 && data?.data?.code === 200) {
							let result = data.data.result
							this.selectTemplate = JSON.parse(result.content).selectTemplate
							switch (this.selectTemplate) {
								case 1:
									// this.$router.push("/engine/style1");
									break
								case 2:
									this.$router.push("/engine/style2");
									break
								case 3:
									this.$router.push("/engine/style3");
									break
								case 4:
									this.$router.push("/engine/style4");
									break
								case 5:
									this.$router.push("/engine/style5");
									break
								case 6:
									this.$router.push("/engine/style6");
									break
							}

						}

					}).catch((error) => {

					})
			}
		},
		created() {
			this.currentTime();
			this.getDate()
			// 获取模版编号
			this.getTemplate()
			setInterval(() => {
				// this.mqttMsg();
			}, 3000);

		},
	});
</script>

<style scoped>
.header-box {
    height: 135px;
    z-index: 800;
    background: url("/image/headerIco.png") no-repeat center top / cover;
}


.header-title {
    font-size: 84px;
    font-weight: 600;
    color: #07fefe;
    text-align: center;
    line-height: 120px;
    position: tive;
}

.tab-title {
    font-size: 22px;
    font-weight: 600;
    color: #5a93c8;
    line-height: 50px;
    width: 209px;
    text-align: center;
    z-index: 800;
}

.closeIco {
    position: absolute;
    right: 17px;
    top: 38px;
    display: block;
    width: 38px;
    height: 38px;
    background-image: url(../../assets/image/closeIco.png);
    background-size: 100% 100%;
    z-index: 999;
    cursor: pointer;
}

.setDetailMask {
    position: fixed;
    left: 30px;
    top: 60px;
    right: 30px;
    bottom: 30px;
    background-color: red;
    overflow-x: hidden;
    overflow-y: hidden;
    z-index: 100;
}

.pzBtn {
    z-index: 99;
    width: 300px;
    height: 136px;
    /* background: linear-gradient(180deg, #172f77 0%, #2d5ff7 100%); */
    /* border-radius: 6px 6px 6px 6px; */
    float: right;
    margin: 14px 0;
    color: #fff;
    font-size: 16px;
    line-height: 45px;
    text-align: center;
    font-weight: bold;
    position: absolute;
    right: 0px;
    top: 0px;
    cursor: pointer;
}

.saveBtn {
    width: 117px;
    height: 45px;
    background: linear-gradient(180deg, #172f77 0%, #2d5ff7 100%);
    border-radius: 6px 6px 6px 6px;
    margin: 14px 0;
    color: #fff;
    font-size: 16px;
    line-height: 45px;
    text-align: center;
    font-weight: bold;
    position: absolute;
    right: 15px;
    top: 80px;
    cursor: pointer;
}

.blank {
    width: 1799px;
    height: auto;
    overflow: hidden;
}

.mask {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 98;
    cursor: pointer;
}

.fontsize70 {
    font-size: 70px !important;
}

.blank33 {
    height: auto;
    overflow: hidden;
    width: 100%;
    margin-top: 30px;
}

.cl01FF00 {
    background-color: #01ff00 !important;
}

.closeBtn {
    width: 286px;
    height: auto;
    overflow: hidden;
    margin: 12px auto;
}

.closeBtn span:nth-child(1) {
    color: #000000;
    float: left;
    font-size: 30px;
    font-weight: bold;
    line-height: 40px;
}

.closeBtn span:nth-child(2) {
    cursor: pointer;
    width: 76px;
    height: 38px;
    background: #f0070a;
    border-radius: 0px 0px 0px 0px;
    float: right;
    font-size: 30px;
    color: #000000;
    line-height: 38px;
    font-weight: bold;
    text-align: center;
}

.cmList span:nth-child(2) {
    float: left;
    font-size: 35px;
    color: #fff;
    font-weight: bold;
    margin-bottom: 14px;
    margin-left: 30px;
}

.cmList span:nth-child(1) {
    float: left;
    font-size: 30px;
    color: #000000;
    font-weight: bold;
    margin-bottom: 14px;
    margin-left: 60px;
}

.cmList {
    width: 45%;
    height: auto;
    overflow: hidden;
    float: left;
}

.cmModule:nth-child(2n) {
    float: right;
}

.cmUl {
    padding: 0;
    height: auto;
    overflow: hidden;
    margin-top: 30px;
}

.cmModule {
    background-color: #bababa;
    height: 600px;
    width: 100%;
}

.cmHeader {
    width: 100%;
    height: 20px;
    color: #bababa;
    font-size: 12px;
    line-height: 20px;
    text-indent: 18px;
}

.clickModule {
    width: 1000px;
    height: auto;
    overflow: hidden;
    background-color: #fff;
    position: absolute;
    left: 50%;
    margin-left: -480px;
    top: 50%;
    margin-top: -370px;
    z-index: 99;
}

.active {
    background-color: #fe0000;
}

.plTime span:nth-child(2) {
    float: right;
    font-size: 80px;
    color: #ffffff;
}

.plTime span:nth-child(1) {
    float: left;
    font-size: 80px;
    color: #ffffff;
}

.plTime {
    
    position: fixed;
    bottom: 30px;
    left: 50%;
    margin-left: -400px;
}

.plNum {
    font-size: 128px;
    color: #fff;
    font-weight: bold;
    float: left;
    line-height: 120px;
    /* margin: 0 40px; */
}

.plUnit {
    float: right;
    margin: 0px 10px 0 0;
    font-size: 50px;
    color: #69c9fe;
    font-weight: bold;
    line-height: 120px;
}

.plName {
    font-size: 96px;
    font-weight: bold;
    color: #69c9fe;
    line-height: 120px;
    float: left;
    letter-spacing: 15px;
}

.plIco {
    display: block;
    width: 94px;
    height: 94px;
    float: left;
    border-radius: 25px;
    margin: 15px 22px 0 22px;
}

.padList div {
    width: 100%;
    height: auto;
    overflow: hidden;
}

.padList {
    width: 100%;
    height: 120px;
    box-shadow: 0px 0px 6px 1px #22baff;
    border-radius: 12px 12px 12px 12px;
    opacity: 1;
    border: 5px solid #17b7ff;
    padding: 20px 0px;
    cursor: pointer;
}

.boardCenter .bcList:nth-child(2n) .blPadding {
    padding-left: 0px;
}

.blPadding {
    padding: 12px 26px 12px 20px;
}

.bcList {
    width: 50%;
    height: auto;
    overflow: hidden;
    float: left;
}

.boardCenter {
    width: 100%;
    height: auto;
    overflow: hidden;
    margin: 20px auto;
    min-height: 200px;
}

.height {
    height: calc(100% - 155px);
}

.engine-box {
    padding: 18px 22px;
    width: calc(100% - 44px);
}
</style>
