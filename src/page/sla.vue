<template>
    <section  class="contentBox">
             <div>
                <Row>
                    <i-col span="5" push="1">
                       <i-select :model.sync="carStatus"
                       class="inputWdth" ref="carStatus" clearable>
                            <i-option v-for="(item,index) in carStatusData"
                            :value="item.value" :key="index">{{ item.label }}</i-option>
                        </i-select>
                    </i-col>
                    <i-col span="5" style="margin-left:30px;">
                       <i-input :value.sync="Car_owner_information.vinNum"
                       placeholder="请输入VIN" class="inputWdth"></i-input>
                    </i-col>
                </Row>
                 <Row class="mt50">
                    <i-col span="5" push="1">
                      功能服务
                    </i-col>
                    <i-col span="5" style="margin-left:30px;">
                       <i-select :model.sync="serverStatus"
                       class="inputWdth" ref="serverStatus" clearable>
                            <i-option v-for="(item,index) in serverData"
                            :value="item.value" :key="index">{{ item.label }}</i-option>
                        </i-select>
                    </i-col>
                </Row>
                <Row class="mt50">
                    <i-col span="5" push="1">
                      执行次数
                    </i-col>
                    <i-col span="5" style="margin-left:30px;">
                       <i-input :value.sync="Car_owner_information.userName"
                       placeholder="请输入VIN" class="inputWdth"></i-input>
                    </i-col>
                </Row>
                 <Row class="mt50">
                    <i-col span="5" push="1">
                      间隔时间
                    </i-col>
                    <i-col span="5" style="margin-left:30px;">
                       <i-input :value.sync="Car_owner_information.phoneNum"
                       placeholder="请输入VIN" class="inputWdth"></i-input>
                    </i-col>
                </Row>
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
    };
  },
  methods: {
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
