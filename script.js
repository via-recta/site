document.addEventListener('DOMContentLoaded', function () {

    // ===== Мобильное меню (бургер) =====
    const burger = document.getElementById('burger');
    const nav = document.getElementById('nav');

    burger.addEventListener('click', function () {
        burger.classList.toggle('active');
        nav.classList.toggle('open');
    });

    // Закрываем меню при клике по ссылке
    document.querySelectorAll('.nav__link').forEach(function (link) {
        link.addEventListener('click', function () {
            burger.classList.remove('active');
            nav.classList.remove('open');
        });
    });

    // ===== Изменение шапки при скролле =====
    const header = document.getElementById('header');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

   // ===== Модальные окна =====
    const popups = {
        form: document.getElementById('popup-form'),
        course: document.getElementById('popup-course'),
        contact: document.getElementById('popup-contact')
    };

    function openPopup(name) {
        if (popups[name]) {
            popups[name].classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    function closePopup(popup) {
        popup.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Открытие по кнопкам с data-popup
    document.querySelectorAll('[data-popup]').forEach(function (btn) {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            openPopup(btn.getAttribute('data-popup'));
        });
    });

    // Закрытие по крестику и оверлею
    Object.values(popups).forEach(function (popup) {
        popup.querySelector('.popup__close').addEventListener('click', function () {
            closePopup(popup);
        });
        popup.querySelector('.popup__overlay').addEventListener('click', function () {
            closePopup(popup);
        });
    });

    // Закрытие по Esc
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            Object.values(popups).forEach(function (popup) {
                if (popup.classList.contains('active')) closePopup(popup);
            });
        }
    });

    // ===== Форма записи =====
    const form = document.getElementById('bookingForm');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            // Здесь можно отправить данные на сервер
            form.querySelector('.form__submit').style.display = 'none';
            form.querySelector('.form__success').style.display = 'block';
            setTimeout(function () {
                const popup = form.closest('.popup');
                if (popup) closePopup(popup);
                // Сброс формы через 1.5 сек
                setTimeout(function () {
                    form.reset();
                    form.querySelector('.form__submit').style.display = '';
                    form.querySelector('.form__success').style.display = 'none';
                }, 1500);
            }, 2000);
        });
    }

    // ===== FAQ (аккордеон) =====
    document.querySelectorAll('.faq__question').forEach(function (btn) {
        btn.addEventListener('click', function () {
            const expanded = btn.getAttribute('aria-expanded') === 'true';
            // Закрываем все
            document.querySelectorAll('.faq__question').forEach(function (b) {
                b.setAttribute('aria-expanded', 'false');
                b.nextElementSibling.style.maxHeight = null;
            });
            // Открываем нужный
            if (!expanded) {
                btn.setAttribute('aria-expanded', 'true');
                const answer = btn.nextElementSibling;
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });
	 // ===== Динамический год в подвале =====
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
    // ===== Слайдер отзывов =====
    const track = document.getElementById('reviewsTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const slides = track ? track.children.length : 0;
    let currentSlide = 0;

    function updateSlider() {
        track.style.transform = 'translateX(-' + (currentSlide * 100) + '%)';
    }

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', function () {
            currentSlide = (currentSlide - 1 + slides) % slides;
            updateSlider();
        });
        nextBtn.addEventListener('click', function () {
            currentSlide = (currentSlide + 1) % slides;
            updateSlider();
        });
    }

    // ===== Плавная прокрутка для старых браузеров =====
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const offset = 70;
                const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top: top, behavior: 'smooth' });
            }
        });
    });

});