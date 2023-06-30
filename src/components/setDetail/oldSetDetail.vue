<template>
	<div class="bgTwo">
		<div class="header-box flex-vcenter flex-hcenter">
			<el-alert title="更新成功!" type="success" center show-icon v-if="showAlert" />
			<div class="header-title">采集盒配置界面</div>
			<!-- <el-upload ref="uploadRef" class="upload-demo"
                action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" :auto-upload="false">
                <template #trigger>
                    <el-button type="primary">select file</el-button>
                </template>

                <el-button class="ml-3" type="success" @click="submitUpload">
                    upload to server
                </el-button>

                <template #tip>
                    <div class="el-upload__tip">
                        jpg/png files with a size less than 500kb
                    </div>
                </template>
            </el-upload> -->
		</div>
		<!-- <Header></Header> -->
		<div class="height">
			<div class="flex-row">
				<div class="boardCenter">
					<div class="bcList">
						<div class="blPadding">
							<div class="searchModule">
								<div class="smList">
									<span class="slName">盒子IP</span>
									<el-input class="slText" type="text" v-model="topConfig.ip" placeholder="请输入IP" />
								</div>

								<div class="smList">
									<span class="slName">子网掩码</span>
									<el-input class="slText" type="text" v-model="topConfig.subnetMask"
										placeholder="请输入子网掩码" />
								</div>

								<div class="smList">
									<span class="slName">网关地址</span>
									<el-input class="slText" type="text" v-model="topConfig.gateWay"
										placeholder="请输入网关地址" />
								</div>

								<div class="smList">
									<span class="slName">设备名称</span>
									<el-input class="slText" type="text" v-model="topConfig.collectionName"
										placeholder="请输入设备名称" />
								</div>
								<div class="smList">
									<span class="slName">设备编码</span>
									<el-input class="slText" type="text" v-model="topConfig.collectionCode"
										placeholder="请输入设备编码" />
								</div>
								<div class="smList">
									<span class="slName">MQTT链接地址</span>
									<el-input class="slText" type="text" v-model="topConfig.mqttIp"
										placeholder="请输入MQTT链接地址" />
								</div>
								<div class="smList">
									<span class="slName">MQTT Port</span>
									<el-input class="slText" type="text" v-model="topConfig.mqttPort"
										placeholder="请输入MQTT Port" />
								</div>
								<div class="smList">
									<span class="slName">看板名称</span>
									<el-input class="slText" type="text" v-model="data.dashboard_name"
										placeholder="请输入看板名称" />
								</div>
								<div class="smList">
									<span class="slName">循环时间(分钟)</span>
									<el-input class="slText" type="text" v-model="topConfig.cycle"
										placeholder="请输入循环时间" />
								</div>
								<div class="smList">
									<span class="slName">模版</span>
									<el-select class="top-el-select" v-model="data.selectTemplate" placeholder="请选择模版"
										@change="changeTemplate">
										<el-option class="slTexts" v-for="(item, index) in data.templateList"
											:key="item" :label="item" :value="index + 1"></el-option>
									</el-select>
								</div>
								<div class="smList">
									<span class="slName">mqtt用户名</span>
									<el-input class="slText" type="text" v-model="topConfig.mqttUserName"
										placeholder="请输入mqtt用户名" />
								</div>
								<div class="smList">
									<span class="slName">mqtt密码</span>
									<el-input class="slText" type="text" v-model="topConfig.mqttPassWord"
										placeholder="请输入mqtt密码" />
								</div>
							</div>
							<div class="blank">
								<div class="saveBtn" @click="initBtn" style="margin-right: 15px;">初始化</div>
								<div class="saveBtn" @click="saveBtn">保存</div>
							</div>

							<div class="setModule">
								<div class="tableHeader">
									<div class="thList">采集名称</div>
									<div class="thList">采集类型</div>
									<div class="thList">串口</div>
									<div class="thList">站点号</div>
									<div class="thList">地址</div>
									<div class="thList">上报编码</div>
									<div class="thList">报警上限</div>
									<div class="thList">报警下限</div>
									<div class="thList">配置上限</div>
									<div class="thList">配置下限</div>
									<div class="thList">偏差</div>
									<div class="thList">是否报警</div>
								</div>



                                
								<div class="tableList" v-if="finishData && data.items.dew_point_c">
									<div class="thList">
										<el-input class="slTexts" type="text" v-model="data.items.dew_point_c.name"
											placeholder="请输入名称" />
									</div>

									<div class="thList">
										{{ getResult(data.items.dew_point_c.conType) }}
									</div>
									<el-select v-model="selectPort" placeholder="请选择端口">
										<el-option class="slTexts" v-for="item in portData" :key="item.value" :label="item.label"  :value="item.value" :disabled="item.disabled">
											
										</el-option>
									</el-select>
									<div class="thList">
										<el-input class="slTexts" type="text" v-model="data.items.dew_point_c.slaveId"
											placeholder="请输入站点号" />
									</div>
									<div class="thList">
										<el-input class="slTexts" type="text" v-model="data.items.dew_point_c.address"
											placeholder="请输入地址" />
									</div>

									<div class="thList">
										<el-input class="slTexts" type="text"
											v-model="data.items.dew_point_c.attributeName" placeholder="请输入上报编码" />
									</div>
								
									<div class="thList">
										<el-input class="slTexts" type="text"
											onkeypress="if(!this.value.match(/^[\+\-]?\d*?\.?\d*?$/))this.value=this.t_value;else this.t_value=this.value;if(this.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?)?$/))this.o_value=this.value"
											onkeyup="if(!this.value.match(/^[\+\-]?\d*?\.?\d*?$/))this.value=this.t_value;else this.t_value=this.value;if(this.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?)?$/))this.o_value=this.value"
											onblur="if(!this.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?|\.\d*?)?$/))this.value=this.o_value;else{if(this.value.match(/^\.\d+$/))this.value=0+this.value;if(this.value.match(/^\.$/))this.value=0;this.o_value=this.value}"
											v-model="data.items.dew_point_c.alarmSuperiorLimit" placeholder="请输入报警上限" />
									</div>
									<div class="thList">
										<el-input class="slTexts" type="text"
											v-model="data.items.dew_point_c.alarmLowerLimit" placeholder="请输入报警下限"
											onkeypress="if(!this.value.match(/^[\+\-]?\d*?\.?\d*?$/))this.value=this.t_value;else this.t_value=this.value;if(this.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?)?$/))this.o_value=this.value"
											onkeyup="if(!this.value.match(/^[\+\-]?\d*?\.?\d*?$/))this.value=this.t_value;else this.t_value=this.value;if(this.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?)?$/))this.o_value=this.value"
											onblur="if(!this.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?|\.\d*?)?$/))this.value=this.o_value;else{if(this.value.match(/^\.\d+$/))this.value=0+this.value;if(this.value.match(/^\.$/))this.value=0;this.o_value=this.value}" />
									</div>
									<div class="thList">
										<el-input class="slTexts" type="text"
											v-model="data.items.dew_point_c.configSuperiorLimit" placeholder="请输入配置上限"
											onkeypress="if(!this.value.match(/^[\+\-]?\d*?\.?\d*?$/))this.value=this.t_value;else this.t_value=this.value;if(this.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?)?$/))this.o_value=this.value"
											onkeyup="if(!this.value.match(/^[\+\-]?\d*?\.?\d*?$/))this.value=this.t_value;else this.t_value=this.value;if(this.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?)?$/))this.o_value=this.value"
											onblur="if(!this.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?|\.\d*?)?$/))this.value=this.o_value;else{if(this.value.match(/^\.\d+$/))this.value=0+this.value;if(this.value.match(/^\.$/))this.value=0;this.o_value=this.value}" />
									</div>
									<div class="thList">
										<el-input class="slTexts" type="text"
											v-model="data.items.dew_point_c.configLowerLimit" placeholder="请输入配置下限"
											onkeypress="if(!this.value.match(/^[\+\-]?\d*?\.?\d*?$/))this.value=this.t_value;else this.t_value=this.value;if(this.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?)?$/))this.o_value=this.value"
											onkeyup="if(!this.value.match(/^[\+\-]?\d*?\.?\d*?$/))this.value=this.t_value;else this.t_value=this.value;if(this.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?)?$/))this.o_value=this.value"
											onblur="if(!this.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?|\.\d*?)?$/))this.value=this.o_value;else{if(this.value.match(/^\.\d+$/))this.value=0+this.value;if(this.value.match(/^\.$/))this.value=0;this.o_value=this.value}" />
									</div>
									<div class="thList">
										<el-input class="slTexts" type="text" v-model="data.items.dew_point_c.deviation"
											placeholder="请输入偏差"
											onkeypress="if(!this.value.match(/^[\+\-]?\d*?\.?\d*?$/))this.value=this.t_value;else this.t_value=this.value;if(this.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?)?$/))this.o_value=this.value"
											onkeyup="if(!this.value.match(/^[\+\-]?\d*?\.?\d*?$/))this.value=this.t_value;else this.t_value=this.value;if(this.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?)?$/))this.o_value=this.value"
											onblur="if(!this.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?|\.\d*?)?$/))this.value=this.o_value;else{if(this.value.match(/^\.\d+$/))this.value=0+this.value;if(this.value.match(/^\.$/))this.value=0;this.o_value=this.value}" />
									</div>
									<div class="thList">
										<el-switch v-model="data.items.dew_point_c.isAlarm" @change="deWaring"
											active-text="" inactive-text=""></el-switch>
									</div>
								</div>
								<div class="tableList" v-if="finishData && data.items.temperature">
									<div class="thList">
										<el-input class="slTexts" type="text" v-model="data.items.temperature.name"
											placeholder="请输入名称" />
									</div>

									<div class="thList">
										{{ getResult(data.items.temperature.conType) }}
									</div>
									<el-select v-model="selectPort" placeholder="请选择端口">
										<el-option class="slTexts" v-for="item in portData" :key="item.value" :label="item.label"  :value="item.value" :disabled="item.disabled">
											
										</el-option>
									</el-select>
									<div class="thList">
										<el-input class="slTexts" type="text" v-model="data.items.temperature.slaveId"
											placeholder="请输入站点号" />
									</div>
									<div class="thList">
										<el-input class="slTexts" type="text" v-model="data.items.temperature.address"
											placeholder="请输入地址" />
									</div>
									<div class="thList">
										<el-input class="slTexts" type="text"
											v-model="data.items.temperature.attributeName" placeholder="请输入上报编码" />
									</div>
								
									<div class="thList">
										<el-input class="slTexts" type="text"
											v-model="data.items.temperature.alarmSuperiorLimit" placeholder="请输入报警上限"
											onkeypress="if(!this.value.match(/^[\+\-]?\d*?\.?\d*?$/))this.value=this.t_value;else this.t_value=this.value;if(this.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?)?$/))this.o_value=this.value"
											onkeyup="if(!this.value.match(/^[\+\-]?\d*?\.?\d*?$/))this.value=this.t_value;else this.t_value=this.value;if(this.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?)?$/))this.o_value=this.value"
											onblur="if(!this.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?|\.\d*?)?$/))this.value=this.o_value;else{if(this.value.match(/^\.\d+$/))this.value=0+this.value;if(this.value.match(/^\.$/))this.value=0;this.o_value=this.value}" />
									</div>
									<div class="thList">
										<el-input class="slTexts" type="text"
											v-model="data.items.temperature.alarmLowerLimit" placeholder="请输入报警下限"
											onkeypress="if(!this.value.match(/^[\+\-]?\d*?\.?\d*?$/))this.value=this.t_value;else this.t_value=this.value;if(this.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?)?$/))this.o_value=this.value"
											onkeyup="if(!this.value.match(/^[\+\-]?\d*?\.?\d*?$/))this.value=this.t_value;else this.t_value=this.value;if(this.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?)?$/))this.o_value=this.value"
											onblur="if(!this.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?|\.\d*?)?$/))this.value=this.o_value;else{if(this.value.match(/^\.\d+$/))this.value=0+this.value;if(this.value.match(/^\.$/))this.value=0;this.o_value=this.value}" />
									</div>
									<div class="thList">
										<el-input class="slTexts" type="text"
											v-model="data.items.temperature.configSuperiorLimit" placeholder="请输入配置上限"
											onkeypress="if(!this.value.match(/^[\+\-]?\d*?\.?\d*?$/))this.value=this.t_value;else this.t_value=this.value;if(this.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?)?$/))this.o_value=this.value"
											onkeyup="if(!this.value.match(/^[\+\-]?\d*?\.?\d*?$/))this.value=this.t_value;else this.t_value=this.value;if(this.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?)?$/))this.o_value=this.value"
											onblur="if(!this.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?|\.\d*?)?$/))this.value=this.o_value;else{if(this.value.match(/^\.\d+$/))this.value=0+this.value;if(this.value.match(/^\.$/))this.value=0;this.o_value=this.value}" />
									</div>
									<div class="thList">
										<el-input class="slTexts" type="text"
											v-model="data.items.temperature.configLowerLimit" placeholder="请输入配置下限"
											onkeypress="if(!this.value.match(/^[\+\-]?\d*?\.?\d*?$/))this.value=this.t_value;else this.t_value=this.value;if(this.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?)?$/))this.o_value=this.value"
											onkeyup="if(!this.value.match(/^[\+\-]?\d*?\.?\d*?$/))this.value=this.t_value;else this.t_value=this.value;if(this.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?)?$/))this.o_value=this.value"
											onblur="if(!this.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?|\.\d*?)?$/))this.value=this.o_value;else{if(this.value.match(/^\.\d+$/))this.value=0+this.value;if(this.value.match(/^\.$/))this.value=0;this.o_value=this.value}" />
									</div>
									<div class="thList">
										<el-input class="slTexts" type="text" v-model="data.items.temperature.deviation"
											placeholder="请输入偏差"
											onkeypress="if(!this.value.match(/^[\+\-]?\d*?\.?\d*?$/))this.value=this.t_value;else this.t_value=this.value;if(this.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?)?$/))this.o_value=this.value"
											onkeyup="if(!this.value.match(/^[\+\-]?\d*?\.?\d*?$/))this.value=this.t_value;else this.t_value=this.value;if(this.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?)?$/))this.o_value=this.value"
											onblur="if(!this.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?|\.\d*?)?$/))this.value=this.o_value;else{if(this.value.match(/^\.\d+$/))this.value=0+this.value;if(this.value.match(/^\.$/))this.value=0;this.o_value=this.value}" />
									</div>
									<div class="thList">
										<el-switch v-model="data.items.temperature.isAlarm" @change="tWaring"
											active-text="" inactive-text=""></el-switch>
									</div>
								</div>
								<div class="tableList" v-if="finishData && data.items.temperature2">
									<div class="thList">
										<el-input class="slTexts" type="text" v-model="data.items.temperature2.name"
											placeholder="请输入名称" />
									</div>

									<div class="thList">
										{{ getResult(data.items.temperature2.conType) }}
									</div>
									<el-select v-model="selectPort" placeholder="请选择端口">
										<el-option class="slTexts" v-for="item in portData" :key="item.value" :label="item.label"  :value="item.value" :disabled="item.disabled">
											
										</el-option>
									</el-select>
									<div class="thList">
										<el-input class="slTexts" type="text" v-model="data.items.temperature2.slaveId"
											placeholder="请输入站点号" />
									</div>
									<div class="thList">
										<el-input class="slTexts" type="text" v-model="data.items.temperature2.conType"
											placeholder="请输入地址" />
									</div>

									<div class="thList">
										<el-input class="slTexts" type="text" v-model="data.items.temperature2.attributeName"
											placeholder="请输入上报编码" />
									</div>
							
									<div class="thList">
										<el-input class="slTexts" type="text"
											v-model="data.items.temperature2.alarmSuperiorLimit" placeholder="请输入报警上限"
											onkeypress="if(!this.value.match(/^[\+\-]?\d*?\.?\d*?$/))this.value=this.t_value;else this.t_value=this.value;if(this.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?)?$/))this.o_value=this.value"
											onkeyup="if(!this.value.match(/^[\+\-]?\d*?\.?\d*?$/))this.value=this.t_value;else this.t_value=this.value;if(this.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?)?$/))this.o_value=this.value"
											onblur="if(!this.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?|\.\d*?)?$/))this.value=this.o_value;else{if(this.value.match(/^\.\d+$/))this.value=0+this.value;if(this.value.match(/^\.$/))this.value=0;this.o_value=this.value}" />
									</div>
									<div class="thList">
										<el-input class="slTexts" type="text"
											v-model="data.items.temperature2.alarmLowerLimit" placeholder="请输入报警下限"
											onkeypress="if(!this.value.match(/^[\+\-]?\d*?\.?\d*?$/))this.value=this.t_value;else this.t_value=this.value;if(this.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?)?$/))this.o_value=this.value"
											onkeyup="if(!this.value.match(/^[\+\-]?\d*?\.?\d*?$/))this.value=this.t_value;else this.t_value=this.value;if(this.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?)?$/))this.o_value=this.value"
											onblur="if(!this.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?|\.\d*?)?$/))this.value=this.o_value;else{if(this.value.match(/^\.\d+$/))this.value=0+this.value;if(this.value.match(/^\.$/))this.value=0;this.o_value=this.value}" />
									</div>
									<div class="thList">
										<el-input class="slTexts" type="text"
											v-model="data.items.temperature2.configSuperiorLimit" placeholder="请输入配置上限"
											onkeypress="if(!this.value.match(/^[\+\-]?\d*?\.?\d*?$/))this.value=this.t_value;else this.t_value=this.value;if(this.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?)?$/))this.o_value=this.value"
											onkeyup="if(!this.value.match(/^[\+\-]?\d*?\.?\d*?$/))this.value=this.t_value;else this.t_value=this.value;if(this.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?)?$/))this.o_value=this.value"
											onblur="if(!this.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?|\.\d*?)?$/))this.value=this.o_value;else{if(this.value.match(/^\.\d+$/))this.value=0+this.value;if(this.value.match(/^\.$/))this.value=0;this.o_value=this.value}" />
									</div>
									<div class="thList">
										<el-input class="slTexts" type="text"
											v-model="data.items.temperature2.configLowerLimit" placeholder="请输入配置下限"
											onkeypress="if(!this.value.match(/^[\+\-]?\d*?\.?\d*?$/))this.value=this.t_value;else this.t_value=this.value;if(this.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?)?$/))this.o_value=this.value"
											onkeyup="if(!this.value.match(/^[\+\-]?\d*?\.?\d*?$/))this.value=this.t_value;else this.t_value=this.value;if(this.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?)?$/))this.o_value=this.value"
											onblur="if(!this.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?|\.\d*?)?$/))this.value=this.o_value;else{if(this.value.match(/^\.\d+$/))this.value=0+this.value;if(this.value.match(/^\.$/))this.value=0;this.o_value=this.value}" />
									</div>
									<div class="thList">
										<el-input class="slTexts" type="text"
											v-model="data.items.temperature2.deviation" placeholder="请输入偏差"
											onkeypress="if(!this.value.match(/^[\+\-]?\d*?\.?\d*?$/))this.value=this.t_value;else this.t_value=this.value;if(this.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?)?$/))this.o_value=this.value"
											onkeyup="if(!this.value.match(/^[\+\-]?\d*?\.?\d*?$/))this.value=this.t_value;else this.t_value=this.value;if(this.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?)?$/))this.o_value=this.value"
											onblur="if(!this.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?|\.\d*?)?$/))this.value=this.o_value;else{if(this.value.match(/^\.\d+$/))this.value=0+this.value;if(this.value.match(/^\.$/))this.value=0;this.o_value=this.value}" />
									</div>
									<div class="thList">
										<el-switch v-model="data.items.temperature2.isAlarm" @change="tWaring2"
											active-text="" inactive-text=""></el-switch>
									</div>
								</div>
								<div class="tableList" v-if="finishData && data.items.dif_pressure_pa">
									<div class="thList">
										<el-input class="slTexts" type="text" v-model="data.items.dif_pressure_pa.name"
											placeholder="请输入名称" />
									</div>

									<div class="thList">
										{{ getResult(data.items.dif_pressure_pa.conType) }}
									</div>
									<el-select v-model="selectPort" placeholder="请选择端口">
										<el-option class="slTexts" v-for="item in portData" :key="item.value" :label="item.label"  :value="item.value" :disabled="item.disabled">
											
										</el-option>
									</el-select>
									<div class="thList">
										<el-input class="slTexts" type="text"
											v-model="data.items.dif_pressure_pa.slaveId" placeholder="请输入站点号" />
									</div>
									<div class="thList">
										<el-input class="slTexts" type="text"
											v-model="data.items.dif_pressure_pa.address" placeholder="请输入地址" />
									</div>

									<div class="thList">
										<el-input class="slTexts" type="text"
											v-model="data.items.dif_pressure_pa.attributeName" placeholder="请输入上报编码" />
									</div>
						
									<div class="thList">
										<el-input class="slTexts" type="text"
											v-model="data.items.dif_pressure_pa.alarmSuperiorLimit"
											placeholder="请输入报警上限"
											onkeypress="if(!this.value.match(/^[\+\-]?\d*?\.?\d*?$/))this.value=this.t_value;else this.t_value=this.value;if(this.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?)?$/))this.o_value=this.value"
											onkeyup="if(!this.value.match(/^[\+\-]?\d*?\.?\d*?$/))this.value=this.t_value;else this.t_value=this.value;if(this.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?)?$/))this.o_value=this.value"
											onblur="if(!this.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?|\.\d*?)?$/))this.value=this.o_value;else{if(this.value.match(/^\.\d+$/))this.value=0+this.value;if(this.value.match(/^\.$/))this.value=0;this.o_value=this.value}" />
									</div>
									<div class="thList">
										<el-input class="slTexts" type="text"
											v-model="data.items.dif_pressure_pa.alarmLowerLimit" placeholder="请输入报警下限"
											onkeypress="if(!this.value.match(/^[\+\-]?\d*?\.?\d*?$/))this.value=this.t_value;else this.t_value=this.value;if(this.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?)?$/))this.o_value=this.value"
											onkeyup="if(!this.value.match(/^[\+\-]?\d*?\.?\d*?$/))this.value=this.t_value;else this.t_value=this.value;if(this.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?)?$/))this.o_value=this.value"
											onblur="if(!this.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?|\.\d*?)?$/))this.value=this.o_value;else{if(this.value.match(/^\.\d+$/))this.value=0+this.value;if(this.value.match(/^\.$/))this.value=0;this.o_value=this.value}" />
									</div>
									<div class="thList">
										<el-input class="slTexts" type="text"
											v-model="data.items.dif_pressure_pa.configSuperiorLimit"
											placeholder="请输入配置上限"
											onkeypress="if(!this.value.match(/^[\+\-]?\d*?\.?\d*?$/))this.value=this.t_value;else this.t_value=this.value;if(this.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?)?$/))this.o_value=this.value"
											onkeyup="if(!this.value.match(/^[\+\-]?\d*?\.?\d*?$/))this.value=this.t_value;else this.t_value=this.value;if(this.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?)?$/))this.o_value=this.value"
											onblur="if(!this.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?|\.\d*?)?$/))this.value=this.o_value;else{if(this.value.match(/^\.\d+$/))this.value=0+this.value;if(this.value.match(/^\.$/))this.value=0;this.o_value=this.value}" />
									</div>
									<div class="thList">
										<el-input class="slTexts" type="text"
											v-model="data.items.dif_pressure_pa.configLowerLimit" placeholder="请输入配置下限"
											onkeypress="if(!this.value.match(/^[\+\-]?\d*?\.?\d*?$/))this.value=this.t_value;else this.t_value=this.value;if(this.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?)?$/))this.o_value=this.value"
											onkeyup="if(!this.value.match(/^[\+\-]?\d*?\.?\d*?$/))this.value=this.t_value;else this.t_value=this.value;if(this.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?)?$/))this.o_value=this.value"
											onblur="if(!this.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?|\.\d*?)?$/))this.value=this.o_value;else{if(this.value.match(/^\.\d+$/))this.value=0+this.value;if(this.value.match(/^\.$/))this.value=0;this.o_value=this.value}" />
									</div>
									<div class="thList">
										<el-input class="slTexts" type="text"
											v-model="data.items.dif_pressure_pa.deviation" placeholder="请输入偏差"
											onkeypress="if(!this.value.match(/^[\+\-]?\d*?\.?\d*?$/))this.value=this.t_value;else this.t_value=this.value;if(this.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?)?$/))this.o_value=this.value"
											onkeyup="if(!this.value.match(/^[\+\-]?\d*?\.?\d*?$/))this.value=this.t_value;else this.t_value=this.value;if(this.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?)?$/))this.o_value=this.value"
											onblur="if(!this.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?|\.\d*?)?$/))this.value=this.o_value;else{if(this.value.match(/^\.\d+$/))this.value=0+this.value;if(this.value.match(/^\.$/))this.value=0;this.o_value=this.value}" />
									</div>
									<div class="thList">
										<el-switch v-model="data.items.dif_pressure_pa.isAlarm" @change="dWaring"
											active-text="" inactive-text=""></el-switch>
									</div>
								</div>
								<div class="tableList" v-if="finishData && data.items.humidness">
									<div class="thList">
										<el-input class="slTexts" type="text" v-model="data.items.humidness.name"
											placeholder="请输入名称" />
									</div>

									<div class="thList">
										{{ getResult(data.items.humidness.conType) }}
									</div>
									<el-select v-model="selectPort" placeholder="请选择端口">
										<el-option class="slTexts" v-for="item in portData" :key="item.value" :label="item.label"  :value="item.value" :disabled="item.disabled">
											
										</el-option>
									</el-select>
									<div class="thList">
										<el-input class="slTexts" type="text" v-model="data.items.humidness.slaveId"
											placeholder="请输入站点号" />
									</div>
									<div class="thList">
										<el-input class="slTexts" type="text" v-model="data.items.humidness.address"
											placeholder="请输入地址" />
									</div>

									<div class="thList">
										<el-input class="slTexts" type="text"
											v-model="data.items.humidness.attributeName" placeholder="请输入上报编码" />
									</div>
								
									<div class="thList">
										<el-input class="slTexts" type="text"
											v-model="data.items.humidness.alarmSuperiorLimit" placeholder="请输入报警上限"
											onkeypress="if(!this.value.match(/^[\+\-]?\d*?\.?\d*?$/))this.value=this.t_value;else this.t_value=this.value;if(this.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?)?$/))this.o_value=this.value"
											onkeyup="if(!this.value.match(/^[\+\-]?\d*?\.?\d*?$/))this.value=this.t_value;else this.t_value=this.value;if(this.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?)?$/))this.o_value=this.value"
											onblur="if(!this.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?|\.\d*?)?$/))this.value=this.o_value;else{if(this.value.match(/^\.\d+$/))this.value=0+this.value;if(this.value.match(/^\.$/))this.value=0;this.o_value=this.value}" />
									</div>
									<div class="thList">
										<el-input class="slTexts" type="text"
											v-model="data.items.humidness.alarmLowerLimit" placeholder="请输入报警下限"
											onkeypress="if(!this.value.match(/^[\+\-]?\d*?\.?\d*?$/))this.value=this.t_value;else this.t_value=this.value;if(this.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?)?$/))this.o_value=this.value"
											onkeyup="if(!this.value.match(/^[\+\-]?\d*?\.?\d*?$/))this.value=this.t_value;else this.t_value=this.value;if(this.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?)?$/))this.o_value=this.value"
											onblur="if(!this.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?|\.\d*?)?$/))this.value=this.o_value;else{if(this.value.match(/^\.\d+$/))this.value=0+this.value;if(this.value.match(/^\.$/))this.value=0;this.o_value=this.value}" />
									</div>
									<div class="thList">
										<el-input class="slTexts" type="text"
											v-model="data.items.humidness.configSuperiorLimit" placeholder="请输入配置上限"
											onkeypress="if(!this.value.match(/^[\+\-]?\d*?\.?\d*?$/))this.value=this.t_value;else this.t_value=this.value;if(this.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?)?$/))this.o_value=this.value"
											onkeyup="if(!this.value.match(/^[\+\-]?\d*?\.?\d*?$/))this.value=this.t_value;else this.t_value=this.value;if(this.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?)?$/))this.o_value=this.value"
											onblur="if(!this.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?|\.\d*?)?$/))this.value=this.o_value;else{if(this.value.match(/^\.\d+$/))this.value=0+this.value;if(this.value.match(/^\.$/))this.value=0;this.o_value=this.value}" />
									</div>
									<div class="thList">
										<el-input class="slTexts" type="text"
											v-model="data.items.humidness.configLowerLimit" placeholder="请输入配置下限"
											onkeypress="if(!this.value.match(/^[\+\-]?\d*?\.?\d*?$/))this.value=this.t_value;else this.t_value=this.value;if(this.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?)?$/))this.o_value=this.value"
											onkeyup="if(!this.value.match(/^[\+\-]?\d*?\.?\d*?$/))this.value=this.t_value;else this.t_value=this.value;if(this.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?)?$/))this.o_value=this.value"
											onblur="if(!this.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?|\.\d*?)?$/))this.value=this.o_value;else{if(this.value.match(/^\.\d+$/))this.value=0+this.value;if(this.value.match(/^\.$/))this.value=0;this.o_value=this.value}" />
									</div>
									<div class="thList">
										<el-input class="slTexts" type="text" v-model="data.items.humidness.deviation"
											placeholder="请输入偏差"
											onkeypress="if(!this.value.match(/^[\+\-]?\d*?\.?\d*?$/))this.value=this.t_value;else this.t_value=this.value;if(this.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?)?$/))this.o_value=this.value"
											onkeyup="if(!this.value.match(/^[\+\-]?\d*?\.?\d*?$/))this.value=this.t_value;else this.t_value=this.value;if(this.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?)?$/))this.o_value=this.value"
											onblur="if(!this.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?|\.\d*?)?$/))this.value=this.o_value;else{if(this.value.match(/^\.\d+$/))this.value=0+this.value;if(this.value.match(/^\.$/))this.value=0;this.o_value=this.value}" />
									</div>
									<div class="thList">
										<el-switch v-model="data.items.humidness.isAlarm" @change="hWaring"
											active-text="" inactive-text=""></el-switch>
									</div>
								</div>
								<div class="tableList" v-if="finishData && data.items.humidness2">
									<div class="thList">
										<el-input class="slTexts" type="text" v-model="data.items.humidness2.name"
											placeholder="请输入名称" />
									</div>

									<div class="thList">
										{{ getResult(data.items.humidness2.conType) }}
									</div>
									<el-select v-model="selectPort" placeholder="请选择端口">
										<el-option class="slTexts" v-for="item in portData" :key="item.value" :label="item.label"  :value="item.value" :disabled="item.disabled">
											
										</el-option>
									</el-select>
									<div class="thList">
										<el-input class="slTexts" type="text" v-model="data.items.humidness2.slaveId"
											placeholder="请输入站点号" />
									</div>
									<div class="thList">
										<el-input class="slTexts" type="text" v-model="data.items.humidness2.address"
											placeholder="请输入地址" />
									</div>

									<div class="thList">
										<el-input class="slTexts" type="text"
											v-model="data.items.humidness2.attributeName" placeholder="请输入上报编码" />
									</div>
						
									<div class="thList">
										<el-input class="slTexts" type="text"
											v-model="data.items.humidness2.alarmSuperiorLimit" placeholder="请输入报警上限"
											onkeypress="if(!this.value.match(/^[\+\-]?\d*?\.?\d*?$/))this.value=this.t_value;else this.t_value=this.value;if(this.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?)?$/))this.o_value=this.value"
											onkeyup="if(!this.value.match(/^[\+\-]?\d*?\.?\d*?$/))this.value=this.t_value;else this.t_value=this.value;if(this.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?)?$/))this.o_value=this.value"
											onblur="if(!this.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?|\.\d*?)?$/))this.value=this.o_value;else{if(this.value.match(/^\.\d+$/))this.value=0+this.value;if(this.value.match(/^\.$/))this.value=0;this.o_value=this.value}" />
									</div>
									<div class="thList">
										<el-input class="slTexts" type="text"
											v-model="data.items.humidness2.alarmLowerLimit" placeholder="请输入报警下限"
											onkeypress="if(!this.value.match(/^[\+\-]?\d*?\.?\d*?$/))this.value=this.t_value;else this.t_value=this.value;if(this.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?)?$/))this.o_value=this.value"
											onkeyup="if(!this.value.match(/^[\+\-]?\d*?\.?\d*?$/))this.value=this.t_value;else this.t_value=this.value;if(this.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?)?$/))this.o_value=this.value"
											onblur="if(!this.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?|\.\d*?)?$/))this.value=this.o_value;else{if(this.value.match(/^\.\d+$/))this.value=0+this.value;if(this.value.match(/^\.$/))this.value=0;this.o_value=this.value}" />
									</div>
									<div class="thList">
										<el-input class="slTexts" type="text"
											v-model="data.items.humidness2.configSuperiorLimit" placeholder="请输入配置上限"
											onkeypress="if(!this.value.match(/^[\+\-]?\d*?\.?\d*?$/))this.value=this.t_value;else this.t_value=this.value;if(this.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?)?$/))this.o_value=this.value"
											onkeyup="if(!this.value.match(/^[\+\-]?\d*?\.?\d*?$/))this.value=this.t_value;else this.t_value=this.value;if(this.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?)?$/))this.o_value=this.value"
											onblur="if(!this.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?|\.\d*?)?$/))this.value=this.o_value;else{if(this.value.match(/^\.\d+$/))this.value=0+this.value;if(this.value.match(/^\.$/))this.value=0;this.o_value=this.value}" />
									</div>
									<div class="thList">
										<el-input class="slTexts" type="text"
											v-model="data.items.humidness2.configLowerLimit" placeholder="请输入配置下限"
											onkeypress="if(!this.value.match(/^[\+\-]?\d*?\.?\d*?$/))this.value=this.t_value;else this.t_value=this.value;if(this.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?)?$/))this.o_value=this.value"
											onkeyup="if(!this.value.match(/^[\+\-]?\d*?\.?\d*?$/))this.value=this.t_value;else this.t_value=this.value;if(this.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?)?$/))this.o_value=this.value"
											onblur="if(!this.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?|\.\d*?)?$/))this.value=this.o_value;else{if(this.value.match(/^\.\d+$/))this.value=0+this.value;if(this.value.match(/^\.$/))this.value=0;this.o_value=this.value}" />
									</div>
									<div class="thList">
										<el-input class="slTexts" type="text" v-model="data.items.humidness2.deviation"
											placeholder="请输入偏差"
											onkeypress="if(!this.value.match(/^[\+\-]?\d*?\.?\d*?$/))this.value=this.t_value;else this.t_value=this.value;if(this.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?)?$/))this.o_value=this.value"
											onkeyup="if(!this.value.match(/^[\+\-]?\d*?\.?\d*?$/))this.value=this.t_value;else this.t_value=this.value;if(this.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?)?$/))this.o_value=this.value"
											onblur="if(!this.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?|\.\d*?)?$/))this.value=this.o_value;else{if(this.value.match(/^\.\d+$/))this.value=0+this.value;if(this.value.match(/^\.$/))this.value=0;this.o_value=this.value}" />
									</div>
									<div class="thList">
										<el-switch v-model="data.items.humidness2.isAlarm" @change="hWaring2"
											active-text="" inactive-text=""></el-switch>
									</div>
								</div>

								<div class="tableList" v-if="finishData && data.items.g05">
									<div class="thList">
										<el-input class="slTexts" type="text" v-model="data.items.g05.name"
											placeholder="请输入名称" />
									</div>

									<div class="thList">
										{{ getResult(data.items.g05.conType) }}
									</div>
									<el-select v-model="selectPort" placeholder="请选择端口">
										<el-option class="slTexts" v-for="item in portData" :key="item.value" :label="item.label"  :value="item.value" :disabled="item.disabled">
											
										</el-option>
									</el-select>
									<div class="thList">
										<el-input class="slTexts" type="text" v-model="data.items.g05.slaveId"
											placeholder="请输入站点号" />
									</div>
									<div class="thList">
										<el-input class="slTexts" type="text" v-model="data.items.g05.address"
											placeholder="请输入地址" />
									</div>

									<div class="thList">
										<el-input class="slTexts" type="text" v-model="data.items.g05.attributeName"
											placeholder="请输入上报编码" />
									</div>
								
									<div class="thList">
										<el-input class="slTexts" type="text"
											v-model="data.items.g05.alarmSuperiorLimit" placeholder="请输入报警上限"
											onkeypress="if(!this.value.match(/^[\+\-]?\d*?\.?\d*?$/))this.value=this.t_value;else this.t_value=this.value;if(this.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?)?$/))this.o_value=this.value"
											onkeyup="if(!this.value.match(/^[\+\-]?\d*?\.?\d*?$/))this.value=this.t_value;else this.t_value=this.value;if(this.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?)?$/))this.o_value=this.value"
											onblur="if(!this.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?|\.\d*?)?$/))this.value=this.o_value;else{if(this.value.match(/^\.\d+$/))this.value=0+this.value;if(this.value.match(/^\.$/))this.value=0;this.o_value=this.value}" />
									</div>
									<div class="thList">
										<el-input class="slTexts" type="text" v-model="data.items.g05.alarmLowerLimit"
											placeholder="请输入报警下限"
											onkeypress="if(!this.value.match(/^[\+\-]?\d*?\.?\d*?$/))this.value=this.t_value;else this.t_value=this.value;if(this.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?)?$/))this.o_value=this.value"
											onkeyup="if(!this.value.match(/^[\+\-]?\d*?\.?\d*?$/))this.value=this.t_value;else this.t_value=this.value;if(this.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?)?$/))this.o_value=this.value"
											onblur="if(!this.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?|\.\d*?)?$/))this.value=this.o_value;else{if(this.value.match(/^\.\d+$/))this.value=0+this.value;if(this.value.match(/^\.$/))this.value=0;this.o_value=this.value}" />
									</div>
									<div class="thList">
										<el-input class="slTexts" type="text"
											v-model="data.items.g05.configSuperiorLimit" placeholder="请输入配置上限"
											onkeypress="if(!this.value.match(/^[\+\-]?\d*?\.?\d*?$/))this.value=this.t_value;else this.t_value=this.value;if(this.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?)?$/))this.o_value=this.value"
											onkeyup="if(!this.value.match(/^[\+\-]?\d*?\.?\d*?$/))this.value=this.t_value;else this.t_value=this.value;if(this.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?)?$/))this.o_value=this.value"
											onblur="if(!this.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?|\.\d*?)?$/))this.value=this.o_value;else{if(this.value.match(/^\.\d+$/))this.value=0+this.value;if(this.value.match(/^\.$/))this.value=0;this.o_value=this.value}" />
									</div>
									<div class="thList">
										<el-input class="slTexts" type="text" v-model="data.items.g05.configLowerLimit"
											placeholder="请输入配置下限"
											onkeypress="if(!this.value.match(/^[\+\-]?\d*?\.?\d*?$/))this.value=this.t_value;else this.t_value=this.value;if(this.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?)?$/))this.o_value=this.value"
											onkeyup="if(!this.value.match(/^[\+\-]?\d*?\.?\d*?$/))this.value=this.t_value;else this.t_value=this.value;if(this.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?)?$/))this.o_value=this.value"
											onblur="if(!this.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?|\.\d*?)?$/))this.value=this.o_value;else{if(this.value.match(/^\.\d+$/))this.value=0+this.value;if(this.value.match(/^\.$/))this.value=0;this.o_value=this.value}" />
									</div>
									<div class="thList">
										<el-input class="slTexts" type="text" v-model="data.items.g05.deviation"
											placeholder="请输入偏差"
											onkeypress="if(!this.value.match(/^[\+\-]?\d*?\.?\d*?$/))this.value=this.t_value;else this.t_value=this.value;if(this.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?)?$/))this.o_value=this.value"
											onkeyup="if(!this.value.match(/^[\+\-]?\d*?\.?\d*?$/))this.value=this.t_value;else this.t_value=this.value;if(this.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?)?$/))this.o_value=this.value"
											onblur="if(!this.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?|\.\d*?)?$/))this.value=this.o_value;else{if(this.value.match(/^\.\d+$/))this.value=0+this.value;if(this.value.match(/^\.$/))this.value=0;this.o_value=this.value}" />
									</div>
									<div class="thList">
										<el-switch v-model="data.items.g05.isAlarm" @change="Warings_05"></el-switch>
									</div>
								</div>
								<div class="tableList" v-if="finishData && data.items.g50">
									<div class="thList">
										<el-input class="slTexts" type="text" v-model="data.items.g50.name"
											placeholder="请输入名称" />
									</div>

									<div class="thList">
										{{ getResult(data.items.g50.conType) }}
									</div>
									<el-select v-model="selectPort" placeholder="请选择端口">
										<el-option class="slTexts" v-for="item in portData" :key="item.value" :label="item.label"  :value="item.value" :disabled="item.disabled">
											
										</el-option>
									</el-select>
									<div class="thList">
										<el-input class="slTexts" type="text" v-model="data.items.g50.slaveId"
											placeholder="请输入站点号" />
									</div>
									<div class="thList">
										<el-input class="slTexts" type="text" v-model="data.items.g50.address"
											placeholder="请输入地址" />
									</div>

									<div class="thList">
										<el-input class="slTexts" type="text" v-model="data.items.g50.attributeName"
											placeholder="请输入上报编码" />
									</div>
									<div class="thList">
										<el-input class="slTexts" type="text"
											v-model="data.items.g50.alarmSuperiorLimit" placeholder="请输入报警上限"
											onkeypress="if(!this.value.match(/^[\+\-]?\d*?\.?\d*?$/))this.value=this.t_value;else this.t_value=this.value;if(this.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?)?$/))this.o_value=this.value"
											onkeyup="if(!this.value.match(/^[\+\-]?\d*?\.?\d*?$/))this.value=this.t_value;else this.t_value=this.value;if(this.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?)?$/))this.o_value=this.value"
											onblur="if(!this.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?|\.\d*?)?$/))this.value=this.o_value;else{if(this.value.match(/^\.\d+$/))this.value=0+this.value;if(this.value.match(/^\.$/))this.value=0;this.o_value=this.value}" />
									</div>
									<div class="thList">
										<el-input class="slTexts" type="text" v-model="data.items.g50.alarmLowerLimit"
											placeholder="请输入报警下限"
											onkeypress="if(!this.value.match(/^[\+\-]?\d*?\.?\d*?$/))this.value=this.t_value;else this.t_value=this.value;if(this.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?)?$/))this.o_value=this.value"
											onkeyup="if(!this.value.match(/^[\+\-]?\d*?\.?\d*?$/))this.value=this.t_value;else this.t_value=this.value;if(this.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?)?$/))this.o_value=this.value"
											onblur="if(!this.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?|\.\d*?)?$/))this.value=this.o_value;else{if(this.value.match(/^\.\d+$/))this.value=0+this.value;if(this.value.match(/^\.$/))this.value=0;this.o_value=this.value}" />
									</div>
									<div class="thList">
										<el-input class="slTexts" type="text"
											v-model="data.items.g50.configSuperiorLimit" placeholder="请输入配置上限"
											onkeypress="if(!this.value.match(/^[\+\-]?\d*?\.?\d*?$/))this.value=this.t_value;else this.t_value=this.value;if(this.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?)?$/))this.o_value=this.value"
											onkeyup="if(!this.value.match(/^[\+\-]?\d*?\.?\d*?$/))this.value=this.t_value;else this.t_value=this.value;if(this.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?)?$/))this.o_value=this.value"
											onblur="if(!this.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?|\.\d*?)?$/))this.value=this.o_value;else{if(this.value.match(/^\.\d+$/))this.value=0+this.value;if(this.value.match(/^\.$/))this.value=0;this.o_value=this.value}" />
									</div>
									<div class="thList">
										<el-input class="slTexts" type="text" v-model="data.items.g50.configLowerLimit"
											placeholder="请输入配置下限"
											onkeypress="if(!this.value.match(/^[\+\-]?\d*?\.?\d*?$/))this.value=this.t_value;else this.t_value=this.value;if(this.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?)?$/))this.o_value=this.value"
											onkeyup="if(!this.value.match(/^[\+\-]?\d*?\.?\d*?$/))this.value=this.t_value;else this.t_value=this.value;if(this.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?)?$/))this.o_value=this.value"
											onblur="if(!this.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?|\.\d*?)?$/))this.value=this.o_value;else{if(this.value.match(/^\.\d+$/))this.value=0+this.value;if(this.value.match(/^\.$/))this.value=0;this.o_value=this.value}" />
									</div>
									<div class="thList">
										<el-input class="slTexts" type="text" v-model="data.items.g50.deviation"
											placeholder="请输入偏差"
											onkeypress="if(!this.value.match(/^[\+\-]?\d*?\.?\d*?$/))this.value=this.t_value;else this.t_value=this.value;if(this.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?)?$/))this.o_value=this.value"
											onkeyup="if(!this.value.match(/^[\+\-]?\d*?\.?\d*?$/))this.value=this.t_value;else this.t_value=this.value;if(this.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?)?$/))this.o_value=this.value"
											onblur="if(!this.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?|\.\d*?)?$/))this.value=this.o_value;else{if(this.value.match(/^\.\d+$/))this.value=0+this.value;if(this.value.match(/^\.$/))this.value=0;this.o_value=this.value}" />
									</div>
									<div class="thList">
										<el-switch v-model="data.items.g50.isAlarm" @change="gWaring"></el-switch>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
	import {
		defineComponent
	} from 'vue'
	import {
		SetConfig
	} from '@/api'
	import {
		BASE_URL
	} from '@/api/ENV'
	import Header from '@/components/twoHeader/Header.vue'
	import axios from 'axios'
	import * as mqtt from 'mqtt/dist/mqtt.min.js'
	let client: any
	import {
		ref
	} from 'vue'
	import type {
		UploadInstance
	} from 'element-plus'
	import URL from '@/api/URL'
	const uploadRef = ref < UploadInstance > ()
	import {
		ElLoading
	} from 'element-plus'
	export default defineComponent({
		name: 'EngineView',
		emits: ['setChangeDetail'],
		data() {
			return {
				selectPort:'COM2',
				portData:[{
					label:'COM1',
					value:'COM1',
					disabled:true
				},{
					label:'COM2',
					value:'COM2',
					disabled:false
				}],
				finishData:false,
				showAlert: false, // 保存成功显示弹窗
				topConfig: {},
				getListData: [],
				timeMes: 15,
				modelData: [{
						value: 1,
						label: '露点',
					},
					{
						value: 2,
						label: '温度',
					},
					{
						value: 3,
						label: '压差',
					},
					{
						value: 4,
						label: '湿度',
					},
					{
						value: 5,
						label: '洁净度',
					},
					{
						value: 6,
						label: '洁净度',
					},
				],
				conType: [{
					value: '4-20ma',
					label: '4-20ma',
				}, ],
				slaveId: [{
					value: 'Test',
					label: 'Test',
				}, ],

				data: {
					mask: '', // 子网掩码
					gateway: '', // 网关地址
					device_name: '', //设备名称
					device_id: '', // 设备编码
					mqtt_address: '', // mqtt连接地址
					mqtt_port: null, // mqtt连接端口
					dashboard_name: '', // 看板名称
					particle_interval: '', // 循环时间（分钟）
					selectTemplate: 7, // 选择的模版
					templateList: [
						'温度',
						'露点温度洁净度',
						'温湿度',
						'温湿度压差',
						'露点温度压差湿度',
						'双温湿度',
						'全部',
					],
					username: '', // mqtt用户名
					password: '', // mqtt密码
					newTopic: '',
					ip: '', //172.17.0.1
					// "address": null,//10000
					items: {
						dew_point_c: {
							//露点
							name: '露点', // 型号
							conType: 1, // 传感器类型
							slaveId: '', // 站点号
							address: '', // 点位地址
							attributeName: '', // 上报编码
							alarmSuperiorLimit: null, // 告警上限
							alarmLowerLimit: null, // 告警下限
							configSuperiorLimit: '20', // 配置上限
							configLowerLimit: '-80', // 配置下限
							deviation: '0', // 偏差
							isAlarm: false, // 是否报警
						},
						temperature: {
							//温度
							name: '温度', // 型号
							conType: 2, // 传感器类型
							slaveId: '', // 站点号
							address: '', // 点位地址
							attributeName: '', // 上报编码
							alarmSuperiorLimit: null, // 告警上限
							alarmLowerLimit: null, // 告警下限
							configSuperiorLimit: '60', // 配置上限
							configLowerLimit: '40', // 配置下限
							deviation: '0', // 偏差
							isAlarm: false, // 是否报警
						},

						dif_pressure_pa: {
							//压差
							name: '压差', // 型号
							conType: 3, // 传感器类型
							slaveId: '', // 站点号
							address: '', // 点位地址
							attributeName: '', // 上报编码
							alarmSuperiorLimit: null, // 告警上限
							alarmLowerLimit: null, // 告警下限
							configSuperiorLimit: '50', // 配置上限
							configLowerLimit: '-50', // 配置下限
							deviation: '0', // 偏差
							isAlarm: false, // 是否报警
						},
						humidness: {
							//湿度
							name: '湿度', // 型号
							conType: 4, // 传感器类型
							slaveId: '', // 站点号
							address: '', // 点位地址
							attributeName: '', // 上报编码
							alarmSuperiorLimit: null, // 告警上限
							alarmLowerLimit: null, // 告警下限
							configSuperiorLimit: '100', // 配置上限
							configLowerLimit: '0', // 配置下限
							deviation: '0', // 偏差
							isAlarm: false, // 是否报警
						},
						humidness2: {
							//湿度
							name: '湿度2', // 型号
							conType: 4, // 传感器类型
							slaveId: '', // 站点号
							address: '', // 点位地址
							attributeName: '', // 上报编码
							alarmSuperiorLimit: null, // 告警上限
							alarmLowerLimit: null, // 告警下限
							configSuperiorLimit: '100', // 配置上限
							configLowerLimit: '0', // 配置下限
							deviation: '0', // 偏差
							isAlarm: false, // 是否报警
						},
						temperature2: {
							//温度
							name: '温度2', // 型号
							conType: 2, // 传感器类型
							slaveId: '', // 站点号
							address: '', // 点位地址
							attributeName: '', // 上报编码
							alarmSuperiorLimit: null, // 告警上限
							alarmLowerLimit: null, // 告警下限
							configSuperiorLimit: '60', // 配置上限
							configLowerLimit: '-40', // 配置下限
							deviation: '0', // 偏差
							isAlarm: false, // 是否报警
						},

						g05: {
							//g0.5
							name: '洁净度', // 型号
							conType: 5, // 传感器类型
							slaveId: '', // 站点号
							address: '', // 点位地址
							attributeName: '', // 上报编码
							alarmSuperiorLimit: null, // 告警上限
							alarmLowerLimit: null, // 告警下限
							configSuperiorLimit: '', // 配置上限
							configLowerLimit: '', // 配置下限
							deviation: '0', // 偏差
							isAlarm: false, // 是否报警
						},
						g50: {
							// G5.0
							name: '洁净度', // 型号
							conType: 6, // 传感器类型
							slaveId: '', // 站点号
							address: '', // 点位地址
							attributeName: '', // 上报编码
							alarmSuperiorLimit: null, // 告警上限
							alarmLowerLimit: null, // 告警下限
							configSuperiorLimit: '', // 配置上限
							configLowerLimit: '', // 配置下限
							deviation: '0', // 偏差
							isAlarm: false, // 是否报警
						},
					},
				},
			}
		},
		components: {
			Header,
		},

		methods: {
			initBtn(){
				this.topConfig.content = JSON.stringify({
					dashboard_name: this.data.dashboard_name,
					selectTemplate: 7, // 选择的模版
				})
				const loading = ElLoading.service({
				    lock: true,
				    text: 'Loading',
				    background: 'rgba(0, 0, 0, 0.7)',
				  })
				  axios({
				  	url: BASE_URL + URL.postCollectionServer,
				  	data: this.topConfig,
				  	method: 'post',
				  	headers: {
				  		'Content-Type': 'application/json',
				  	},
				  }).then((res2) => {
				  	axios({
				  		url: BASE_URL + URL.deviceInit,
				  		method: 'get',
				  		headers: {
				  			'Content-Type': 'application/json',
				  		},
				  	}).then((res2) => {
				  		this.showAlert = true
				  		setTimeout(() => {
							this.showAlert = false
				  			this.$emit('setChangeDetail')
							loading.close()
				  		}, 2000)
				  	}).catch((error) => {
				  		console.log(error)
				  	})
				  }).catch((error) => {
				  	console.log(error)
				  })
				
				
				
				
			},
			getResult(index: any) {
				switch (index) {
					case 1:
						return '露点'
					case 2:
						return '温度'
					case 3:
						return '压差'
					case 4:
						return '湿度'
					case 5:
						return '洁净度0.5'
					case 6:
						return '洁净度5.0'
					default:
						return '空的' + index
				}
			},
			changeTemplate() {
				
				// humidness 1湿度  temperature 2温度  dif_pressure_pa 3压差 dew_point_c 4露点 5g05 6g50
				console.log(this.topConfig.content.selectTemplate)
				switch (this.data.selectTemplate) {
					case 1:
						this.$data.data.items = {
							temperature: {
								//温度
								name: '温度', // 型号
								conType: 2, // 传感器类型
								slaveId: '1', // 站点号
								address: '0', // 点位地址
								attributeName: '', // 上报编码
								alarmSuperiorLimit: null, // 告警上限
								alarmLowerLimit: null, // 告警下限
								configSuperiorLimit: '60', // 配置上限
								configLowerLimit: '-40', // 配置下限
								deviation: '0', // 偏差
								isAlarm: false, // 是否报警
							},
						}
						break
					case 2:
						this.$data.data.items = {
							temperature: {
								//温度
								name: '温度', // 型号
								conType: 2, // 传感器类型
								slaveId: '1', // 站点号
								address: '0', // 点位地址
								attributeName: '', // 上报编码
								alarmSuperiorLimit: null, // 告警上限
								alarmLowerLimit: null, // 告警下限
								configSuperiorLimit: '60', // 配置上限
								configLowerLimit: '-40', // 配置下限
								deviation: '0', // 偏差
								isAlarm: false, // 是否报警
							},

							dew_point_c: {
								//露点
								name: '露点', // 型号
								conType: 1, // 传感器类型
								slaveId: '1', // 站点号
								address: '6', // 点位地址
								attributeName: '', // 上报编码
								alarmSuperiorLimit: null, // 告警上限
								alarmLowerLimit: null, // 告警下限
								configSuperiorLimit: '20', // 配置上限
								configLowerLimit: '-80', // 配置下限
								deviation: '0', // 偏差
								isAlarm: false, // 是否报警
							},
							g05: {
								//g0.5
								name: '洁净度', // 型号
								conType: 5, // 传感器类型
								slaveId: '2', // 站点号
								address: '26', // 点位地址
								attributeName: '', // 上报编码
								alarmSuperiorLimit: null, // 告警上限
								alarmLowerLimit: null, // 告警下限
								configSuperiorLimit: '', // 配置上限
								configLowerLimit: '', // 配置下限
								deviation: '0', // 偏差
								isAlarm: false, // 是否报警
							},
							g50: {
								// G5.0
								name: '洁净度', // 型号
								conType: 6, // 传感器类型
								slaveId: '2', // 站点号
								address: '32', // 点位地址
								attributeName: '', // 上报编码
								alarmSuperiorLimit: null, // 告警上限
								alarmLowerLimit: null, // 告警下限
								configSuperiorLimit: '', // 配置上限
								configLowerLimit: '', // 配置下限
								deviation: '0', // 偏差
								isAlarm: false, // 是否报警
							},
						}
						break
					case 3:
						this.$data.data.items = {
							humidness: {
								//湿度
								name: '湿度', // 型号
								conType: 4, // 传感器类型
								slaveId: '1', // 站点号
								address: '2', // 点位地址
								attributeName: '', // 上报编码
								alarmSuperiorLimit: null, // 告警上限
								alarmLowerLimit: null, // 告警下限
								configSuperiorLimit: '100', // 配置上限
								configLowerLimit: '0', // 配置下限
								deviation: '0', // 偏差
								isAlarm: false, // 是否报警
							},
							temperature: {
								//温度
								name: '温度', // 型号
								conType: 2, // 传感器类型
								slaveId: '1', // 站点号
								address: '0', // 点位地址
								attributeName: '', // 上报编码
								alarmSuperiorLimit: null, // 告警上限
								alarmLowerLimit: null, // 告警下限
								configSuperiorLimit: '60', // 配置上限
								configLowerLimit: '-40', // 配置下限
								deviation: '0', // 偏差
								isAlarm: false, // 是否报警
							},
						}
						break
					case 4:
						this.$data.data.items = {
							humidness: {
								//湿度
								name: '湿度', // 型号
								conType: 4, // 传感器类型
								slaveId: '1', // 站点号
								address: '2', // 点位地址
								attributeName: '', // 上报编码
								alarmSuperiorLimit: null, // 告警上限
								alarmLowerLimit: null, // 告警下限
								configSuperiorLimit: '100', // 配置上限
								configLowerLimit: '0', // 配置下限
								deviation: '0', // 偏差
								isAlarm: false, // 是否报警
							},
							temperature: {
								//温度
								name: '温度', // 型号
								conType: 2, // 传感器类型
								slaveId: '1', // 站点号
								address: '0', // 点位地址
								attributeName: '', // 上报编码
								alarmSuperiorLimit: null, // 告警上限
								alarmLowerLimit: null, // 告警下限
								configSuperiorLimit: '60', // 配置上限
								configLowerLimit: '-40', // 配置下限
								deviation: '0', // 偏差
								isAlarm: false, // 是否报警
							},
							dif_pressure_pa: {
								//压差
								name: '压差', // 型号
								conType: 3, // 传感器类型
								slaveId: '1', // 站点号
								address: '4', // 点位地址
								attributeName: '', // 上报编码
								alarmSuperiorLimit: null, // 告警上限
								alarmLowerLimit: null, // 告警下限
								configSuperiorLimit: '50', // 配置上限
								configLowerLimit: '-50', // 配置下限
								deviation: '0', // 偏差
								isAlarm: false, // 是否报警
							},
						}
						break
					case 5:
						this.$data.data.items = {
							humidness: {
								//湿度
								name: '湿度', // 型号
								conType: 4, // 传感器类型
								slaveId: '1', // 站点号
								address: '2', // 点位地址
								attributeName: '', // 上报编码
								alarmSuperiorLimit: null, // 告警上限
								alarmLowerLimit: null, // 告警下限
								configSuperiorLimit: '100', // 配置上限
								configLowerLimit: '0', // 配置下限
								deviation: '0', // 偏差
								isAlarm: false, // 是否报警
							},
							temperature: {
								//温度
								name: '温度', // 型号
								conType: 2, // 传感器类型
								slaveId: '1', // 站点号
								address: '0', // 点位地址
								attributeName: '', // 上报编码
								alarmSuperiorLimit: null, // 告警上限
								alarmLowerLimit: null, // 告警下限
								configSuperiorLimit: '60', // 配置上限
								configLowerLimit: '-40', // 配置下限
								deviation: '0', // 偏差
								isAlarm: false, // 是否报警
							},
							dif_pressure_pa: {
								//压差
								name: '压差', // 型号
								conType: 3, // 传感器类型
								slaveId: '1', // 站点号
								address: '4', // 点位地址
								attributeName: '', // 上报编码
								alarmSuperiorLimit: null, // 告警上限
								alarmLowerLimit: null, // 告警下限
								configSuperiorLimit: '50', // 配置上限
								configLowerLimit: '-50', // 配置下限
								deviation: '0', // 偏差
								isAlarm: false, // 是否报警
							},
							dew_point_c: {
								//露点
								name: '露点', // 型号
								conType: 1, // 传感器类型
								slaveId: '1', // 站点号
								address: '6', // 点位地址
								attributeName: '', // 上报编码
								alarmSuperiorLimit: null, // 告警上限
								alarmLowerLimit: null, // 告警下限
								configSuperiorLimit: '20', // 配置上限
								configLowerLimit: '-80', // 配置下限
								deviation: '0', // 偏差
								isAlarm: false, // 是否报警
							},
						}
						break
					case 6:
						this.$data.data.items = {
							humidness: {
								//湿度
								name: '湿度', // 型号
								conType: 4, // 传感器类型
								slaveId: '1', // 站点号
								address: '2', // 点位地址
								attributeName: '', // 上报编码
								alarmSuperiorLimit: null, // 告警上限
								alarmLowerLimit: null, // 告警下限
								configSuperiorLimit: '100', // 配置上限
								configLowerLimit: '0', // 配置下限
								deviation: '0', // 偏差
								isAlarm: false, // 是否报警
							},
							temperature: {
								//温度
								name: '温度', // 型号
								conType: 2, // 传感器类型
								slaveId: '1', // 站点号
								address: '0', // 点位地址
								attributeName: '', // 上报编码
								alarmSuperiorLimit: null, // 告警上限
								alarmLowerLimit: null, // 告警下限
								configSuperiorLimit: '60', // 配置上限
								configLowerLimit: '-40', // 配置下限
								deviation: '0', // 偏差
								isAlarm: false, // 是否报警
							},
							humidness2: {
								//湿度
								name: '湿度2', // 型号
								conType: 4, // 传感器类型
								slaveId: '1', // 站点号
								address: '2', // 点位地址
								attributeName: '', // 上报编码
								alarmSuperiorLimit: null, // 告警上限
								alarmLowerLimit: null, // 告警下限
								configSuperiorLimit: '100', // 配置上限
								configLowerLimit: '0', // 配置下限
								deviation: '0', // 偏差
								isAlarm: false, // 是否报警
							},
							temperature2: {
								//温度
								name: '温度2', // 型号
								conType: 2, // 传感器类型
								slaveId: '1', // 站点号
								address: '0', // 点位地址
								attributeName: '', // 上报编码
								alarmSuperiorLimit: null, // 告警上限
								alarmLowerLimit: null, // 告警下限
								configSuperiorLimit: '60', // 配置上限
								configLowerLimit: '-40', // 配置下限
								deviation: '0', // 偏差
								isAlarm: false, // 是否报警
							},
						}
						break
					case 7:
						this.$data.data.items = {
							dew_point_c: {
								//露点
								name: '露点', // 型号
								conType: 1, // 传感器类型
								slaveId: '1', // 站点号
								address: '6', // 点位地址
								attributeName: '', // 上报编码
								alarmSuperiorLimit: null, // 告警上限
								alarmLowerLimit: null, // 告警下限
								configSuperiorLimit: '20', // 配置上限
								configLowerLimit: '-80', // 配置下限
								deviation: '0', // 偏差
								isAlarm: false, // 是否报警
							},
							temperature: {
								//温度
								name: '温度', // 型号
								conType: 2, // 传感器类型
								slaveId: '1', // 站点号
								address: '0', // 点位地址
								attributeName: '', // 上报编码
								alarmSuperiorLimit: null, // 告警上限
								alarmLowerLimit: null, // 告警下限
								configSuperiorLimit: '60', // 配置上限
								configLowerLimit: '-40', // 配置下限
								deviation: '0', // 偏差
								isAlarm: false, // 是否报警
							},
							dif_pressure_pa: {
								//压差
								name: '压差', // 型号
								conType: 3, // 传感器类型
								slaveId: '1', // 站点号
								address: '4', // 点位地址
								attributeName: '', // 上报编码
								alarmSuperiorLimit: null, // 告警上限
								alarmLowerLimit: null, // 告警下限
								configSuperiorLimit: '50', // 配置上限
								configLowerLimit: '-50', // 配置下限
								deviation: '0', // 偏差
								isAlarm: false, // 是否报警
							},
							humidness: {
								//湿度
								name: '湿度', // 型号
								conType: 4, // 传感器类型
								slaveId: '1', // 站点号
								address: '2', // 点位地址
								attributeName: '', // 上报编码
								alarmSuperiorLimit: null, // 告警上限
								alarmLowerLimit: null, // 告警下限
								configSuperiorLimit: '100', // 配置上限
								configLowerLimit: '0', // 配置下限
								deviation: '0', // 偏差
								isAlarm: false, // 是否报警
							},
							g05: {
								//g0.5
								name: '洁净度', // 型号
								conType: 5, // 传感器类型
								slaveId: '2', // 站点号
								address: '26', // 点位地址
								attributeName: '', // 上报编码
								alarmSuperiorLimit: null, // 告警上限
								alarmLowerLimit: null, // 告警下限
								configSuperiorLimit: '', // 配置上限
								configLowerLimit: '', // 配置下限
								deviation: '0', // 偏差
								isAlarm: false, // 是否报警
							},
							g50: {
								// G5.0
								name: '洁净度', // 型号
								conType: 6, // 传感器类型
								slaveId: '2', // 站点号
								address: '32', // 点位地址
								attributeName: '', // 上报编码
								alarmSuperiorLimit: null, // 告警上限
								alarmLowerLimit: null, // 告警下限
								configSuperiorLimit: '', // 配置上限
								configLowerLimit: '', // 配置下限
								deviation: '0', // 偏差
								isAlarm: false, // 是否报警
							},
						}
					default:
						break
				}

				console.log(this.$data.data.items)
			},
			submitUpload() {
				uploadRef.value!.submit()
			},
			getConfig() {
				// 获取配置参数
				axios
					.get(BASE_URL + URL.getCollectionServer)
					.then((data) => {
						console.log(data)

						if (data?.status === 200 && data?.data?.code === 200) {
							try {
								console.log(data)
								let result = data.data.result
								this.data.dashboard_name = JSON.parse(
									result.content
								)?.dashboard_name
								this.data.selectTemplate = JSON.parse(
									result.content
								)?.selectTemplate || 7
								result.content = {
									dashboard_name: this.data.dashboard_name,
									selectTemplate: this.data.selectTemplate,
								}

								this.topConfig = result
								if(!this.topConfig.cycle){
									this.topConfig.cycle = 2 
								}
								this.getSet()
								console.log('selectTemplate:' + this.data.selectTemplate)
								// this.changeTemplate()
								// let result = {
								//     "mask": "",// 子网掩码
								//     "gateway": "",// 网关地址
								//     "device_name": "", //设备名称
								//     "device_id": "",// 设备编码
								//     "mqtt_address": "",// mqtt连接地址
								//     "mqtt_port": null,// mqtt连接端口
								//     "dashboard_name": "",// 看板名称
								//     "particle_interval": "",// 循环时间（分钟）
								//     "selectTemplate": 1,// 选择的模版
								//     "templateList": [1, 2, 3, 4, 5, 6],
								//     "username": "",// mqtt用户名
								//     "password": "",// mqtt密码
								//     "newTopic": "",
								//     "ip": "", //172.17.0.1
								// }
							} catch (err) {
								console.log(err)
							}
						}
						console.log(data)
					})
					.catch((error) => {})
			},
			deWaring(e: any) {
				// 露点是否报警
				this.data.items.dew_point_c.isAlarm = e
				console.log(this.data.items.dew_point_c.isAlarm)
			},

			tWaring(e: any) {
				// 温度是否报警
				this.data.items.temperature.isAlarm = e
			},
			tWaring2(e: any) {
				// 温度是否报警
				this.data.items.temperature2.isAlarm = e
			},

			dWaring(e: any) {
				// 压差是否报警
				this.data.items.dif_pressure_pa.isAlarm = e
			},

			hWaring(e: any) {
				// 湿度是否报警
				this.data.items.humidness.isAlarm = e
			},

			hWaring2(e: any) {
				// 湿度是否报警
				this.data.items.humidness.isAlarm = e
			},

			Warings_05(e: any) {
				// 洁净度g0.5是否报警
				this.data.items.g05.isAlarm = e
			},

			gWaring(e: any) {
				// 洁净度g5是否报警
				this.data.items.g50.isAlarm = e
			},

			getSet() {
				const loading = ElLoading.service({
				    lock: true,
				    text: 'Loading',
				    background: 'rgba(0, 0, 0, 0.7)',
				  })
				let _this = this
				axios
					.get(BASE_URL + URL.getDeviceList, {
						params: {
							key: 'configuration',
						},
					})
					.then((response) => {
						console.log(response.data)
						if (response?.data?.code === 200) {
							let result = response.data.result
							this.getListData = result
							// 给下面的配置项赋值
							let finalResult = {}
							result.forEach((item) => {
								item.isAlarm = item.isAlarm === 1 ? true : false
								if (item.conType === 1) {
									finalResult.dew_point_c = item
								}
								if (item.conType === 2) {
									if(this.data.selectTemplate === 6){
										if(item.id === 2){
											finalResult.temperature = item
										}
										if(item.id === 4){
											finalResult.temperature2 = item
										}
									}
									else {
										finalResult.temperature = item
									}
									
								}
								if (item.conType === 3) {
									finalResult.dif_pressure_pa = item
								}
								if (item.conType === 4) {
									console.log(this.data.selectTemplate)
									if(this.data.selectTemplate === 6){
										if(item.id === 1){
											finalResult.humidness = item
										}
										if(item.id === 3){
											finalResult.humidness2 = item
										}
									}
									else {
										finalResult.humidness = item
									}
									
									
								}
								if (item.conType === 5) {
									finalResult.g05 = item
								}
								if (item.conType === 6) {
									finalResult.g50 = item
								}
							})
							loading.close()
							this.finishData = true
							this.$data.data.items = finalResult
							console.log(this.$data.data.items)
						}
					})
					.catch((error) => {
						console.log('error', error)
					})
			},
			saveBtn() {
				// console.log(SetConfig({ "key": "configuration", "value": this.data }))
				// console.log(this.data)
				// let that = this
				
				const loading = ElLoading.service({
				    lock: true,
				    text: 'Loading',
				    background: 'rgba(0, 0, 0, 0.7)',
				  })
				this.topConfig.content = JSON.stringify({
					dashboard_name: this.data.dashboard_name, // 看板名称
					selectTemplate: this.data.selectTemplate, // 选择的模版
				})
				console.log(this.topConfig)
				let url = BASE_URL + URL.postCollectionServer
				let params: any = []
				console.log(this.data.items)
				// 1.露点 2.湿度 3.压差 4.湿度 5.05 6.50
				console.log(Object.values(this.data.items))
				console.log(this.data.items)
				axios({
					url,
					data: this.topConfig,
					method: 'post',
					headers: {
						'Content-Type': 'application/json',
					},
				}).then((res) => {
					let result = Object.values(JSON.parse(JSON.stringify(this.data.items)))
					console.log(this.data.items)
					result = result.map((item,index) => {
						item.isAlarm = item.isAlarm === true ? 1 : 0
						item.id = index +1
						return item
					})
					console.log(this.data.items)
					console.log(result)
					axios({
						url: BASE_URL + URL.updateDevice,
						data: result,
						method: 'put',
						headers: {
							'Content-Type': 'application/json',
						},
					}).then((res2) => {
						console.log(this.showAlert)
						this.showAlert = true
						loading.close()
						setTimeout(() => {
							this.$emit('setChangeDetail')
						}, 2000)
					}).catch((error) => {
						console.log(error)
					})
				})
				console.log(params)
			},
		},
		created() {
			this.getConfig()
			// this.initMqttClient()
		},
	})
</script>

<style scoped>
	.header-box {
		height: 130px;
		z-index: 800;
		background: url('@/assets/image/twoBg.png') no-repeat center top / cover;
	}

	.top-el-select {
		margin: 0 10px;
	}

	.header-title {
		font-size: 38px;
		color: #67cdff;
		text-align: center;
		line-height: 110px;
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

	/* .setModule:last-child .tableList{margin-bottom: 50px;} */
	.tableList .thList {
		width: calc(100% / 11);
		text-align: center;
		color: #fff;
		line-height: 55px;
		margin: 5px auto;
		box-sizing: border-box;
		padding: 0 5px;
		text-align: center;
	}

	.flex-row {
		height: 100%;
	}

	.tableList {
		/* width: 1666px; */
		width: 100%;
		height: 68px;
		display: flex;
		margin: 0px auto 0 auto;
		border-bottom: 1px solid #152b4f;
	}

	.tableHeader .thList {
		width: calc(100% / 12);
		box-sizing: border-box;
		text-align: center;
		color: #fff;
		line-height: 44px;
	}

	.tableHeader {
		/* width: 1666px; */
		width: 100%;
		height: 44px;
		display: flex;
		justify-content: space-between;
		background: rgba(189, 205, 255, 0.1);
		border-radius: 0px 0px 0px 0px;
		margin: 5px auto;
	}

	.blank {
		width: 100%;
		display: flex;
		justify-content: flex-end;
	}

	.setModule {
		/* width: 1699px; */
		width: 100%;
		height: 100%;
		border: 1px solid #1c6eea;
		background-color: rgba(2, 33, 81, 0.38);
		overflow: auto;
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
		cursor: pointer;
	}

	.slText {
		width: 217px;
		height: 32px;
		background: #152b4f;
		border-radius: 6px 6px 6px 6px;
		opacity: 1;
		margin: 15px;
	}

	.slName {
		font-size: 14px;
		color: #fff;
		line-height: 37px;
	}

	.smList {
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 2.5px;
	}

	.searchModule {
		/* width: 1659px; */
		width: 100%;
		box-sizing: border-box;
		padding: 0px 20px;
		height: 200px;
		border: 1px solid #1c6eea;
		/* margin: 0px auto; */
		background-color: rgba(2, 33, 81, 0.38);
		display: flex;
		flex-wrap: wrap;
	}

	.blPadding {
		width: 100%;
		box-sizing: border-box;
		padding: 0 10px;
		/* padding: 0px 20px; */
		/* margin: 0px auto; */
	}

	.bgTwo {
		background: linear-gradient(180deg, #000000 0%, #081d3d 100%) !important;
		/* min-width: 1600px; */
		min-height: 1000px;
		height: 100vh;
		border-radius: 0px 0px 0px 0px;
		opacity: 1;
		transform-origin: top center;
	}

	.boardCenter {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		overflow: hidden;
		min-height: 200px;
	}

	.height {
		height: calc(100% - 60px);
	}

	.engine-box {
		padding: 18px 22px;
		width: calc(100% - 44px);
	}

	.bcList {
		height: 100%;
	}
</style>
