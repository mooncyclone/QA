document.addEventListener('DOMContentLoaded', function() {
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

	gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

	if (ScrollTrigger.isTouch !== 1) {
			ScrollSmoother.create({
					wrapper: '.wrapper',
					content: '.content',
					smooth: 1.5,
					effects: true
			});

			gsap.fromTo('.hero-section', { opacity: 1 }, {
					opacity: 0,
					scrollTrigger: {
							trigger: '.hero-section',
							start: 'center',
							end: '820',
							scrub: true
					}
			});

			let itemsL = gsap.utils.toArray('.gallery__left .gallery__item');

			itemsL.forEach(item => {
					gsap.fromTo(item, { opacity: 0, x: -50 }, {
							opacity: 1, x: 0,
							scrollTrigger: {
									trigger: item,
									start: '-850',
									end: '-100',
									scrub: true
							}
					});
			});

			let itemsR = gsap.utils.toArray('.gallery__right .gallery__item');

			itemsR.forEach(item => {
					gsap.fromTo(item, { opacity: 0, x: 50 }, {
							opacity: 1, x: 0,
							scrollTrigger: {
									trigger: item,
									start: '-750',
									end: 'top',
									scrub: true
							}
					});
			});
	}
});
