import * as mqtt from "mqtt/dist/mqtt.min.js";
const VITE_APP_MQTT_IP = import.meta.env.VITE_APP_MQTT_IP;
import { BASE_URL } from "@/api/ENV";
import axios from "axios";
import URL from "@/api/URL";
import _ from "lodash";
let client;
let dew_point_cRes = [];
let temperatureRes = [];
let dif_pressure_paRes = [];
let humidnessRes = [];
let g05Res = [];
let g50Res = [];

// ==========================echarts
// let wdData = [];
// let sdData = [];
// let ycData = [];
// let j05Data = [];
// let j50Data = [];
// ==========================echarts

// const getDate = (that) => {
//   //获取当前时间并打印
// //   let _this = this;
//   let yy = new Date().getFullYear();
//   let mm = new Date().getMonth() + 1;
//   let dd = new Date().getDate();
//   let hh = new Date().getHours();
//   let mf =
//     new Date().getMinutes() < 10
//       ? "0" + new Date().getMinutes()
//       : new Date().getMinutes();
//   let ss =
//     new Date().getSeconds() < 10
//       ? "0" + new Date().getSeconds()
//       : new Date().getSeconds();
//   that.nowDate = yy + "/" + mm + "/" + dd + " " + hh + ":" + mf + ":" + ss;
// };
const getResult = function (a) {
  return (
    611.2 *
    Math.pow(
      Math.E,
      ((18.678 - Number(a) / 234.5) * Number(a)) / (Number(a) + 257.14)
    )
  );
};

const getTime = function () {
  //   var _this = this;
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
  return yy + "/" + mm + "/" + dd + "  " + hh + ":" + mf + ":" + ss;
};

const initMqttClient = (that, template) => {
  axios
    .get(BASE_URL + URL.data, {
      params: {
        key: "configuration",
      },
    })
    .then((response) => {
      // 接收的消息为uint8Array字节流，方便后续处理，需要做一次转化，得到json格式数据
      // console.log(response.data.dataList)
      // let formatMessage = response.data
      // formatMessage = response.data.dataList
      // console.log(formatMessage)
      // if (formatMessage.type === 'data') {
      let res1 = [];
      let res2 = [];
      let res3 = [];
      let res4 = [];
      let res5 = [];
      let res6 = [];

      try {
        //在此运行代码
        const formatMessage = _.cloneDeep(response.data);
        // 1.露点 2.温度 3.压差 4.湿度 5.05 6.50
        let result = formatMessage.dataList.map((item) => {
          let value = Number(item.value);
          if (
            value &&
            item.type !== 5 &&
            item.type !== 6 &&
            value < Number(item?.configLowerLimit)
          ) {
            value = Number(item?.configLowerLimit).toFixed(2);
          }
          if (
            value &&
            item.type !== 5 &&
            item.type !== 6 &&
            value > Number(item?.configSuperiorLimit)
          ) {
            value = Number(item?.configSuperiorLimit).toFixed(2);
          }
          // console.log(value)
          return {
            ...item,
            value: Number(value),
          };
        });

        try {
          //在此运行代码

          const result2 = _.cloneDeep(result);
          // console.log('result====>',result)
          let ld;
          let wd;
          result2.forEach((item) => {
            if (item.type == 1) {
              ld = item;
            }
            if (item.type == 2) {
              wd = item;
            }
          });
          result2.forEach((item) => {
            switch (item.type) {
              case 1:
                ld = item;
                res1.push({
                  ...item,
                  value: item?.value?.toFixed(2),
                });
                break;
              case 2:
                wd = item;
                res2.push({
                  ...item,
                  value: item?.value?.toFixed(2),
                });
                // ==========================echarts
                // if (wdData?.length > 30) {
                //   wdData.splice(1, 1);
                // }
                // wdData.push([getTime(), Number(item.value.toFixed(2))]);
                // ==========================echarts

                break;
              case 3:
                res3.push({
                  ...item,
                  value: item?.value?.toFixed(2),
                });
                // ==========================echarts
                // if (ycData?.length > 30) {
                //   ycData.splice(1, 1);
                // }
                // ycData.push([getTime(), Number(item.value.toFixed(2))]);
                // ==========================echarts

                break;
              case 4:
                if (
                  (wd.value &&
                    Number(wd?.value) <= Number(wd?.configLowerLimit)) ||
                  (wd.value &&
                    Number(wd?.value) >= Number(wd?.configSuperiorLimit)) ||
                  (ld.value &&
                    Number(ld?.value) <= Number(ld?.configLowerLimit)) ||
                  (ld.value &&
                    Number(ld?.value) >= Number(ld?.configSuperiorLimit))
                ) {
                  //   console.log("露点与温度数值异常===不计算湿度false");
                  that.sdState = false;
                  res4.push({
                    ...item,
                    value: item.value.toFixed(1),
                  });

                  // ==========================echarts
                  //   if (sdData?.length > 30) {
                  //     sdData.splice(1, 1);
                  //   }
                  //   sdData.push([getTime(), Number(item.value.toFixed(1))]);
                  // ==========================echarts
                } else {
                  that.sdState = true;
                  let pvT = getResult(wd?.value);
                  let pvP = getResult(ld?.value);
                  // console.log('用于计算温度：',pvT)
                  // console.log('用于计算露点：',pvP)
                  let pvH = (pvP / pvT) * 100;
                  //   console.log("原本湿度", item.value.toFixed(2));
                  //   console.log("计算后的湿度：", pvH);
                  // this.newpvh = pvH;
                  // this.listData.humidness = Number(pvH).toFixed(2);
                  res4.push({
                    ...item,
                    value: Number(pvH).toFixed(2),
                  });
                  // ==========================echarts
                  //   if (sdData.length > 30) {
                  //     sdData.splice(1, 1);
                  //   }
                  //   sdData.push([getTime(), Number(Number(pvH).toFixed(2))]);
                  // ==========================echarts
                }

                break;
              case 5:
                // res5.push({
                //   ...item,
                //   value: (item.value / 10000).toFixed(2),
                // });
                res5 = [
                  {
                    ...item,
                    value: (item?.value / 10000).toFixed(2),
                  },
                ];
                // ==========================echarts
                // if (j05Data.length > 30) {
                //   j05Data.splice(1, 1);
                // }
                // j05Data.push([
                //   getTime(),
                //   Number((item.value / 10000).toFixed(2)),
                // ]);
                // ==========================echarts

                break;
              case 6:
                // res6.push({
                //   ...item,
                //   value: (item.value / 10000).toFixed(2),
                // });
                res6 = [
                    {
                      ...item,
                      value: (item?.value / 10000).toFixed(2),
                    },
                  ];
                // ==========================echarts
                // if (j50Data.length > 30) {
                //   j50Data.splice(1, 1);
                // }
                // j50Data.push([
                //   getTime(),
                //   Number((item.value / 10000).toFixed(2)),
                // ]);
                // ==========================echarts
                break;
              default:
                break;
            }
          });

          try {
            //在此运行代码
            if (res1.length !== 0) {
              dew_point_cRes = res1;
            }
            if (res2.length !== 0) {
              temperatureRes = res2;
            }
            if (res3.length !== 0) {
              dif_pressure_paRes = res3;
            }
            if (res4.length !== 0) {
              humidnessRes = res4;
            }
            if (res5.length !== 0) {
              g05Res = res5;
            }
            if (res6.length !== 0) {
              g50Res = res6;
            }

            that.txtList = null;
            console.log('g05Res:',g05Res);
            // console.log('g50Res:',g50Res);
            that.listData = {
              ...that.listData,
              dew_point_c: dew_point_cRes,
              temperature: temperatureRes,
              dif_pressure_pa: dif_pressure_paRes,
              humidness: humidnessRes,
              g05: g05Res,
              g50: g50Res,
            };
            // that.txtList = JSON.stringify(that.listData);
            //   console.log(wdData);
            /**
             * echarts
             *  */
            // that.wdData = JSON.parse(JSON.stringify(wdData));
            // that.sdData = JSON.parse(JSON.stringify(sdData));
            // that.ycData = JSON.parse(JSON.stringify(ycData));
            // that.j05Data = JSON.parse(JSON.stringify(j05Data));
            // that.j50Data = JSON.parse(JSON.stringify(j50Data));

            dew_point_cRes = null;
            temperatureRes = null;
            dif_pressure_paRes = null;
            humidnessRes = null;
            // g05Res = null;
            // g50Res = null;

            // wdData = null;
            // sdData = null;
            // ycData = null;
            // j05Data = null;
            // j50Data = null;
          } catch (err) {
            let dateNow = JSON.stringify(Date.now());
            localStorage.setItem(
              dateNow + "mqtt2-foot-if",
              JSON.stringify({ val: err, time: dateNow })
            );
          }
        } catch (err) {
          console.log("mqtt2-center-err:", err);
          let dateNow = JSON.stringify(Date.now());
          localStorage.setItem(
            dateNow + "mqtt2-center",
            JSON.stringify({ val: err, time: dateNow })
          );
        }
      } catch (err) {
        console.log("mqtt2-head-err:", err);
        let dateNow = JSON.stringify(Date.now());
        localStorage.setItem(
          dateNow + "mqtt2-head",
          JSON.stringify({ val: err, time: dateNow })
        );
      }

      //   const formatMessage = _.cloneDeep(response.data);
      //   // 1.露点 2.温度 3.压差 4.湿度 5.05 6.50
      //   let result = formatMessage.dataList.map((item) => {
      //     let value = Number(item.value);
      //     if (
      //       value &&
      //       item.type !== 5 &&
      //       item.type !== 6 &&
      //       value < Number(item?.configLowerLimit)
      //     ) {
      //       value = Number(item?.configLowerLimit).toFixed(2);
      //     }
      //     if (
      //       value &&
      //       item.type !== 5 &&
      //       item.type !== 6 &&
      //       value > Number(item?.configSuperiorLimit)
      //     ) {
      //       value = Number(item?.configSuperiorLimit).toFixed(2);
      //     }
      //     // console.log(value)
      //     return {
      //       ...item,
      //       value: Number(value),
      //     };
      //   });
      //   // console.log(result)
      //   // debugger
      //   const result2 = _.cloneDeep(result);
      //   // console.log('result====>',result)

      //   var ld;
      //   var wd;
      //   result2.forEach((item) => {
      //     if (item.type == 1) {
      //       ld = item;
      //     }
      //     if (item.type == 2) {
      //       wd = item;
      //     }
      //   });
      //   result2.forEach((item) => {
      //     switch (item.type) {
      //       case 1:
      //         ld = item;
      //         res1.push({
      //           ...item,
      //           value: item.value.toFixed(2),
      //         });
      //         break;
      //       case 2:
      //         wd = item;
      //         res2.push({
      //           ...item,
      //           value: item.value.toFixed(2),
      //         });
      //         if (wdData.length > 30) {
      //           wdData.splice(1, 1);
      //         }
      //         wdData.push([getTime(), Number(item.value.toFixed(2))]);
      //         break;
      //       case 3:
      //         res3.push({
      //           ...item,
      //           value: item.value.toFixed(2),
      //         });
      //         if (ycData.length > 30) {
      //           ycData.splice(1, 1);
      //         }
      //         ycData.push([getTime(), Number(item.value.toFixed(2))]);
      //         break;
      //       case 4:
      //         if (
      //           (wd.value && Number(wd.value) <= Number(wd.configLowerLimit)) ||
      //           (wd.value &&
      //             Number(wd.value) >= Number(wd.configSuperiorLimit)) ||
      //           (ld.value && Number(ld.value) <= Number(ld.configLowerLimit)) ||
      //           (ld.value && Number(ld.value) >= Number(ld.configSuperiorLimit))
      //         ) {
      //           //   console.log("露点与温度数值异常===不计算湿度false");
      //           that.sdState = false;
      //           res4.push({
      //             ...item,
      //             value: item.value.toFixed(1),
      //           });
      //           if (sdData.length > 30) {
      //             sdData.splice(1, 1);
      //           }
      //           sdData.push([getTime(), Number(item.value.toFixed(1))]);
      //         } else {
      //           that.sdState = true;
      //           let pvT = getResult(wd.value);
      //           let pvP = getResult(ld.value);
      //           // console.log('用于计算温度：',pvT)
      //           // console.log('用于计算露点：',pvP)
      //           let pvH = (pvP / pvT) * 100;
      //           //   console.log("原本湿度", item.value.toFixed(2));
      //           //   console.log("计算后的湿度：", pvH);
      //           // this.newpvh = pvH;
      //           // this.listData.humidness = Number(pvH).toFixed(2);
      //           res4.push({
      //             ...item,
      //             value: Number(pvH).toFixed(2),
      //           });
      //           if (sdData.length > 30) {
      //             sdData.splice(1, 1);
      //           }
      //           sdData.push([getTime(), Number(Number(pvH).toFixed(2))]);
      //         }

      //         break;
      //       case 5:
      //         res5.push({
      //           ...item,
      //           value: (item.value / 10000).toFixed(2),
      //         });
      //         if (j05Data.length > 30) {
      //           j05Data.splice(1, 1);
      //         }
      //         j05Data.push([getTime(), Number((item.value / 10000).toFixed(2))]);
      //         break;
      //       case 6:
      //         res6.push({
      //           ...item,
      //           value: (item.value / 10000).toFixed(2),
      //         });
      //         if (j50Data.length > 30) {
      //           j50Data.splice(1, 1);
      //         }
      //         j50Data.push([getTime(), Number((item.value / 10000).toFixed(2))]);
      //         break;
      //       default:
      //         break;
      //     }
      //   });
      //   if (res1.length !== 0) {
      //     dew_point_cRes = res1;
      //   }
      //   if (res2.length !== 0) {
      //     temperatureRes = res2;
      //   }
      //   if (res3.length !== 0) {
      //     dif_pressure_paRes = res3;
      //   }
      //   if (res4.length !== 0) {
      //     humidnessRes = res4;
      //   }
      //   if (res5.length !== 0) {
      //     g05Res = res5;
      //   }
      //   if (res6.length !== 0) {
      //     g50Res = res6;
      //   }
      //   that.listData = {
      //     ...that.listData,
      //     dew_point_c: dew_point_cRes,
      //     temperature: temperatureRes,
      //     dif_pressure_pa: dif_pressure_paRes,
      //     humidness: humidnessRes,
      //     g05: g05Res,
      //     g50: g50Res,
      //   };
      //   //   console.log(wdData);
      //   //   console.log(that.listData);
      //   that.wdData = JSON.parse(JSON.stringify(wdData));
      //   that.sdData = JSON.parse(JSON.stringify(sdData));
      //   that.ycData = JSON.parse(JSON.stringify(ycData));
      //   that.j05Data = JSON.parse(JSON.stringify(j05Data));
      //   that.j50Data = JSON.parse(JSON.stringify(j50Data));

      //   that.$refs.wdChartView.chart('wd',JSON.parse(JSON.stringify(that.wdData)))

      // }
      // if (formatMessage.type === 'date') {
      // 	console.log(formatMessage.date)

      // }
    })
    .catch((error) => {
      console.log("error", error);
    });
};
export default initMqttClient;
