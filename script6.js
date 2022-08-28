window.onload = function () {
    document.querySelector('.load').classList.add('_un_active');
}
// Меню
const iconMenu = document.querySelector('.header__burger');
const menuBody = document.querySelector('.navbar');
if (iconMenu) {
    iconMenu.addEventListener('click', function (e) {
        document.body.classList.toggle('_lock');
        iconMenu.classList.toggle('_active');
        menuBody.classList.toggle('_active');
    });
}
//Навигатор
const menuLinks = document.querySelectorAll('.navigator_system[data-goto]');
if (menuLinks.length > 0) {
    menuLinks.forEach(menuLink => {
        menuLink.addEventListener('click', onMenuLinkClick);
    });

    function onMenuLinkClick(e) {
        const menuLink = e.target;
        if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
            const gotoBlock = document.querySelector(menuLink.dataset.goto);
            const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset;
            
            if (iconMenu.classList.contains('_active')) {
                document.body.classList.remove('_lock');
                iconMenu.classList.remove('_active');
                menuBody.classList.remove('_active');
            }

            window.scrollTo({
                top: gotoBlockValue,
                behavior: 'smooth'
            });
            e.preventDefault();
        }
    }
}


//система треков
const buttons = document.querySelector('.music__body_ul');
buttons.addEventListener('click', function (event) {
    if (event.target.closest('.music_button')) {
        console.log(event.target);
        const rem = document.querySelectorAll('.music_button');
        for (const remA of rem) {
            remA.classList.remove('purple');
        }
        const a = event.target;
        a.classList.add('purple');
        //выводим id нужного трека
        var myId = a.getAttribute('id');
        //список треков
        const idList = 
            {'1': '1.mp3',
            '2': '2.mp3',
            '3': '3.mp3',
            '4': '4.mp3',
            '5': '5.mp3',
            '6': '6.mp3'}
        //трек в списке по Id
        var myTrack = idList[myId];
        //достаем элемент audio для замены src
        const nameTrack = document.querySelector('.audio');
        //изменяем трек в audio по Id
        nameTrack.setAttribute('src', myTrack);
    }
});


//слайдер jq
const owl = $('.owl-carousel');
owl.owlCarousel({
    autoplay: true,
    autoplayTimeout:2000,
    loop: true,
    autoplayHoverPause:true,
    margin: 30,
    items: 1,
    responsive: {
        680: {
            items: 2
        },
        893: {
            items: 3
        }
    }
});

$('.button_prev').click(function() {
    owl.trigger('prev.owl.carousel', [300]);
})

$('.button_next').click(function() {
    owl.trigger('next.owl.carousel');
})

const animItems = document.querySelectorAll('.cart__body_block');

if (animItems.length > 0) {
    window.addEventListener('scroll', animOnScroll);
    function animOnScroll() {
        for (let index = 0; index < animItems.length; index++) {
            const animItem = animItems[index];
            const animItemHeight = animItem.offsetHeight;
            const animItemOffset = offset(animItem).top;
            const animStart = 4;

            let animItemPoint = window.innerHeight - animItemHeight / animStart;

            if (animItemHeight > window.innerHeight) {
                animItemPoint = window.innerHeight - window.innerHeight / animStart;
            }
            if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
                animItem.classList.add('_look');
            } else {
                animItem.classList.remove('_look');
            }
        }
    }
    function offset(el) {
        const rect = el.getBoundingClientRect(),
            scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
            scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
    }
    animOnScroll();
}