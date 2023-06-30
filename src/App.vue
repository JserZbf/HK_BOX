<template>
    <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "App",
});
</script>

<style>
@import url("./style/lib.css");
.el-select {
	display:flex;
	align-items:center;
	justify-content: center;
}
.el-input__wrapper {
    background: #152b50;
    box-shadow: none;
}

.el-input.is-disabled .el-input__wrapper {
    background-color: #152b50;
    box-shadow: 0 0 0 1px #152b50 inset;
}
.el-alert--success.is-light {
	position: fixed;
}
.thList i {
    margin-right: 10px;
}

.thList input {
    width: 90%;
    margin: 0 auto;
    background-color: #152b50 !important;
    border-radius: 6px 6px 6px 6px;
    opacity: 1;
    border: 1px solid #152b50 !important;
    color: #fff;
    text-align: center;
}

.slText input {
    background-color: #152b50 !important;
    border-radius: 6px 6px 6px 6px;
    opacity: 1;
    border: 1px solid #152b50 !important;
    color: #fff;
}

#app {
    display: flex;
    justify-content: center;
    height: 0;
    font-family: PingFang SC, Microsoft YaHei;
}
</style>
