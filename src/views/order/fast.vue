<template>
  <div class="fast">
    <a @click="toFastDetail">123</a>
    <a-table :columns="columns"
             :rowKey="record => record.login.uuid"
             :dataSource="data"
             :pagination="pagination"
             @change="handleTableChange">
      <span
        class="details_click"
        slot="click"
        slot-scope="text, record" >查看详情</span>
    </a-table>
  </div>

</template>

<script>
  const columns = [
    { title: '订单', dataIndex: 'nickname', key: 'nickname' },
    { title: '预计收益', dataIndex: 'dubberLevel', key: 'dubberLevel', scopedSlots: { customRender: 'dubberLevel' }},
    { title: '结算收益', dataIndex: 'voiceStyle', key: 'voiceStyle', scopedSlots: { customRender: 'voiceStyle' }},
    { title: '状态', dataIndex: 'type', key: 'type' , scopedSlots: { customRender: 'type' }},
    { title: '交付时间', dataIndex: 'workPeriodPerDay', key: 'workPeriodPerDay', scopedSlots: { customRender: 'workPeriodPerDay' } },
    { title: '操作' , key: 'click' , scopedSlots: { customRender: 'click' }}
  ];
  export default {
    mounted() {
      this.fetch();
    },
    data() {
      return {
        data: [],
        pagination: {},
        loading: false,
        columns,
      }
    },
    methods: {
      handleTableChange(pagination, filters, sorter) {

      },
      toFastDetail(){
        this.$router.push({
          name: 'order_fast_detail',
          /*params: {
            id:id
          }*/
        })
      },
    }
  }

</script>
<style lang="scss" scoped>
  .fast{
    background: #ffffff;
    border-radius: 4px;
    margin: 20px;
    padding: 20px;
  }
</style>
