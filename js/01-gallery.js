import { galleryItems } from './gallery-items.js';
// Change code below this line

console.log(galleryItems);
// Отримуємо посилання на контейнер галереї
const galleryList = document.querySelector('.gallery');

// Створюємо розмітку із зображеннями галереї на основі масиву галереї
const imageItem = createGalleryImages(galleryItems);

// Функція створення елементів галереї
function createGalleryImages (galleryItems) {
   return galleryItems.map( ({ preview, original, description }) => {
      return `
         <li class="gallery__item">
            <a class="gallery__link" href="#">
               <img class="gallery__image" src="${preview}" data-source="${original}" alt="${description}" />
            </a>
         </li>
      `;
   }).join('');
}

// Додаємо розмітку із зображеннями у контейнер галереї
galleryList.insertAdjacentHTML('beforeend', imageItem);

// Додаємо слухач на клік за зображенням галереї
galleryList.addEventListener('click', onGalleryItem);

// Обробник кліка з зображення галереї
function onGalleryItem(evt) {
   evt.preventDefault();

   // Отримуємо посилання на елемент, яким клікнули
   const clickElement = event.target;

   // Перевіряємо, що клікнули саме на зображенні
   const isImage = clickElement.tagName === 'IMG';

   if (!isImage) {
      return;
   }

   // Отримуємо посилання на оригінальне зображення
   const originalUrl = clickElement.dataset.source;

   // Створюємо модальне вікно з оригінальним зображенням
   const modal = basicLightbox.create(`
      <div class="modal">
         <img src="${originalUrl}" alt="">
      </div>
   `,
     {
       onShow: instance => {}, 
       onClose: instance => {},
     }
   );

   // Отримуємо посилання на зображення усередині модального вікна
   const img = modal.element().querySelector('img');

   // Встановлюємо джерело зображення відповідно до оригінального зображення
   img.src = originalUrl;

   // Відображаємо модальне вікно
   modal.show();

   // Виводимо посилання на оригінальне зображення у консоль
   console.log(originalUrl);

   // Додаємо слухач на закриття модального вікна після натискання клавіші Esc
   document.addEventListener('keydown', onModalKeyDown);

   // Обробник натискання клавіші Esc при відкритому модальному вікні
   function onModalKeyDown(evt) {
      if (evt.code === 'Escape') {
         // Закриваємо модальне вікно
         modal.close();

         // Видаляємо обробник натискання кнопки Esc після закриття модального вікна
         document.removeEventListener('keydown', onModalKeyDown);
      }
   }
}
