<template>
  <form class="input-area">
      <label>用户名:</label>
      <input type="text" class="user" 
        	placeholder="请输入用户名" ref="input" />
      <label>评论:</label>
			<textarea class="textarea" placeholder="请输入评论内容" ref="content"></textarea>
			<button type="button" @click="Submit">提交</button>
      <!--<button @click="Submit">提交</button>-->
  </form>
</template>

<script>
export default {
	methods:{
		Submit(){
			let bit = 6;
			let account = (Math.random().toFixed(6)*Math.pow(10, bit))|0;
			let time = new Date().toLocaleString();

			let user = this.$refs.input.value;
			let content = this.$refs.content.value;
			//子组件向父组件提交事件 触发自定义事件 第一个参数是父组件中的函数名 @addComment
			this.$emit('addComment',
					account+' '+time+' '+user+':'+content);
			this.$refs.content.value = '';
      // console.log(22);
		}
	}
}
</script>

<style>
	.input-area {
		color: #000;
		font-size: 15px;
		margin: 10px auto;
		width: 300px;
	}
	.input-area .user {
		border: 1px solid blue;
		width: 100px;
		display: block;
		margin-bottom: 10px;
	}
	.input-area .textarea {
		border: 1px solid blue;
		width: 100px;
		height: 100px;
		display: block;
		margin-bottom: 10px;
	}
</style>
