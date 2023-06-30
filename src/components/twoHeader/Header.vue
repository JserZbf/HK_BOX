<template>
    <div class="header-box flex-vcenter flex-hcenter">
        <div class="header-title">采集盒配置界面</div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "Header",
    data() {
        return {

        }
    },


    methods: {
    },
    created() {

    },
});
</script>

<style scoped>
.header-box {
    height: 130px;
    z-index: 800;
    background: url("@/assets/image/twoBg.png") no-repeat center top / cover;
}

.header-title {
    font-size: 38px;
    color: #67CDFF;
    text-align: center;
    line-height: 110px;
}

.tab-title {
    font-size: 22px;
    font-weight: 600;
    color: #5a93c8;
    line-height: 50px;
    width: 209px;
    text-align: center;
    z-index: 800;
}
</style>