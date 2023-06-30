<template>
	<!-- 上面是意思是湿度-humidness，压差-DifPressure，温度Temperature，露点-DewPoint，颗粒度大于0.5-G0.5，颗粒度大于5-G5.0 -->

	<!-- "humidness": 38.60951066017151,
		"DifPressure-Pa": 0.11773109436035156,
		"Temperature": 30.56986093521118,
		"DewPoint-C": 13.609511852264404,
		"G0.5": 7194699,
		"G5.0": 2473 -->
	<div class="pzBtn" @click="goSet"></div>
	<div class="header-box flex-vcenter flex-hcenter">
		<div class="header-title">{{ listData.dashboard_name }}</div>
	</div>
	<div class="height" @click="clickTab">
		<div class="flex-row height">
			<div class="boardCenter">
				<div class="bcList">
					<div class="blPadding">
						<div class="padList">
							<div :class="{ active: ldTypeShow }">
								<img class="plIco" src="../../../assets/image/oneIco.png" />
								<span class="plName">{{listData?.dew_point_c.findIndex(item=>item.id===dew_point_cId)!==-1?dew_point_cName:'露点'}}:</span>
								<span class="plNum">{{ listData?.dew_point_c.find(item=>item.id===dew_point_cId)?.value? listData?.dew_point_c.find(item=>item.id===dew_point_cId)?.value:'NA' }}</span>
								<span class="plUnit">℃</span>
							</div>
						</div>
					</div>
				</div>
				<div class="bcList">
					<div class="blPadding">
						<div class="padList">
							<div :class="{ active: wdTypeShow }">
								<img class="plIco" src="../../../assets/image/oneIco.png" />
								<span class="plName">{{listData?.temperature.findIndex(item=>item.id===temperatureId)!==-1?temperatureName:'温度'}}:</span>
								<span class="plNum">{{ listData?.temperature.find(item=>item.id===temperatureId)?.value?listData?.temperature.find(item=>item.id===temperatureId)?.value:'NA' }}</span>
								<span class="plUnit">℃</span>
							</div>
						</div>
					</div>
				</div>
				<div class="bcList">
					<div class="blPadding">
						<div class="padList">
							<div :class="{ active: sdTypeShow }">
								<img class="plIco" src="../../../assets/image/sd.png" />
								<span class="plName">{{listData?.humidness.findIndex(item=>item.id===humidnessId)!==-1?humidnessName:'湿度'}}:</span>
								<span class="plNum">{{ listData?.humidness.find(item=>item.id===humidnessId)?.value?listData?.humidness.find(item=>item.id===humidnessId)?.value:"NA" }}</span>
								<span class="plUnit">%</span>
							</div>
						</div>
					</div>
				</div>
				<div class="bcList">
					<div class="blPadding">
						<div class="padList">
							<div :class="{ active: ycTypeShow }">
								<img class="plIco" src="../../../assets/image/yc.png" />
								<span class="plName">{{listData?.dif_pressure_pa.findIndex(item=>item.id===dif_pressure_paId)!==-1?dif_pressure_paName:'压差'}}:</span>
								<span class="plNum">{{ listData?.dif_pressure_pa.find(item=>item.id===dif_pressure_paId)?.value?listData?.dif_pressure_pa.find(item=>item.id===dif_pressure_paId)?.value:'NA' }}</span>
								<span class="plUnit">Pa</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- 弹框 -->
		<div class="clickModule" v-if="showDetail">
			<div class="cmHeader">参数设置</div>
			<div class="cmModule">
				<div class="cmUl">
					<div class="closeBtn">
						<span>报警屏蔽按钮</span>
						<span class="cl01FF00" @click="openBtn" v-if="!closeBtnType">开启</span>
						<span  @click="closeBtn" v-else>关闭</span>
					</div>
					<div class="closeBtn">
						<span>语音报警功能</span>
						<span @click="openWarningAudio"   v-if="!warningAudio">关闭</span>
						<span class="cl01FF00" @click="closeWarningAudio"     v-else>开启</span>
					</div>
					<div class="blank33">
						<div class="cmList">
							<span>露点报警上限:</span>
							<span>{{ alarmsldup }}</span>
						</div>
						<div class="cmList">
							<span>露点报警下限:</span>
							<span>{{ alarmsldlow }}</span>
						</div>
						<div class="cmList">
							<span>温度报警上限:</span>
							<span>{{ alarmswdup }}</span>
						</div>
						<div class="cmList">
							<span>温度报警下限:</span>
							<span>{{ alarmswdlow }}</span>
						</div>
						<div class="cmList">
							<span>压差报警上限:</span>
							<span>{{ alarmsycup }}</span>
						</div>
						<div class="cmList">
							<span>压差报警下限:</span>
							<span>{{ alarmsyclow }}</span>
						</div>
						<div class="cmList">
							<span>湿度报警上限:</span>
							<span>{{ alarmssdup }}</span>
						</div>
						<div class="cmList">
							<span>湿度报警下限:</span>
							<span>{{ alarmssdlow }}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="mask" v-if="maskShow" @click="clickClose"></div>
	<i class="closeIco" @click="closeIco" v-if="setDetailMask"></i>
	<div class="setDetailMask" v-if="setDetailMask">
		<setDetail @setChangeDetail="setChangeDetail" />
	</div>
	<div class="plTime">
		<span>{{ nowDate }}</span>
	</div>
</template>

<script lang="ts">
	import {
		ElLoading
	} from 'element-plus'
	import * as _ from 'lodash'
	import {
		BASE_URL
	} from "@/api/ENV";
	import URL from "@/api/URL";
	import setDetail from "@/components/setDetail/setDetail.vue";
	import initMqttClient from "@/utils/mqtt2";
	import axios from "axios";
	import {
		defineComponent
	} from "vue";
	let audio = null
	let src = '/audio/simple.mp3'
	export default defineComponent({
		name: "EngineView",
		data() {
			return {
				showWarning1: false,
				showWarning2: false,
				showWarning3: false,
				showWarning4: false,
				result: [],
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
					dew_point_c: [{
						name: '露点',
						value: 'NA',
						type: '',
						isAlarm: 0,
						id: ''
					}],
					g05: [{
						name: '洁净度',
						value: 'NA',
						type: '',
						isAlarm: 0,
						id: ''
					}],
					g50: [{
						name: '洁净度',
						value: 'NA',
						type: '',
						isAlarm: 0,
						id: ''
					}],
					humidness: [{
						name: '湿度',
						value: 'NA',
						type: '',
						isAlarm: 0,
						id: ''
					}],
					temperature: [{
						name: '温度',
						value: 'NA',
						type: '',
						isAlarm: 0,
						id: ''
					}],
					dif_pressure_pa: [{
						name: '压差',
						value: 'NA',
						type: '',
						isAlarm: 0,
						id: ''
					}],
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

				closeBtnType: false,
				alarmsldWarning: false,
				alarmswdWarning: false,
				alarmsycWarning: false,
				alarmssdWarning: false,
				alarmsjjdsWarning: false,
				alarmsjjdlowWarning: false,
				dew_point_cName: "露点",
				temperatureName: "温度",
				dif_pressure_paName: "压差",
				humidnessName: "湿度",
				g05Name: "洁净度",
				g50Name: "洁净度",

				dew_point_cId: "",
				temperatureId: "",
				dif_pressure_paId: "",
				humidnessId: "",
				g05Id: "",
				g50Id: "",
				
				postData:""


			};
		},
		components: {
			setDetail,
		},
		watch: {

			listData: function(newData, oldData) {
				// console.log(this.listData)
				let msgResult = ''
				// case "1":
				// 	// 露点报警上下限
				// 	this.alarmsldup = item.alarmSuperiorLimit
				// 	this.alarmsldlow = item.alarmLowerLimit
				// 	break;
				// case "2":
				// 	// 温度报警上下限
				// 	this.alarmswdup = item.alarmSuperiorLimit
				// 	this.alarmswdlow = item.alarmLowerLimit
				// 	break
				// case "5":
				// 	//  g0.5报警上下线
				// 	this.alarmsjjdsup = item.alarmSuperiorLimit
				// 	this.alarmsjjdslow = item.alarmLowerLimit
				// 	break
				// case "6":
				// 	//  g50报警上下线
				// 	this.alarmsjjdup = item.alarmSuperiorLimit
				// 	this.alarmsjjdlow = item.alarmLowerLimit
				// 	break

				// 1.alarmsldWarning 露点 2.alarmswdWarning 温度 3.alarmsycWarning 压差 4.alarmssdWarning 湿度 5.alarmsjjdsWarning g05 6.alarmsjjdlowWarning g50
				let dew_point_c = this.listData?.dew_point_c.find(item => item.id === this.dew_point_cId)
				let temperature = this.listData?.temperature.find(item => item.id === this.temperatureId)
				let dif_pressure_pa = this.listData?.dif_pressure_pa.find(item => item.id === this.dif_pressure_paId)
				let humidness = this.listData?.humidness.find(item => item.id === this.humidnessId)
				let g05 = this.listData?.g05.find(item => item.id === this.g05Id)
				let g50 = this.listData?.g50.find(item => item.id === this.g50Id)
				// console.log(dew_point_c?.value)
				// console.log(this.alarmsldup)
				// console.log(dew_point_c?.value > this.alarmsldup)

				// 1.露点报警上下限 alarmsldup alarmsldlow
				// 2.温度报警上下限 alarmswdup alarmswdlow
				// 3.压差报警上下限 alarmsycup alarmsyclow
				// 4.湿度报警上下限 alarmssdup alarmssdlow
				// 5.g0.5报警上下线 alarmsjjdsup alarmsjjdslow
				// 6.g5.0报警上下限  alarmsjjdup alarmsjjdlow
				// console.log(this.alarmsldWarning)
				if ((this.alarmsldWarning && this.alarmsldup && dew_point_c?.value > this.alarmsldup) ||
					(this.alarmsldWarning && this.alarmsldlow && dew_point_c?.value < this.alarmsldlow)
				) {
					this.showWarning1 = true
					msgResult += this.dew_point_cName
				} else {
					this.showWarning1 = false
				}
				if ((this.alarmswdWarning && this.alarmswdup && temperature?.value > this.alarmswdup) ||
					(this.alarmswdWarning && this.alarmswdlow && temperature?.value < this.alarmswdlow)) {
					this.showWarning2 = true
					msgResult += this.temperatureName
				} else {
					this.showWarning2 = false
				}
				if ((this.alarmsycWarning && this.alarmsycup && dif_pressure_pa?.value > this.alarmsycup) ||
					(this.alarmsycWarning && this.alarmsyclow && dif_pressure_pa?.value < this.alarmsyclow)) {
					this.showWarning3 = true
					msgResult += this.dif_pressure_paName
				} else {
					this.showWarning3 = false
				}
				if ((this.alarmssdWarning && this.alarmssdup && humidness?.value > this.alarmssdup) ||
					(this.alarmssdWarning && this.alarmssdlow && humidness?.value < this.alarmssdlow)) {
					this.showWarning4 = true
					msgResult += this.humidnessName
				} else {
					this.showWarning4 = false
				}
				if ((this.alarmsjjdsWarning && this.alarmsjjdsup && g05?.value > this.alarmsjjdsup) ||
					(this.alarmsjjdsWarning && this.alarmsjjdslow && g05?.value < this.alarmsjjdslow)) {
					this.showWarning5 = true
					msgResult += this.g05Name
				} else {
					this.showWarning5 = false
				}
				if ((this.alarmsjjdlowWarning && this.alarmsjjdup && g50?.value > this.alarmsjjdup) ||
					(this.alarmsjjdlowWarning && this.alarmsjjdlow && g50?.value < this.alarmsjjdlow)) {
					this.showWarning6 = true
					msgResult += this.g50Name
				} else {
					this.showWarning6 = false
				}
				if (msgResult) {
					
					this.playAudio()
				}
			},
			// closeBtnType: function() {
			// 	// if(!this.closeBtnType){
			// 	this.warningAudio = this.closeBtnType
			// 	// }
			// }

		},
		methods: {
			openWarningAudio() {
				const loading = ElLoading.service({
				    lock: true,
				    text: 'Loading',
				    background: 'rgba(0, 0, 0, 0.7)',
				  })
				this.warningAudio = true
				this.postData.alarmtone = this.warningAudio
				let url = BASE_URL + URL.postCollectionServer
				axios({
					url,
					data: this.postData,
					method: 'post',
					headers: {
						'Content-Type': 'application/json',
					},
				}).then((res) => {
					loading.close()
				}).catch(()=>{
					loading.close()
				})
			},
			closeWarningAudio() {
				const loading = ElLoading.service({
				    lock: true,
				    text: 'Loading',
				    background: 'rgba(0, 0, 0, 0.7)',
				  })
				this.warningAudio = false
				this.postData.alarmtone = this.warningAudio
				let url = BASE_URL + URL.postCollectionServer
				axios({
					url,
					data: this.postData,
					method: 'post',
					headers: {
						'Content-Type': 'application/json',
					},
				}).then((res) => {
					loading.close()
				}).catch(()=>{
					loading.close()
				})
				this.audioObj["pause"]()
				this.audioStatus = 0
				this.warningMsgList = []
			},
			playList() {
				this.audioStatus = 0
				// 暂无消息队列时，定时扫描消息列表是否有消息，有则进入播报
				let interval = setInterval(() => {
					if (this.warningMsgList.length > 0) {
						// this.playAudio()
						clearInterval(interval)
					}
				})
			},
			playAudio(text: any) {
				// 循环消息队列播报
				// let that = this
				// this.audioObj.removeEventListener("ended", that.audioEnd)
				// this.audioObj["src"] = this.audioFilePath[this.warningMsgList[0]]
				// // this.audioObj["play"]()
				// setTimeout(() => this.audioObj["play"](), 3000)
				// this.audioStatus = 1
				// this.audioObj.addEventListener("ended", that.audioEnd)
				if (this.warningAudio) {
					// var msg = new SpeechSynthesisUtterance(text);
					// window.speechSynthesis.cancel();
					// window.speechSynthesis.speak(msg);
					 if( audio!= null ) {
					    audio.pause();
					    audio = null;
					  }
					  //然后再new Audio创建新的音频
					  audio= new Audio()
					  audio["src"] = src
					  audio["play"]()
					
					
				}

			},
			audioEnd() {
				// 播报完毕后,还有消息接着播报，没有消息进入扫描消息队列状态
				this.warningMsgList.splice(0, 1)
				if (this.warningMsgList.length > 0) {
					// this.playAudio()
				} else {
					this.playList()
				}
			},
			filterNum(value: any) {
				return value == -10086.11 ? 'NA' : value;
			},
			openBtn() {
				const loading = ElLoading.service({
				    lock: true,
				    text: 'Loading',
				    background: 'rgba(0, 0, 0, 0.7)',
				  })
				axios({
					url: BASE_URL + URL.updateDevice,
					data: this.result.map((item: any) => {
						item.isAlarm = 1
						return item
					}),
					method: 'put',
					headers: {
						'Content-Type': 'application/json'
					}
				}).then(res => {
					// this.$emit("setChangeDetail");
					// this.closeBtnType = !this.closeBtnType
					this.closeBtnType = !this.closeBtnType
					this.getList()
					loading.close()
				}).catch(()=>{
					loading.close()
				})
			},
			getSet() {

				// let a = [{
				// 	address
				// 	: 
				// 	null,
				// 	alarmLowerLimit
				// 	: 
				// 	null,
				// 	alarmSuperiorLimit
				// 	: 
				// 	null,
				// 	attributeName
				// 	: 
				// 	"",
				// 	baudRate
				// 	: 
				// 	null,
				// 	com
				// 	: 
				// 	"COM2",
				// 	conType
				// 	: 
				// 	null,
				// 	configLowerLimit
				// 	: 
				// 	null,
				// 	configSuperiorLimit
				// 	: 
				// 	null,
				// 	dataType
				// 	: 
				// 	null,
				// 	deviation
				// 	: 
				// 	"",
				// 	enable
				// 	: 
				// 	0,
				// 	isAlarm
				// 	: 
				// 	0,
				// 	name
				// 	: 
				// 	null,
				// 	slaveId
				// 	: 
				// 	null

				// }]
				// console.log(a)
				// const list = a.map(item=>item.isAlarm = item.isAlarm===1?0:1)
				// console.log(list)
				// console.log(this.result[0])
				//          let _this = this
				//          axios.get(`${BASE_URL}/getconfig`, { params: { 'key': 'configuration' } }).then(function (response) {
				//              console.log(response.data.data.value.items.g50.is_waring / response.data.data.value.items.g05.is_waring / response.data.data.value.items.dew_point_c.is_waring && response.data.data.value.items.humidness.is_waring / response.data.data.value.items.temperature.is_waring / response.data.data.value.items.dif_pressure_pa.is_waring)
				//              if (!(response.data.data.value.items.g50.is_waring && response.data.data.value.items.g05.is_waring && response.data.data.value.items.dew_point_c.is_waring && response.data.data.value.items.humidness.is_waring && response.data.data.value.items.temperature.is_waring && response.data.data.value.items.dif_pressure_pa.is_waring)) {
				//                  _this.closeBtnType = true
				//              } else {
				//                  _this.closeBtnType = false
				//              }
				//          }).catch(function (error) {
				//              console.log("error", error)
				//          });



			},
			closeBtn() {
				const loading = ElLoading.service({
				    lock: true,
				    text: 'Loading',
				    background: 'rgba(0, 0, 0, 0.7)',
				  })
				axios({
					url: BASE_URL + URL.updateDevice,
					data: this.result.map((item: any) => {
						item.isAlarm = 0
						return item
					}),
					method: 'put',
					headers: {
						'Content-Type': 'application/json'
					}
				}).then(res => {
					// this.$emit("setChangeDetail");
					this.closeBtnType = !this.closeBtnType
					this.getList()
					loading.close()
				}).catch(()=>{
					loading.close()
				})
				// 重新请求列表
				// axios
				//     .get(`${BASE_URL}/stopalarm`)
				//     .then((data) => {
				//         this.ldTypeShow = false
				//         this.wdTypeShow = false
				//         this.ycTypeShow = false
				//         this.sdTypeShow = false
				//         this.jjdsTypeShow = false
				//         this.jjdTypeShow = false
				//         clearInterval(this.ldTypeTimer)
				//         clearInterval(this.wdTypeTimer)
				//         clearInterval(this.ycTypeTimer)
				//         clearInterval(this.sdTypeTimer)
				//         clearInterval(this.jjdsTypeTimer)
				//         clearInterval(this.jjdTypeTimer)
				//         this.ldTypeTimer = {}
				//         this.wdTypeTimer = {}
				//         this.ycTypeTimer = {}
				//         this.sdTypeTimer = {}
				//         this.jjdsTypeTimer = {}
				//         this.jjdTypeTimer = {}
				//         this.mqttMsg()
				//         this.getSet()
				//     })
				//     .catch((err) => {
				//         console.log(err);
				//     });
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
				this.getList()
				this.getTemplate()
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
			getTemplate() {
				axios
					.get(BASE_URL + URL.getCollectionServer).then((data) => {
						if (data?.status === 200 && data?.data?.code === 200) {
							let result = data.data.result
							this.postData = result
							this.warningAudio = result.alarmtone
							let selectTemplate = JSON.parse(result.content).selectTemplate
							this.listData.dashboard_name = JSON.parse(result.content).dashboard_name
							switch (selectTemplate) {
								case 1:
									this.$router.push("/engine/style1");
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
								case 7:
									this.$router.push("/engine/home");
									break
							}

						}

					}).catch((error) => {

					})
			},
			getList() {
				axios.get(BASE_URL + URL.getDeviceList, {
					params: {
						'key': 'configuration'
					}
				}).then((response) => {
					if (response?.data?.code === 200) {
						let result = response.data.result
						this.result = result
						result.forEach((item: any) => {
							switch (item.conType) {
								case 1: // 1.alarmsldWarning 露点 2.alarmswdWarning 温度 5.alarmsjjdsWarning g05 6.alarmsjjdlowWarning g50
									// 露点报警上下限
									this.alarmsldup = item.alarmSuperiorLimit
									this.alarmsldlow = item.alarmLowerLimit
									this.alarmsldWarning = item.isAlarm === 1 ? true : false
									this.dew_point_cName = item.name
									this.dew_point_cId = item.id
									break;
								case 2:
									// 温度报警上下限
									this.temperatureName = item.name
									this.temperatureId = item.id
									this.alarmswdup = item.alarmSuperiorLimit
									this.alarmswdlow = item.alarmLowerLimit
									this.alarmswdWarning = item.isAlarm === 1 ? true : false
									break
								case 3:
									// 压差报警上下限
									this.dif_pressure_paName = item.name
									this.dif_pressure_paId = item.id
									this.alarmsycup = item.alarmSuperiorLimit
									this.alarmsyclow = item.alarmLowerLimit
									this.alarmsycWarning = item.isAlarm === 1 ? true : false
									break
								case 4:
									// 湿度报警上下限
									this.humidnessName = item.name
									this.humidnessId = item.id
									this.alarmssdup = item.alarmSuperiorLimit
									this.alarmssdlow = item.alarmLowerLimit
									this.alarmssdWarning = item.isAlarm === 1 ? true : false
									break
								case 5:
									//  g0.5报警上下线
									this.g05Name = item.name
									this.g05Id = item.id
									this.alarmsjjdsup = item.alarmSuperiorLimit
									this.alarmsjjdslow = item.alarmLowerLimit
									this.alarmsjjdsWarning = item.isAlarm === 1 ? true : false
									break
								case 6:
									//  g50报警上下线
									this.g50Name = item.name
									this.g50Id = item.id
									this.alarmsjjdup = item.alarmSuperiorLimit
									this.alarmsjjdlow = item.alarmLowerLimit
									this.alarmsjjdlowWarning = item.isAlarm === 1 ? true : false
									break
								default:
									break;
							}
							if (item.isAlarm === 1) {
								// 1 是开启所以显示开启
								this.closeBtnType = true
							}
							else {
								this.closeBtnType = false
							}
						})


					}

				}).catch((error) => {
					console.error("error", error)
				});
			}
		},
		created() {
			this.playAudio = 	_.throttle(this.playAudio, 5000)
			// this.currentTime();
			// this.getDate()
			// this.mqttMsg();
			setInterval(() => {
				initMqttClient(this, 1)
				this.getList()
				this.getTemplate()
			}, 1000)
			//   if(result?.type ==='data'){
		
			//   }
		
		
		},
	});
</script>

<style scoped>
	.header-box {
		height: 135px;
		z-index: 800;
		background: url("@/assets/image/headerIco.png") no-repeat center top / cover;
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
		background-image: url(../../../assets/image/closeIco.png);
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
		display: flex;
		flex-wrap:wrap;
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
		font-size: 30px;
		color: #000000;
		line-height: 38px;
		font-weight: bold;
		text-align: center;
	}

	.cmList span:nth-child(2) {
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
		font-size: 78px;
		color: #fff;
		font-weight: bold;
		float: left;
		line-height: 120px;
		margin: 0 9%;
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
		font-size: 78px;
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

	@keyframes test {
		from {
			opacity: 1.0;
		}

		50% {
			opacity: 0.4;
		}

		to {
			opacity: 1.0;
		}
	}

	@-webkit-keyframes test {
		from {
			opacity: 1.0;
		}

		50% {
			opacity: 0.4;
		}

		to {
			opacity: 1.0;
		}
	}

	.warning-alert {
		background-color: red;
		animation: test 1000ms infinite;
	}

	.blPadding {
		padding: 12px 26px 12px 20px;
	}

	.bcList {
		width: 100%;
		height: auto;
		overflow: hidden;
		float: left;
	}

	.boardCenter {
		width: 100%;
		height: auto;
	}

	.height {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.engine-box {
		padding: 18px 22px;
		width: calc(100% - 44px);
	}
</style>
