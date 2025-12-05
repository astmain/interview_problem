<template>
    <view class="page">
		222
		<!-- 标题 -->
        <view style="display: flex;flex-direction: row;margin: 20upx 20upx;">
            <img style="height: 40upx; width: 40upx; " src="../../static/image/hot.png"></img>
            <div style="height: 40upx; font-weight: bold; margin-left: 20upx;">热门超英</div>
        </view>
		
		<!-- 滑块海报 -->
		<scroll-view class="x_scroll" scroll-x="true">
		
		     <ul style="display: flex;flex-direction: row; ">
				 <li v-for="(item,index) in data_img_arr" style="margin: 20upx 0;">
					 <image style="width: 200upx;height: 300upx;" :src="item.img" mode=""></image>
					 <p></p>
					 <pop_star :pop_star="item.star"></pop_star>
				 </li>
				 


		
		     </ul>
		
		
		 </scroll-view>
		
		
       
    </view>
</template>

<script>

    import com from '../../com/com.js';

    export default {

        components: {
            pop_star: () => import('../components/pop_star'),
			
        },
        data() {
            return {
                title: 'index',
                data_img_arr: [1, 2, 3, 4, 5],
        
            };
        },
        onLoad() {},

        mounted() {},
		created() {this.api_img()},
        methods: {
            api_img() {
				let that = this;
                let sql = '  Select  *  from 表图片';
                console.log('666', sql);
                uni.request({
                    url: com.shuju + 'api',
                    data: { sql: sql, table: '表图片', arr: [], no: 5, shuju: [] },
                    method: 'POST',
                    success: res => {
                        console.log('999', res);
                        that.data_img_arr = res.data.arr;
                    }
                });
            },

        }
    };
</script>

<style>
    @import url('./index.css');

    .carousel {
        width: 100%;
        height: 440upx;
    }

    .x_scroll {
        width: 100%;
        white-space: nowrap;
        /* 	//空白 */
        /* 包装 */
    }
</style>