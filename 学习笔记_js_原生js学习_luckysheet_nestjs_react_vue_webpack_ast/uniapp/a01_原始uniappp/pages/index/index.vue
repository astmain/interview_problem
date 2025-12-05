<template>
    <view class="page">
        <button type="default" @click="aaa()">11212</button>111111111111
        <!-- 轮播图 -->


	<no1></no1>
	<no2></no2>
	<no3_shipin></no3_shipin>
		<no4_cai_ni_xi_huan></no4_cai_ni_xi_huan>



		
		
    </view>
</template>

<script>
    import com from '../../com/com.js';
import no1 from './no1_lunbo';
import no2 from './no2_haibao';
import no3_shipin from './no3_shipin';
import no4_cai_ni_xi_huan from './no4_cai_ni_xi_huan';
    export default {
        components: {
            pop_star: () => import('../components/pop_star'),
			    no1,
						    no2,
							no3_shipin,
							no4_cai_ni_xi_huan
        },
        data() {
            return {
                title: 'index',
                data_img_arr: [1, 2, 3, 4, 5],
                data_api_video: [1, 2, 3, 4, 5]
            };
        },
        onLoad() {
            console.log('111', com.shuju + 'api');
        },

        mounted() {
            // this.按钮();
            let that = this;
            that.api_img();
            that.api_video();
        },
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