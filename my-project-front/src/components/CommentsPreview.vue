<!-- eslint-disable -->
<template>
    <div>
        <template v-for="c in this.comments">
            <UserComment :comment="c" :key="c.id"/>
        </template>
    </div>
</template>

<script>
/* eslint-disable */
import UserComment from '../components/UserComment';
export default {
    props: {
        comments: {
            type: Array,
        }
    },
    components: {
        UserComment,
    },
    
}
</script>