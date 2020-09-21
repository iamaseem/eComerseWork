export default {
  name: "MainPage",
  template: `
    <div>
          <div class="container-fluid">
        
            <div class="row" style="justify-content:space-around;height: 100px;">
                <div id="carouselExampleIndicators" class="carousel slide my-4 w-100" data-ride="carousel">
                        <div class="carousel-inner  text-center">
                        <div class="carousel-item active w-100">
                            <img class=" w-25 mx-4 " style="height: 250px; max-width: 26%;" src="assets/img/bedhome.jpeg" alt="Third slide">
                            <img class=" w-25 mx-4 " style="height: 250px; max-width: 26%;"  src="assets/img/bulbhome.jpeg" alt="Third slide">
                            <img class=" w-25 mx-4 " style="height: 250px; max-width: 26%;"  src="assets/img/chairhome.jpeg" alt="Third slide">
                        </div>
                        <div class="carousel-item text-center">
                            <img class=" w-25 mx-4 " style="height: 250px; max-width: 26%;" src="assets/img/headfonehome.jpeg" alt="Third slide">
                            <img class=" w-25 mx-4 " style="height: 250px; max-width: 26%;"  src="assets/img/shoehome.jpeg" alt="Third slide">
                            <img class=" w-25 mx-4 " style="height: 250px; max-width: 26%;"  src="assets/img/tvhome.jpeg" alt="Third slide">
                        </div>
                        </div>
                        <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev" style="z-index: 0;">
                        <i class="ri-arrow-left-line carcntr"></i>
                        <span class="sr-only">Previous</span>
                        </a>
                        <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next" style="z-index: 0;">
                        <i class="ri-arrow-right-line carcntr"></i>
                        <span class="sr-only">Next</span>
                        </a>
                </div>
            </div>
          </div>
          <div class="grid-container imgsec">
          <img class="grid-item rounded" src="assets/img/tvhome2.jpg"/>
          <img class="grid-item rounded" src="assets/img/isthhome.jpg"/>
          <img class="grid-item rounded" src="assets/img/drimhome.jpg"/>
          <img class="grid-item rounded" src="assets/img/mobihome.jpg"/>
          <img class="grid-item rounded" src="assets/img/spreahome.jpg"/>
          <img class="grid-item rounded" src="assets/img/speakerhome.jpg"/>
          </div>
          </div>
    `,
};
