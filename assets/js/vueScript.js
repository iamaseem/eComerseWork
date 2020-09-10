

import SearchPage from '../js/pages/SearchPage.js'
import MainPage from '../js/pages/MainPage.js'


const routes = [
  { path: "/search", component: SearchPage },
  { path: "/", component: MainPage },
];

const router = new VueRouter({
  hash:false,
  routes,
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
