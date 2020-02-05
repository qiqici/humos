<template>
    <section  class="contentBox">
             <div>
                <Row>
                    <i-col span="6">
                        开始时间：
                           <Date-picker type="date" :options="startDate"
                           placeholder="选择日期" class="inputWdth" ref="startDate"></Date-picker>
                    </i-col>
                    <i-col span="6">
                        结束时间： <Date-picker type="date" :options="endDate"
                        placeholder="选择日期" class="inputWdth" ref="endDate"></Date-picker>
                    </i-col>
                    <i-col span="6">
                        状态码：<i-input :value.sync="Car_owner_information.SLAId"
                        placeholder="请输入SLA ID" class="inputWdth"></i-input>
                    </i-col>
                    <i-col span="6">
                        调用方式：<i-select :model.sync="carStatus"
                        class="inputWdth" ref="carStatus" clearable>
                            <i-option v-for="(item,index) in carStatusData"
                            :value="item.value" :key="index">{{ item.label }}</i-option>
                        </i-select>
                    </i-col>
                </Row>
                <div slot="content" class="mt30">
                <table class="tableBox">
                    <tr>
                        <th>时间</th>
                        <th>调用方式</th>
                        <th>状态码</th>
                        <th>地址</th>
                        <th>详情</th>
                    </tr>
                    <tr>
                        <td>2019-02-01 12:00:00</td>
                         <td>SLA1234</td>
                        <td>2LSTS226JPCC011T01</td>
                        <td>成功</td>
                        <td>
                            <i-button type="primary" @click="viewDetails">下载</i-button>
                        </td>
                    </tr>
                     <tr>
                        <td>2019-02-01 12:00:00</td>
                         <td>SLA1234</td>
                        <td>2LSTS226JPCC011T01</td>
                        <td>成功</td>
                        <td>
                            <i-button type="primary" @click="viewDetails">下载</i-button>
                        </td>
                    </tr>
                </table>
                 <Page :total="40"></Page>
            </div>
                <Row type="flex" justify="center" class="mt30">
                    <i-col span="3">
                        <i-button type="primary" @click='slaSwitch'>确定</i-button>
                    </i-col>
                    <i-col span="3">
                        <i-button type="primary" @click="restForm">重置</i-button>
                    </i-col>
                </Row>
            </div>
    </section>
</template>

<script>
import messageApi from '@/api/message';
import myRequestApi from '@/api/myRequest';

export default {
  data() {
    return {
      value: '',
      carStatus: '',
      serverStatus: '',
      Car_owner_information: {
        vinNum: '',
        userName: '',
        phoneNum: '',
      },
      carStatusData: [
        {
          value: '1',
          label: '按VIN号',
        },
        {
          value: '2',
          label: '按车牌',
        },
      ],
      serverData: [
        {
          value: '1',
          label: 'onlineMusic',
        },
        {
          value: '2',
          label: 'onlineRadio',
        },
      ],
      startDate: {},
      endDate: {},
    };
  },
  methods: {
    viewDetails() {
      // this.$router.push({ path: '/viewDetails' });
      myRequestApi.traceLogDownloadPlate({
        fileName: '1',
      }).then((res) => {
        if (res.data.code === '000000') {
          console.log(res.data.data);
        }
      });
    },
    restForm() {
      this.Car_owner_information.vinNum = ' ';
      this.Car_owner_information.userName = ' ';
      this.Car_owner_information.phoneNum = ' ';
      this.$refs.carStatus.clearSingleSelect();
      this.$refs.serverStatus.clearSingleSelect();
    },
    slaSwitch() {
      messageApi.slaSwitch({
        vin: 'BVWTDMW0B19061120',
        serviceName: 'onlineRadio',
        interval: '2',
        count: 2,
      }).then((res) => {
        // eslint-disable-next-line eqeqeq
        if (res.data.code == '000000') {
          console.log(res.data.data);
        }
      });
    },
    slaSwitchV1() {
      myRequestApi.traceLogFindPlate({
        vin: '',
        startTime: '',
        endTime: '',
        pageIndex: 1,
        pageSize: 10,
      }).then((res) => {
        if (res.data.code === '000000') {
          console.log(res.data.data);
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.mt50{
    margin-top:50px;
}
.mt30{
    margin-top:30px;
}
.contentBox{
    padding:2%;
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
