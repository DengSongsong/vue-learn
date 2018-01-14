<template>
  <div id="app">
    <el-badge class="item" :value="1" :max="9">
      <el-button nativeType="submit">数量</el-button>
    </el-badge>
    <el-badge class="item" is-dot :value="10" :max="9">
      <el-button nativeType="submit">数量</el-button>
    </el-badge>
    <el-badge class="item" :value="10" :max="9">
      <el-button nativeType="submit">数量</el-button>
    </el-badge>
    <el-button size="medium" nativeType="submit" @click="addComment">评论</el-button>
    <el-button size="mini" @click="doSave()" :disabled="saveDisabled" type="primary">发布</el-button>
    <el-button size="mini" type="text">前往</el-button>
    <!--<el-button size="medium" type="primary" loding icon="el-icon-edit">点我</el-button>-->
    <router-view/>
  </div>
</template>

<script>
import ElButton from '@/components/elButton'
import ElBadge from '@/components/elBadge'
export default {
  name: 'app',
  components: {
    ElButton,
    ElBadge
  },
  data(){
    return{
      saveDisabled: true
    }
  },
  mounted(){
    setTimeout(() => {
      this.saveDisabled = false;
    }, 5000);
  },
  methods: {
    addComment(){
      console.log('添加评论');
    },
    doSave(){
      console.log('发布');
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
