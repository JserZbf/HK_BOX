<template>
    <div class="main" id="main">
		<div style="color:#fff;display: none;">
			v1.0.5
		</div>
        <router-view></router-view>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
    name: "MainView",
    data() {
        return {};
    },
    created() {

    },
    mounted() {
        function rescale() {
            const DIV = document.getElementById("main") as HTMLDivElement;
            DIV.style.transform = `scale(${Math.min(
                window.innerWidth / 1920,
                window.innerHeight / 1080
            )})`;
        }
        rescale();
        window.addEventListener(`resize`, rescale);
    },
    methods: {

    },
});
</script>

<style scoped>
.main {
    min-width: 1920px;
    min-height: 1080px;
    background: #25304e;
    border-radius: 0px 0px 0px 0px;
    opacity: 1;
    /* background: url("@/assets/main-bg.png") no-repeat center top / cover;
  background-color: #030542; */
  position: relative;
    transform-origin: top center;
}
</style>
