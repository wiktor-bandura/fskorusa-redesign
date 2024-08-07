import "../css/style.scss";
import "../css/pages/_gallery-page.scss";

const config = {
  API_KEY: "x",
  USER_ID: "x",
};

const photosContainer = document.getElementById("photos");
const defaultOption = document.createElement("option");
defaultOption.textContent = "Wybierz album";

function getFlickrAlbums() {
  const apiUrl = `https://api.flickr.com/services/rest/?method=flickr.photosets.getList&api_key=${config.API_KEY}&user_id=${config.USER_ID}&format=json&nojsoncallback=1`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      if (data.stat === "ok") {
        const albums = data.photosets.photoset;
        const buttonsContainer = document.getElementById("buttons");
        let buttonsHTML = "";
        buttonsContainer.appendChild(defaultOption);

        albums.forEach((album) => {
          const button = document.createElement("option");
          button.classList.add("button", "swiper-slide");
          button.value = album.title._content;
          button.textContent = album.title._content;

          buttonsContainer.addEventListener("change", () => {
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
