<template>
    <v-card class="pt-10 mt-8">
        <div class="img-card">
           <v-img v-if="movie.image" :src="movie.image" class="img-content" max-height=80px aspect-ratio></v-img>
           <div v-else class="noimage">no image</div> 
        </div>
        <v-card-title>{{movie.title}}</v-card-title>
        <v-card-subtitle>{{movie.subtitle}}</v-card-subtitle>
        <v-card-text>{{movie.director}}{{movie.actor}}</v-card-text>
    </v-card>
</template>

<style scoped>
    .img-card {
        position: absolute;
        top: -30px;
        left: 20px;
    }
    .img-content {
        border-radius: 10px;
        box-shadow: 0px 3px 5px rgba(0,0,0,0.3);
    }
    .noimage {
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 10px;
        width: 120px;
        height: 80px;
        background-color: white;
        color: #c9c9c9;
        box-shadow: 0px 3px 5px rgba(0,0,0,0.3);
    }
</style>

<script>

export default {
    props: {
        movie: {
            type: Object,
        }
    }
}
</script>