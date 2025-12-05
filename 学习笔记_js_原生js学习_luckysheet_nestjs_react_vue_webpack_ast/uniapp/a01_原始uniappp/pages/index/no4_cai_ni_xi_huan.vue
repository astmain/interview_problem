<template>
<view class="page">
			  <!-- 标题 -->
        <view style="display: flex;flex-direction: row;margin: 20upx 20upx;">
            <img style="height: 40upx; width: 40upx; " src="../../static/image/hot.png"></img>
            <div style="height: 40upx; font-weight: bold; margin-left: 20upx;">猜你喜欢</div>
        </view>
       	<!-- 列表 -->
       	
		<ul>
			
		<li v-for="(item, index) in data_img_arr" :key="index" >
			<view style="display: flex;flex-wrap: wrap; margin: 20upx 0;">
				<image style="width: 250upx;height: 350upx;  border-radius: 15upx;"class="carousel" :src="item.img" mode=""></image>
				<div   style="width: 200upx;display: flex;flex-direction: column;justify-content: space-between; padding: 20upx; ">
					<li style="font-size: 50upx;">名字</li>
					<li style="font-size: 10upx;color:rgb(135, 133, 139)"><pop_star></pop_star></li>

					<li style="font-size: 30upx;color:rgb(135, 133, 139)">类型:{{item.type}}</li>
					<li style="font-size: 30upx;color:rgb(135, 133, 139)">地区:{{item.area}}</li>
					
					<li style="font-size: 30upx;color:rgb(135, 133, 139)">上映时间:  &#10;  {{item.screen}}</li>
				</div>
				<div   style="width: 200upx;display: flex;flex-direction: column; padding: 20upx;">
					<li style="font-size: 30upx; margin: 15upx 0;color:rgb(135, 133, 139);display: flex">点赞 ：<img style="height: 40upx; width: 40upx; " src="../../static/image/star-gray.png"></img></li>
					<li style="font-size: 30upx; margin: 10upx 0;color:rgb(135, 133, 139)" >导演 :{{item.director}}</li>
					<li style="font-size: 30upx; margin: 10upx 0;color:rgb(135, 133, 139)" >演员 :{{item.actor}}</li>
					<li style="font-size: 30upx; margin: 10upx 0;color:rgb(135, 133, 139)" >剧情 :{{item.plot}}</li>
				</div>
			</view>

				      
		</li>
		</ul>
		
		
		
</view>
</template>

<script>
import com from "../../com/com.js";

export default {
  components: {
    pop_star: () => import("../components/pop_star"),
  },
  data() {
    return {
      title: "index",
      data_img_arr: [1, 2, 3, 4, 5],
    };
  },
  onLoad() {},
  created() {
    console.log("111", com.shuju + "api");
    let that = this;
    that.api_img();
  },

  mounted() {},
  methods: {
    api_img() {
      let sql = "  Select  *  from 表图片";
      let that = this;
      console.log("666", sql);
      uni.request({
        url: com.shuju + "api",
        data: { sql: sql, table: "表图片", arr: [], no: 5, shuju: [] },
        method: "POST",
        success: (res) => {
          console.log("999", res);
          that.data_img_arr = res.data.arr;
        },
      });
    },
  },
};
</script>

<style>
@import url("./index.css");
.sss {
  border-radius: 4upx;
  color:rgb(135, 133, 139)
}
</style>