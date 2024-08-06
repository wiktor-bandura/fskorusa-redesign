import Swiper from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

let swiper = null;

if (document.querySelector(".timeline")) {
  swiper = new Swiper(".timeline", {
    breakpoints: {
      1024: {
        slidesPerView: "auto",
        spaceBetween: 10,
      },
    },
    freemode: false,
    loop: false,

    on: {
      slideChange: function () {
        if (this.isEnd) {
          this.allowSlideNext = false;
        } else {
          this.allowSlideNext = true;
        }
      },
    },
  });
}

export default swiper;
