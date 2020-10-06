<!-- eslint-disable -->
<template>
    <div>
        <template v-for="c in this.comments">
            <Comment :comment="c" :key="c.id"/>
        </template>
    </div>
</template>

<script>
/* eslint-disable */
import Comment from '../components/Comment';
export default {
    props: {
        comments: {
            type: Array,
        }
    },
    components: {
        Comment,
    },
    computed: {
        me() {
            return this.$store.state.userStore.me;
        }
    }
}
</script>