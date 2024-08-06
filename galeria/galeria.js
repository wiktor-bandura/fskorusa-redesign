import Swiper from "swiper";

import "../css/style.scss";
import "../css/pages/_gallery-page.scss";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const config = {
  API_KEY: "x",
  USER_ID: "x",
};

const photosContainer = document.getElementById("photos");

function getFlickrAlbums() {
  const apiUrl = `https://api.flickr.com/services/rest/?method=flickr.photosets.getList&api_key=${config.API_KEY}&user_id=${config.USER_ID}&format=json&nojsoncallback=1`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      if (data.stat === "ok") {
        const albums = data.photosets.photoset;
        const buttonsContainer = document.getElementById("buttons");
        let buttonsHTML = "";

        albums.forEach((album) => {
          const button = document.createElement("button");
          button.classList.add("button", "swiper-slide");
          button.textContent = album.title._content;

          button.addEventListener("click", () => {
            getPhotosFromAlbum(album.id);
          });

          buttonsContainer.appendChild(button);
        });
      } else {
        console.error("Błąd albumów z API Flickr.");
      }
    })
    .catch((error) => {
      console.error("Wystąpił błąd podczas komunikacji z API Flickr.", error);
    });
}

function getPhotosFromAlbum(albumId) {
  const apiUrl = `https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=${config.API_KEY}&photoset_id=${albumId}&user_id=${config.USER_ID}&format=json&nojsoncallback=1`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      if (data.stat === "ok") {
        let galleryHTML = "";

        const photos = data.photoset.photo;

        photosContainer.innerHTML = "";

        photos.forEach((photo) => {
          const photoUrl = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_m.jpg`;

          galleryHTML += `<img class="photosContainer__photo" src="${photoUrl}" alt="${photo.title}" title="${photo.title}">`;
        });

        return galleryHTML;
      } else {
        console.error("Błąd podczas pobirania zdjęć z Flickr.");
      }
    })
    .then((html) => (photosContainer.innerHTML = html))
    .catch((error) => {
      console.error("Wystąpił błąd:", error);
    });
}

getFlickrAlbums();

let swiper = null;

if (document.querySelector(".buttons-swiper")) {
  swiper = new Swiper(".buttons-swiper", {
    breakpoints: {
      // 640: {
      //   slidesPerView: 2,
      //   spaceBetween: 20,
      // },
      // 768: {
      //   slidesPerView: 4,
      //   spaceBetween: 40,
      // },
      1024: {
        slidesPerView: "auto",
        spaceBetween: 50,
      },
    },
    freemode: false,
    loop: false,

    on: {
      slideChange: function () {
        // Upewnij się, że swiper nie przesuwa się poza ostatni slajd
        if (this.isEnd) {
          this.allowSlideNext = false;
        } else {
          this.allowSlideNext = true;
        }
      },
    },
  });
}
