<template>
  <section  class="contentBox">
    <div>
        <Row type="flex" justify="center" class="tright">
            <i-col span="6">
                开始时间：
                    <Date-picker type="date" v-model="startDataV1"
                    :options="startDate" placeholder="选择日期" class="inputWdth" ref="startDate">
                    </Date-picker>
            </i-col>
            <i-col span="6" push="0">
                结束时间： <Date-picker type="date" v-model="endDateV1"
                :options="endDate" placeholder="选择日期" class="inputWdth" ref="endDate">
                </Date-picker>
            </i-col>
            <i-col span="6">
                <!-- SLA ID：<i-input :value.sync="Car_owner_information.SLAId"
                placeholder="请输入SLA ID" class="inputWdth">
                </i-input> -->
                调用方：
                <i-select :model.sync="caller"
                class="inputWdth" ref="caller" v-model="callerV1" clearable>
                  <i-option v-for="(item,index) in callerData"
                  :value="item.value" :key="index">{{item.label}}</i-option>
                </i-select>
            </i-col>
            <i-col span="6">
                状态：
                <i-select :model.sync="carStatus"
                class="inputWdth" ref="carStatus" v-model="carStatusV1" clearable>
                    <i-option v-for="(item,index) in carStatusData"
                    :value="item.value" :key="index">{{ item.label }}</i-option>
                </i-select>
            </i-col>
        </Row>
        <Row class="mt30 tright" type="flex" justify="center">
            <i-col span="6" >
                VIN：<i-input :value.sync="Car_owner_information.vinNum" v-model="vinNumV1"
                placeholder="请输入VIN" class="inputWdth"></i-input>
            </i-col>
              <i-col span="6" >
                手机号码： <i-input :value.sync="Car_owner_information.phoneNum"
                placeholder="请输入手机号码" class="inputWdth" v-model="phoneNumV1" :maxlength="11">
                </i-input>
            </i-col>
              <i-col span="6">
                MOS ID：<i-input :value.sync="Car_owner_information.userName" v-model="userNameV1"
                placeholder="请输入车主姓名" class="inputWdth"></i-input>
            </i-col>
            <i-col span="6" >
                <!-- <i-input :value.sync="Car_owner_information.carId"
                placeholder="请输入车牌号码" class="inputWdth"></i-input> -->
                业务模块：
                <i-select :model.sync="service"
                class="inputWdth" ref="service" v-model="serviceDataV1" clearable>
                    <i-option v-for="(item,index) in serviceData"
                    :value="item.value" :key="index">{{ item.label }}</i-option>
                </i-select>
            </i-col>
        </Row>
        <Row type="flex" justify="center" class="mt30">
          <i-col span="3">
              <i-button type="primary" @click="pagePlate">确认</i-button>
          </i-col>
          <i-col span="3">
              <i-button type="primary" @click="restForm">重置</i-button>
          </i-col>
        </Row>
    </div>
    <div slot="content" class="mt30">
      <table class="tableBox">
        <tr>
          <th>调用时间</th>
          <th>调用方</th>
          <th>业务模块</th>
          <th>接口名称</th>
          <th>状态</th>
          <th>  </th>
        </tr>
        <tr v-for="(item,index) in formData" :key="index">
          <td>{{item.invokeTime}}</td>
          <td>{{item.channel}}</td>
          <td>{{item.moudle}}</td>
          <td>{{item.url}}</td>
          <td>成功</td>
          <td>
              <i-button type="primary" @click="viewDetails(index)">查看</i-button>
          </td>
        </tr>
        <!-- <tr>
          <td>2019-02-01 12:00:00</td>
          <td>App</td>
          <td>Smart Home</td>
          <td>getUserInfo</td>
          <td>成功</td>
          <td>
              <i-button type="primary" @click="viewDetails">查看</i-button>
          </td>
        </tr> -->
        <!-- <tr>
          <td>2019-02-01 12:00:00</td>
          <td>HU</td>
          <td>Smart Home</td>
          <td>getUserInfo</td>
          <td>失败</td>
          <td>
              <i-button type="primary" @click="viewDetails">查看</i-button>
          </td>
        </tr> -->
      </table>
      <Page :total="40"></Page>
    </div>
  </section>
</template>

<script>

export default {
  data() {
    return {
      startDataV1: '',
      endDateV1: '',
      callerV1: '',
      carStatusV1: '',
      vinNumV1: '',
      phoneNumV1: '',
      userNameV1: '',
      serviceDataV1: '',
      dataList: [],
      formData: [],

      value: '',
      caller: '',
      service: '',
      carStatus: '',
      Car_owner_information: {
        vinNum: '',
        carId: '',
        userName: '',
        phoneNum: '13523368465',
        SLAId: '',
      },
      callerData: [
        {
          value: '1',
          label: 'App',
        },
        {
          value: '1',
          label: 'HU',
        },
      ],
      serviceData: [
        // {
        //   value: '1',
        //   label: 'Smart Home',
        // },
        // {
        //   value: '1',
        //   label: 'All',
        // },
      ],
      carStatusData: [
        {
          value: '1',
          label: '成功',
        },
        {
          value: '2',
          label: '失败',
        },
        {
          value: '3',
          label: '全部',
        },
      ],
      startDate: {
        // disabledDate (date) {
        //     return date && date.valueOf() < Date.now() - 86400000;
        // }
      },
      endDate: {

      },
      model1: '',
    };
  },
  methods: {
    viewDetails(index) {
      // this.$router.push({ path: '/viewDetails' });
      this.$Notice.open({
        title: 'message',
        desc: this.formData[index].message,
        duration: 0,
      });
    },
    restForm() {
      this.$refs.startDate.handleClear();
      this.$refs.endDate.handleClear();
      this.$refs.carStatus.clearSingleSelect();
      this.$refs.caller.clearSingleSelect();
      this.$refs.service.clearSingleSelect();
      this.Car_owner_information.vinNum = ' ';
      // this.Car_owner_information.carId = ' ';
      this.Car_owner_information.userName = ' ';
      this.Car_owner_information.phoneNum = ' ';
      this.Car_owner_information.SLAId = ' ';

      this.startDataV1 = '';
      this.endDateV1 = '';
      this.vinNumV1 = '';
      this.phoneNumV1 = '';
      this.userNameV1 = '';
    },
    // 校验填写是否规范
    fillCheck() {
      if (this.startDataV1 === undefined || this.startDataV1 === '') {
        this.$Message.error('请选择开始时间');
      }
      if (this.endDateV1 === undefined || this.endDateV1 === '') {
        this.$Message.error('请选择结束时间');
      }
      if (this.callerV1 === undefined || this.callerV1 === '') {
        this.$Message.error('请选择调用方');
      }
      if (this.carStatusV1 === undefined || this.carStatusV1 === '') {
        this.$Message.error('请选择状态');
      }
      if (this.vinNumV1 === undefined || this.vinNumV1 === '') {
        this.$Message.error('请输入VIN');
      }
      if (this.userNameV1 === undefined || this.userNameV1 === '') {
        this.$Message.error('请输入MOS ID');
      }
      if (this.serviceDataV1 === undefined || this.serviceDataV1 === '') {
        this.$Message.error('请选择业务模块');
      }
      if (this.phoneNumV1 === undefined || this.phoneNumV1 === '') {
        this.$Message.error('请填写手机号');
      } else if (!(/^1[3456789]\d{9}$/.test(this.phoneNumV1))) {
        this.$Message.error('手机号码有误，请重填');
      }
    },
    pagePlate() {
      // 1579404092000
      // 2020-01-19 11:21:32.931
      // this.fillCheck();
      this.$store
        .dispatch('myRequest/getPageInfo', {
          mobile: this.plateNum,
          userId: this.userId,
          vin: this.vinNum,
          // startTime: this.startDataV1.getTime(),
          startTime: 1579404091000,
          // endTime: this.endDateV1.getTime(),
          endTime: 1579404098000,
          pageIndex: 1,
          pageSize: 10,
          moudle: this.serviceDataV1,
          status: '',
        })
        .then((res) => {
          if (res.data.code !== '000000') {
            this.$Message.info(res.data.description);
          }
          if (res.data.code !== '527006') {
            this.$Message.info(res.data.description);
          }
          let i;
          for (i = 0; i < res.data.data.pageData.length; i += 1) {
            this.formData.push({
              invokeTime: res.data.data.pageData[i].invokeTime,
              moudle: res.data.data.pageData[i].moudle,
              url: res.data.data.pageData[i].url,
              channel: res.data.data.pageData[i].channel,
              status: res.data.data.pageData[i].status,
              message: res.data.data.pageData[i].message,
            });
          }
        });
    },
    servicePlate() {
      this.$store
        .dispatch('myRequest/getServiceInfo', {})
        .then((res) => {
          if (res.data.code !== '000000') {
            this.$Message.info(res.data.description);
          }
          let i;
          for (i = 0; i < res.data.data.length; i += 1) {
            this.serviceData.push({
              value: i,
              label: res.data.data[i].serviceName,
            });
          }
        });
    },
  },
  mounted() {
    this.servicePlate();
  },
};
</script>

<style lang="scss" scoped>
.mt50{
    margin-top:50px;
}
.mt35{
    margin-top:35px;
}
.mt30{
    margin-top:30px;
}
.contentBox{
    padding:2%;
}
.tright{
  text-align: right;
}
// .ivu-input-wrapper,.ivu-select{
//    width:60%;
// }
.tableBox{
    width:100%;
}
.inputWdth {
    width:70%;
}
</style>
