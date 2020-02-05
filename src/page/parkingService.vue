<template>
  <section class="contentBox">
    <div>
        <Row type="flex" justify="start">
            <Col span="6">
                <i-col span="7">Did</i-col>
                <i-col span="16">
                <i-input v-model="did" placeholder="请输入Did"></i-input>
                </i-col>
            </Col>
            <Col span="6">
                <i-col span="7">userId</i-col>
                <i-col span="16">
                <i-input v-model="userId" placeholder="请输入userId"></i-input>
                </i-col>
            </Col>
            <Col span="6">
                <i-col span="7">vin</i-col>
                <i-col span="16" >
                <i-input v-model="vinNum" placeholder="请输入vin"></i-input>
                </i-col>
            </Col>
        </Row>
         <Row type="flex" justify="start" class="mt50">
            <Col span="6">
                <i-col span="7">车牌号</i-col>
                <i-col span="16" >
                <i-input v-model="plateNum" placeholder="请输入车牌号码"></i-input>
                </i-col>
            </Col>
            <Col  span="6">
                <i-col span="7">执行功能</i-col>
                <i-col span="16" >
                <i-select v-model="objName" ref="objName" clearable>
                    <i-option
                    v-for="(item,index) in objNameData"
                    :value="item.value"
                    :key="index"
                    >{{ item.label }}</i-option>
                </i-select>
                </i-col>
            </Col>
         </Row>
    </div>
    <Row type="flex" justify="center" class="mt30">
      <i-col span="3" v-if="!objName">
        <i-button type="primary">执行</i-button>
      </i-col>
      <div>
        <i-col span="3" v-show="objName == 2">
          <i-button type="primary" @click="registerPlate(2)">执行</i-button>
        </i-col>
        <i-col span="3" v-show="objName == 1">
          <i-button type="primary" @click="registerPlate(1)">执行</i-button>
        </i-col>
      </div>
      <i-col span="3">
        <i-button type="primary" @click="restForm">重置</i-button>
      </i-col>
    </Row>
  </section>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      objName: '',
      did: '',
      vinNum: '',
      plateNum: '',
      userId: '',
      objNameData: [
        {
          value: '1',
          label: '解绑服务',
        },
        {
          value: '2',
          label: '开通服务',
        },
      ],
    };
  },
  methods: {
    restForm() {
      this.did = ' ';
      this.userId = ' ';
      this.vinNum = ' ';
      this.plateNum = ' ';
      this.$refs.objName.clearSingleSelect();
    },
    registerPlate(typeStr) {
      if (!this.did) {
        this.$Message.error('请输入正确格式的Did');
      }
      if (!this.userId) {
        this.$Message.error('请输入正确格式的userId');
      }
      if (!this.vinNum) {
        this.$Message.error('请输入正确格式的vin');
      }
      if (!this.plateNum) {
        this.$Message.error('请输入正确格式的车牌');
      }
      // axios.defaults.headers.common["Did"] = this.did;
      axios.defaults.headers.common.Did = this.did;
      // eslint-disable-next-line eqeqeq
      if (typeStr == 2) {
        this.$store
          .dispatch('message/getRegisterInfo', {
            plateNum: this.plateNum,
            userId: this.userId,
            vin: this.vinNum,
          })
          .then((res) => {
            if (res.data.code !== '000000') {
              this.$Message.info(res.data.description);
            }
          });
      }
      // eslint-disable-next-line eqeqeq
      if (typeStr == 1) {
        this.$store
          .dispatch('message/delplate', {
            plateNum: this.plateNum,
            userId: this.userId,
          })
          .then((res) => {
            if (res.data.code !== '000000') {
              this.$Message.info(res.data.description);
            }
          });
      }
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
