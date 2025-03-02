import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
/** @format */

const images = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820__480.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];

const gallery = document.querySelector('.gallery');

const galleryItemsHTML = images
  .map(({ preview, original, description }) => {
    return `<li class="gallery-item">
                    <a class="gallery-link" href="${original}">
                        <img
                            class="gallery-image"
                            src="${preview}"
                            alt="${description}"
                        />
                    </a>
                </li>`;
  })
  .join('');

function clearLocalStorage() {
  //Працюємо з Local Storage для запобігання помілки:
  // "Chrome is moving towards a new experience that allows users
  //  to choose to browse without third - party cookies".
  localStorage.clear();
}
function createGalleryItem() {
  const lightbox = new SimpleLightbox('.gallery a', {
    captions: true,
    captionsData: 'alt',
    captionDelay: 250,
    overlay: true,
  });

  //Функція візуалізацїї клику
  function createCircle(x, y, container) {
    const circle = document.createElement('div');
    circle.className = 'circle';
    circle.style.left = `${0 + x}px`;
    circle.style.top = `${0 + y}px`;
    circle.style.width = `50px`;
    circle.style.height = `50px`;
    circle.style.border = `3px solid black`;
    container.appendChild(circle);

    // Видалення елементу через потрібний час, сек
    setTimeout(() => {
      circle.remove();
    }, 250);
  }

  lightbox.on('next.simplelightbox', function () {
    clearLocalStorage();
    const x = -3;
    const y = 0;
    const container = document.querySelector('.sl-next');
    createCircle(x, y, container);
    console.log('Next image is shown');
  });

  lightbox.on('prev.simplelightbox', function () {
    clearLocalStorage();
    const x = -3;
    const y = 0;
    const container = document.querySelector('.sl-prev');
    createCircle(x, y, container);
    console.log('Previous image is shown');
  });

  lightbox.on('changed.simplelightbox', function (e) {
    const container = document.querySelector('.sl-overlay');
    console.log('Clicked on show-overlay', container, e);
  });

  lightbox.on('close.simplelightbox', function (e) {
    const container = document.querySelector('.sl-close');
    const x = -3;
    const y = -5;
    createCircle(x, y, container);
    console.log('Lightbox is about to be closed', container, e);
  });
}

document.addEventListener('DOMContentLoaded', createGalleryItem);
gallery.insertAdjacentHTML('beforeend', galleryItemsHTML);
