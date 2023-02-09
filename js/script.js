"use strict"

document.addEventListener('click', documentClick);

function documentClick(e) {
	const targetItem = e.target;

	if(targetItem.closest('.icon-menu')) {
		document.documentElement.classList.toggle('menu-open');
	}
};
const swiper = new Swiper('.slider-main-block', {
	// Optional parameters
	spaceBetween: 30,
	slidesPerView: 1,
	loop: true,
	speed: 1000,
	// Navigation arrows
	navigation: {
	nextEl: '.body-main-block__arrow.swiper-button-next',
	prevEl: '.body-main-block__arrow.swiper-button-prev',
	},
});
//tabs
const tabNavItems = document.querySelectorAll('.tabs-deals__button');
const tabItems = document.querySelectorAll('.item-tabs');
document.addEventListener("click", function(e) {
	const targetElement = e.target;
	let currentActiveIndex = null;
	let newActiveIndex = null;
	if(targetElement.closest('.tabs-deals__button')) {
		tabNavItems.forEach((tabNavItem, index) => {
			if (tabNavItem.classList.contains('active')) {
				currentActiveIndex = index;
				tabNavItem.classList.remove('active');
			}
			if (tabNavItem === targetElement) {
				newActiveIndex = index;
			}
		});
		targetElement.classList.add('active');
		tabItems[currentActiveIndex].classList.remove('active');
		tabItems[newActiveIndex].classList.add('active');
	}
});
//rating
const ratings = document.querySelectorAll('.rating');
if (ratings.length > 0) {
	initRatings();
}

function initRatings() {
	let ratingActive, ratingValue;
	for (let index = 0; index < ratings.length; index++) {
		const rating = ratings[index];
		initRating(rating);
	}

	function initRating(rating) {
		initRatingVars(rating);
		setRatingActiveWidth();
		if (rating.classList.contains('rating_set')) {
			setRating(rating);
		}
	}

	function initRatingVars(rating) {
		ratingActive = rating.querySelector('.rating__active');
		ratingValue = rating.querySelector('.rating__value');
	}

	function setRatingActiveWidth(index = ratingValue.innerHTML) {
		const ratingActiveWidth = index / 0.05;
		ratingActive.style.width = `${ratingActiveWidth}%`;
	}

	function setRating(rating) {
		const ratingItems = rating.querySelectorAll('.rating__item');
		for (let index = 0; index < ratingItems.length; index++) {
			const ratingItem = ratingItems[index];
			ratingItem.addEventListener("mouseenter" , function (e) {
				initRatingVars(rating);
				setRatingActiveWidth(ratingItem.value);
			});
			ratingItem.addEventListener("mouseleave", function (e) {
				setRatingActiveWidth();
			});
			ratingItem.addEventListener("click", function (e) {
				initRatingVars(rating);

				if (rating.dataset.ajax) {
					setRatingValue(ratingItem.value, rating);
				} else {
				ratingValue.innerHTML = index + 1;
				setRatingActiveWidth();
				}
			});
		}
	}
}