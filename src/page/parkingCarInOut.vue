<template>
  <section class="contentBox">
    <Row type="flex" justify="center" >
      <Col span="6">
        <i-col span="7">车牌号码</i-col>
        <i-col span="16">
          <i-input v-model="plateNum" placeholder="请输入车牌号码"></i-input>
        </i-col>
      </Col>
      <Col span="6">
        <i-col span="7">CP名称</i-col>
        <i-col span="16">
          <i-select v-model="cpName" ref="cpName" clearable>
            <i-option
              v-for="(item,index) in serverData"
              :value="item.value"
              :key="index"
            >{{ item.label }}</i-option>
          </i-select>
        </i-col>
      </Col>
    </Row>
    <Row type="flex" justify="center" class="mt50">
      <i-col span="3">
        <i-button type="primary" @click="slaSwitch">执行</i-button>
      </i-col>
      <i-col span="3">
        <i-button type="primary" @click="restForm">重置</i-button>
      </i-col>
    </Row>
  </section>
</template>

<script>
export default {
  data() {
    return {
      plateNum: '',
      cpName: '',
      serverData: [
        {
          value: '1',
          label: 'EZP',
          // 该CP暂不支持该服务
        },
        {
          value: '2',
          label: 'ETCP',
        },
        {
          value: '3',
          label: 'ALL',
        },
      ],
    };
  },
  methods: {
    restForm() {
      this.plateNum = ' ';
      this.cpName = ' ';
      this.$refs.cpName.clearSingleSelect();
    },
    slaSwitch() {
      if (!this.did) {
        this.$Message.error('请输入正确格式的Did');
      }
      this.$store
        .dispatch('message/getsimulationInfo', {
          plateNumber: this.plateNum,
        })
        .then((res) => {
          if (res.data.code !== '000000') {
            this.$Message.info(res.data.description);
          }
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.mt50 {
  margin-top: 50px;
}
.mt30 {
  margin-top: 30px;
}
.contentBox {
  padding: 2%;
}
// .ivu-input-wrapper,.ivu-select{
//    width:60%;
// }
.tableBox {
  width: 100%;
}
.inputWdth {
  width: 70%;
}
</style>
