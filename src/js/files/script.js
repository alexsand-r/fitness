// Підключення функціоналу "Чертоги Фрілансера"
import { isMobile } from "./functions.js";
// Підключення списку активних модулів
import { flsModules } from "./modules.js";


// -----  ------------------  ---------------  book a class ---------------

if (document.querySelector('.column-book__box')) {

	const items = document.querySelectorAll('.box-column-book__item');
	items.forEach(item => {
		item.addEventListener('click', () => {
			items.forEach(item => {
				item.classList.remove('active-book');
			});
			item.classList.add('active-book');
		});
	})
};

//  --------------------------- mobile slider ----------------------------


// Підключаємо слайдер Swiper з node_modules
// При необхідності підключаємо додаткові модулі слайдера, вказуючи їх у {} через кому
// Приклад: { Navigation, Autoplay }
import Swiper, { Navigation } from 'swiper';
/*
Основні модулі слайдера:
Navigation, Pagination, Autoplay, 
EffectFade, Lazy, Manipulation
Детальніше дивись https://swiperjs.com/
*/

// Стилі Swiper
// Базові стилі
import "../../scss/base/swiper.scss";
// Повний набір стилів з scss/libs/swiper.scss
// import "../../scss/libs/swiper.scss";
// Повний набір стилів з node_modules
// import 'swiper/css';
const slider = document.querySelector('.meet__slider');
let mySwiper;
// Ініціалізація слайдерів
function initSliders() {
	// Список слайдерів
    if (document.querySelector('.meet__slider')) {

    
	if (window.innerWidth <= 400 && slider.dataset.mobile == 'false') {
		// Перевіряємо, чи є слайдер на сторінці
		if (document.querySelector('.meet__slider')) { // Вказуємо склас потрібного слайдера
			// Створюємо слайдер
			mySwiper = new Swiper('.meet__slider', { // Вказуємо склас потрібного слайдера
				// Підключаємо модулі слайдера
				// для конкретного випадку
				modules: [Navigation],
				observer: true,
				observeParents: true,
				slidesPerView: 1.4,
				spaceBetween: 16,
				autoHeight: false,
				speed: 800,
				loop: false, // Додайте цей рядок для вимкнення безкінечної прокрутки
				navigation: {
					prevEl: '.meet__left',
					nextEl: '.meet__right',
				},

				on: {
				},
			});
			slider.dataset.mobile = 'true';
		}
	}
	if (window.innerWidth > 400) {
		slider.dataset.mobile = 'false';
		if (slider.classList.contains('swiper-initialized')) {
			mySwiper.destroy();
		}
        }
    }
}
initSliders();
window.addEventListener('resize', () => {
	initSliders();
});

// Скролл на базі слайдера (за класом swiper scroll для оболонки слайдера)
function initSlidersScroll() {
	let sliderScrollItems = document.querySelectorAll('.swiper_scroll');
	if (sliderScrollItems.length > 0) {
		for (let index = 0; index < sliderScrollItems.length; index++) {
			const sliderScrollItem = sliderScrollItems[index];
			const sliderScrollBar = sliderScrollItem.querySelector('.swiper-scrollbar');
			const sliderScroll = new Swiper(sliderScrollItem, {
				observer: true,
				observeParents: true,
				direction: 'vertical',
				slidesPerView: 'auto',
				freeMode: {
					enabled: true,
				},
				scrollbar: {
					el: sliderScrollBar,
					draggable: true,
					snapOnRelease: false
				},
				mousewheel: {
					releaseOnEdges: true,
				},
			});
			sliderScroll.scrollbar.updateSize();
		}
	}
}

window.addEventListener("load", function (e) {
	// Запуск ініціалізації слайдерів
	initSliders();
	// Запуск ініціалізації скролла на базі слайдера (за класом swiper_scroll)
	//initSlidersScroll();
});

// --------------------------  фильтр  на тренера
// Проверяем наличие блока с классом "meet__row" на странице
if (document.querySelector('.meet__row')) {
	// Получаем кнопки фильтрации
	const filterButtons = document.querySelectorAll('.meet__tit');
	
	// Получаем блоки для фильтрации
	const blocks = document.querySelectorAll('.meet__slide');
	
	// Обработчик клика по кнопке фильтрации
	filterButtons.forEach((button) => {
		button.addEventListener('click', () => {
			// Проверяем, является ли кнопка уже активной
			if (button.classList.contains('_tab-active')) {
				return; // Если активна, прекращаем выполнение
			}
	
			// Удаляем класс "active" у всех кнопок
			filterButtons.forEach((btn) => {
				btn.classList.remove('_tab-active');
			});
	
			// Добавляем класс "active" к текущей кнопке
			button.classList.add('_tab-active');
	
			// Получаем значение атрибута "data-tip" текущей кнопки
			const selectedColor = button.getAttribute('data-tip');
	
			// Показываем/скрываем блоки в зависимости от выбранного tip
			blocks.forEach((block) => {
				if (selectedColor === 'all' || selectedColor === block.getAttribute('data-tip')) {
					block.style.display = 'block';
				} else {
					block.style.display = 'none';
				}
			});
		
		
		});
	});
}

  


  

