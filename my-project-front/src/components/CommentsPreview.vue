<!-- eslint-disable -->
<template>
    <div>
        <template v-for="c in me.comments">
            <Comment :comment="c" :key="c.id"/>
        </template>
    </div>
</template>

<script>
/* eslint-disable */
import Comment from '../components/Comment';
export default {
    components: {
        Comment,
    },
    created() {
        return this.loadComments();
    },
    data() {
        return {
        }
    },
    methods: {
        loadComments() {
            this.$store.dispatch('userStore/loadComments').
                then((result) => {
                console.log("댓글 불러오기 성공!");
                }).catch((error)=>{
                console.log("댓글 불러오기 실패!");
                });
        },
    },
    computed: {
        me() {
            return this.$store.state.userStore.me;
        }
    }
}
</script>