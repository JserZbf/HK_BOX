<template>
  <div class="bgTwo">
    <div class="header-box flex-vcenter flex-hcenter">
      <el-alert
        title="更新成功!"
        type="success"
        center
        show-icon
        v-if="showAlert"
      />
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
                  <el-input
                    class="slText"
                    type="text"
                    v-model="topConfig.ip"
                    placeholder="请输入IP"
                  />
                </div>

                <div class="smList">
                  <span class="slName">子网掩码</span>
                  <el-input
                    class="slText"
                    type="text"
                    v-model="topConfig.subnetMask"
                    placeholder="请输入子网掩码"
                  />
                </div>

                <div class="smList">
                  <span class="slName">网关地址</span>
                  <el-input
                    class="slText"
                    type="text"
                    v-model="topConfig.gateWay"
                    placeholder="请输入网关地址"
                  />
                </div>

                <div class="smList">
                  <span class="slName">设备名称</span>
                  <el-input
                    class="slText"
                    type="text"
                    v-model="topConfig.collectionName"
                    placeholder="请输入设备名称"
                  />
                </div>
                <div class="smList">
                  <span class="slName">设备编码</span>
                  <el-input
                    class="slText"
                    type="text"
                    v-model="topConfig.collectionCode"
                    placeholder="请输入设备编码"
                  />
                </div>
                <div class="smList">
                  <span class="slName">MQTT链接地址</span>
                  <el-input
                    class="slText"
                    type="text"
                    v-model="topConfig.mqttIp"
                    placeholder="请输入MQTT链接地址"
                  />
                </div>
                <div class="smList">
                  <span class="slName">MQTT Port</span>
                  <el-input
                    class="slText"
                    type="text"
                    v-model="topConfig.mqttPort"
                    placeholder="请输入MQTT Port"
                  />
                </div>
                <div class="smList">
                  <span class="slName">看板名称</span>
                  <el-input
                    class="slText"
                    type="text"
                    v-model="data.dashboard_name"
                    placeholder="请输入看板名称"
                  />
                </div>
                <div class="smList">
                  <span class="slName">循环时间(分钟)</span>
                  <el-input
                    class="slText"
                    type="text"
                    v-model="topConfig.cycle"
                    placeholder="请输入循环时间"
                  />
                </div>
                <div class="smList">
                  <span class="slName">模版</span>
                  <el-select
                    class="top-el-select"
                    v-model="data.selectTemplate"
                    placeholder="请选择模版"
                    @change="changeTemplate"
                  >
                    <el-option
                      class="slTexts"
                      v-for="(item, index) in data.templateList"
                      :key="item"
                      :label="item"
                      :value="index + 1"
                    ></el-option>
                  </el-select>
                </div>
                <div class="smList">
                  <span class="slName">mqtt用户名</span>
                  <el-input
                    class="slText"
                    type="text"
                    v-model="topConfig.mqttUserName"
                    placeholder="请输入mqtt用户名"
                  />
                </div>
                <div class="smList">
                  <span class="slName">mqtt密码</span>
                  <el-input
                    class="slText"
                    type="text"
                    v-model="topConfig.mqttPassWord"
                    placeholder="请输入mqtt密码"
                  />
                </div>

                <!-- <div
                  class="smList"
                  v-for="(item, i) in topConfig.processName"
                  :key="i"
                >
                  <span class="slName">工艺名称</span>
                  <el-input
                    class="slText"
                    type="text"
                    v-model="topConfig.processName[i]"
                    placeholder="请输入工艺名称"
                  />
                </div> -->
              </div>
              <div class="blank">
                <div
                  class="saveBtn"
                  @click="initBtn"
                  style="margin-right: 15px"
                >
                  初始化
                </div>
                <div class="saveBtn" @click="onAdd" style="margin-right: 15px">
                  新增
                </div>
                <div class="saveBtn" @click="saveBtn">保存</div>
              </div>

              <div class="setModule">
                <div class="tableHeader">
                  <div class="thList">属性名</div>
                  <div class="thList">上报名称</div>
                  <div class="thList">端口</div>
                  <div class="thList">波特率</div>
                  <div class="thList">站点号</div>
                  <div class="thList">地址</div>
                  <div class="thList">类型</div>
                  <div class="thList">长度</div>
                  <div class="thList">大端</div>
                  <div class="thList">模拟量</div>
                  <div class="thList">报警上限</div>
                  <div class="thList">报警下限</div>
                  <div class="thList">配置上限</div>
                  <div class="thList">配置下限</div>
                  <div class="thList">偏差</div>
                  <div class="thList">权重</div>
                  <div class="thList">是否报警</div>
                  <div class="thList">操作</div>
                </div>
                <div
                  class="tableList"
                  v-for="(item, i) in setDetailList"
                  :key="i"
                >
                  <div class="thList">
                    <el-input
                      class="slTexts"
                      type="text"
                      v-model="item.name"
                      placeholder="请输入属性名"
                    />
                  </div>

                  <div class="thList">
                    <el-input
                      class="slTexts"
                      type="text"
                      v-model="item.attributeName"
                      placeholder="请输入上报名称"
                    />
                  </div>

                  <el-tooltip
                    class="box-item"
                    effect="dark"
                    :content="
                      portData.find((el) => el.value == item.com)?.label ||
                      '未知'
                    "
                    placement="left-start"
                  >
                    <el-select
                      class="thList"
                      v-model="item.com"
                      placeholder="请选择端口"
                    >
                      <el-option
                        class="slTexts"
                        v-for="items in portData"
                        :key="items.value"
                        :label="items.label"
                        :value="items.value"
                        :disabled="items.disabled"
                      ></el-option>
                    </el-select>
                  </el-tooltip>

                  <!-- <el-select
                    class="thList"
                    v-model="selectPort"
                    placeholder="请选择端口"
                  >
                    <el-option
                      class="slTexts"
                      v-for="items in portData"
                      :key="items.value"
                      :label="items.label"
                      :value="items.value"
                      :disabled="items.disabled"
                    ></el-option>
                  </el-select> -->

                  <div class="thList">
                    <el-input
                      class="slTexts"
                      type="text"
                      v-model="item.baudRate"
                      placeholder="波特率"
                    />
                  </div>

                  <div class="thList">
                    <el-input
                      class="slTexts"
                      type="text"
                      v-model="item.slaveId"
                      placeholder="站点号"
                    />
                  </div>

                  <div class="thList">
                    <el-input
                      class="slTexts"
                      type="text"
                      v-model="item.address"
                      placeholder="地址"
                    />
                  </div>
                  <el-tooltip
                    class="box-item"
                    effect="dark"
                    :content="
                      deviceTypeList.find((el) => el.value == item.conType)
                        ?.label || '未知'
                    "
                    placement="left-start"
                  >
                    <el-select
                      class="thList"
                      v-model="item.conType"
                      placeholder="请选择类型"
                    >
                      <el-option
                        v-for="(item, idx) in deviceTypeList"
                        :key="idx"
                        class="slTexts"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-tooltip>

                  <el-select
                    class="thList"
                    v-model="item.length"
                    placeholder="请选择长度"
                  >
                    <el-option class="slTexts" label="1" value="1"></el-option>
                    <el-option class="slTexts" label="2" value="2"></el-option>
                  </el-select>

                  <div class="thList">
                    <!-- 大端 -->
                    <el-switch v-model="item.bigEndian"></el-switch>
                  </div>
                  <div class="thList">
                    <!-- 模拟量 -->
                    <el-switch v-model="item.transform"></el-switch>
                  </div>

                  <div class="thList">
                    <el-input
                      class="slTexts"
                      type="text"
                      v-model="item.alarmSuperiorLimit"
                      placeholder="请输入报警上限"
                      onkeypress="if(!this.value.match(/^[\+\-]?\d*?\.?\d*?$/))this.value=this.t_value;else this.t_value=this.value;if(this.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?)?$/))this.o_value=this.value"
                      onkeyup="if(!this.value.match(/^[\+\-]?\d*?\.?\d*?$/))this.value=this.t_value;else this.t_value=this.value;if(this.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?)?$/))this.o_value=this.value"
                      onblur="if(!this.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?|\.\d*?)?$/))this.value=this.o_value;else{if(this.value.match(/^\.\d+$/))this.value=0+this.value;if(this.value.match(/^\.$/))this.value=0;this.o_value=this.value}"
                    />
                  </div>
                  <div class="thList">
                    <el-input
                      class="slTexts"
                      type="text"
                      v-model="item.alarmLowerLimit"
                      placeholder="请输入报警下限"
                      onkeypress="if(!this.value.match(/^[\+\-]?\d*?\.?\d*?$/))this.value=this.t_value;else this.t_value=this.value;if(this.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?)?$/))this.o_value=this.value"
                      onkeyup="if(!this.value.match(/^[\+\-]?\d*?\.?\d*?$/))this.value=this.t_value;else this.t_value=this.value;if(this.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?)?$/))this.o_value=this.value"
                      onblur="if(!this.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?|\.\d*?)?$/))this.value=this.o_value;else{if(this.value.match(/^\.\d+$/))this.value=0+this.value;if(this.value.match(/^\.$/))this.value=0;this.o_value=this.value}"
                    />
                  </div>
                  <div class="thList">
                    <el-input
                      class="slTexts"
                      type="text"
                      v-model="item.configSuperiorLimit"
                      placeholder="请输入配置上限"
                      onkeypress="if(!this.value.match(/^[\+\-]?\d*?\.?\d*?$/))this.value=this.t_value;else this.t_value=this.value;if(this.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?)?$/))this.o_value=this.value"
                      onkeyup="if(!this.value.match(/^[\+\-]?\d*?\.?\d*?$/))this.value=this.t_value;else this.t_value=this.value;if(this.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?)?$/))this.o_value=this.value"
                      onblur="if(!this.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?|\.\d*?)?$/))this.value=this.o_value;else{if(this.value.match(/^\.\d+$/))this.value=0+this.value;if(this.value.match(/^\.$/))this.value=0;this.o_value=this.value}"
                    />
                  </div>
                  <div class="thList">
                    <el-input
                      class="slTexts"
                      type="text"
                      v-model="item.configLowerLimit"
                      placeholder="请输入配置下限"
                      onkeypress="if(!this.value.match(/^[\+\-]?\d*?\.?\d*?$/))this.value=this.t_value;else this.t_value=this.value;if(this.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?)?$/))this.o_value=this.value"
                      onkeyup="if(!this.value.match(/^[\+\-]?\d*?\.?\d*?$/))this.value=this.t_value;else this.t_value=this.value;if(this.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?)?$/))this.o_value=this.value"
                      onblur="if(!this.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?|\.\d*?)?$/))this.value=this.o_value;else{if(this.value.match(/^\.\d+$/))this.value=0+this.value;if(this.value.match(/^\.$/))this.value=0;this.o_value=this.value}"
                    />
                  </div>

                  <div class="thList">
                    <!-- 权重 -->
                    <el-input
                      class="slTexts"
                      type="text"
                      placeholder="请输入权重"
                      v-model="item.weight"
                    />
                  </div>

                  <div class="thList">
                    <el-input
                      class="slTexts"
                      type="text"
                      v-model="item.deviation"
                      placeholder="请输入偏差"
                      onkeypress="if(!this.value.match(/^[\+\-]?\d*?\.?\d*?$/))this.value=this.t_value;else this.t_value=this.value;if(this.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?)?$/))this.o_value=this.value"
                      onkeyup="if(!this.value.match(/^[\+\-]?\d*?\.?\d*?$/))this.value=this.t_value;else this.t_value=this.value;if(this.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?)?$/))this.o_value=this.value"
                      onblur="if(!this.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?|\.\d*?)?$/))this.value=this.o_value;else{if(this.value.match(/^\.\d+$/))this.value=0+this.value;if(this.value.match(/^\.$/))this.value=0;this.o_value=this.value}"
                    />
                  </div>
                  <!-- <div class="thList">
                      <el-switch v-model="item.isTransform"></el-switch>
                    </div> -->
                  <div class="thList">
                    <el-switch v-model="item.isAlarm"></el-switch>
                  </div>
                  <div class="thList">
                    <el-popconfirm
                      title="是否删除配置?"
                      @confirm="delItem(item)"
                    >
                      <template #reference>
                        <el-button text bg type="danger">删除</el-button>
                      </template>
                    </el-popconfirm>
                  </div>
                </div>
                <!-- finishData && data.items.g50 -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { SetConfig } from "@/api";
import { BASE_URL } from "@/api/ENV";
import Header from "@/components/twoHeader/Header.vue";
import axios from "axios";
import * as mqtt from "mqtt/dist/mqtt.min.js";
let client: any;
import { ref } from "vue";
import type { UploadInstance } from "element-plus";
import URL from "@/api/URL";
const uploadRef = ref<UploadInstance>();
import { ElLoading, ElMessage } from "element-plus";
import { apiList } from "../engine-market/home/res.js";
export default defineComponent({
  name: "EngineView",
  emits: ["setChangeDetail"],
  data() {
    return {
      typeList: [
        { key: "露点", value: 1 },
        { key: "温度", value: 2 },
        { key: "压差", value: 3 },
        { key: "湿度", value: 4 },
        { key: "洁净度0.5", value: 5 },
        { key: "洁净度5.0", value: 6 },
      ],
      setDetailList: [],
      selectPort: "COM2",
      portData: [
        {
          label: "串口1",
          value: "ttyUSB0",
          disabled: false,
        },
        {
          label: "串口2",
          value: "ttyUSB1",
          disabled: false,
        },
        {
          label: "串口3",
          value: "ttyUSB2",
          disabled: false,
        },
        {
          label: "串口4",
          value: "ttyUSB3",
          disabled: false,
        },
      ],
      finishData: false,
      showAlert: false, // 保存成功显示弹窗
      topConfig: {
        processName: ["", "", "", "", "", "", ""], // 工艺名称
      },
      getListData: [],
      timeMes: 15,
      deviceTypeList: [
        { label: "保持寄存器", value: 1 },
        { label: "输入寄存器", value: 2 },
      ],
      modelData: [
        {
          value: 1,
          label: "露点",
        },
        {
          value: 2,
          label: "温度",
        },
        {
          value: 3,
          label: "压差",
        },
        {
          value: 4,
          label: "湿度",
        },
        {
          value: 5,
          label: "洁净度",
        },
        {
          value: 6,
          label: "洁净度",
        },
      ],
      conType: [
        {
          value: "4-20ma",
          label: "4-20ma",
        },
      ],
      slaveId: [
        {
          value: "Test",
          label: "Test",
        },
      ],

      data: {
        mask: "", // 子网掩码
        gateway: "", // 网关地址
        device_name: "", //设备名称
        device_id: "", // 设备编码
        mqtt_address: "", // mqtt连接地址
        mqtt_port: null, // mqtt连接端口
        dashboard_name: "", // 看板名称
        particle_interval: "", // 循环时间（分钟）
        selectTemplate: 7, // 选择的模版
        processName: ["", "", "", "", "", "", ""], // 工艺名称

        templateList: [
          "温度",
          "露点温度洁净度",
          "温湿度",
          "温湿度压差",
          "露点温度压差湿度",
          "双温湿度",
          "全部",
        ],
        username: "", // mqtt用户名
        password: "", // mqtt密码
        newTopic: "",
        ip: "", //172.17.0.1
      },
    };
  },
  components: {
    Header,
  },

  methods: {
    onAdd() {
      let obj = {
        com: "",
        baudRate: 9600,
        slaveId: 1,
        name: "",
        address: null,
        attributeName: null,
        deviation: "0",
        conType: null,
        readType: null,
        length: null,
        weight: null,
        bigEndian: false,
        alarmSuperiorLimit: "",
        alarmLowerLimit: "",
        configSuperiorLimit: "",
        configLowerLimit: "",
        isAlarm: 1,
        // "id": 2,
        // "formula": "",
        transform: false,
      };
      this.setDetailList.push(obj);
    },
    // addItem(){

    // },
    delItem(item: any) {
      const loading = ElLoading.service({
        lock: true,
        text: "Loading",
        background: "rgba(0, 0, 0, 0.7)",
      });

      let result = JSON.parse(JSON.stringify(this.setDetailList));
      result.forEach((el: any, idx: number) => {
        result[idx].isAlarm = result[idx]?.isAlarm === true ? 1 : 0;
        result[idx].isTransform = result[idx]?.isTransform === true ? 1 : 0;
        if (item.id === el.id) {
          result.splice(idx, 1);
        }
      });

      axios({
        url: BASE_URL + URL.updateDevice,
        data: result,
        method: "put",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res2) => {
          console.log(this.showAlert);
          this.showAlert = true;
          loading.close();
          setTimeout(() => {
            this.$emit("setChangeDetail");
          }, 2000);
        })
        .catch((error) => {
          ElMessage.error("删除失败:updateDevice");
          loading.close();
          console.log(error);
        });
    },
    initBtn() {
      this.topConfig.content = JSON.stringify({
        dashboard_name: this.data.dashboard_name,
        selectTemplate: 7, // 选择的模版
      });
      const loading = ElLoading.service({
        lock: true,
        text: "Loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      axios({
        url: BASE_URL + URL.postCollectionServer,
        data: this.topConfig,
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res2) => {
          axios({
            url: BASE_URL + URL.deviceInit,
            method: "get",
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((res2) => {
              this.showAlert = true;
              setTimeout(() => {
                this.showAlert = false;
                this.$emit("setChangeDetail");
                loading.close();
              }, 2000);
            })
            .catch((error) => {
              ElMessage.error("设置失败:deviceInit");
              loading.close();
              console.log(error);
            });
        })
        .catch((error) => {
          ElMessage.error("设置失败:postCollectionServer");
          loading.close();
          console.log(error);
        });
    },
    getResult(index: any) {
      switch (index) {
        case 1:
          return "露点";
        case 2:
          return "温度";
        case 3:
          return "压差";
        case 4:
          return "湿度";
        case 5:
          return "洁净度0.5";
        case 6:
          return "洁净度5.0";
        default:
          return "空的" + index;
      }
    },
    changeTemplate() {
      // humidness 1湿度  temperature 2温度  dif_pressure_pa 3压差 dew_point_c 4露点 5g05 6g50
      switch (this.data.selectTemplate) {
        case 1:
          break;
        case 2:
          break;
        case 3:
          break;
        case 4:
          break;
        case 5:
          break;
        case 6:
          break;
        case 7:

        default:
          break;
      }

      console.log(this.$data.data.items);
    },
    submitUpload() {
      uploadRef.value!.submit();
    },
    getConfig() {
      this.getSet();
      // 获取配置参数
      axios
        .get(BASE_URL + URL.getCollectionServer)
        .then((data) => {
          console.log(data);

          if (data?.status === 200 && data?.data?.code === 200) {
            try {
              console.log(data);
              let result = data.data.result;
              this.data.dashboard_name = JSON.parse(
                result.content
              )?.dashboard_name;
              this.data.selectTemplate =
                JSON.parse(result.content)?.selectTemplate || 7;
              result.content = {
                dashboard_name: this.data.dashboard_name,
                selectTemplate: this.data.selectTemplate,
              };

              this.topConfig = result;
              if (!this.topConfig.cycle) {
                this.topConfig.cycle = 2;
              }
              this.getSet();
              console.log("selectTemplate:" + this.data.selectTemplate);
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
              console.log(err);
            }
          }
          console.log(data);
        })
        .catch((error) => {});
    },
    deWaring(e: any) {
      // 露点是否报警
      this.data.items.dew_point_c.isAlarm = e;
      console.log(this.data.items.dew_point_c.isAlarm);
    },

    tWaring(e: any) {
      // 温度是否报警
      this.data.items.temperature.isAlarm = e;
    },
    tWaring2(e: any) {
      // 温度是否报警
      this.data.items.temperature2.isAlarm = e;
    },

    dWaring(e: any) {
      // 压差是否报警
      this.data.items.dif_pressure_pa.isAlarm = e;
    },

    hWaring(e: any) {
      // 湿度是否报警
      this.data.items.humidness.isAlarm = e;
    },

    hWaring2(e: any) {
      // 湿度是否报警
      this.data.items.humidness.isAlarm = e;
    },

    Warings_05(e: any) {
      // 洁净度g0.5是否报警
      this.data.items.g05.isAlarm = e;
    },

    gWaring(e: any) {
      // 洁净度g5是否报警
      this.data.items.g50.isAlarm = e;
    },

    getSet() {
      const loading = ElLoading.service({
        lock: true,
        text: "Loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      let _this = this;
      axios
        .get(BASE_URL + URL.getDeviceList, {
          params: {
            key: "configuration",
          },
        })
        .then((response) => {
          console.log(response.data);
          if (response?.data?.code === 200) {
            let result = response.data.result;
            this.getListData = result;
            // 给下面的配置项赋值
            let finalResult = {};
            result.map((item: any, idx: any) => {
              item.isAlarm = item.isAlarm === 1 ? true : false;
              item.isTransform = item.isTransform === 1 ? true : false;
              return item;
            });
            this.setDetailList = result;
            loading.close();
            this.finishData = true;
            this.$data.data.items = finalResult;
            console.log(this.$data.data.items);
          }
        });
      // .catch((error) => {
      //   ElMessage.error("获取失败:getDeviceList");
      //   loading.close();
      //   console.log("error", error);
      // });
      // this.setDetailList = apiList.result;
      // console.log(apiList);
    },
    saveBtn() {
      //   console.log(SetConfig({ key: "configuration", value: this.data }));
      console.log(this.data);
      let that = this;

      const loading = ElLoading.service({
        lock: true,
        text: "Loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      this.topConfig.content = JSON.stringify({
        dashboard_name: this.data.dashboard_name, // 看板名称
        selectTemplate: this.data.selectTemplate, // 选择的模版
      });
      console.log(this.topConfig);
      let url = BASE_URL + URL.postCollectionServer;
      let params: any = [];
      console.log(this.data.items);
      // 1.露点 2.湿度 3.压差 4.湿度 5.05 6.50
      console.log(Object.values(this.data.items));
      console.log(this.data.items);

      console.log(this.setDetailList);

      // console.log(this.setDetailList)

      // let result = Object.values(JSON.parse(JSON.stringify(this.data.items)))
      // 	console.log(this.data.items)
      // 	result = result.map((item,index) => {
      // 		item.isAlarm = item.isAlarm === true ? 1 : 0
      // 		item.id = index +1
      // 		return item
      // 	})

      // 	// this.setDetailList

      // console.log(this.data.items)
      // console.log(result)
      axios({
        url,
        data: this.topConfig,
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        // let result = Object.values(JSON.parse(JSON.stringify(this.data.items)))
        // console.log(this.data.items)
        // result = result.map((item,index) => {
        // 	item.isAlarm = item.isAlarm === true ? 1 : 0
        // 	item.id = index +1
        // 	return item
        // })
        // console.log(this.data.items)
        // console.log(result)
        let result = JSON.parse(JSON.stringify(this.setDetailList));
        result = result.map((item, index) => {
          item.isAlarm = item?.isAlarm === true ? 1 : 0;
          item.isTransform = item?.isTransform === true ? 1 : 0;
          // item.id = index +1
          return item;
        });
        axios({
          url: BASE_URL + URL.updateDevice,
          data: result,
          method: "put",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res2) => {
            console.log(this.showAlert);
            this.showAlert = true;
            loading.close();
            setTimeout(() => {
              this.$emit("setChangeDetail");
            }, 2000);
          })
          .catch((error) => {
            ElMessage.error("修改失败:updateDevice");
            loading.close();
            console.log(error);
          });
      });
      console.log(params);
    },
  },
  created() {
    this.getConfig();
    console.log("config==>detail");

    // this.initMqttClient()
  },
});
</script>

<style scoped>
.header-box {
  height: 130px;
  z-index: 800;
  background: url("@/assets/image/twoBg.png") no-repeat center top / cover;
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
  width: calc(100% / 18);
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
  /* overflow-y: scroll; */
}

.tableHeader .thList {
  width: calc(100% / 18);
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
  flex: 1;
  width: 100%;
  height: 100%;
  border: 1px solid #1c6eea;
  background-color: rgba(2, 33, 81, 0.38);
  /* overflow: auto; */
  overflow-y: scroll;
  box-sizing: border-box;
  /* padding-bottom: 68px; */
  padding-bottom: 30px;
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
  /* height: 200px; */
  border: 1px solid #1c6eea;
  /* margin: 0px auto; */
  background-color: rgba(2, 33, 81, 0.38);
  display: flex;
  flex-wrap: wrap;
}

.blPadding {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 0 10px;
  display: flex;
  flex-direction: column;
  padding-bottom: 13px;
  /* padding: 0px 20px; */
  /* margin: 0px auto; */
}

.bgTwo {
  background: linear-gradient(180deg, #000000 0%, #081d3d 100%) !important;
  /* min-width: 1600px; */
  min-height: 1000px;
  height: 100%;
  /* height: 100vh; */
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
  height: calc(100% - 130px);
}

.engine-box {
  padding: 18px 22px;
  width: calc(100% - 44px);
}

.bcList {
  height: 100%;
}
</style>
