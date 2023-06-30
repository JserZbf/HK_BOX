<template>
	<!-- 上面是意思是湿度-humidness，压差-DifPressure，温度Temperature，露点-DewPoint，颗粒度大于0.5-G0.5，颗粒度大于5-G5.0 -->

	<!-- "humidness": 38.60951066017151,
		"DifPressure-Pa": 0.11773109436035156,
		"Temperature": 30.56986093521118,
		"DewPoint-C": 13.609511852264404,
		"G0.5": 7194699,
		"G5.0": 2473 -->
        <!-- 
            
         -->
	<div class="header-box flex-vcenter flex-hcenter">
		<div class="header-title">{{ listData.dashboard_name }}</div>
	</div>
	<div class="pzBtn" @click="goSet"></div>
	<div class="height" @click="clickTab">
		<div class="flex-row height">
			<div class="boardCenter">
				<!-- <div class="bcList">
					<div class="blPadding">
						<div class="padList" :class="{       'warning-alert':       showWarning1     }">
							<div :class="{ active: ldTypeShow }">
								<span
									class="plName">{{ listData?.dew_point_c.findIndex(item=>item.id===dew_point_cId)!==-1?dew_point_cName:'露点'}}{{ld_msg }}:</span>
								<span class="plUnit"><span
									class="plNum">{{ filterNum(listData?.dew_point_c.find(item=>item.id===dew_point_cId)?.value?listData?.dew_point_c.find(item=>item.id===dew_point_cId)?.value:'NA','ld') }}</span>℃</span>
							</div>
						</div>
					</div>
				</div> -->
				<div class="bcList">
					<div class="blPadding">
						<div class="padList" :class="{       'warning-alert':       showWarning2      }">
							<div :class="{ active: wdTypeShow }">
								<!-- <img class="plIco" src="../../../assets/image/oneIco.png" /> -->
								<span
									class="plName">{{ listData?.temperature.findIndex(item=>item.id===temperatureId)!==-1?temperatureName :'温度' }}{{ wd_msg }}:</span>
								<span class="plUnit"><span
									class="plNum">{{ filterNum(listData?.temperature.find(item=>item.id===temperatureId)?.value?listData?.temperature.find(item=>item.id===temperatureId)?.value:'NA','wd') }}</span>℃</span>
							</div>
						</div>
					</div>
				</div>
	
				<div class="bcList">
					<div class="blPadding">
						<div class="padList" :class="{       'warning-alert':       showWarning4      }">
							<div :class="{ active: sdTypeShow }">
								<!-- <img class="plIco" src="../../../assets/image/sd.png" /> -->
								<span
									class="plName">{{ listData?.humidness.findIndex(item=>item.id===humidnessId)!==-1?humidnessName:'湿度' }}{{ sd_msg }}:</span>
								
								<span class="plUnit"><span
									class="plNum">{{ filterNum(listData?.humidness.find(item=>item.id===humidnessId)?.value?listData?.humidness.find(item=>item.id===humidnessId)?.value:'NA','sd') }}</span>%</span>
							</div>
						</div>
					</div>
				</div>

                <div class="bcList">
					<div class="blPadding">
						<div class="padList" :class="{       'warning-alert':       showWarning3     }">
							<div :class="{ active: ycTypeShow }">
								<!-- <img class="plIco" src="../../../assets/image/yc.png" /> -->
								<span
									class="plName">{{ listData?.dif_pressure_pa.findIndex(item=>item.id===dif_pressure_paId)!==-1?dif_pressure_paName:'压差' }}{{ yc_msg }}:</span>
								<span class="plUnit"><span
									class="plNum">{{ filterNum(listData?.dif_pressure_pa.find(item=>item.id===dif_pressure_paId)?.value?listData?.dif_pressure_pa.find(item=>item.id===dif_pressure_paId)?.value:'NA','yc')  }}</span>Pa</span>
							</div>
						</div>
					</div>
				</div>
				<div class="bcList" style="width: 100%">
					<div class="blPadding">
						<div class="padList" :class="{       'warning-alert':       showWarning5      }">
							<div :class="{ active: jjdsTypeShow }">
								<!-- <img class="plIco" src="../../../assets/image/twoIco.png" /> -->
								<span
									class="plName txtLength" style="width:40%">{{listData?.g05.findIndex(item=>item.id===g05Id)!==-1?g05Name:'洁净度'}}{{ jjd05_msg }}:</span>
								<span class="plNum" style="width:20%;text-align: center;margin: 0;">{{ filterNum(listData?.g05.find(item=>item.id===g05Id)?.value?listData?.g05.find(item=>item.id===g05Id)?.value:'NA','g05')}}</span>
								<span  style="width:40%;text-align: right;" class="plUnit ">万pc/m3 粒径0.5um</span>
							</div>
						</div>
					</div>
				</div>
				<div class="bcList" style="width: 100%">
					<div class="blPadding">
						<div class="padList" :class="{       'warning-alert':       showWarning6      }">
							<div :class="{ active: jjdTypeShow }">
								<!-- <img class="plIco" src="../../../assets/image/twoIco.png" /> -->
								<span
									class="plName txtLength"  style="width:40%">{{listData?.g50.findIndex(item=>item.id===g50Id)!==-1?g50Name:'洁净度' }}{{ jjd5_msg }}:</span>
								<span class="plNum" style="width:20%;text-align: center;margin: 0;">{{ filterNum((listData?.g50.find(item=>item.id===g50Id)?.value)?(listData?.g50.find(item=>item.id===g50Id)?.value):'NA','g50')   }}</span>
								<span  style="width:40%;text-align: right;" class="plUnit ">万pc/m3 粒径 5 um</span>
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
					<div class="blank33">
						<div class="cmList">
							<span>洁净度报警上限<label style="font-size:16px">(0.5um)</label>:</span>
							<span>{{ alarmsjjdsup }}</span>
						</div>
						<div class="cmList">
							<span>洁净度报警下限<label style="font-size:16px">(0.5um)</label>:</span>
							<span>{{ alarmsjjdslow }}</span>
						</div>
						<div class="cmList">
							<span>洁净度报警上限<label style="font-size:16px">(5um)</label>:</span>
							<span>{{ alarmsjjdup }}</span>
						</div>
						<div class="cmList">
							<span>洁净度报警下限<label style="font-size:16px">(5um)</label>:</span>
							<span>{{ alarmsjjdlow }}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

    <div class="nowTime">
		<span>{{ yearDate }}</span>
		<span>{{ dateNow }}</span>
    </div>
    <div class="gs">深圳市森辉智能自控技术有限公司提供技术支持</div>
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
                showWarning5: false,
                showWarning6: false,
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
				
				postData:"",

                dateNow:'', // 当前时间
                yearDate:'', // 当前年份

                ld_up:100,
                ld_low:0,
                ld_msg:'', // 露点区间
                wd_msg:'', // 温度区间
                yc_msg:'', // 压差区间
                sd_msg:'', // 湿度区间
                jjd05_msg:'', // 洁净度区间
                jjd5_msg:'', // 洁净度区间

                /* 上下限 */
                ldSet : {low:1,up:1},
                wdSet : {low:1,up:1},
                ycSet : {low:1,up:1},
                sdSet : {low:1,up:1},
                g05Set : {low:1,up:1},
                g50Set : {low:1,up:1},

                sdState:false, // 湿度的值
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
                let alarmsldup = this.alarmsldup == ""?"":Number(this.alarmsldup);
                let alarmsldlow = this.alarmsldlow == ""?"":Number(this.alarmsldlow);

				if ((this.alarmsldWarning && alarmsldup && dew_point_c?.value > alarmsldup) ||
					(this.alarmsldWarning && alarmsldlow && dew_point_c?.value < alarmsldlow)
				) {
                    console.log((this.alarmsldWarning && alarmsldup && dew_point_c?.value > alarmsldup) ||
					(this.alarmsldWarning && alarmsldlow && dew_point_c?.value < alarmsldlow))

                    console.log('=================================');
                    console.log('警报',this.showWarning1);

                    console.log(dew_point_c?.value );
                    console.log(alarmsldup);
                    console.log(alarmsldlow);
                    console.log('this.alarmsldWarning ',this.alarmsldWarning );
                    console.log('&&  ',this.alarmsldWarning&&  alarmsldup );

                    console.log('>：',(this.alarmsldWarning && alarmsldup && dew_point_c?.value > alarmsldup));
                    console.log('<：',(this.alarmsldWarning && alarmsldlow && dew_point_c?.value < alarmsldlow));
                    
                    console.log('=================================');
					this.showWarning1 = true
					msgResult += this.dew_point_cName
				} else {
                    console.log('=================================');
                    console.log('else警报',this.showWarning1);
                    console.log(dew_point_c?.value );
                    console.log(alarmsldup);
                    console.log(alarmsldlow);
                    console.log('=================================');
					this.showWarning1 = false
				}
                let alarmswdup = this.alarmswdup == ""?"":Number(this.alarmswdup);
                let alarmswdlow = this.alarmswdlow == ""?"":Number(this.alarmswdlow);
				if ((this.alarmswdWarning && alarmswdup && temperature?.value > alarmswdup) ||
					(this.alarmswdWarning && alarmswdlow && temperature?.value < alarmswdlow)) {
					this.showWarning2 = true
					msgResult += this.temperatureName
				} else {
					this.showWarning2 = false
				}
                let alarmsycup = this.alarmsycup == ""?"":Number(this.alarmsycup);
                let alarmsyclow = this.alarmsyclow == ""?"":Number(this.alarmsyclow);
				if ((this.alarmsycWarning && alarmsycup && dif_pressure_pa?.value > alarmsycup) ||
					(this.alarmsycWarning && alarmsyclow && dif_pressure_pa?.value < alarmsyclow)) {
					this.showWarning3 = true
					msgResult += this.dif_pressure_paName
				} else {
					this.showWarning3 = false
				}

                
				// if ((this.alarmssdWarning && this.alarmssdup && humidness?.value > this.alarmssdup) ||
				// 	(this.alarmssdWarning && this.alarmssdlow && humidness?.value < this.alarmssdlow)) {
				// 	this.showWarning4 = true
				// 	msgResult += this.humidnessName
				// } else {
				// 	this.showWarning4 = false
				// }
                // if(this.alarmssdWarning){

                // }
                
                
                // if(this.sdState){

                // }else{
                let alarmssdup = this.alarmssdup == ""?"":Number(this.alarmssdup);
                let alarmssdlow = this.alarmssdlow == ""?"":Number(this.alarmssdlow);
                if ((this.alarmssdWarning && alarmssdup && humidness?.value > alarmssdup) ||
                    (this.alarmssdWarning && alarmssdlow && humidness?.value < alarmssdlow)) {
                    this.showWarning4 = true
                    msgResult += this.humidnessName
                } else {
                    this.showWarning4 = false
                }
                // }
                
                let alarmsjjdsup = this.alarmsjjdsup == ""?"":Number(this.alarmsjjdsup);
                let alarmsjjdslow = this.alarmsjjdslow == ""?"":Number(this.alarmsjjdslow);
				if ((this.alarmsjjdsWarning && alarmsjjdsup && g05?.value > alarmsjjdsup) ||
					(this.alarmsjjdsWarning && alarmsjjdslow && g05?.value < alarmsjjdslow)) {
					this.showWarning5 = true
					msgResult += this.g05Name
				} else {
					this.showWarning5 = false
				}
                let alarmsjjdup = this.alarmsjjdup == ""?"":Number(this.alarmsjjdup);
                let alarmsjjdlow = this.alarmsjjdlow == ""?"":Number(this.alarmsjjdlow);
				if ((this.alarmsjjdlowWarning && alarmsjjdup && g50?.value > alarmsjjdup) ||
					(this.alarmsjjdlowWarning && alarmsjjdlow && g50?.value < alarmsjjdlow)) {
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
            filterNum(value: any, name: string) {
                value = Number(value);
                if(isNaN(value)){  
                    return "NA"
                }
                if(name === 'ld'){
                    if(value == 'NA'){return "NA"}
                    if(value <= this.ldSet.low){
                        return this.ldSet.low;
                    }else if(value >= this.ldSet.up){
                        return this.ldSet.up;
                    }else{
                        return value == -10086.11 ? 'NA' : value;
                    }
                }           
                if(name === 'wd'){
                    if(value == 'NA'){return "NA"}
                    if(value <= this.wdSet.low){
                        return this.wdSet.low;
                    }else if(value >= this.wdSet.up){
                        return this.wdSet.up;
                    }else{
                        return value == -10086.11 ? 'NA' : value;
                    }
                }           
                if(name === 'yc'){
                    if(value == 'NA'){return "NA"}
                    if(value <= this.ycSet.low){
                        return this.ycSet.low;
                    }else if(value >= this.ycSet.up){
                        return this.ycSet.up;
                    }else{
                        return value == -10086.11 ? 'NA' : value;
                    }
                }           
                if(name === 'sd'){
                    console.log(value<= this.sdSet.low)
                    console.log(value>= this.sdSet.up)
                    console.log(value)
                    if(value == 'NA'){return "NA"};
                    if(value <= this.sdSet.low){
                        return this.sdSet.low;
                    }else if(value >= this.sdSet.up){
                        return this.sdSet.up;
                    }else{
                        return value == -10086.11 ? 'NA' : value;
                    }
                }           
                if(name === 'g05'){
                    console.log('洁净度改g05===>',value)
                    return value == -10086.11 ? 'NA' : value;

                    // if(value <= this.g05Set.low){
                    //     return this.g05Set.low;
                    // }else if(value >= this.g05Set.up){
                    //     return this.g05Set.up;
                    // }else{
                    //     return value == -10086.11 ? 'NA' : value;
                    // }
                }           
                if(name === 'g50'){
                    console.log('洁净度改g50===>',value)
                    return value == -10086.11 ? 'NA' : value;

                    // if(value == 'NA'){return value}
                    // if(value <= this.g50Set.low){
                    //     return this.g50Set.low;
                    // }else if(value >= this.g50Set.up){
                    //     return this.g50Set.up;
                    // }else{
                    //     return value == -10086.11 ? 'NA' : value;
                    // }
                }           
                // return value == -10086.11 ? 'NA' : value;
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
			// getTemplate() {
            //     var data = {"success":true,"message":"操作成功！","code":200,"result":{"collectionCode":null,"collectionName":"123213","mqttIp":null,"mqttPort":1883,"mqttUserName":null,"mqttPassWord":null,"port":"8080","ip":null,"subnetMask":null,"gateWay":null,"cycle":2,"content":"{\"dashboard_name\":\"kanban\",\"selectTemplate\":7}","alarmtone":false,"topic":"environmentalControl","dataTopic":"SH/HK/NJ/HEART"},"timestamp":1672737526312};
            //     if (data?.status === 200 && data?.data?.code === 200) {
			// 				let result = data.data.result
			// 				this.postData = result
			// 				this.warningAudio = result.alarmtone
			// 				let selectTemplate = JSON.parse(result.content).selectTemplate
			// 				this.listData.dashboard_name = JSON.parse(result.content).dashboard_name
			// 				switch (selectTemplate) {
			// 					case 1:
			// 						this.$router.push("/engine/style1");
			// 						break
			// 					case 2:
			// 						this.$router.push("/engine/style2");
			// 						break
			// 					case 3:
			// 						this.$router.push("/engine/style3");
			// 						break
			// 					case 4:
			// 						this.$router.push("/engine/style4");
			// 						break
			// 					case 5:
			// 						this.$router.push("/engine/style5");
			// 						break
			// 					case 6:
			// 						this.$router.push("/engine/style6");
			// 						break
			// 					case 7:
			// 						this.$router.push("/engine/home");
			// 						break
			// 				}

			// 			}

			// },			
            getTemplate() {
				axios
					.get(BASE_URL + URL.getCollectionServer).then((data) => {
                        // console.log('getTemplate',data)
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
            setMsg(){
                this.result.forEach((item: any) => {
                    switch (item.conType) {
                        case 1: // 1.alarmsldWarning 露点 2.alarmswdWarning 温度 5.alarmsjjdsWarning g05 6.alarmsjjdlowWarning g50
                            // 露点报警上下限
                            // console.log(this.ld_msg)
                            if(item.alarmSuperiorLimit || item.alarmLowerLimit ){
                                item.alarmSuperiorLimit?item.alarmSuperiorLimit:item.alarmSuperiorLimit='';
                                item.alarmLowerLimit?item.alarmLowerLimit:item.alarmLowerLimit='';
                                this.ld_msg = item.alarmSuperiorLimit == ''?item.alarmLowerLimit ==''?``:`(≥${item.alarmLowerLimit}℃)`:item.alarmLowerLimit ==''?`(≤${item.alarmSuperiorLimit}℃)`:`(${item.alarmLowerLimit}~${item.alarmSuperiorLimit}℃)`
                            }
                            break;
                        case 2:
                            // 温度报警上下限
                            if(item.alarmSuperiorLimit || item.alarmLowerLimit ){
                                item.alarmSuperiorLimit?item.alarmSuperiorLimit:item.alarmSuperiorLimit='';
                                item.alarmLowerLimit?item.alarmLowerLimit:item.alarmLowerLimit='';
                                this.wd_msg = item.alarmSuperiorLimit == ''?item.alarmLowerLimit ==''?``:`(≥${item.alarmLowerLimit}℃)`:item.alarmLowerLimit ==''?`(≤${item.alarmSuperiorLimit}℃)`:`(${item.alarmLowerLimit}~${item.alarmSuperiorLimit}℃)`
                            }
                            break
                        case 3:
                            // 压差报警上下限
                            if(item.alarmSuperiorLimit || item.alarmLowerLimit ){
                                item.alarmSuperiorLimit?item.alarmSuperiorLimit:item.alarmSuperiorLimit='';
                                item.alarmLowerLimit?item.alarmLowerLimit:item.alarmLowerLimit='';
                                this.yc_msg = item.alarmSuperiorLimit == ''?item.alarmLowerLimit ==''?``:`(≥${item.alarmLowerLimit}Pa)`:item.alarmLowerLimit ==''?`(≤${item.alarmSuperiorLimit}Pa)`:`(${item.alarmLowerLimit}~${item.alarmSuperiorLimit}Pa)`
                            }
                            break
                        case 4:
                            // 湿度报警上下限
                            if(item.alarmSuperiorLimit || item.alarmLowerLimit ){
                                item.alarmSuperiorLimit?item.alarmSuperiorLimit:item.alarmSuperiorLimit='';
                                item.alarmLowerLimit?item.alarmLowerLimit:item.alarmLowerLimit='';
                                this.sd_msg = item.alarmSuperiorLimit == ''?item.alarmLowerLimit ==''?``:`(≥${item.alarmLowerLimit}%)`:item.alarmLowerLimit ==''?`(≤${item.alarmSuperiorLimit}%)`:`(${item.alarmLowerLimit}~${item.alarmSuperiorLimit}%)`
                            }
                            break
                        case 5:
                            //  g0.5报警上下线
                            if(item.alarmSuperiorLimit || item.alarmLowerLimit ){
                                item.alarmSuperiorLimit?item.alarmSuperiorLimit:item.alarmSuperiorLimit='';
                                item.alarmLowerLimit?item.alarmLowerLimit:item.alarmLowerLimit='';
                                this.jjd05_msg = item.alarmSuperiorLimit == ''?item.alarmLowerLimit ==''?``:`(≥${item.alarmLowerLimit}万)`:item.alarmLowerLimit ==''?`(≤${item.alarmSuperiorLimit}万)`:`(${item.alarmLowerLimit}~${item.alarmSuperiorLimit}万)`
                            }
                            break
                        case 6:
                            //  g50报警上下线
                            if(item.alarmSuperiorLimit || item.alarmLowerLimit ){
                                item.alarmSuperiorLimit?item.alarmSuperiorLimit:item.alarmSuperiorLimit='';
                                item.alarmLowerLimit?item.alarmLowerLimit:item.alarmLowerLimit='';
                                this.jjd5_msg = item.alarmSuperiorLimit == ''?item.alarmLowerLimit ==''?``:`(≥${item.alarmLowerLimit}万)`:item.alarmLowerLimit ==''?`(≤${item.alarmSuperiorLimit}万)`:`(${item.alarmLowerLimit}~${item.alarmSuperiorLimit}万)`
                            }
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
            },
            getList() {
				axios.get(BASE_URL + URL.getDeviceList, {
					params: {
						'key': 'configuration'
					}
				}).then((response) => {
                    console.log('getList',response)
					if (response?.data?.code === 200) {
						let result = response.data.result
						this.result = result;
						result.forEach((item: any) => {
                            // item.alarmSuperiorLimit = isNaN(Number(item.alarmSuperiorLimit))?null:Number(item.alarmSuperiorLimit)
                            // item.alarmLowerLimit = isNaN(Number(item.alarmLowerLimit))?null:Number(item.alarmLowerLimit)
							switch (item.conType) {
								case 1: // 1.alarmsldWarning 露点 2.alarmswdWarning 温度 5.alarmsjjdsWarning g05 6.alarmsjjdlowWarning g50
									// 露点报警上下限
									this.alarmsldup = item.alarmSuperiorLimit
									this.alarmsldlow = item.alarmLowerLimit
									this.alarmsldWarning = item.isAlarm === 1 ? true : false
									this.dew_point_cName = item.name
									this.dew_point_cId = item.id
                                    
                                    this.ldSet.up = Number(item.configSuperiorLimit);
                                    this.ldSet.low = Number(item.configLowerLimit);
                                    // this.ld_up = item.configSuperiorLimit
                                    // this.ld_low = item.configLowerLimit
                                    // this.ld_msg = item.configSuperiorLimit == ''?item.configLowerLimit ==''?``:`(≥${item.configLowerLimit}℃)`:item.configLowerLimit ==''?`(≤${item.configSuperiorLimit}℃)`:`(${item.configLowerLimit}~${item.configSuperiorLimit}℃)`
									
									break;
								case 2:
									// 温度报警上下限
									this.temperatureName = item.name
									this.temperatureId = item.id
									this.alarmswdup = item.alarmSuperiorLimit
									this.alarmswdlow = item.alarmLowerLimit
									this.alarmswdWarning = item.isAlarm === 1 ? true : false
                                    this.wdSet.up = Number(item.configSuperiorLimit);
                                    this.wdSet.low = Number(item.configLowerLimit);
                                    // this.wd_msg = item.configSuperiorLimit == ''?item.configLowerLimit ==''?``:`(≥${item.configLowerLimit}℃)`:item.configLowerLimit ==''?`(≤${item.configSuperiorLimit}℃)`:`(${item.configLowerLimit}~${item.configSuperiorLimit}℃)`
									break
								case 3:
									// 压差报警上下限
									this.dif_pressure_paName = item.name
									this.dif_pressure_paId = item.id
									this.alarmsycup = item.alarmSuperiorLimit
									this.alarmsyclow = item.alarmLowerLimit
									this.alarmsycWarning = item.isAlarm === 1 ? true : false
                                    this.ycSet.up =  Number(item.configSuperiorLimit);
                                    this.ycSet.low = Number(item.configLowerLimit);
									break
								case 4:
									// 湿度报警上下限
                                    // let wdNum = JSON.stringify(this.listData.temperature);
                                    // let ldNum = parseInt(data.data.data.dew_point_c);
									this.humidnessName = item.name
									this.humidnessId = item.id
									this.alarmssdup = item.alarmSuperiorLimit
									this.alarmssdlow = item.alarmLowerLimit
									this.alarmssdWarning = item.isAlarm === 1 ? true : false
                                    this.sdSet.up = Number(item.configSuperiorLimit);
                                    this.sdSet.low = Number(item.configLowerLimit);
                                    
									break
								case 5:
									//  g0.5报警上下线
									this.g05Name = item.name
									this.g05Id = item.id
									this.alarmsjjdsup = item.alarmSuperiorLimit
									this.alarmsjjdslow = item.alarmLowerLimit
									this.alarmsjjdsWarning = item.isAlarm === 1 ? true : false
                                    this.g05Set.up =  Number(item.configSuperiorLimit);
                                    this.g05Set.low =  Number(item.configLowerLimit);
									break
								case 6:
									//  g50报警上下线
									this.g50Name = item.name
									this.g50Id = item.id
									this.alarmsjjdup = item.alarmSuperiorLimit
									this.alarmsjjdlow = item.alarmLowerLimit
									this.alarmsjjdlowWarning = item.isAlarm === 1 ? true : false
                                    this.g50Set.up = Number(item.configSuperiorLimit);
                                    this.g50Set.low =  Number(item.configLowerLimit);
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
			},
            getResult(a: any) {
                return 611.2 * Math.pow(Math.E, ((18.678 - (Number(a) / 234.5)) * Number(a) / (Number(a) + 257.14)))
            },
            fomatFloat(value:number, n:number) {
                var f = Math.round(value*Math.pow(10,n))/Math.pow(10,n);
                var s = f.toString();
                var rs = s.indexOf('.');   
                if (rs < 0) {     
                    s += '.';   
                } 
                for(var i = s.length - s.indexOf('.'); i <= n; i++){
                    s += "0";
                }
                return s;
            },
            dateFormat(fmt:string, date:any) {
            let ret;
            const opt = {
                "Y+": date.getFullYear().toString(), // 年
                "m+": (date.getMonth() + 1).toString(), // 月
                "d+": date.getDate().toString(), // 日
                "H+": date.getHours().toString(), // 时
                "M+": date.getMinutes().toString(), // 分
                "S+": date.getSeconds().toString(), // 秒
                // 有其他格式化字符需求可以继续添加，必须转化成字符串
            };
            for (let k in opt) {
                ret = new RegExp("(" + k + ")").exec(fmt);
                if (ret) {
                fmt = fmt.replace(
                    ret[1],
                    ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, "0")
                );
                }
            }
            return fmt;
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
		},

		created() {
            // this.yearDate = this.dateFormat("YYYY-mm-dd", new Date(Date.now()))
            // this.dateNow = this.dateFormat("HH:MM:SS", new Date(Date.now()))
			// this.playAudio = 	_.throttle(this.playAudio, 5000)
			// // this.currentTime();
			// // this.getDate()
			// // this.mqttMsg();
			// setInterval(() => {
			// 	initMqttClient(this, 1)
			// 	this.getList()
			// 	this.getTemplate()
            //     this.dateNow = this.dateFormat("YYYY-mm-dd HH:MM:SS", new Date(Date.now()))
            //     this.yearDate = this.dateFormat("YYYY-mm-dd", new Date(Date.now()))
			// }, 1000)
			// //   if(result?.type ==='data'){

			// //   }
// ========================================
            this.yearDate = this.dateFormat("YYYY-mm-dd", new Date(Date.now()))
            this.dateNow = this.dateFormat("HH:MM:SS", new Date(Date.now()))
			this.playAudio = 	_.throttle(this.playAudio, 5000)
			setInterval(() => {
				initMqttClient(this, 1)
				this.getList()
				this.getTemplate()
                this.setMsg()
                this.yearDate = this.dateFormat("YYYY-mm-dd", new Date(Date.now()))
                this.dateNow = this.dateFormat("HH:MM:SS", new Date(Date.now()))
			}, 1000);
		},
	});
</script>

<style scoped>
.nowTime{
    width: 100%;
    text-align: center;
    font-size: 78px;
    color: #3fa0bd;
    position: absolute;
    bottom: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.nowTime span{
    margin:0 8%;
}
.gs{
    font-size: 30px;
    color: #fff;
    position: absolute;
    right: 100px;
    bottom: 20px;
}
	.header-box {
		height: 135px;
		z-index: 800;
		/* background: url("@/assets/image/headerIco.png") no-repeat center top / cover; */
	}

	.header-title {
		font-size: 84px;
		font-weight: 600;
		/* color: #07fefe; */
		color: #35b7db;
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
		/* background-image: url(../../../assets/image/closeIco.png); */
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
		float: right;
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
		font-size: 58px;
		color: #2bc45d;
		font-weight: bold;
		float: left;
		line-height: 120px;
        margin-right: 50px;
	}

	.plUnit {
		/* float: right; */
		/* margin: 0px 10px 0 0; */
		font-size: 58px;
		color: #fff;
		font-weight: bold;
		line-height: 120px;
	}

	.plName {
		font-size: 64px;
		font-weight: bold;
		color: #fff;
		line-height: 120px;
		float: left;
		letter-spacing: 5px;
	}
    .txtLength{
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
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
        display: flex;
        justify-content: space-between;
		/* overflow: hidden; */
	}

	.padList {
		width: 100%;
		height: 120px;
		/* box-shadow: 0px 0px 6px 1px #22baff; */
		border-radius: 12px 12px 12px 12px;
		opacity: 1;
		/* border: 5px solid #17b7ff; */
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
		padding: 12px 26px 12px 26px;
	}

	.bcList {
		width: 47%;
		height: auto;
		overflow: hidden;
        margin-right: 3%;
		/* float: left; */
	}

	.boardCenter {
		width: 100%;
		height: auto;
        display: flex;
        flex-wrap: wrap;
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
