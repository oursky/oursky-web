 var mobilenavAnimation = anime({
                targets: '.mobile__nav__list li',
                translateX: [40, 0],
                opacity: [.0, 1],
                delay: anime.stagger(70, {easing: 'easeOutQuad'}),
                loop: false,
                easing: 'spring(1, 80, 10, 0)'
            });

            document.querySelector('.header__mobilenavbtn').onclick = mobilenavAnimation.restart;