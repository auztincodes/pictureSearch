<template>
  <div class="p-3">
    <nav class="navbar navbar-expand-lg navbar-light">
          <!-- <div class="hedder-up">
            <h1><a class="navbar-brand" href="index.html">Pix-Search</a></h1>
            
          </div> -->
         <ul>
           <li>
                <router-link class="app-menu__item" to="/">
                    <i class="fa fa-home white"></i><span class="app-menu__label">Home</span>
                </router-link>
            </li>
         </ul>
      </nav>
    <section  v-if="!openPhoto">
      <div class="gallery">
      <div  v-for="(result, i) in allPhotos.photos" :key="i" class="p-1">
      <a  @click="viewPhoto(result)">
        <img :src="result.src.medium" alt="">
      </a>
    </div>
    
    </div>
    <div class="text-center pagi">
      <ul class="pagination mt-3">
        <li class="page-item mr-5" ><a class="page-link" v-if="allPhotos.page!=1"  href="" @click.prevent="callPrevPage">Previous</a></li>
        
        <li class="page-item"><a class="page-link" href="" @click.prevent="callNextPage">Next</a></li>
      </ul>
    </div>
    </section>
    
    
    <div class=" container" v-if="openPhoto">
      <h3 class="tile-title animated zoomIn">
        Photographer : {{photo.photographer}}
        <a :href="photo.photographer_url" target="_blank" class="btn btn-outline-info   pull-right  add-button">
            Follow 
        </a>
        <button aria-hidden="true" @click="openPhoto = false" data-dismiss="modal" class="close" type="button">×</button>
      </h3>
      <div class="singlePhoto text-center mt-4">
        <img :src="photo.src.medium" alt="" class="img-thumbnail mb-2" width="600px" height="600px">
        
        <a @click.prevent="downloadPhoto(photo.src.medium)" class="btn btn-outline-info   pull-right  add-button">
            download Image 
        </a>
      </div>
    </div>
  </div>
</template>

<script>
 import * as $ from 'jquery';
 import axios from "axios";
export default {
  name: "results",
  data(){
    return{
      allPhotos:[],
      photo: {},
      openPhoto: false,
    }
  },
  // computed: {
  //   getResults() {
  //     return this.$store.getters.getResults.photos;
  //   }
  // },
  methods:{
    getResults() {
      this.openPhoto = false;
      console.log('reer',this.$store.getters.getResults);
      this.allPhotos = this.$store.getters.getResults
      
    },
    callNextPage() {
      const url = this.allPhotos.next_page
      axios.get(url, {
          headers: {
            Authorization: "Bearer 563492ad6f91700001000001888cda940a26496582510702a8816670"
          }
        })
      .then((response) => {
                  this.allPhotos= [];
                  this.allPhotos = response.data;
                  console.log('next', this.allPhotos);
                  
                });
    },
    callPrevPage() {
      const url = this.allPhotos.prev_page
      axios.get(url, {
          headers: {
            Authorization: "Bearer 563492ad6f91700001000001888cda940a26496582510702a8816670"
          }
        })
      .then((response) => {
                  this.allPhotos= [];
                  this.allPhotos = response.data;
                  console.log('prev', this.allPhotos);
                  
                });
    },
    viewPhoto(data){
    console.log('view request :: ', data)
    this.photo = data;
    this.openPhoto = true;
    },
   
    downloadPhoto(photo){
     axios.get(photo, { responseType: 'blob' })
     .then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'file.jpg'); //or any other extension
      document.body.appendChild(link);
      link.click()
      
    });
  },
  },
  created(){
    this.getResults()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.pagi{
  margin-left: 40%
}
.gallery a{
  cursor: pointer;
}
.singlePhoto{
  display:inline-block;    
   margin-right: auto;    
   margin-left: auto; 
}
.singlePhoto img{
  width: 100%;
  height: auto;
}
.gallery  {
   line-height: 0;       
    -webkit-column-count: 4;    
    -webkit-column-gap: 0px;    
    -moz-column-count: 4;
    -moz-column-gap: 0px;
     column-count: 4;    
     column-gap: 0px;    
}
.gallery img{
  width: 100% !important;    
   height: auto !important;
}
.gallery{
  display:inline-block;    
   margin-right: auto;    
   margin-left: auto; 
}
@media (max-width: 1000px) {
   .gallery {
   -moz-column-count:    3;
   -webkit-column-count: 3;
   column-count:         3;
   }
  }  
@media (max-width: 800px) {
   .gallery {
   -moz-column-count:    2;
   -webkit-column-count: 2;
   column-count:         2;
   }
  }  
@media (max-width: 400px) {
   .gallery {
   -moz-column-count:    1;
   -webkit-column-count: 1;
    column-count:        1;
   }
  }
</style>
