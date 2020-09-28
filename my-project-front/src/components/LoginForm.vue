<!-- eslint-disable -->
<template>
  <v-container>
    <v-card
      flat
      hover="false"
      outlined
      ripple="false"
    >
    <v-system-bar 
      color="indigo darken-2"
      dark
      hover="false"
      height="30px"
    >
      <v-icon>mdi-login</v-icon>
      <span style="color:white; fontSize: 1.0rem; margin-left: 8px">LOGIN</span>
      <v-spacer></v-spacer>
      <v-icon>mdi-minus</v-icon>
      <v-icon>mdi-checkbox-blank-outline</v-icon>
      <v-icon>mdi-close</v-icon>
    </v-system-bar>
      <v-container v-if="!me">    
        <v-container>
          <v-form ref="form" v-model="valid" @submit.prevent="onSubmitForm">        
            <v-text-field
              v-model="email"
              label="이메일"
              type="eamil"
              :rules="emailRules"
              outlined
              color="indigo lighten-1"
              required
            />
            <v-text-field
              v-model="password"
              label="비밀번호"
              type="password"
              :rules="passwordRules"
              outlined
              color="indigo lighten-1"
              required
            />
            <v-row
            align="end"
            justify="end"
            >
              <v-btn 
                color="indigo lighten-1" 
                type="submit" 
                text
                x-large
              >
              LOGIN
              </v-btn>
            </v-row>  
          </v-form>
          </v-container>
        </v-container>
      <v-containter v-else>
        <v-row>
          <v-col cols="12" md="6">
            <div style="padding: 12px; display: inline-block">
          <v-avatar color="indigo ligthen-2" size="150">
            <span class="white--text headline">{{me.nickname}}</span>
          </v-avatar>
        </div>
          </v-col>
          <v-col cols="12" md="6">
            <span><span class="mark_pen">{{me.nickname}}</span>님 안녕하세요!</span>
          </v-col>
        </v-row>
        
        <v-divider></v-divider>
        
      </v-containter>
      <v-btn text block flat router :to="{ name: 'Home' }">Home</v-btn>
      <v-divider></v-divider>
      <v-btn  text block router :to="{ name: 'Profile'}">Profile</v-btn>
      <v-divider></v-divider>
      <v-btn  text block router :to="{ name: 'Profile'}">Setting</v-btn>
      <v-divider></v-divider>
    </v-card>
  </v-container>
</template>
<script>
/* eslint-disable */
export default{
  data() {
    return {
      valid: false,
      email: null,
      password: null,
      emailRules: [
        v => !!v || '이메일은 필수입니다.',
        v => /.+@.+/.test(v) || '이메일이 유효하지 않습니다.'
      ],
      passwordRules: [
        v => !!v || '비밀번호는 필수입니다.',
      ],
    }
  },
  computed: {
    me() {
      return this.$store.state.me;
    }
  },
  methods: {
    onSubmitForm(){
      if(this.$refs.form.validate()){
        this.$store.dispatch('login',{
          email: this.email,
          password: this.password,
          nickname: '채연'
        });
      }
    }
  }
}

</script>