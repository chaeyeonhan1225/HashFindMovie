<!-- eslint-disable -->
<template>
    <div style="padding: 15px;" v-if="me">
        <h1><span class="mark_pen-orange" v-if="me">{{me.nick}}</span>님이 좋아한 영화 목록</h1>
        <v-row v-if="me" class="mt-5">
            <template v-for="m in movies">
                <v-col cols="12" md="4" :key="m.id">
                    <MovieCard :movie="m"/>
                </v-col>
                <!--작업 해야함-->
            </template>
        </v-row>
    </div>
</template>

<script>
/* eslint-disable */
import MovieCard from '../components/MovieCard';
export default {
    components: {
        MovieCard
    },
    data() {
        return {
        }
    },
    created() {
        return this.loadLiked();
    },
    methods: {
        loadLiked() {
            return this.$store.dispatch('movieStore/loadLiked')
                .then((result)=>{
                    // console.log(this.movies);
                    console.log("좋아요 누른 영화 불러오기 성공!");
                })
                .catch((error)=>{
                console.error(error);
                });
        }
    },
    computed: {
        me() {
            return this.$store.state.userStore.me;
        },
        movies() {
            return this.$store.state.movieStore.Movies;
        }
    }
}
</script>