import $ from "jquery";
import "slick-carousel";
export default ({ app }, inject) => {
  // Inject $hello(msg) in Vue, context and store.
  function slickInit(slider) {
    console.log('slider',slider);
    slider.slick({
      prevArrow: '.left',
      nextArrow: '.right',
      autoplay: true,
      autoplaySpeed: 3000
    });
  }
  inject("slider", slickInit);
};
