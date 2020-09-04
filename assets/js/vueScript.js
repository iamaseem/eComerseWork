const SearchPage = Vue.component("SearchPage",{
    template:`
    <div>
        <div v-if="loading" style="width:100vw;height:100vh;" class="text-center">
            <h2 style="margin-top:10vh">Loading...</h2>
        </div>
        
        <div v-else class="d-flex">
            <div style="height:100vh; flex:1" class="bg-white m-4 p-3">
                <h4>Filter</h4>
            </div>
            <div class="d-flex" style="flex-wrap: wrap; flex:9">
                <div class="px-2" style="width: 20%;min-width:250px;" v-for="i in searchResults">
                    <div class="card text-center" >
                        <img class="card-img-top" src="https://images.unsplash.com/photo-1517303650219-83c8b1788c4c?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=bd4c162d27ea317ff8c67255e955e3c8&auto=format&fit=crop&w=2691&q=80" rel="nofollow" alt="Card image cap">
                        <div class="card-body">
                            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <div class="d-flex">
                                    <button class="btn btn-primary btn-sm">Buy now</button>
                                    <button
                                        class="btn btn btn-sm"
                                        @click="bargainClicked(i)"
                                        data-toggle="modal" data-target="#exampleModal"
                                    >Bargain
                                    </button>
                                </div>
                        </div>
                    </div>
                </div>

                <!-- Model  -->
                <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">
                                {{this.selectedSearchResult.name}}
                            </h5>
                            <button @click="selectedSearchResult={}" type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            ...
                        </div>
                        <div class="modal-footer">
                            <button @click="selectedSearchResult={}" type="button" class="btn btn-secondary" data-dismiss="modal">
                                Close
                            </button>
                            <button type="button" class="btn btn-primary">Bargain</button>
                        </div>
                        </div>
                    </div>
                </div>
                <!-- /Model -->
            </div>
        </div>
    </div>
    `,
    data:function(){
        return{
            selectedSearchResult:{},
            loading:true,
            searchResults:[
                {
                    name:"Unda",
                    location:"Kannur",
                    inStock:true,
                    rate:'2000'
                },
                {
                    name:"Bonda",
                    location:"Koykod",
                    inStock:false,
                    rate:'4000'
                },
                {
                    name:"Pathiri",
                    location:"Atholi",
                    inStock:true,
                    rate:'3000'
                },
                {
                    name:"Unda",
                    location:"Kannur",
                    inStock:true,
                    rate:'2000'
                },
                {
                    name:"Bonda",
                    location:"Koykod",
                    inStock:false,
                    rate:'4000'
                },
                {
                    name:"Pathiri",
                    location:"Atholi",
                    inStock:true,
                    rate:'3000'
                },
                {
                    name:"Unda",
                    location:"Kannur",
                    inStock:true,
                    rate:'2000'
                },
                {
                    name:"Bonda",
                    location:"Koykod",
                    inStock:false,
                    rate:'4000'
                },
                {
                    name:"Pathiri",
                    location:"Atholi",
                    inStock:true,
                    rate:'3000'
                }
            ]
        }
    },
    methods:{
        bargainClicked(i){
            this.selectedSearchResult=i
        }
    },
    created(){
        console.log(this.$route.query.query)
        setTimeout(()=>{
            this.loading=false
        },2000)
        //search for the query string store in searchResults.
    }
})

const MainPage =Vue.component("mainPage",{
    template:`
    <div>
          <div class="container-fluid">
            <div class="row" style="justify-content:space-around;height: 200px;">
                <div id="carouselExampleIndicators" class="carousel slide my-4 w-100" data-ride="carousel">
                        <!-- <ol class="carousel-indicators">
                        <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                        </ol> -->
                        <div class="carousel-inner  text-center">
                        <div class="carousel-item active w-100">
                            <img class=" w-25 mx-4 " style="height: 200px; max-width: 25%;" src="https://picsum.photos/200/100" alt="Third slide">
                            <img class=" w-25 mx-4 " style="height: 200px; max-width: 25%;"  src="https://picsum.photos/200/100" alt="Third slide">
                            <img class=" w-25 mx-4 " style="height: 200px; max-width: 25%;"  src="https://picsum.photos/200/100" alt="Third slide">
                        </div>
                        <div class="carousel-item text-center">
                            <img class=" w-25 mx-4 " style="height: 200px; max-width: 25%;" src="https://picsum.photos/200/100" alt="Third slide">
                            <img class=" w-25 mx-4 " style="height: 200px; max-width: 25%;"  src="https://picsum.photos/200/100" alt="Third slide">
                            <img class=" w-25 mx-4 " style="height: 200px; max-width: 25%;"  src="https://picsum.photos/200/100" alt="Third slide">
                        </div>
                        <div class="carousel-item text-center">
                            <img class=" w-25 mx-4 " style="height: 200px; max-width: 25%;" src="https://picsum.photos/200/100" alt="Third slide">
                            <img class=" w-25 mx-4 " style="height: 200px; max-width: 25%;"  src="https://picsum.photos/200/100" alt="Third slide">
                            <img class=" w-25 mx-4 " style="height: 200px; max-width: 25%;"  src="https://picsum.photos/200/100" alt="Third slide">
                        </div>
                        </div>
                        <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"><i class="fa fa-angle-left text-primary"></i></span>
                        <span class="sr-only">Previous</span>
                        </a>
                        <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"><i class="fa fa-angle-right text-primary"></i></span>
                        <span class="sr-only">Next</span>
                        </a>
                </div>
            </div>
          </div>
          </div>
    `
})
const routes = [
    { path: '/search', component: SearchPage },
    { path: '/', component: MainPage }
]

const router = new VueRouter({
    routes // short for `routes: routes`
})

var app = new Vue({
    el: '#app',
    router:router,
    data: function() {
        return{
            filterSearchTerm:null,
            searchTerm:null,
            catagories:[
                {
                    name:"fridge"
                },
                {
                    name:"washing machine"
                },
                {
                    name:"mixi"
                },
                {
                    name:"fan"
                }
            ]
        } 
    },
    computed:{
        FilteredCatagories(){
            if(!this.filterSearchTerm){
                return this.catagories
            }
            return this.catagories.filter((catagory)=>{
                return(
                    catagory.name.indexOf(this.filterSearchTerm)>-1
                )
            })
        }
    },
    methods:{
        search(){
            this.$router.push({path:"/search?query="+this.searchTerm})
        },
        openNav() {
            document.getElementById("mySidebar").style.width = "350px";
          },
          /* Set the width of the sidebar to 0 and the left margin of the page content to 0 */
          closeNav() {
            document.getElementById("mySidebar").style.width = "0";
          } 
    }
    
  })



