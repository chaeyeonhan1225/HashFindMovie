<!-- eslint-disable -->
<template>
    <div style="padding: 15px;">
        <h1><span class="mark_pen-orange">{{me.nick}}</span>님이 좋아한 영화 목록</h1>
        <div>
            <template v-for="i in arr">
                {{i}}
                <!--작업 해야함-->
            </template>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
export default {
    data() {
        return {
            arr: [0,1,2],
        }
    },
    computed: {
        me() {
            return this.$store.state.userStore.me;
        }
    }
}
</script>