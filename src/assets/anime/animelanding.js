
            // main logo animation

            var heroAnimation1 = (function() {

              /*var heroAnimationEl = document.querySelector('.hero__art__blocks');
              
              var initscale = function() { return anime.random(.8, 1.1); };
              var initrotate = function() { return anime.random(-120, 140); };
              var initborderradius = function() { return [anime.random(20, 40) + 'px']; };
              */
              var heroAnimationTL = anime.timeline({
                autoplay: false,
                easing: 'easeOutElastic(1, .8)',
                loop: true,
                //direction: 'alternate'
               })
              
              
               .add({
                targets: ['.hero__art__block--1'],
                width: 180,
                duration: 1000,
                borderRadius: 25 + 'px',
                height: 140,
                top: 90,
                endDelay: 2500
              })
                .add({
                targets: ['.hero__art__block--2','.hero__art__block--3','.hero__art__block--4'],
                width: 180,
                duration: 1000,
                borderRadius: 25 + 'px',
                height: 12,
                top: 235,
                left: 75,
                endDelay: 2500
              }, '-=3500')
               .add({
                targets: ['.hero__art__blocks'],
                 background: '#EFCE47',
                 duration: 1000,
                  endDelay: 2500
               },'-=3500')
                
                .add({
                targets: ['.hero__art__block--1'],
                width: 200,
                duration: 1000,
                borderRadius: 25 + 'px',
                height: 130,
                top: 100,
                endDelay: 2500
              })
                .add({
                targets: ['.hero__art__block--2'],
                width: 12,
                duration: 1000,
                borderRadius: 20 + 'px',
                height: 12,
                top: 115,
                left: 80,
                endDelay: 2500
              }, '-=3500')

                .add({
                targets: ['.hero__art__block--3'],
                width: 12,
                duration: 1100,
                borderRadius: 20 + 'px',
                height: 12,
                top: 115,
                left: 100,
                endDelay: 2500
              }, '-=3500')

                .add({
                targets: ['.hero__art__block--4'],
                width: 12,
                duration: 1300,
                borderRadius: 20 + 'px',
                height: 12,
                top: 115,
                left: 120,
                endDelay: 2500
              }, '-=3500')
                
                .add({
                targets: ['.hero__art__blocks'],
                 background: '#3578AC',
                 duration: 1000,
                  endDelay: 2500
               },'-=3500')
                 
              .add({
                targets: ['.hero__art__block--1'],
                width: 100,
                duration: 1000,
                borderRadius: 25 + 'px',
                height: 160,
                top: 86,
                endDelay: 2500
              })
                .add({
                targets: ['.hero__art__block--2','.hero__art__block--3','.hero__art__block--4'],
                width: 30,
                duration: 1000,
                borderRadius: 25 + 'px',
                height: 10,
                top: 100,
                left: 149,
                endDelay: 2500
              }, '-=3500')

                .add({
                targets: ['.hero__art__blocks'],
                 background: '#474C81',
                 duration: 1000,
                  endDelay: 2500
               },'-=3500')
                
               
              
              return heroAnimationTL;
              //return ;

            })();

           

            heroAnimation1.play();
            