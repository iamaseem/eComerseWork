export default {
  name: "MainPage",
  template: `
    <div>
          <div class="container-fluid">
        
            <div class="row" style="justify-content:space-around;height: 200px;">
                <div id="carouselExampleIndicators" class="carousel slide my-4 w-100" data-ride="carousel">
                        <div class="carousel-inner  text-center">
                        <div class="carousel-item active w-100">
                            <img class=" w-25 mx-4 " style="height: 300px; max-width: 26%;" src="https://images.unsplash.com/photo-1526178613552-2b45c6c302f0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80" alt="Third slide">
                            <img class=" w-25 mx-4 " style="height: 300px; max-width: 26%;"  src="https://images.unsplash.com/photo-1513451732213-5775a1c40335?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80" alt="Third slide">
                            <img class=" w-25 mx-4 " style="height: 300px; max-width: 26%;"  src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80" alt="Third slide">
                        </div>
                        <div class="carousel-item text-center">
                            <img class=" w-25 mx-4 " style="height: 300px; max-width: 26%;" src="https://images.unsplash.com/photo-1580480055273-228ff5388ef8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80" alt="Third slide">
                            <img class=" w-25 mx-4 " style="height: 300px; max-width: 26%;"  src="https://images.unsplash.com/photo-1520940115356-52e16be4351a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80" alt="Third slide">
                            <img class=" w-25 mx-4 " style="height: 300px; max-width: 26%;"  src="https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" alt="Third slide">
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
          </div>
    `,
};
