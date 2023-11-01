import { galleryItems } from './gallery-items.js';
// Change code below this line

console.log(galleryItems);

const galleryList = document.querySelector('.gallery'); // Знаходимо елемент списку галереї
const imageItem = createGalleryImages(galleryItems); // Створюємо HTML код елементів галереї

const images = galleryList.querySelectorAll('.gallery__image'); // Знаходимо всі елементи зображень

// Проходимо по кожному елементу зображення та додаємо атрибут для використання SimpleLightbox
images.forEach((image) => {
  const link = image.parentNode; // Знаходимо батьківський елемент посилання
  link.setAttribute('data-lightbox', ''); // Додаємо атрибут data-lightbox
});

// Створюємо HTML код елементів галереї
function createGalleryImages(galleryItems) {
  return galleryItems
    .map(({ preview, description }) => {
      return `
          <li class="gallery__item">
            <a class="gallery__link" href="${preview}">
              <img class="gallery__image" src="${preview}" alt="${description}" />
            </a>
          </li>
        `;
    })
    .join('');
}

// Вставляємо елементи галереї на сторінку
galleryList.insertAdjacentHTML('beforeend', imageItem);

// Ініціалізуємо SimpleLightbox з налаштуваннями
new SimpleLightbox('.gallery__link', {
//   sourceAttr: href,
  captions: true,
  captionsData: 'alt',
  captionDelay: 250,
});

