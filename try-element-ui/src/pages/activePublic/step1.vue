<template>
  <div class="step1">
    <el-form class="demo-ruleForm" ref="ruleForm" label-position="top" :model="ruleForm">
      <el-form-item label="活动名称" prop="name">
        <el-input v-model="ruleForm.name" size="large"></el-input>
      </el-form-item>
      <el-form-item label="" prop="fenLei">
        <el-row style="height:35px;" type="flex" align="middle">
          <el-col :span="3" style="width:90px;">
            <div class="el-form-item_label">活动分类</div>
          </el-col>
          <el-col :span="2">
              <el-button type="text" @click.native="dialogFormFenLeiVisable=true">设置</el-button>
          </el-col>
        </el-row>

        <el-radio-group v-model="ruleForm.fenLei">
            <el-radio v-for="item in ruleForm.fenLies" :key="item.id" :label="item.name"></el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <el-dialog title="设置活动分类" :visible.sync="dialogFormFenLeiVisable">
        <el-form>
            <el-form-item>
                <el-tag v-for="fenLei in ruleForm.fenLies" type="primary" :key="fenLei.id" :closable="true">
                    {{ fenLei.name }}
                </el-tag>
            </el-form-item>
        </el-form>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data(){
    return{
      dialogFormFenLeiVisable: false,  
      ruleForm: {
        name: '',
        fenLies: [
          {name: '未发布'},
          {name: '测试内容'},
          {name: '精彩活动'},
        ],
        fenLei: '测试内容',
        tags: []
      }
    }
  }
}
</script>
<style>

</style>
