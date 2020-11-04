<template>
    <div>
      <v-card class="pt-10 mt-8">
        <v-icon class="plusbtn" @click="showModal()">mdi-plus</v-icon>
        <div class="img-card">
           <v-img v-if="movie.image" :src="movie.image" class="img-content" max-height=80px aspect-ratio></v-img>
           <div v-else class="noimage">no image</div> 
        </div>
        
        <v-card-title><a :href="movie.link" target="_blank">{{movie.title}} ({{movie.pubDate}})</a></v-card-title>
        <v-card-subtitle>{{movie.subtitle}}</v-card-subtitle>
        <v-card-text>
          <div>
            감독
            <template v-for="d in movie.director">
              <v-chip small :key="d" class="ml-1 mt-1" label color="#edebeb" text-color="blue">{{d}}</v-chip>
            </template>
          </div>
          <div class="mt-1">
            출연진
            <template v-for="a in movie.actor">
              <v-chip small :key="a" class="ml-1 mt-1" label color="#edebeb" text-color="blue">{{a}}</v-chip>
            </template>
          </div>
          <div class="mt-1">
              <v-icon small color="orange">mdi-star</v-icon>
              {{movie.userRating}}
          </div>
        </v-card-text>
      </v-card>
      <v-dialog 
        v-model="dialog"
        max-width="500"
      >
        <v-card class="pa-5">
          <h2>이 영화가 맞나요?</h2>
            <v-card flat outlined class="ma-2">
              <v-card-title><a :href="movie.link" target="_blank">{{movie.title}} ({{movie.pubDate}})</a></v-card-title>
              <v-card-subtitle>{{movie.subtitle}}</v-card-subtitle>
              <v-card-text>
                <div>
                  감독
                  <template v-for="d in movie.director">
                    <v-chip small :key="d" class="ml-1 mt-1" label color="#edebeb" text-color="blue">{{d}}</v-chip>
                  </template>
                </div>
                <div class="mt-1">
                출연진
                  <template v-for="a in movie.actor">
                    <v-chip small :key="a" class="ml-1 mt-1" label color="#edebeb" text-color="blue">{{a}}</v-chip>
                  </template>
                </div>
              </v-card-text>
            </v-card>
            <v-alert
              v-model="registerSuccessed"
              type="success"
              dense
              text
              icon="mdi-check"
              dismissible
            >
            성공적으로 등록되었습니다!
            </v-alert>
            <v-alert
              v-model="registerFailed"
              type="error"
              dense
              text
              icon="mdi-alert-circle"
              dismissible
            >
            이미 등록된 영화입니다!
            </v-alert>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green darken-1" text @click="closeModal()">취소</v-btn>
                <v-btn color="green darken-1" text @click="registerMovie()">등록</v-btn>
            </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
</template>

<style scoped>
    a {
        text-decoration: none;
        color: black;
        font-weight: bold;
    }
    a:hover {
        color: #00bfff;
    }
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
    .plusbtn {
        position: absolute;
        color: grey;
        top: 8px;
        right: 8px;
    }
    .plusbtn:hover {
        color: #00bfff;
    }
</style>

<script>

export default {
    props: {
        movie: {
            type: Object,
        }
    },
    data() {
        return {
            dialog: false,
            registerSuccessed: false,
            registerFailed: false
        }
    },
    methods: {
        showModal() {
            this.dialog = true;
        },
        closeModal() {
            this.dialog = false;
        },
        registerMovie() {
            // 영화 등록
            this.$store.dispatch('movieStore/registerMovie', this.movie)
              .then((result) => {
                this.registerSuccessed = true;
                console.log(result);

              })
              .catch((error) => {
                this.registerFailed = true;
                console.error(error);
              });
        }
        
    }
}
</script>