import { galleryItems } from './gallery-items.js';
// Change code below this line

//console.log(galleryItems);

const galleryList = document.querySelector('.gallery');

//Створення і рендер розмітки 

function renderImages() {
    const markup = galleryItems
        .map(
            ({preview, original, description}) =>
    
          `<li class="list__item">
            <a class="gallery__item" href="${original}">
           <img class="gallery__image"
           src="${preview}" 
           alt="${description}" />
                </a>
           </li >`

    )
    .join('');
    galleryList.insertAdjacentHTML('beforeend', markup);
    console.log(galleryList);
}
renderImages();


// Застосування бібліотеки SimpleLightbox

new SimpleLightbox('.gallery .gallery__item', { captionsData:'alt', captionDelay:250});