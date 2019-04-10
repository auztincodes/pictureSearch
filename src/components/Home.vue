<template>
  <div class="hello">
    <div class="bg">
      <nav class="navbar navbar-expand-lg navbar-light">
          <div class="hedder-up">
            <h1><a class="navbar-brand" href="index.html">Pix-Search</a></h1>
          </div>
      </nav>
      <div class="content text-center">
        <h4>Search & download free photos from pexels shared by talented creators.</h4>
        <form class="example" @submit.prevent="fetchResult()">
          <input type="text" placeholder="Search.." name="search" v-model="search">
          <button type="submit" title="search"><i class="fa fa-search" ></i></button>
        </form>
      </div>
      
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { store } from "../store.js";

export default {
   name: 'home',
  data(){
    return{
      loading: true,
      searchResult:[],
      search:''
    }
  },
  methods:{
      fetchResult(){
        axios.get(`https://api.pexels.com/v1/search?query=${this.search}&per_page=20&page=1`, {
          headers: {
            Authorization: "Bearer 563492ad6f91700001000001888cda940a26496582510702a8816670"
          }
        })
        .then((response) => {
                  this.searchResult = response.data;
                  console.log('result', this.searchResult);
                  this.$store.dispatch("addResults",this.searchResult);
                  this.$router.push('/results')
                });
    }
    // getResult(){
    //   let search = this.search;
    //   this.$store.dispatch('search', {search})
    //   .then(() => this.$router.push('/results'))
    //    .catch(err => console.log(err))
    // }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.content {
  margin: 80px auto;
  width: 100%;
  color: white;
}

/* Increase the font size of the heading */
.content h4 {
  font-size: 30px;
}
 * {
  box-sizing: border-box;
}
form.example{
  margin: 20px auto;
  text-align: center;
  width: 100%
}
form.example input[type=text] {
  padding: 10px;
  font-size: 17px;
  border: 1px solid #f1f1f1;
  /* float: left; */
  width: 50%;
  background: #f1f1f1;
}

form.example button {
  /* float: left; */
  width: 5;
  padding: 10px;
  background: #f1f1f1;
  color: grey;
  font-size: 17px;
  border: 1px solid #f1f1f1;
  border-left: none;
  cursor: pointer;
}

/* form.example button:hover {
  background: #0b7dda;
} */

form.example::after {
  content: "";
  clear: both;
  display: table;
}
</style>
