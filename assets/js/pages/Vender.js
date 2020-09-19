import db, { store } from "../firebaseinit.js";

var storeRef = store.ref();

export default {
  name: "SearchPage",
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
                    <div class="form-check form-check-radio" id="priceSort">
                        <label class="form-check-label">
                            <input class="form-check-input" type="radio" v-model="priceSort" name="priceSort" value="asc" >
                            Low to High
                            <span class="circle">
                                <span class="check"></span>
                            </span>
                        </label>
                        <label class="form-check-label">
                            <input class="form-check-input" v-model="priceSort" type="radio" name="priceSort" value="dsc" >
                            High to Low
                            <span class="circle">
                                <span class="check"></span>
                            </span>
                        </label>
                    </div>
                    <br/>
                </div>

            </div>
            <div class="d-flex" style="flex-wrap: wrap; flex:9">
                <div class="px-2" style="width:20%; min-width:250px;" v-for="i in searchResultsAfterFilter">
                    <div class="card">
                        <img style="height: 150px;"  :src="i.images[0]" @click="showImgCaro(i)" class="card-img-top" rel="nofollow" alt="Card image cap">
                        <div class="card-body px-4 pt-1 pb-3" style="height: 280px;">
                            <h5 class="card-title p-0" style="margin-top: 8px;">{{i.vendorName}}</h5>
                            <h6 class="m-0 p-0">{{i.name}}</h6>
                            <small>{{i.company}}</small>
                            <div class="d-flex pt-2" style="justify-content:space-between">
                                <span class="badge badge-success py-2 px-2">
                                  <span class="text-white" style="font-size:.6rem">
                                    INR
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
                              <div id="ovr" class="ovr" style="height: 30px; width: 200px;"><p class="card-text py-1 ovr">{{i.desc}}</p></div>
                            
                            <div class="d-flex" style="justify-content:center">
                                <a href="/load.html"><button class="btn btn-sm btn-secondary">Buy now</button></a>
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
                                {{this.selectedSearchResult.vendorName}}
                            </h5> 

                            <button @click="selectedSearchResult={}" type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <p>
                                {{this.selectedSearchResult.name}}
                            </p>
                            <p>{{this.selectedSearchResult.company}}</p>
                            <span class="badge badge-success py-2 px-2">
                            <span class="text-white" style="font-size:.6rem">
                              INR
                            </span>
                                  {{this.selectedSearchResult.price}}
                            </span>
                            <p>{{this.selectedSearchResult.desc}}</p>
                            <p class="text-success">{{this.selectedSearchResult.spec}}</p>
                            <small class="text-danger">Hurry!! only {{this.selectedSearchResult.quantity}} left</small>
                            <div>
                              <label for="bargainNumber">Number of Pieces</label>
                              <input v-model="bargainNumber" type="number" class="form-control" id="bargainNumber" min="1" :max="selectedSearchResult.quantity">
                              <!--<label for="bargainPrice">At a rate of</label>
                              <input v-model="bargainPrice" type="number" class="form-control" id="bargainPrice" min="1" :max="selectedSearchResult.price">-->
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

                <!-- Modal for caro -->

                  <div class="modal fade" id="carouselModel" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog bg-success" role="document">
                      <div class="modal-content">
                        
                        <div class="modal-body">
                            <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
                            <ol class="carousel-indicators">
                              <li v-for="(image,index) in selectedSearchResult.images" data-target="#carouselExampleIndicators" data-slide-to="index" v-bind:class="{ active: !index }"></li>
                            </ol>
                            <div class="carousel-inner">
                              <div v-for="(image,index) in selectedSearchResult.images" class="carousel-item" v-bind:class="{ active: !index }">
                                <img class="d-block w-100" :src="image" alt="First slide">
                              </div>
                            </div>
                            <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                              <span class="sr-only">Previous</span>
                            </a>
                            <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                              <span class="carousel-control-next-icon" aria-hidden="true"></span>
                              <span class="sr-only">Next</span>
                            </a>
                          </div>
                          
                      
                        </div>
                        <div class="modal-footer">
                          <button @click="selectedSearchResult={}" type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                          <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal" data-dismiss="modal">Bargain</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- /Model for caro-->
            </div>
        </div>
    </div>
    `,
  data: function () {
    return {
      selectedSearchResult: {},
      loading: true,
      products: [],
      searchResults: [],
      filterMaxPrice: null,
      bargainPrice: null,
      bargainNumber: null,
      imageUrl: null,
      priceSort: null,
    };
  },
  computed: {
    searchResultsAfterFilter() {
      let tempArray = this.searchResults;
      if (!this.filterMaxPrice && !this.priceSort) {
        return this.searchResults;
      } else {
        if (this.filterMaxPrice) {
          tempArray = tempArray.filter((result) => {
            return parseFloat(result.price) <= this.filterMaxPrice;
          });
        }
        if (this.priceSort == "asc") {
          tempArray = tempArray.sort(function (a, b) {
            return a.price - b.price;
          });
        }
        if (this.priceSort == "dsc") {
          tempArray = tempArray.sort(function (a, b) {
            return b.price - a.price;
          });
        }
        return tempArray;
      }
    },
  },
  methods: {
    showImgCaro(item) {
      this.selectedSearchResult = item;
      $("#carouselModel").modal("show");
    },
    showLoading() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
      }, 500);
    },
    searchProducts() {
      if (!this.$route.query.query || this.$route.query.query == "null") {
        this.searchResults = this.products;
        return;
      }
      //   if(this.$route.query.category){
      //     this.searchResults = this.products.filter((product)=>{

      //     })
      //   }
      this.searchResults = this.products.filter((product) => {
        return (
          product.name
            .toUpperCase()
            .indexOf(this.$route.query.query.toUpperCase()) > -1 ||
          product.desc
            .toUpperCase()
            .indexOf(this.$route.query.query.toUpperCase()) > -1 ||
          product.spec
            .toUpperCase()
            .indexOf(this.$route.query.query.toUpperCase()) > -1
        );
      });
    },
    bargainClicked(i) {
      this.selectedSearchResult = i;
    },
    bargain() {
      if (
        parseFloat(this.bargainNumber) > this.selectedSearchResult.quantity ||
        !this.bargainNumber
      ) {
        alert("Only " + this.selectedSearchResult.quantity + " pieces left !");
        return;
      }
      db.collection("Bargain")
        .add({
          buyerID: "1234",
          currentPrice: this.selectedSearchResult.price,
          gift: null,
          isResponded: false,
          productID: this.selectedSearchResult.id,
          productName: this.selectedSearchResult.name,
          requestedQuantity: this.bargainNumber,
          vendorID: this.selectedSearchResult.vendorId,
        })
        .then(function (docRef) {
          console.log("Document written with ID: ", docRef.id);
        })
        .catch(function (error) {
          console.error("Error adding document: ", error);
        });
      //Do something.
      $("#exampleModal").modal("hide");
      $(".modal-backdrop").remove();
      location.reload(true);
      this.bargainNumber = null;
      this.selectedSearchResult = {};
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
              spec: doc.data().Specification,
              images: [],
              imgCount: doc.data().ImageCount,
              vendorName: doc.data().VendorName,
              vendorId: doc.data().VendorID,
            });
          });
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    },
    readImage() {
      for (let product in this.products) {
        let tempArray = [];
        for (let imgNo = 1; imgNo <= this.products[product].imgCount; imgNo++) {
          var imageRef = storeRef.child(
            "/Images/" + this.products[product].id + "/" + imgNo
          );
          imageRef
            .getDownloadURL()
            .then((url) => {
              tempArray.push(url);
            })
            .catch(function (error) {
              console.log(error);
            });
          this.products[product].images = tempArray;
        }
      }
      console.log(this.products);
    },
  },
  watch: {
    products: function () {
      this.showLoading();
      this.searchProducts();
      this.readImage();
    },
    $route: function () {
      this.showLoading();
      this.searchProducts();
    },
  },
  async mounted() {
    await this.readProducts();
    //await this.readImage();
  },
};
