<!-- eslint-disable -->
<template>
  <v-container v-if="me">
      <v-container>
        <v-row>
            <div style="margin-right:20px">
              <v-avatar :color="me ? me.color : 'indigo'" width="100px" height="100px">
                <v-icon dark x-large>mdi-account</v-icon>
              </v-avatar>
            </div>
            <div v-if="me" style="min-width: 500px">
              <h1><span class="mark_pen-yellow" v-if="me!==null">{{ me.nick }}</span>님</h1>
              <h3 style="display:inline;margin-right:5px" v-if="me.info===null">한줄 소개를 작성해주세요!</h3>
              <h3 style="display:inline;margin-right:5px" v-else>{{me.info}}</h3>
              <v-icon style="bottom: 2px" color="gray" @click="onToggle()">{{toggleIcon}}</v-icon>
                <div v-if="toggleOn">
                  <v-form ref="form" v-model="valid" @submit.prevent="onSubmitForm">
                    <v-text-field label="한줄 소개 입력" v-model="myinfo" :rules="inforules" counter="140"></v-text-field>
                    <v-btn type="submit" style="float:right" text>수정</v-btn>
                  </v-form>
                </div>
            </div>
        </v-row>
        <v-container>
          <v-card outlined>
            <div style="padding:15px">
              <span>
                <h2 style="display:inline">좋아요 누른 영화</h2>
                <router-link to="/profile/liked" style="margin-left: 10px">더보기</router-link>
              </span>
                <!--LikedPreview :liked="movies"/-->
              <h2 style="display:inline">나의 한줄 평</h2>
              <span style="margin-left:5px" v-if="me.comments">{{me.comments.length}}</span>
              <span class="ml-2"><v-btn icon @click="loadComments()"><v-icon>mdi-refresh</v-icon></v-btn></span>
              <span style="float:right"><router-link to="/profile/comments">댓글 더보기</router-link></span>
              <CommentsPreview :comments="me.comments"/>
            </div>
        </v-card>
        </v-container>
      </v-container>
  </v-container>
</template>

<script>
/* eslint-disable */
import LikedPreview from '../components/LikedPreview';
import CommentsPreview from '../components/CommentsPreview';
export default {
  components: {
    LikedPreview,
    CommentsPreview,
  },
  created() {
    return Promise.all([
      this.loadComments(),
      // this.loadLikedPreview(),
    ]);
  },
  data() {
    return {
      toggleOn: false,
      toggleIcon: "mdi-pencil-outline",
      valid: false,
      myinfo: null,
      inforules: [
        v => !! v && v.length <= 140 || '140자 이내로 입력해야합니다.'
      ],
    }
  },
  methods: {
    loadComments() {
      this.$store.dispatch('userStore/loadComments',{
        offset: 0,
        limit: 5,
      }).
        then((result) => {
          console.log("댓글 불러오기 성공!");
        }).catch((error)=>{
          console.log("댓글 불러오기 실패!");
        });
    },
    loadLikedPreview() {
      this.$store.dispatch('movieStore/loadLikedPreview')
        .then((result)=>{
        console.log(this.movies);
        console.log("좋아요 누른 영화 불러오기 성공!");
        })
        .catch((error)=>{
          console.error(error);
        });
    },
    onToggle(){
      this.toggleOn = !this.toggleOn;
      if (this.toggleOn){
        this.toggleIcon = "mdi-pencil"
      } else {
        this.toggleIcon = "mdi-pencil-outline"
      }
    },
    onSubmitForm(){
      if(this.$refs.form.validate()){
        console.log(this.myinfo);
        this.$store.dispatch('userStore/changeUserInfo',{
          userInfo: this.myinfo
        })
        .then((result)=>{
          this.redirect();
        })
        .catch((error)=>{
        });
      }
    }
  },
  computed: {
    me() {
      return this.$store.state.userStore.me;
    },
  }
}
</script>