export default{
    name:"MainPage",
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
}