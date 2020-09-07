import db from "./firebaseinit.js";
const SearchPage = Vue.component("SearchPage", {
  template: `
    <div>
        <div v-if="loading" style="width:100vw;height:100vh;" class="text-center">
            <h2 style="margin-top:10vh">Loading...</h2>
        </div>
        
        <div v-else class="d-flex">
            <div style=" flex:1" class="bg-white m-4 p-4">
                <h5>
                  Filter
                  <span class="material-icons" style="font-size:13px;">
                    filter_list
                  </span>
                </h5>
                <div class="form-group">
                    <label for="selectCatagory">Category</label>
                    <select class="form-control selectpicker" data-style="btn btn-link" id="selectCatagory">
                      <option>All</option>
                      <option>Electronics</option>
                      <option>Electricals</option>
                      <option>Other</option>
                    </select>
                    <br/>
                    <label for="priceRange">
                      Price Range
                    </label>
                    <div class="form-check form-check-radio" id="priceRange">
                        <label class="form-check-label">
                            <input class="form-check-input" type="radio" v-model="filterMaxPrice" name="exampleRadios" value="5000" >
                            Below 5000
                            <span class="circle">
                                <span class="check"></span>
                            </span>
                        </label>
                        <label class="form-check-label">
                            <input class="form-check-input" v-model="filterMaxPrice" type="radio" name="exampleRadios" value="1000" >
                            Below 1000
                            <span class="circle">
                                <span class="check"></span>
                            </span>
                        </label>
                        <label class="form-check-label">
                            <input class="form-check-input" type="radio" v-model="filterMaxPrice" name="exampleRadios" value="" >
                            Any
                            <span class="circle">
                                <span class="check"></span>
                            </span>
                        </label>
                    </div>
                    <br/>
                    <label for="selectCatagory">Company</label>
                    <div class="form-check">
                        <label class="form-check-label">
                            <input class="form-check-input" type="checkbox" value="">
                              Samsung
                            <span class="form-check-sign">
                                <span class="check"></span>
                            </span>
                        </label>
                        <br/>
                        <label class="form-check-label">
                            <input class="form-check-input" type="checkbox" value="">
                              Bajaj
                            <span class="form-check-sign">
                                <span class="check"></span>
                            </span>
                        </label>
                    </div>
                </div>

            </div>
            <div class="d-flex" style="flex-wrap: wrap; flex:9">
                <div class="px-2" style="width: 20%;min-width:250px;" v-for="i in searchResultsAfterFilter">
                    <div class="card" >
                        <img class="card-img-top" src="https://images.unsplash.com/photo-1517303650219-83c8b1788c4c?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=bd4c162d27ea317ff8c67255e955e3c8&auto=format&fit=crop&w=2691&q=80" rel="nofollow" alt="Card image cap">
                        <div class="card-body px-4 pt-1 pb-3">
                            <h5 class="card-title mb-0 pb-0">{{i.name}}</h5>
                            <small>{{i.company}}</small>
                            <div class="d-flex pt-2" style="justify-content:space-between">
                                <span class="badge badge-success py-1 px-2">
                                  <span class="material-icons" style="font-size:13px">
                                    attach_money
                                  </span>
                                  {{i.price}}
                                </span>
                                
                                <small  v-if="i.quantity">
                                  <span class="text-success">
                                    in stock
                                  </span>
                                  <span>{{i.quantity}} left</span>
                                </small>
                                <small  v-else>
                                  <span class="text-danger">
                                    out of stock
                                  </span>
                                </small>
                              </div>
                            <p class="card-text py-1">{{i.desc}}</p>
                            
                            <div class="d-flex" style="justify-content:center">
                                <button class="btn btn-sm btn-secondary">Buy now</button>
                                <button
                                    class="btn btn btn-sm btn-primary"
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
                            <p>{{this.selectedSearchResult.company}}</p>
                            <span class="badge badge-success py-1 px-2">
                                  <span class="material-icons" style="font-size:13px">
                                    attach_money
                                  </span>
                                  {{this.selectedSearchResult.price}}
                            </span>
                            <p>{{this.selectedSearchResult.desc}}</p>
                            <p class="text-success">{{this.selectedSearchResult.spec}}</p>
                            <small class="text-danger">Hurry!! only {{this.selectedSearchResult.quantity}} left</small>
                            <div>
                              <label for="bargainNumber">Number of Pieces</label>
                              <input v-model="bargainNumber" type="number" class="form-control" id="bargainNumber" min="1" :max="selectedSearchResult.quantity">
                              <label for="bargainPrice">At a rate of</label>
                              <input v-model="bargainPrice" type="number" class="form-control" id="bargainPrice" min="1" :max="selectedSearchResult.price">
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button @click="selectedSearchResult={}" type="button" class="btn btn-secondary" data-dismiss="modal">
                                Close
                            </button>
                            <button type="button" class="btn btn-primary" @click="bargain">Bargain</button>
                        </div>
                        </div>
                    </div>
                </div>
                <!-- /Model -->
            </div>
        </div>
    </div>
    `,
  data: function () {
    return {
      selectedSearchResult: {},
      loading: true,
      products: [],
      searchResults:[],
      filterMaxPrice:null,
      bargainPrice:null,
      bargainNumber:null
    };
  },
  computed:{
    searchResultsAfterFilter(){
      if(!this.filterMaxPrice){
        return this.searchResults;
      }
        return this.searchResults.filter((result)=>{
          return parseFloat(result.price)  <= this.filterMaxPrice;
        })
      
    }
  },
  methods: {
    showLoading(){
      this.loading=true
      setTimeout(() => {
        this.loading = false;
      }, 500);
    },
    searchProducts() {
      if (!this.$route.query.query || this.$route.query.query=="null") {
        this.searchResults= this.products
        return;
      }
      this.searchResults=this.products.filter((product) => {
        return product.name.toUpperCase().indexOf(this.$route.query.query.toUpperCase()) > -1;
      });
    },
    bargainClicked(i) {
      this.selectedSearchResult = i;
    },
    bargain(){
      if(parseFloat(this.bargainNumber) > this.selectedSearchResult.quantity){
        alert("Only "+ this.selectedSearchResult.quantity + " pieces left !")
        return
      }
      if(this.bargainPrice <= this.selectedSearchResult.price*3/4){
        alert("Bargain price cannot be too low")
        return
      }
      
      $('#exampleModal').modal("hide")
    },
    readProducts() {
      db.collection("Products")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.products.push({
              id: doc.id,
              name: doc.data().Name,
              price: doc.data().Price,
              company: doc.data().Company,
              desc: doc.data().Details,
              quantity: doc.data().Quantity,
              spec: doc.data().Specification
            });
          });
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    },

  },
  watch:{
    products:function(){
      this.showLoading()
      this.searchProducts()
    },
    $route:function(){
      this.showLoading()
      this.searchProducts()
    }
  },
  async mounted() {
    await this.readProducts();
  },
});

const MainPage = Vue.component("mainPage", {
  template: `
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
    `,
});
const routes = [
  { path: "/search", component: SearchPage },
  { path: "/", component: MainPage },
];

const router = new VueRouter({
  routes, // short for `routes: routes`
});

var app = new Vue({
  el: "#app",
  router: router,
  data: function () {
    return {
      filterSearchTerm: null,
      searchTerm: null,
      catagories: [
        {
          name: "fridge",
        },
        {
          name: "washing machine",
        },
        {
          name: "mixi",
        },
        {
          name: "fan",
        },
      ],
    };
  },
  computed: {
    FilteredCatagories() {
      if (!this.filterSearchTerm) {
        return this.catagories;
      }
      return this.catagories.filter((catagory) => {
        return catagory.name.indexOf(this.filterSearchTerm) > -1;
      });
    },
  },
  methods: {
    search() {
      this.$router.push({ path: "/search?query=" + this.searchTerm });
    },
    openNav() {
      document.getElementById("mySidebar").style.width = "350px";
    },
    /* Set the width of the sidebar to 0 and the left margin of the page content to 0 */
    closeNav() {
      document.getElementById("mySidebar").style.width = "0";
    },
  },
});
