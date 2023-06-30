import * as mqtt from "mqtt/dist/mqtt.min.js";
const VITE_APP_MQTT_IP =
	import.meta.env.VITE_APP_MQTT_IP;
let client
let dew_point_cRes = []
let temperatureRes = []
let dif_pressure_paRes = []
let humidnessRes = []
let g05Res = []
let g50Res = []
const getDate =(that) => {
            //获取当前时间并打印
            var _this = this;
            let yy = new Date().getFullYear();
            let mm = new Date().getMonth() + 1;
            let dd = new Date().getDate();
            let hh = new Date().getHours();
            let mf =
                new Date().getMinutes() < 10
                    ? "0" + new Date().getMinutes()
                    : new Date().getMinutes();
            let ss =
                new Date().getSeconds() < 10
                    ? "0" + new Date().getSeconds()
                    : new Date().getSeconds();
			that.nowDate = yy + "/" + mm + "/" + dd +" " + hh + ":" + mf + ":" + ss;
           
        }
const initMqttClient = (that, template) => {
	setInterval(()=>{
		getDate(that)
		
	},1000)
	// const mqtt = require('mqtt')
	// 连接协议必须为ws。原因见下方连接
	client = mqtt.connect(VITE_APP_MQTT_IP, {
		clean: true,
		connectTimeout: 4000,
		username: 'admin',
		password: 'admin'
	});
	client.on('connect', () => {
		// t_test为 topic
		client.subscribe('environmentalControl', {
			qos: 1
		}, (error, granted) => {
			if (error) {
				console.log(error)
			} else {
				console.log(`${granted[0].topic} was subscribed-------`)

				setInterval(() => {
					let data = {
						"config": [{
							"conType": 1,
							"isAlarm": "false",
							"name": "露点",
							"configDownLimit": "-80",
							"deviation": "0",
							"configUpLimit": "20"
						}, {
							"conType": 2,
							"isAlarm": "false",
							"name": "温度",
							"configDownLimit": "-40",
							"deviation": "0",
							"configUpLimit": "60"
						}, {
							"conType": 3,
							"isAlarm": "false",
							"name": "压差",
							"configDownLimit": "-50",
							"deviation": "0",
							"configUpLimit": "50"
						}, {
							"conType": 4,
							"isAlarm": "false",
							"name": "湿度",
							"configDownLimit": "0",
							"deviation": "0",
							"configUpLimit": "100"
						}, {
							"conType": 5,
							"isAlarm": "false",
							"name": "洁净度(g0.5)"
						}, {
							"conType": 6,
							"isAlarm": "false",
							"name": "洁净度(g5)"
						}],
						"content": [{}],
						"dataList": [{
							"id": 4,
							"name": "露点",
							"type": 1,
							"value": -16.7123
						}, {
							"id": 2,
							"name": "温度",
							"type": 2,
							"value": 0.10581874999999741
						}, {
							"id": 3,
							"name": "压差",
							"type": 3,
							"value": -0.006318749999998374
						}, {
							"id": 1,
							"name": "湿度",
							"type": 4,
							"value": 88.4304875
						}, {
							"id": 5,
							"name": "洁净度(g0.5)",
							"type": 5,
							"value": 1.06084808518E7
						}, {
							"id": 6,
							"name": "洁净度(g5)",
							"type": 6,
							"value": 1413.4276
						}],
						"tS": "2022-11-06 19:25:00",
						"timesTamp": 1667733829919,
						"type": "data"
					}
					// client.publish('environmentalControl', JSON.stringify(data))
				}, 1000)

			}
		});
	});

	client.on('message', (topic, message, packet) => {
		// 接收的消息为uint8Array字节流，方便后续处理，需要做一次转化，得到json格式数据
		const encodeObj = new TextDecoder('GB2312');
		const uint8Msg = new Uint8Array(message);
		let formatMessage = encodeObj.decode(uint8Msg);
		formatMessage = JSON.parse(formatMessage)
		console.log(formatMessage)
		if (formatMessage.type === 'data') {
			let res1 = []
			let res2 = []
			let res3 = []
			let res4 = []
			let res5 = []
			let res6 = []
			
			
			// dew_point_cRes = []
			// temperatureRes = []
			// dif_pressure_paRes = []
			// humidnessRes = []
			
			
			// console.log(formatMessage)
			// 1.露点 2.温度 3.压差 4.湿度 5.05 6.50
			let result = formatMessage.dataList.map(item => {
				let value = Number(item.value)
				if(value && value < Number(item.configLowerLimit)){
					value = Number(item.configLowerLimit).toFixed(2)
				}
				if(value && value > Number(item.configSuperiorLimit)){
					value = Number(item.configSuperiorLimit).toFixed(2)
				}
				console.log(value)
				return {
					...item,
					value:Number(value)
				}
			})
			console.log(result)
			// debugger
			result.forEach(item=>{
				let value = Number(item.value)
				console.log(value)
				switch (item.type){
					case 1:
						value = value.toFixed(2)
						res1.push({
							...item,
							value:(value)
						})
						break;
					case 2:
						value = value.toFixed(2)
						res2.push({
							...item,
							value:(value)
						})
						break;
					case 3:
						value = value.toFixed(2)
						res3.push({
							...item,
							value:(value)
						})
						break;
					case 4:
						value = value.toFixed(2)
						res4.push({
							...item,
							value:(value)
						})
						break;
					case 5:
						value = (value / 10000).toFixed(1)
						res5.push({
							...item,
							value:(value)
						})
						break;
					case 6:
						value = (value / 10000).toFixed(1)
						res6.push({
							...item,
							value:(value)
						})
						break;
					default:
						break;
				}
			})
			if(res1.length!==0){
					dew_point_cRes = res1
			}
			if(res2.length!==0){
					temperatureRes = res2
			}
			if(res3.length!==0){
					dif_pressure_paRes = res3
			}
			if(res4.length!==0){
					humidnessRes = res4
			}
			if(res5.length!==0){
					g05Res = res5
			}
			if(res6.length!==0){
					g50Res = res6
			}
			that.listData = {
				...that.listData,
				dew_point_c: dew_point_cRes,
				temperature: temperatureRes,
				dif_pressure_pa: dif_pressure_paRes,
				humidness: humidnessRes,
				g05: g05Res,
				g50: g50Res,
			}
		}
		if (formatMessage.type === 'date') {
			console.log(formatMessage.date)
			
		}
		// console.log(template)
		// console.log(client.getLastMessageId())
		// 后续业务处理
	});
	client.on('error', (err) => {
		client.end();
	});
}

let test = [
    {
        "id": 1,
        "name": "温度",
        "type": 2,
        "value": 24.515262500000006,
        "configSuperiorLimit": "60",
        "configLowerLimit": "-40"
    },
    {
        "id": 2,
        "name": "湿度",
        "type": 4,
        "value": 35.514306250000004,
        "configSuperiorLimit": "100",
        "configLowerLimit": "0"
    },
    {
        "id": 3,
        "name": "压差",
        "type": 3,
        "value": 0.6681874999999948,
        "configSuperiorLimit": "50",
        "configLowerLimit": "-50"
    },
    {
        "id": 4,
        "name": "露点",
        "type": 1,
        "value": 11.596781249999992,
        "configSuperiorLimit": "20",
        "configLowerLimit": "-80"
    },
    {
        "id": 5,
        "name": "洁净度",
        "type": 5,
        "value": 18987633.0215,
        "configSuperiorLimit": null,
        "configLowerLimit": null
    },
    {
        "id": 6,
        "name": "洁净度",
        "type": 6,
        "value": 10247.3501,
        "configSuperiorLimit": null,
        "configLowerLimit": null
    }
]
export default initMqttClient


