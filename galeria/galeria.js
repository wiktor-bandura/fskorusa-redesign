import "../css/style.scss";
import "../css/pages/_gallery-page.scss";

const config = {
  API_KEY: "32e7f055b8a98f088ae52b5bc40e19b2",
  USER_ID: "147804453@N02",
};

const photosContainer = document.getElementById("photos");
const defaultOption = document.createElement("option");
defaultOption.textContent = "Wybierz album";

function getFlickrAlbums() {
  const apiUrl = `https://api.flickr.com/services/rest/?method=flickr.photosets.getList&api_key=${config.API_KEY}&user_id=${config.USER_ID}&format=json&nojsoncallback=1`;

  console.log(apiUrl);

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      if (data.stat === "ok") {
        const albums = data.photosets.photoset;
        const buttonsContainer = document.getElementById("buttons");
        buttonsContainer.appendChild(defaultOption);

        albums.forEach((album) => {
          const button = document.createElement("option");
          button.value = album.title._content;
          button.textContent = album.title._content;
          button.value = album.id;
          buttonsContainer.appendChild(button);
        });

        buttonsContainer.addEventListener("change", (e) => {
          getPhotosFromAlbum(e.target.value);
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

  photosContainer.innerHTML = `<div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>`;


  const apiUrl = `https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=${config.API_KEY}&photoset_id=${albumId}&user_id=${config.USER_ID}&format=json&nojsoncallback=1`;

  console.log(apiUrl)

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      if (data.stat === "ok") {
        let galleryHTML = ``;

        const photos = data.photoset.photo;

        photosContainer.innerHTML = "";

        photos.forEach((photo) => {
          const photoUrl = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_m.jpg`;

          galleryHTML += `<div class="photos-wrapper__frame"><img class="photos-wrapper__photo" src="${photoUrl}" alt="${photo.title}" title="${photo.title}"></div>`;
        });

        return galleryHTML;
      } else {
        console.error("Błąd podczas pobirania zdjęć z Flickr.");
      }
    })
    .then((html) => (photosContainer.innerHTML = html))
    .then(() => (new Lightbox()))
    .catch((error) => {
      console.error("Wystąpił błąd:", error);
    });
}

getFlickrAlbums();

class Lightbox {
  constructor() {
    this.lightboxWrapper = document.querySelector(".lightbox-wrapper");
    this.init();
  }

  init() {
    const images = document.querySelectorAll(".photos-wrapper__photo");
    images.forEach((image) =>
      image.addEventListener("click", () => {
        this.show(image.getAttribute("src"), image.getAttribute("title"));
      })
    );
  }

  show(imgSrc, caption) {
    const bigIMG = imgSrc.replace("m.jpg", "b.jpg");

    const img = new Image();
    img.src = bigIMG;
    img
      .decode()
      .then(() => {
        let ligthbox = document.createElement("div");
        let lightboxCaption = document.createElement("p");

        ligthbox.classList.add("lightbox");
        lightboxCaption.classList.add("ligthbox__caption");
        img.classList.add("lightbox__image");
        lightboxCaption.textContent = caption;

        ligthbox.appendChild(img);
        ligthbox.appendChild(lightboxCaption);

        return ligthbox;
      })
      .then((ligthbox) => {
        this.lightboxWrapper.appendChild(ligthbox);
        this.lightboxWrapper.classList.add("visible");

        this.lightboxWrapper.addEventListener("click", () => {
          this.hide();
        });
      })
      .catch((encodingError) => console.error(encodingError));
  }

  hide() {
    this.lightboxWrapper.innerHTML = ``;
    this.lightboxWrapper.classList.remove("visible");
  }
}

