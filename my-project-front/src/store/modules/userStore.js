/* eslint-disable */
import axios from 'axios';

const userStore = {
    namespaced: true,
    state: {
        me: null,
    },
    mutations: {
        setMe(state, payload) {
            state.me = payload;
            // localStorage.me = payload;
            console.log('setMe 성공');
            console.log(state.me);
        },
        changeUserInfo(state,payload){
            state.me.info = payload.info;
        }
    },
    actions: {
        loadUser({ state,commit },){
            axios.get('http://localhost:3001/auth/user',{
                withCredentials: true,
            }).then((result)=>{
                if(result.data.id){
                    commit('setMe',result.data);
                } else {
                    console.log('로그인 하지 않은 상태!');
                }
            }).catch((error)=>{
                console.error(error);
            });
        },
        signUp({
            commit,
            state
        }, payload) {
            //console.log(this);
            axios.post('http://localhost:3001/auth/signup', payload,{
                withCredentials: true,
            })
                .then((result) => {
                    commit('setMe', result.data)
                }).catch((error)=>{
                    console.error(error);
                });

        },
        signIn({
            commit,
            state
        },payload){
            console.log("signIn 실행!!");
            axios.post('http://localhost:3001/auth/login',payload,{
                withCredentials: true,
            })
            .then((result)=>{
                commit('setMe',result.data);
            }).catch((error)=>{
                console.error(error);
            });
        },
        changeUserInfo({commit},payload){
            axios.patch('http://localhost:3001/auth/userinfo',payload,{
                withCredentials:true,
            })
                .then((result)=>{
                    console.log(result.data);
                    commit('changeUserInfo',result.data);
                })
                .catch((error)=>{
                    console.error(error);
                })
        }
    }
}

export default userStore;