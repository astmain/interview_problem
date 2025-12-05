<template>
    <view class="page">
333
<!-- 标题 -->
        <view style="display: flex;flex-direction: row;margin: 20upx 20upx;">
            <img style="height: 40upx; width: 40upx; " src="../../static/image/hot.png"></img>
            <div style="height: 40upx; font-weight: bold; margin-left: 20upx;">影视预告</div>
        </view>
		<!-- 影视预告列表 -->
            <ul   style="display:flex;flex-direction:row; flex-wrap: wrap;">
                <li style="display:flex;flex-direction:column;align-items:center  ; padding: 0 10upx 10upx 10upx; "
                    v-for="(item, index) in data_api_video" :key="index">
        
                    <!-- <video style="width: 350upx; height: 220upx;" :src="item.path_video" poster="http://127.0.0.1:8000/static/video/1.jpeg" controls=""></video> -->
                    <video style="width: 350upx; height: 220upx;" :src="item.path_video"  ></video>
				
                    <p style="font-size: 40upx;">{{item.name}}</p>
                    <p><pop_star :pop_star="item.star"></pop_star></p>
                </li>

            </ul>
		
       
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
				data_api_video:[1, 2, 3, 4, 5],
        
            };
        },
        onLoad() {},

        mounted() {},
		created() {
				this.api_video();
		},
        methods: {
            api_video() {
                let that = this;
                let sql = '  Select  *  from 表视频';
                console.log('666', sql);
                uni.request({
                    url: com.shuju + 'api',
                    data: { sql: sql, table: '表视频', arr: [], no: 5, shuju: [] },
                    method: 'POST',
                    success: res => {
                        console.log('999', res);
                        that.data_api_video = res.data.arr;
                    }
                });
            }

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