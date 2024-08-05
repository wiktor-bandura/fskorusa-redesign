import "../css/style.scss";
import "../css/pages/_gallery-page.scss";

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
        console.log(albums);
        const buttonsContainer = document.getElementById("buttons");
        let buttonsHTML = "";

        albums.forEach((album) => {
          const button = document.createElement("button");
          button.classList.add("button");
          button.textContent = album.title._content;

          button.addEventListener("click", () => {
            getPhotosFromAlbum(album.id);
            photosContainer.innerHTML = '<span class="loader"></span>';
          });

          buttonsContainer.appendChild(button);
        });
      } else {
        console.error("BĹÄd pobierania albumĂłw z API Flickr.");
      }
    })
    .catch((error) => {
      console.error("WystÄpiĹ bĹÄd podczas komunikacji z API Flickr.", error);
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
        console.log(photos);

        photosContainer.innerHTML = ""; // WyczyĹÄ poprzednie zdjÄcia

        // WyĹwietl zdjÄcia
        photos.forEach((photo) => {
          const photoUrl = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_m.jpg`;

          galleryHTML += `<img class="photosContainer__photo" src="${photoUrl}" alt="${photo.title}" title="${photo.title}">`;
        });

        return galleryHTML;
      } else {
        console.error("BĹÄd pobierania zdjÄÄ z API Flickr.");
      }
    })
    .then((html) => (photosContainer.innerHTML = html))
    .catch((error) => {
      console.error("WystÄpiĹ bĹÄd podczas komunikacji z API Flickr.", error);
    });
}

getFlickrAlbums();
