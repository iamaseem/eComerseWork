import db, { store } from "../firebaseinit.js";

var storeRef = store.ref();

export default {
  name: "SearchPage",
  template: `
    <div>
        <div v-if="loading" style="width:100vw;height:100vh;justify-content:center" class="d-flex">
          <div class="loader"></div>
        </div>
        
        <div v-else class="d-flex">
            <div style=" flex:1" class="bg-white m-4 p-4 boderfil">
                <h5>
                  Filter
                  <span class="material-icons" style="font-size:13px;">
                    filter_list
                  </span>
                </h5>
                <div class="form-group">
                    
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
                <div class="p-2" style="width: 20%;min-width:250px;" v-for="i in searchResultsAfterFilter">
                    <div class="card">
                        <img style="height: 150px;"  :src="i.images[0]" @click="showImgCaro(i)" class="card-img-top" rel="nofollow" alt="Card image cap">
                        <div class="card-body px-4 pt-1 pb-3" @click="cardClicked(i)">
                            <a v-bind:href="'#/venders?query=' + i.name"><h5 class="card-title mb-0 pb-0">{{i.name}}</h5></a>
                            
                            <p class="card-text py-1 text-success">{{i.spec}}</p>
                        </div>
                    </div>
                </div>
                <!-- Modal for caro -->

                  <div class="modal fade" id="carouselModel" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog bg-success" role="document">
                      <div class="modal-content">
                        
                        <div class="modal-body">
                            
                          <img class="d-block w-100" :src="selectedSearchResult.images?selectedSearchResult.images[0]:null" alt="image">
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
    //cardClicked(item) {
    //this.$router.push({ path: "/venders?query=" + item.name });
    //},
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
            .indexOf(this.$route.query.query.toUpperCase()) > -1 ||
          product.company
            .toUpperCase()
            .indexOf(this.$route.query.query.toUpperCase()) > -1 ||
          product.category
            .toUpperCase()
            .indexOf(this.$route.query.query.toUpperCase()) > -1
        );
      });

      let tempArray = [];
      let tempNames = [
        ...new Set(this.searchResults.map((result) => result.name)),
      ];
      for (name of tempNames) {
        tempArray.push(
          this.searchResults.find((result) => {
            return result.name == name;
          })
        );
      }
      this.searchResults = tempArray;
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
      if (this.bargainPrice <= (this.selectedSearchResult.price * 3) / 4) {
        alert("Bargain price cannot be too low");
        return;
      }
      //Do something.
      $("#exampleModal").modal("hide");
      this.bargainNumber = null;
      this.bargainPrice = null;
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
              vendorName: doc.data().vendorName,
              category: doc.data().Category,
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

db.collection("Bargain")
  .where("isResponded", "==", true)
  .get()
  .then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      Vue.use(Toasted);
      let toast = Vue.toasted.show(
        "Your Bragain Has Accepeted for " +
          doc.data().productName +
          "<br>The last price: " +
          doc.data().acceptedPrice +
          "<br>Previous price: " +
          doc.data().currentPrice +
          "<br>Gift: " +
          doc.data().gift,
        {
          theme: "toasted-primary",
          position: "top-right",
          duration: 10000,
          action: {
            text: "Cancel",
            onClick: (e, toastObject) => {
              toastObject.goAway(0);
            },
          },
        }
      );
    });
  })
  .catch((error) => {
    console.log(error);
  });
