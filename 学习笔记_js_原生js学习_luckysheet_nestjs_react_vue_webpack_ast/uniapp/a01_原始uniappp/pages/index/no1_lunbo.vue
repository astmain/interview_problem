<template>
  
          <view class="page">
			  	111
        <swiper class="carousel" :indicator-dots="true" :autoplay="true" :interval="1000">
            <swiper-item class="" v-for="(item, index) in data_img_arr" :key="index">
                <image class="carousel" :src="item.img" mode=""></image>
            </swiper-item>
	
        </swiper>
       	
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
		created() {
				console.log('111', com.shuju + 'api');
				let that = this;
				that.api_img();
		},

        mounted() {},
        methods: {
            api_img() {
                let sql = '  Select  *  from 表图片';
                let that = this;
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