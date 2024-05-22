document.addEventListener('DOMContentLoaded', function() {
	// Общий обработчик свайпов для всех страниц
	let startX = 0;
	let startY = 0;
	document.addEventListener('touchstart', function(e) {
			startX = e.touches[0].clientX;
			startY = e.touches[0].clientY;
	});

	document.addEventListener('touchmove', function(e) {
			if (startX) {
					const diffX = e.touches[0].clientX - startX;
					const diffY = e.touches[0].clientY - startY;
					if (Math.abs(diffX) > Math.abs(diffY)) {
							if (diffX > 0) {
									// Свайп вправо
									window.history.back();
							}
					}
					startX = 0;
			}
	});

	const sliderMain = new Swiper('.slider_main', {
			freeMode: true,
			centeredSlides: true,
			mousewheel: true,
			parallax: true,
			breakpoints: {
					0: {
							slidesPerView: 2.5,
							spaceBetween: 20
					},
					680: {
							slidesPerView: 3.5,
							spaceBetween: 60
					}
			}
	});

	const sliderBg = new Swiper('.slider_bg', {
			centeredSlides: true,
			parallax: true,
			spaceBetween: 60,
			slidesPerView: 3.5
	});

	sliderMain.controller.control = sliderBg;

	// Массив с именами файлов для перехода
	const pageLinks = ['youtrack.html', 'gitlab.html', 'page3.html', 'page4.html', 'page5.html', 'page6.html'];

	document.querySelectorAll('.slider__item').forEach((item, index) => {
			item.addEventListener('click', event => {
					const isOpened = item.classList.contains('opened');
					// Закрытие всех открытых изображений при клике на любое изображение
					document.querySelectorAll('.slider__item.opened').forEach(openedImage => {
							openedImage.classList.remove('opened');
							// Удаление анимации при закрытии изображения
							openedImage.querySelector('.slider__img').style.transition = 'none';
							openedImage.querySelector('.slider__img').style.transform = 'none';
					});
					if (!isOpened) {
							item.classList.add('opened');
							// Установка времени анимации (в миллисекундах)
							const animationDuration = 2000;
							const overflowDuration = 3000;
							// // Плавное увеличение размера изображения до полного экрана
							// item.querySelector('.slider__img').style.transition = `transform ${animationDuration}ms ease-in-out`;
							// item.querySelector('.slider__img').style.transform = 'scale(1)';
							// item.querySelector('.slider__img').style.overflow = `initial ${overflowDuration}ms ease-in-out`;
							// Задержка перед переходом на соответствующую страницу после завершения анимации
							setTimeout(() => {
									window.location.href = pageLinks[index];
							}, animationDuration);
					}
			});
	});

	let desc = document.querySelector('.description');
	sliderMain.on('slideChange', e => {
			sliderMain.activeIndex > 0 ? desc.classList.add('hidden') : desc.classList.remove('hidden');
	});

	sliderMain.on('slidePrevTransitionEnd', function() {
			const activeSlide = sliderMain.slides[sliderMain.activeIndex];
			if (activeSlide === sliderMain.slides[0]) {
					// Если мы вернулись на первый слайд, то закрываем изображение
					const openedItem = document.querySelector('.slider__item.opened');
					if (openedItem) {
							openedItem.classList.remove('opened');
					}
			}
			if (activeSlide === sliderMain.slides[1]) {
					// Если мы вернулись со второго слайда, то перенаправляем на index.html
					window.location.href = 'index.html';
			}
	});
});
