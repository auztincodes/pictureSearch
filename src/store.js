import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    searchedResults: {}
  },
  
  mutations: {
    ADD_PHOTOS(state, payload) {
      
      state.searchedResults={};
      state.searchedResults = JSON.parse(JSON.stringify(payload));
      // state.searchedResults.push(payload);
    }
  },
  actions: {
    addResults(context, newResult) {
      context.commit("ADD_PHOTOS", newResult);
    }
  },
  getters:{
    getResults(state) {
      return state.searchedResults;
    }
  }
})
