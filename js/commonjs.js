(function ($) {
    "use strict";

    var $window = $(window);
    var $body = $('body');

    /* Preloader Effect */
    $window.on('load', function () {
        $(".preloader").fadeOut(600);
    });


    /* Sticky Header */
    if ($('.active-sticky-header').length) {
        $window.on('resize', function () {
            setHeaderHeight();
        });

        function setHeaderHeight() {
            $("header.active-sticky-header").css("height", $('header.active-sticky-header .header-sticky').outerHeight());
        }

        $window.on("scroll", function () {
            var fromTop = $(window).scrollTop();
            setHeaderHeight();
            var headerHeight = $('header.active-sticky-header .header-sticky').outerHeight()
            $("header.active-sticky-header .header-sticky").toggleClass("hide", (fromTop > headerHeight + 100));
            $("header.active-sticky-header .header-sticky").toggleClass("active", (fromTop > 600));
        });
    }


    /* Slick Menu JS */
    $('#menu').slicknav({
        label: '',
        prependTo: '.responsive-menu'
    });

    if ($("a[href='#top']").length) {
        $(document).on("click", "a[href='#top']", function () {
            $("html, body").animate({ scrollTop: 0 }, "slow");
            return false;
        });
    }


    /* Parallaxie js */
    var $parallaxie = $('.parallaxie');
    if ($parallaxie.length && ($window.width() > 1024)) {
        if ($window.width() > 768) {
            $parallaxie.parallaxie({
                speed: 0.55,
                offset: 0,
            });
        }
    }


    /* Animated Wow Js */
    new WOW().init();


    /* Popup Video */
    if ($('.popup-video').length) {
        $('.popup-video').magnificPopup({
            type: 'iframe',
            mainClass: 'mfp-fade',
            removalDelay: 160,
            preloader: false,
            fixedContentPos: true
        });
    }


    /* Zoom Gallery screenshot */
    $('.gallery-items').magnificPopup({
        delegate: 'a',
        type: 'image',
        closeOnContentClick: false,
        closeBtnInside: false,
        mainClass: 'mfp-with-zoom',
        image: {
            verticalFit: true,
        },
        gallery: {
            enabled: true
        },
        zoom: {
            enabled: true,
            duration: 300, // don't foget to change the duration also in CSS
            opener: function (element) {
                return element.find('img');
            }
        }
    });


    /* Image Reveal Animation */
    if ($('.reveal').length) {
        gsap.registerPlugin(ScrollTrigger);
        let revealContainers = document.querySelectorAll(".reveal");
        revealContainers.forEach((container) => {
            let image = container.querySelector("img");
            let tl = gsap.timeline({
                scrollTrigger: {
                    trigger: container,
                    toggleActions: "play none none none"
                }
            });
            tl.set(container, {
                autoAlpha: 1
            });
            tl.from(container, 1, {
                xPercent: -100,
                ease: Power2.out
            });
            tl.from(image, 1, {
                xPercent: 100,
                scale: 1,
                delay: -1,
                ease: Power2.out
            });
        });
    }


    /* Text Effect Animation */
    function initHeadingAnimation() {

        if ($('.text-effect').length) {
            var textheading = $(".text-effect");

            if (textheading.length === 0) return; gsap.registerPlugin(SplitText); textheading.each(function (index, el) {

                el.split = new SplitText(el, {
                    type: "lines,words,chars",
                    linesClass: "split-line"
                });

                if ($(el).hasClass('text-effect')) {
                    gsap.set(el.split.chars, {
                        opacity: .3,
                        x: "-7",
                    });
                }
                el.anim = gsap.to(el.split.chars, {
                    scrollTrigger: {
                        trigger: el,
                        start: "top 92%",
                        end: "top 60%",
                        markers: false,
                        scrub: 1,
                    },

                    x: "0",
                    y: "0",
                    opacity: 1,
                    duration: .7,
                    stagger: 0.2,
                });

            });
        }

        if ($('.text-anime-style-1').length) {
            let staggerAmount = 0.05,
                translateXValue = 0,
                delayValue = 0.5,
                animatedTextElements = document.querySelectorAll('.text-anime-style-1');

            animatedTextElements.forEach((element) => {
                let animationSplitText = new SplitText(element, { type: "chars, words" });
                gsap.from(animationSplitText.words, {
                    duration: 1,
                    delay: delayValue,
                    x: 20,
                    autoAlpha: 0,
                    stagger: staggerAmount,
                    scrollTrigger: { trigger: element, start: "top 85%" },
                });
            });
        }

        if ($('.text-anime-style-2').length) {
            let staggerAmount = 0.03,
                translateXValue = 20,
                delayValue = 0.1,
                easeType = "power2.out",
                animatedTextElements = document.querySelectorAll('.text-anime-style-2');

            animatedTextElements.forEach((element) => {
                let animationSplitText = new SplitText(element, { type: "chars, words" });
                gsap.from(animationSplitText.chars, {
                    duration: 1,
                    delay: delayValue,
                    x: translateXValue,
                    autoAlpha: 0,
                    stagger: staggerAmount,
                    ease: easeType,
                    scrollTrigger: { trigger: element, start: "top 85%" },
                });
            });
        }

        // Vanilla-JS replacement for GSAP's SplitText plugin.
        // Wraps every character in its own <span>, recursing into any
        // nested tags (links, spans, etc.) so markup inside the heading
        // is preserved. No paid/club plugin required.
        function splitCharsVanilla(el) {
            if (!el.dataset.originalHtml) {
                el.dataset.originalHtml = el.innerHTML;
            } else {
                el.innerHTML = el.dataset.originalHtml;
            }

            const chars = [];

            function walk(node) {
                Array.from(node.childNodes).forEach((child) => {
                    if (child.nodeType === Node.TEXT_NODE) {
                        const frag = document.createDocumentFragment();
                        child.textContent.split(/(\s+)/).forEach((piece) => {
                            if (piece === "") return;
                            if (/^\s+$/.test(piece)) {
                                frag.appendChild(document.createTextNode(piece));
                                return;
                            }
                            const wordSpan = document.createElement("span");
                            wordSpan.style.display = "inline-block";
                            [...piece].forEach((ch) => {
                                const charSpan = document.createElement("span");
                                charSpan.style.display = "inline-block";
                                charSpan.textContent = ch;
                                wordSpan.appendChild(charSpan);
                                chars.push(charSpan);
                            });
                            frag.appendChild(wordSpan);
                        });
                        node.replaceChild(frag, child);
                    } else if (child.nodeType === Node.ELEMENT_NODE) {
                        walk(child);
                    }
                });
            }

            walk(el);
            return chars;
        }

        if ($('.text-anime-style-3').length) {
            let animatedTextElements = document.querySelectorAll('.text-anime-style-3');

            animatedTextElements.forEach((element) => {
                //Reset if needed
                if (element.animation) {
                    element.animation.progress(1).kill();
                }

                const chars = splitCharsVanilla(element);
                element.split = { chars };
                gsap.set(element, { perspective: 400 });

                gsap.set(chars, {
                    opacity: 0,
                    x: "50",
                });

                element.animation = gsap.to(chars, {
                    scrollTrigger: { trigger: element, start: "top 90%" },
                    x: "0",
                    y: "0",
                    rotateX: "0",
                    opacity: 1,
                    duration: 1,
                    ease: Back.easeOut,
                    stagger: 0.02,
                });
            });
        }
    }

    if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(() => {
            initHeadingAnimation();
        });
    } else {
        window.addEventListener("load", initHeadingAnimation);
    }

    /* Init Counter */
    if ($('.counter').length) {
        $('.counter').counterUp({ delay: 6, time: 3000 });
    }


    /* ============================================ */
    /* Additional code merged in from page-specific JS files */
    /* ============================================ */


    /* --- from 1function.js --- */
    /* Testimonial Slider JS */
    if ($('.testimonial-slider-1').length) {
        const testimonial_slider = new Swiper('.testimonial-slider-1 .swiper', {
            slidesPerView: 1,
            speed: 1500,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                },
                1300: {
                    slidesPerView: 2,
                }
            }
        });
    }

    /* Testimonial Slider Ultra JS */
    if ($('.testimonial-slider-ultra-1').length) {
        const testimonial_slider_ultra = new Swiper('.testimonial-slider-ultra-1 .swiper', {
            slidesPerView: 1,
            speed: 1500,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
            }
        });
    }

    /* Company Support Slider Ultra JS */
    if ($('.company-supports-slider-ultra-1').length) {
        const company_supports_slider_ultra = new Swiper('.company-supports-slider-ultra-1 .swiper', {
            slidesPerView: 2,
            speed: 2000,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
            },
            breakpoints: {
                767: {
                    slidesPerView: 4,
                },
                1025: {
                    slidesPerView: 5,
                }
            }
        });
    }

    /* Skill Bar */
    if ($('.skills-progress-bar').length) {
        $('.skills-progress-bar').waypoint(function () {
            $('.skillbar').each(function () {
                $(this).find('.count-bar').animate({
                    width: $(this).attr('data-percent')
                }, 2000);
            });
        }, {
            offset: '70%'
        });
    }

    /* Youtube Background Video JS */
    if ($('#herovideo').length) {
        var myPlayer = $("#herovideo").YTPlayer();
    }

    /* Zoom Gallery screenshot */
    $('.gallery-items-1').magnificPopup({
        delegate: 'a',
        type: 'image',
        closeOnContentClick: false,
        closeBtnInside: false,
        mainClass: 'mfp-with-zoom',
        image: {
            verticalFit: true,
        },
        gallery: {
            enabled: true
        },
        zoom: {
            enabled: true,
            duration: 300, // don't foget to change the duration also in CSS
            opener: function (element) {
                return element.find('img');
            }
        }
    });

    /* Contact form validation */
    var $contactform = $("#contactForm-1");
    $contactform.validator({ focus: false }).on("submit", function (event) {
        if (!event.isDefaultPrevented()) {
            event.preventDefault();
            submitForm();
        }
    });

    function submitForm() {
        /* Ajax call to submit form */
        $.ajax({
            type: "POST",
            url: "form-process.php",
            data: $contactform.serialize(),
            success: function (text) {
                if (text === "success") {
                    formSuccess();
                } else {
                    submitMSG(false, text);
                }
            }
        });
    }

    function formSuccess() {
        $contactform[0].reset();
        submitMSG(true, "Message Sent Successfully!")
    }

    function submitMSG(valid, msg) {
        if (valid) {
            var msgClasses = "h4 text-success";
        } else {
            var msgClasses = "h4 text-danger";
        }
        $("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
    }
    /* Contact form validation end */

    /* Service Item List Start */
    var $service_item_list = $('.service-item-list-1');
    if ($service_item_list.length) {
        var $service_item = $service_item_list.find('.service-item');

        if ($service_item.length) {
            $service_item.on({
                mouseenter: function () {
                    if (!$(this).hasClass('active')) {
                        $service_item.removeClass('active');
                        $(this).addClass('active');
                    }
                },
                mouseleave: function () {
                    // Optional: Add logic for mouse leave if needed
                }
            });
        }
    }
    /* Service Item List End */

    /* How We Work Item List Start */
    var $how_work_item_list = $('.how-work-item-list-1');
    if ($how_work_item_list.length) {
        var $how_work_item = $how_work_item_list.find('.how-work-item');

        if ($how_work_item.length) {
            $how_work_item.on({
                mouseenter: function () {
                    if (!$(this).hasClass('active')) {
                        $how_work_item.removeClass('active');
                        $(this).addClass('active');
                    }
                },
                mouseleave: function () {
                    // Optional: Add logic for mouse leave if needed
                }
            });
        }
    }
    /* How We Work Item List End */

    /* Service Item List Prime Start */
    var $service_item_list_prime = $('.service-item-list-prime-1');
    if ($service_item_list_prime.length) {
        var $service_item_prime = $service_item_list_prime.find('.service-item-prime');

        if ($service_item_prime.length) {
            $service_item_prime.on({
                mouseenter: function () {
                    if (!$(this).hasClass('active')) {
                        $service_item_prime.removeClass('active');
                        $(this).addClass('active');
                    }
                },
                mouseleave: function () {
                    // Optional: Add logic for mouse leave if needed
                }
            });
        }
    }
    /* Service Item List Prime End */


    /* --- from 2function.js --- */
    /* Company Support Slider JS */
    if ($('.company-supports-slider').length) {
        const company_supports_slider = new Swiper('.company-supports-slider .swiper', {
            slidesPerView: 2,
            speed: 2000,
            spaceBetween: 20,
            loop: true,
            autoplay: {
                delay: 5000,
            },
            breakpoints: {
                767: {
                    slidesPerView: 3,
                },
                1024: {
                    slidesPerView: 4,
                },
                1440: {
                    slidesPerView: 5,
                }
            }
        });
    }

    /* testimonial Slider JS */
    if ($('.testimonial-slider-2').length) {
        const testimonial_slider = new Swiper('.testimonial-slider-2 .swiper', {
            slidesPerView: 1,
            speed: 1500,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
            },
            pagination: {
                el: '.testimonial-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.testimonial-button-next',
                prevEl: '.testimonial-button-prev',
            },
            breakpoints: {
                768: {
                    slidesPerView: 1,
                },
            }
        });
    }

    /* Project Amenity Item Slider JS */
    if ($('.project-amenity-item-slider').length) {
        const testimonial_slider = new Swiper('.project-amenity-item-slider .swiper', {
            slidesPerView: 1,
            speed: 1000,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
            },
            pagination: {
                el: '.project-amenity-pagination',
                clickable: true,
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                },
                1024: {
                    slidesPerView: 2,
                },
                1440: {
                    slidesPerView: 3,
                }
            }
        });
    }

    /* testimonial Slider Moon JS */
    if ($('.testimonial-slider-moon-2').length) {
        const testimonial_slider_moon = new Swiper('.testimonial-slider-moon-2 .swiper', {
            slidesPerView: 1,
            speed: 1000,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                },

                1025: {
                    slidesPerView: 3,
                },
            }
        });
    }

    /* testimonial Slider Moon JS */
    if ($('.testimonial-slider-prime-2').length) {
        const testimonial_slider_prime = new Swiper('.testimonial-slider-prime-2 .swiper', {
            slidesPerView: 1,
            speed: 1000,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
            },
            pagination: {
                el: '.testimonial-pagination-prime',
                clickable: true,
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                },

                1025: {
                    slidesPerView: 3,
                },
            }
        });
    }

    /* Contact form validation */
    var $contactform = $("#contactForm-2");
    $contactform.validator({ focus: false }).on("submit", function (event) {
        if (!event.isDefaultPrevented()) {
            event.preventDefault();
            submitForm();
        }
    });

    /* Amenity Item List Start */
    var $amenity_item_list = $('.amenity-item-list-2');
    if ($amenity_item_list.length) {
        var $amenity_item = $amenity_item_list.find('.amenity-item');

        if ($amenity_item.length) {
            $amenity_item.on({
                mouseenter: function () {
                    if (!$(this).hasClass('active')) {
                        $amenity_item.removeClass('active');
                        $(this).addClass('active');
                    }
                },
                mouseleave: function () {
                    // Optional: Add logic for mouse leave if needed
                }
            });
        }
    }
    /* Amenity Item List End */


    /* --- from 3function.js --- */
    /* Service Item Slider JS */
    if ($('.service-item-slider').length) {
        const service_item_slider = new Swiper('.service-item-slider .swiper', {
            slidesPerView: 1,
            speed: 2500,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
            },
            pagination: {
                el: '.service-pagination',
                clickable: true,
            },
            breakpoints: {
                767: {
                    slidesPerView: 2,
                },
                1025: {
                    slidesPerView: 3,
                },
            }
        });
    }

    /* Company Support Slider JS */
    if ($('.company-supports-slider').length) {
        const company_supports_slider = new Swiper('.company-supports-slider .swiper', {
            slidesPerView: 2,
            speed: 2000,
            spaceBetween: 20,
            loop: true,
            autoplay: {
                delay: 5000,
            },
            breakpoints: {
                767: {
                    slidesPerView: 4,
                },
            }
        });
    }

    /* Project Item Slider JS */
    if ($('.project-item-slider').length) {
        const project_item_slider = new Swiper('.project-item-slider .swiper', {
            slidesPerView: 1,
            speed: 2500,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
            },
            pagination: {
                el: '.project-pagination',
                clickable: true,
            },
            breakpoints: {
                767: {
                    slidesPerView: 2,
                },
                1025: {
                    slidesPerView: 3,
                },
            }
        });
    }

    /* Testimonial Slider JS */
    if ($('.testimonial-slider-3').length) {
        const testimonial_slider = new Swiper('.testimonial-slider-3 .swiper', {
            slidesPerView: 1,
            speed: 1500,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
            },
            pagination: {
                el: '.testimonial-pagination',
                clickable: true,
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                },
                1025: {
                    slidesPerView: 3,
                }
            }
        });
    }

    /* Company Support Slider JS */
    if ($('.company-supports-slider-prime').length) {
        const company_supports_slider = new Swiper('.company-supports-slider-prime .swiper', {
            slidesPerView: 2,
            speed: 2000,
            spaceBetween: 20,
            loop: true,
            autoplay: {
                delay: 5000,
            },
            breakpoints: {
                767: {
                    slidesPerView: 3,
                },
                1025: {
                    slidesPerView: 4,
                }
            }
        });
    }

    /* Testimonial Slider JS */
    if ($('.testimonial-slider-prime-3').length) {
        const testimonial_slider_prime = new Swiper('.testimonial-slider-prime-3 .swiper', {
            slidesPerView: 1,
            speed: 1500,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                },
                1300: {
                    slidesPerView: 2,
                }
            }
        });
    }

    /* Testimonial Slider JS */
    if ($('.testimonial-slider-gold-3').length) {
        const testimonial_slider_prime = new Swiper('.testimonial-slider-gold-3 .swiper', {
            slidesPerView: 1,
            speed: 1500,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
            },
            navigation: {
                nextEl: '.testimonial-button-next-gold',
                prevEl: '.testimonial-button-prev-gold',
            },
        });
    }

    /* Progress Bar */
    if ($('.circle').length) {
        $('.circle').each(function () {
            var el = $(this).circleProgress({ value: 0 });

            var rawValue = $(this).data('value');
            var progressValue = rawValue >= 1 ? 1 : rawValue;
            var progressBarOptions = {
                startAngle: -1.6,
                thickness: 4,
                fill: {
                    color: window.getComputedStyle($(this)[0]).color
                }
            };

            new Waypoint({
                element: el.get(0),
                handler: function () {
                    // Initialize the progress bar
                    el.circleProgress($.extend({}, progressBarOptions, {
                        value: el.data('value')
                    })).on('circle-animation-progress', function (event, progress, stepValue) {

                        var displayValue = Math.round(stepValue * 100);
                        $(this).find('.progress_value .pro_data').text(displayValue);
                    });

                    this.destroy();
                },
                offset: '80%'
            });
        });
    }

    /* Contact form validation */
    var $contactform = $("#contactForm");
    $contactform.validator({ focus: false }).on("submit", function (event) {
        if (!event.isDefaultPrevented()) {
            event.preventDefault();
            submitForm();
        }
    });


    /* --- from 4function.js --- */
    /* Activities Slider JS */
    if ($('.activities-slider').length) {
        const activities_slider = new Swiper('.activities-slider .swiper', {
            slidesPerView: 1,
            speed: 1000,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
            },
            pagination: {
                el: '.activities-pagination',
                clickable: true,
            },
            breakpoints: {
                767: {
                    slidesPerView: 2,
                },
                991: {
                    slidesPerView: 3,
                },
                1025: {
                    slidesPerView: 4,
                }
            }
        });
    }

    /* testimonial Slider JS */
    if ($('.testimonial-slider-4').length) {
        const testimonial_slider = new Swiper('.testimonial-slider-4 .swiper', {
            slidesPerView: 1,
            speed: 1500,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
            },
            pagination: {
                el: '.testimonial-pagination',
                clickable: true,
            },
            breakpoints: {
                768: {
                    slidesPerView: 1,
                },
                991: {
                    slidesPerView: 1,
                }
            }
        });
    }

    /* Company Support Slider JS */
    if ($('.company-supports-slider-metal').length) {
        const company_supports_slider_metal = new Swiper('.company-supports-slider-metal .swiper', {
            slidesPerView: 2,
            speed: 2000,
            spaceBetween: 20,
            loop: true,
            autoplay: {
                delay: 5000,
            },
            breakpoints: {
                767: {
                    slidesPerView: 4,
                },
                1025: {
                    slidesPerView: 5,
                }
            }
        });
    }

    /* Our Departments Slider Metal JS */
    if ($('.our-departments-slider-metal').length) {
        const our_departments_slider_metal = new Swiper('.our-departments-slider-metal .swiper', {
            slidesPerView: 1,
            speed: 1000,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
            },
            pagination: {
                el: '.our-departments-pagination',
                clickable: true,
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                },
                991: {
                    slidesPerView: 3,
                },
                1300: {
                    slidesPerView: 4,
                }
            }
        });
    }

    /* Testimonial Slider Metal JS */
    if ($('.testimonial-slider-metal-4').length) {
        const testimonial_slider_metal = new Swiper('.testimonial-slider-metal-4 .swiper', {
            slidesPerView: 1,
            speed: 1000,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                },
                991: {
                    slidesPerView: 2,
                }
            }
        });
    }

    /* testimonial Slider JS */
    if ($('.testimonial-slider-prime-4').length) {
        const testimonial_slider_prime = new Swiper('.testimonial-slider-prime-4 .swiper', {
            slidesPerView: 1,
            speed: 1000,
            spaceBetween: 20,
            loop: true,
            autoplay: {
                delay: 5000,
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                }
            }
        });
    }

    /* Company Support Slider Prime JS */
    if ($('.company-supports-slider-prime').length) {
        const company_supports_slider_prime = new Swiper('.company-supports-slider-prime .swiper', {
            slidesPerView: 2,
            speed: 2000,
            spaceBetween: 20,
            loop: true,
            autoplay: {
                delay: 5000,
            },
            breakpoints: {
                767: {
                    slidesPerView: 4,
                },
                1025: {
                    slidesPerView: 5,
                }
            }
        });
    }

    /* Program Item List Start */
    var $why_we_stand_item_list_metal = $('.why-we-stand-item-list-metal');
    if ($why_we_stand_item_list_metal.length) {
        var $why_we_stand_item_metal = $why_we_stand_item_list_metal.find('.why-we-stand-item-metal');

        if ($why_we_stand_item_metal.length) {
            $why_we_stand_item_metal.on({
                mouseenter: function () {
                    if (!$(this).hasClass('active')) {
                        $why_we_stand_item_metal.removeClass('active');
                        $(this).addClass('active');
                    }
                },
                mouseleave: function () {
                    // Optional: Add logic for mouse leave if needed
                }
            });
        }
    }
    /* Program Item List End */


    /* --- from 5function.js --- */
    /* Company Support Slider JS */
    if ($('.company-supports-slider').length) {
        const company_supports_slider = new Swiper('.company-supports-slider .swiper', {
            slidesPerView: 2,
            speed: 2000,
            spaceBetween: 20,
            loop: true,
            autoplay: {
                delay: 5000,
            },
            breakpoints: {
                767: {
                    slidesPerView: 3,
                },
                1025: {
                    slidesPerView: 4,
                }
            }
        });
    }

    /* Testimonial Slider JS */
    if ($('.testimonial-slider-5').length) {
        const testimonial_slider = new Swiper('.testimonial-slider-5 .swiper', {
            slidesPerView: 1,
            speed: 1500,
            spaceBetween: 40,
            loop: true,
            autoplay: {
                delay: 5000,
            },
            breakpoints: {
                768: {
                    slidesPerView: 1,
                },
                1300: {
                    slidesPerView: 1,
                }
            },
            navigation: {
                nextEl: '.testimonial-button-next',
                prevEl: '.testimonial-button-prev',
            },
        });
    }

    /* Service Item Slider Prime JS */
    if ($('.service-item-slider-prime').length) {
        const service_item_slider_prime = new Swiper('.service-item-slider-prime .swiper', {
            slidesPerView: 1,
            speed: 2500,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
            },
            pagination: {
                el: '.service-pagination-prime',
                clickable: true,
            },
            breakpoints: {
                767: {
                    slidesPerView: 2,
                },
                1366: {
                    slidesPerView: 3,
                }
            }
        });
    }

    /* Testimonial Slider Prime JS */
    if ($('.testimonial-slider-prime-5').length) {
        const testimonial_slider_prime = new Swiper('.testimonial-slider-prime-5 .swiper', {
            slidesPerView: 1,
            speed: 1500,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                },
                1300: {
                    slidesPerView: 3,
                }
            }
        });
    }

    /* Testimonial Slider Stone JS */
    if ($('.testimonial-slider-stone-5').length) {
        const testimonial_slider_stone = new Swiper('.testimonial-slider-stone-5 .swiper', {
            slidesPerView: 1,
            speed: 1500,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                },
                1300: {
                    slidesPerView: 3,
                }
            }
        });
    }

    /* Service Item List Stone Start */
    var $service_item_list_stone = $('.service-item-list-stone');
    if ($service_item_list_stone.length) {
        var $service_item_stone = $service_item_list_stone.find('.service-item-stone');

        if ($service_item_stone.length) {
            $service_item_stone.on({
                mouseenter: function () {
                    if (!$(this).hasClass('active')) {
                        $service_item_stone.removeClass('active');
                        $(this).addClass('active');
                    }
                },
                mouseleave: function () {
                    // Optional: Add logic for mouse leave if needed
                }
            });
        }
    }
    /* Service Item List Stone End */


    /* --- from 6function.js --- */
    /* Interactive Process Layout Start */
    var element = $('.interactive');
    if (element.hasClass('interactive-process-layout')) {
        var items = element.find('.interactive-inner-process');
        if (items.length) {
            items.on({
                mouseenter: function () {
                    var index = $(this).data('index'),
                        targetImg = element.find(`.interactive-process-image.img-${index}`);

                    if ($(this).hasClass('activate')) return;

                    items.removeClass('activate');
                    $(this).addClass('activate');

                    element.find('.interactive-process-image').removeClass('show');
                    targetImg.addClass('show');
                },
                mouseleave: function () {
                    //stuff to do on mouse leave
                }
            });
        }
    }
    /* Interactive Process Layout End */

    /* Service Slider JS */
    if ($('.service-slider').length) {
        const service_slider = new Swiper('.service-slider .swiper', {
            slidesPerView: 1,
            speed: 1500,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
            },
            pagination: {
                el: '.service-pagination',
                clickable: true,
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                },
                1300: {
                    slidesPerView: 3,
                }
            }
        });
    }

    /* Ministries Slider JS */
    if ($('.ministries-slider').length) {
        const service_slider = new Swiper('.ministries-slider .swiper', {
            slidesPerView: 1,
            speed: 1500,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
            },
            pagination: {
                el: '.ministries-pagination',
                clickable: true,
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                },
                1300: {
                    slidesPerView: 3,
                }
            }
        });
    }

    /* Testimonial Slider JS */
    if ($('.testimonial-slider-6').length) {
        const testimonial_slider = new Swiper('.testimonial-slider-6 .swiper', {
            slidesPerView: 1,
            speed: 1500,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
            },
            navigation: {
                nextEl: '.testimonial-button-next',
                prevEl: '.testimonial-button-prev',
            },
            breakpoints: {
                768: {
                    slidesPerView: 1,
                },
            }
        });
    }

    /* testimonial Slider Royal JS */
    if ($('.testimonial-slider-royal-6').length) {
        const testimonial_slider_royal = new Swiper('.testimonial-slider-royal-6 .swiper', {
            slidesPerView: 1,
            speed: 1500,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
            },
            navigation: {
                nextEl: '.testimonial-button-next-royal',
                prevEl: '.testimonial-button-prev-royal',
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                },
                1300: {
                    slidesPerView: 3,
                }
            }
        });
    }

    /* Company Supports Slider stone JS */
    if ($('.company-supports-slider-stone').length) {
        const company_supports_slider_stone = new Swiper('.company-supports-slider-stone .swiper', {
            slidesPerView: 2,
            speed: 1500,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
            },
            breakpoints: {
                768: {
                    slidesPerView: 4,
                },
                1300: {
                    slidesPerView: 5,
                }
            }
        });
    }

    /* Testimonial Slider Stone JS */
    if ($('.testimonial-slider-stone-6').length) {
        const testimonial_slider_stone = new Swiper('.testimonial-slider-stone-6 .swiper', {
            slidesPerView: 1,
            speed: 1500,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                },
                1300: {
                    slidesPerView: 3,
                }
            }
        });
    }

    /* Audio JS */
    const player = new Plyr('#player');

    /* What We Item List Start */
    var $what_we_item_list = $('.what-we-item-list');
    if ($what_we_item_list.length) {
        var $what_we_item = $what_we_item_list.find('.what-we-item');

        if ($what_we_item.length) {
            $what_we_item.on({
                mouseenter: function () {
                    if (!$(this).hasClass('active')) {
                        $what_we_item.removeClass('active');
                        $(this).addClass('active');
                    }
                },
                mouseleave: function () {
                    // Optional: Add logic for mouse leave if needed
                }
            });
        }
    }
    /* What We Item List End */


    /* --- from 7function.js --- */
    /* Services Slider JS */
    if ($('.service-item-slider').length) {
        const service_item_slider = new Swiper('.service-item-slider .swiper', {
            slidesPerView: 1,
            speed: 2000,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
            },
            pagination: {
                el: '.service-pagination',
                clickable: true,
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                },
                1025: {
                    slidesPerView: 3,
                }
            }
        });
    }

    /* Project Slider JS */
    if ($('.project-slider').length) {
        const project_slider = new Swiper('.project-slider .swiper', {
            slidesPerView: 1,
            speed: 2000,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
            },
            pagination: {
                el: '.project-pagination',
                clickable: true,
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                },
                1300: {
                    slidesPerView: 3,
                }
            }
        });
    }

    /* Testimonial Slider Start */
    if ($('.testimonial-slider-7').length) {
        const testimonial_slider = new Swiper('.testimonial-slider-7 .swiper', {
            slidesPerView: 1,
            speed: 1500,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                },
                1025: {
                    slidesPerView: 3,
                }
            }
        });
    }

    /* Services Slider JS */
    if ($('.service-item-slider-elite').length) {
        const service_item_slider_elite = new Swiper('.service-item-slider-elite .swiper', {
            slidesPerView: 1,
            speed: 2000,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
            },
            pagination: {
                el: '.service-pagination-elite',
                clickable: true,
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                },
                1025: {
                    slidesPerView: 3,
                }
            }
        });
    }

    /* Testimonial Slider Elite JS */
    if ($('.testimonial-slider-elite-7').length) {
        const testimonial_slider_elite = new Swiper('.testimonial-slider-elite-7 .swiper', {
            slidesPerView: 1,
            speed: 1500,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                },
            }
        });
    }

    /* Our Pricing Tab Start  */
    if ($('.our-pricing-box').length) {
        $('#planToggle').change(function () {
            if ($(this).is(':checked')) {
                $('#monthly').addClass('d-none');
                $('#yearly').removeClass('d-none');
            }
            else {
                $('#yearly').addClass('d-none');
                $('#monthly').removeClass('d-none');
            }
        });
    }
    /* Our Pricing Tab JS End  */


    /* --- from 8function.js --- */
    /* testimonial Slider JS */
    if ($('.testimonial-slider-8').length) {
        const testimonial_slider = new Swiper('.testimonial-slider-8 .swiper', {
            slidesPerView: 1,
            speed: 1500,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
            },
            pagination: {
                el: '.testimonial-pagination',
                clickable: true,
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                },
                1025: {
                    slidesPerView: 3,
                },
            }
        });
    }

    /* testimonial Slider Elite JS */
    if ($('.testimonial-slider-elite-8').length) {
        const testimonial_slider = new Swiper('.testimonial-slider-elite-8 .swiper', {
            slidesPerView: 1,
            speed: 1500,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
            },
            pagination: {
                el: '.testimonial-pagination',
                clickable: true,
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                },
                1025: {
                    slidesPerView: 3,
                },
            }
        });
    }

    /* Company Support Slider Eliet JS */
    if ($('.company-supports-slider-elite').length) {
        const company_supports_slider_elite = new Swiper('.company-supports-slider-elite .swiper', {
            slidesPerView: 2,
            speed: 2000,
            spaceBetween: 20,
            loop: true,
            autoplay: {
                delay: 5000,
            },
            breakpoints: {
                767: {
                    slidesPerView: 4,
                },
                1025: {
                    slidesPerView: 5,
                }
            }
        });
    }

    /* testimonial Slider Prime JS */
    if ($('.testimonial-slider-prime-8').length) {
        const testimonial_slider = new Swiper('.testimonial-slider-prime-8 .swiper', {
            slidesPerView: 1,
            speed: 1500,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
            },
            pagination: {
                el: '.testimonial-pagination-prime',
                clickable: true,
            },
            breakpoints: {
                767: {
                    slidesPerView: 1,
                },
                990: {
                    slidesPerView: 2,
                },
                1025: {
                    slidesPerView: 2,
                },
            }
        });
    }

    /* Company Support Slider JS */
    if ($('.company-supports-slider-prime').length) {
        const company_supports_slider_prime = new Swiper('.company-supports-slider-prime .swiper', {
            slidesPerView: 2,
            speed: 2000,
            spaceBetween: 20,
            loop: true,
            autoplay: {
                delay: 5000,
            },
            breakpoints: {
                767: {
                    slidesPerView: 4,
                },
                1025: {
                    slidesPerView: 5,
                }
            }
        });
    }

    /* Appointment form validation */
    var $appointmentForm = $("#appointmentForm");
    $appointmentForm.validator({ focus: false }).on("submit", function (event) {
        if (!event.isDefaultPrevented()) {
            event.preventDefault();
            submitappointmentForm();
        }
    });

    function submitappointmentForm() {
        /* Ajax call to submit form */
        $.ajax({
            type: "POST",
            url: "form-appointment.php",
            data: $appointmentForm.serialize(),
            success: function (text) {
                if (text === "success") {
                    appointmentformSuccess();
                } else {
                    appointmentsubmitMSG(false, text);
                }
            }
        });
    }

    function appointmentformSuccess() {
        $appointmentForm[0].reset();
        appointmentsubmitMSG(true, "Message Sent Successfully!")
    }

    function appointmentsubmitMSG(valid, msg) {
        if (valid) {
            var msgClasses = "h3 text-success";
        } else {
            var msgClasses = "h3 text-danger";
        }
        $("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
    }
    /* Appointment form validation end */


    /* --- from 9function.js --- */
    /* Programs Slider JS */
    if ($('.programs-slider').length) {
        const programs_slider = new Swiper('.programs-slider .swiper', {
            slidesPerView: 1,
            speed: 2000,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
            },
            pagination: {
                el: '.programs-pagination',
                clickable: true,
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                },
                1025: {
                    slidesPerView: 3,
                }
            }
        });
    }

    /* Testimonial Slider JS */
    if ($('.testimonial-slider-9').length) {
        const testimonial_slider = new Swiper('.testimonial-slider-9 .swiper', {
            slidesPerView: 1,
            speed: 1500,
            spaceBetween: 50,
            loop: true,
            autoplay: {
                delay: 5000,
            },
            navigation: {
                nextEl: '.testimonial-button-next',
                prevEl: '.testimonial-button-prev',
            },
            breakpoints: {
                768: {
                    slidesPerView: 1,
                },
            }
        });
    }

    /* Volunteer Slider JS */
    if ($('.volunteer-slider').length) {
        const volunteer_slider = new Swiper('.volunteer-slider .swiper', {
            slidesPerView: 1,
            speed: 1500,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
            },
            pagination: {
                el: '.volunteer-pagination',
                clickable: true,
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                },
                1025: {
                    slidesPerView: 3,
                }
            }
        });
    }

    /* Testimonial Slider JS */
    if ($('.testimonial-slider-gold-9').length) {
        const testimonial_slider_gold = new Swiper('.testimonial-slider-gold-9 .swiper', {
            slidesPerView: 1,
            speed: 1500,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
            },
            pagination: {
                el: '.testimonial-pagination-gold',
                clickable: true,
            },
            breakpoints: {
                768: {
                    slidesPerView: 1,
                },
            }

        });
    }

    /* Testimonial Slider JS */
    if ($('.testimonial-slider-silver-9').length) {
        const testimonial_slider_silver = new Swiper('.testimonial-slider-silver-9 .swiper', {
            slidesPerView: 1,
            speed: 1500,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
            },
            navigation: {
                nextEl: '.testimonial-button-next-silver',
                prevEl: '.testimonial-button-prev-silver',
            },
            breakpoints: {
                768: {
                    slidesPerView: 1,
                },
            }
        });
    }

    /* Parallaxie js */
    /* var $parallaxie = $('.parallaxie');
    if($parallaxie.length && ($window.width() > 1024))
    {
        if ($window.width() > 768) {
            $parallaxie.parallaxie({
                speed: 0.55,
                offset: 0,
            });
        }
    } */

    /* Our Gallery (filtering) Start */
    $window.on("load", function () {
        if ($(".gallery-item-boxes-gold").length) {

            /* Init Isotope */
            var $menuitem = $(".gallery-item-boxes-gold").isotope({
                itemSelector: ".gallery-item-box-gold",
                layoutMode: "masonry",
                masonry: {
                    // use outer width of grid-sizer for columnWidth
                    columnWidth: 1,
                }
            });

            /* Filter items on click */
            var $menudisesnav = $(".our-gallery-nav li a");
            $menudisesnav.on('click', function (e) {

                var filterValue = $(this).attr('data-filter');
                $menuitem.isotope({
                    filter: filterValue
                });

                $menudisesnav.removeClass("active-btn");
                $(this).addClass("active-btn");
                e.preventDefault();
            });
            $menuitem.isotope({ filter: "*" });
        }
    });
    /* Our Gallery (filtering) End */


    /* --- from 10function.js --- */
    /* Testimonial Slider JS */
    if ($('.testimonial-slider-10').length) {
        const testimonial_slider = new Swiper('.testimonial-slider-10 .swiper', {
            slidesPerView: 1,
            speed: 1500,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
            },
            pagination: {
                el: '.testimonial-pagination',
                clickable: true,
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                },
                1300: {
                    slidesPerView: 3,
                }
            }
        });
    }

    /* Company Support Slider JS */
    if ($('.company-supports-slider').length) {
        const company_supports_slider = new Swiper('.company-supports-slider .swiper', {
            slidesPerView: 2,
            speed: 2000,
            spaceBetween: 20,
            loop: true,
            autoplay: {
                delay: 5000,
            },
            breakpoints: {
                767: {
                    slidesPerView: 4,
                },
                1025: {
                    slidesPerView: 5,
                }
            }
        });
    }

    /* Testimonial Slider JS */
    if ($('.testimonial-slider-silver-10').length) {
        const testimonial_slider_silver = new Swiper('.testimonial-slider-silver-10 .swiper', {
            slidesPerView: 1,
            speed: 1500,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
            },
            pagination: {
                el: '.testimonial-pagination',
                clickable: true,
            },

        });
    }

    /* Testimonial Slider JS */
    if ($('.testimonial-slider-gold-10').length) {
        const testimonial_slider_gold = new Swiper('.testimonial-slider-gold-10 .swiper', {
            slidesPerView: 1,
            speed: 2000,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
            },
            pagination: {
                el: '.testimonial-pagination',
                clickable: true,
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                },
                1025: {
                    slidesPerView: 3,
                }
            }
        });
    }

    /* How It Works List Start */
    var $how_work_item_list = $('.how-work-item-list');
    if ($how_work_item_list.length) {
        var $how_work_item = $how_work_item_list.find('.how-work-item');

        if ($how_work_item.length) {
            $how_work_item.on({
                mouseenter: function () {
                    if (!$(this).hasClass('active')) {
                        $how_work_item.removeClass('active');
                        $(this).addClass('active');
                    }
                },
                mouseleave: function () {
                    // Optional: Add logic for mouse leave if needed
                }
            });
        }
    }
    /* How It Works List End */


    /* --- from 11function.js --- */
    /* testimonial Slider JS */
    if ($('.testimonial-slider-11').length) {
        const testimonial_slider = new Swiper('.testimonial-slider-11 .swiper', {
            slidesPerView: 1,
            speed: 1500,
            spaceBetween: 50,
            loop: true,
            autoplay: {
                delay: 5000,
            },
            navigation: {
                nextEl: '.testimonial-button-next',
                prevEl: '.testimonial-button-prev',
            },
            breakpoints: {
                768: {
                    slidesPerView: 1,
                }
            }
        });
    }

    /* Company Support Slider JS */
    if ($('.company-supports-slider').length) {
        const company_supports_slider = new Swiper('.company-supports-slider .swiper', {
            slidesPerView: 2,
            speed: 2000,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
            },
            breakpoints: {
                767: {
                    slidesPerView: 3,
                },
                1024: {
                    slidesPerView: 5,
                }
            }
        });
    }

    /* Company Support Slider Prime JS */
    if ($('.company-supports-slider-prime').length) {
        const company_supports_slider_prime = new Swiper('.company-supports-slider-prime .swiper', {
            slidesPerView: 2,
            speed: 2000,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
            },
            breakpoints: {
                767: {
                    slidesPerView: 4,
                },
                1025: {
                    slidesPerView: 6,
                },
                1440: {
                    slidesPerView: 8,
                }

            }
        });
    }

    /* testimonial Slider Prime JS */
    if ($('.testimonial-slider-prime-11').length) {
        const testimonial_slider_prime = new Swiper('.testimonial-slider-prime-11 .swiper', {
            slidesPerView: 1,
            speed: 2000,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 4000,
            },
            navigation: {
                nextEl: '.testimonial-button-next-prime',
                prevEl: '.testimonial-button-prev-prime',
            }
        });
    }

    /* Progress Bar */
    if ($('.circle').length) {
        $('.circle').each(function () {
            var el = $(this).circleProgress({ value: 0 });

            var rawValue = $(this).data('value');
            var progressValue = rawValue >= 1 ? 1 : rawValue;
            var progressBarOptions = {
                startAngle: -1.6,
                thickness: 3,
                fill: {
                    color: window.getComputedStyle($(this)[0]).color
                }
            };

            new Waypoint({
                element: el.get(0),
                handler: function () {
                    // Initialize the progress bar
                    el.circleProgress($.extend({}, progressBarOptions, {
                        value: el.data('value')
                    })).on('circle-animation-progress', function (event, progress, stepValue) {

                        var displayValue = Math.round(stepValue * 100);
                        $(this).find('.progress_value .pro_data').text(displayValue);
                    });

                    this.destroy();
                },
                offset: '80%'
            });
        });
    }

    /* Program Item List Start */
    var $program_item_list = $('.program-item-list');
    if ($program_item_list.length) {
        var $program_item = $program_item_list.find('.program-item');

        if ($program_item.length) {
            $program_item.on({
                mouseenter: function () {
                    if (!$(this).hasClass('active')) {
                        $program_item.removeClass('active');
                        $(this).addClass('active');
                    }
                },
                mouseleave: function () {
                    // Optional: Add logic for mouse leave if needed
                }
            });
        }
    }
    /* Program Item List End */


    /* --- from 12function.js --- */
    /* Testimonial Slider JS */
    if ($('.testimonial-slider-12').length) {
        const testimonial_slider = new Swiper('.testimonial-slider-12 .swiper', {
            slidesPerView: 1,
            speed: 1500,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
            },
            pagination: {
                el: '.testimonial-pagination',
                clickable: true,
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                }
            }
        });
    }

    /* Testimonial Slider Metal JS */
    if ($('.testimonial-slider-metal-12').length) {
        const testimonial_slider_metal = new Swiper('.testimonial-slider-metal-12 .swiper', {
            slidesPerView: 1,
            speed: 1500,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
            },
            navigation: {
                nextEl: '.testimonial-button-next-metal',
                prevEl: '.testimonial-button-prev-metal',
            },
        });
    }

    /* Company Support Slider Stone JS */
    if ($('.company-supports-slider-stone').length) {
        const company_supports_slider_stone = new Swiper('.company-supports-slider-stone .swiper', {
            slidesPerView: 2,
            speed: 2000,
            spaceBetween: 40,
            loop: true,
            autoplay: {
                delay: 5000,
            },
            breakpoints: {
                768: {
                    slidesPerView: 3,
                }
            }
        });
    }

    /* Expertise Company Support Slider  Stone JS */
    if ($('.expertise-company-supports-slider-stone').length) {
        const company_supports_slider = new Swiper('.expertise-company-supports-slider-stone .swiper', {
            slidesPerView: 2,
            speed: 2000,
            spaceBetween: 20,
            loop: true,
            autoplay: {
                delay: 5000,
            },
            breakpoints: {
                767: {
                    slidesPerView: 4,
                },
                1025: {
                    slidesPerView: 5,
                }
            }
        });
    }

    /* Case Study Slider Stone JS */
    if ($('.case-study-slider-stone').length) {
        const case_study_slider_stone = new Swiper('.case-study-slider-stone .swiper', {
            slidesPerView: 1,
            speed: 2500,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
            },
            pagination: {
                el: '.case-study-pagination-stone',
                clickable: true,
            },
            breakpoints: {
                767: {
                    slidesPerView: 2,
                },
                1025: {
                    slidesPerView: 3,
                },
            }
        });
    }

    /* Testimonial Slider Stone JS */
    if ($('.testimonial-slider-stone-12').length) {
        const testimonial_slider_stone = new Swiper('.testimonial-slider-stone-12 .swiper', {
            slidesPerView: 1,
            speed: 1500,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
            },
            pagination: {
                el: '.testimonials-pagination-stone',
                clickable: true,
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                },
                1025: {
                    slidesPerView: 3,
                }
            }
        });
    }

    /* Service Item List Metal Start */
    var $service_item_list_metal = $('.service-item-list-metal');
    if ($service_item_list_metal.length) {
        var $service_item_metal = $service_item_list_metal.find('.service-item-metal');

        if ($service_item_metal.length) {
            $service_item_metal.on({
                mouseenter: function () {
                    if (!$(this).hasClass('active')) {
                        $service_item_metal.removeClass('active');
                        $(this).addClass('active');
                    }
                },
                mouseleave: function () {
                    // Optional: Add logic for mouse leave if needed
                }
            });
        }
    }
    /* Service Item List Metal End */


    /* --- from 13function.js --- */
    /* Hero Image Slider JS */
    const hero_image_slider = new Swiper('.hero-image-slider .swiper', {
        effect: 'fade',
        slidesPerView: 1,
        speed: 1000,
        spaceBetween: 0,
        loop: true,
        autoplay: {
            delay: 4000,
        }
    });

    /* Testimonial Slider JS */
    if ($('.testimonials-slider-13').length) {
        const testimonials_slider = new Swiper('.testimonials-slider-13 .swiper', {
            slidesPerView: 1,
            speed: 1500,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
            },
            breakpoints: {
                768: {
                    slidesPerView: 1,
                },
                1300: {
                    slidesPerView: 2,
                }
            }
        });
    }

    /* Photo Gallery Slider Royal JS */
    if ($('.photo-gallery-slider').length) {
        const photo_gallery_slider = new Swiper('.photo-gallery-slider .swiper', {
            slidesPerView: 2,
            speed: 1500,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
            },
            pagination: {
                el: '.photo-gallery-pagination',
                clickable: true,
            },
            breakpoints: {
                768: {
                    slidesPerView: 3,
                },
                1024: {
                    slidesPerView: 4,
                }
            }
        });
    }

    if ($('.skills-progress-bar').length) {
        $('.skills-progress-bar').waypoint(function () {

            // ─── HORIZONTAL: animate WIDTH ───
            $('.skillbar').each(function () {
                $(this).find('.count-bar').animate({
                    width: $(this).attr('data-percent')
                }, 2000);
            });

            // ─── VERTICAL: animate HEIGHT ───
            $('.skillbar-vertical').each(function () {
                $(this).find('.count-bar-vertical').animate({
                    height: $(this).attr('data-percent')
                }, 2000);
            });

        }, {
            offset: '70%'
        });
    }


    /* --- from 14function.js --- */
    if ($("a[href='#top']").length) {
        $(document).on("click", "a[href='#top']", function () {
            $("html, body").animate({ scrollTop: 0 }, "slow");
            return false;
        });
    }
    /* Typed subtitle */
    if ($('.typed-title').length) {
        $('.typed-title').typed({
            stringsElement: $('.typing-title'),
            backDelay: 2000,
            typeSpeed: 0,
            loop: true
        });
    }

    /* Portfolio Slider JS */
    if ($('.portfolio-slider').length) {
        const portfolio_slider = new Swiper('.portfolio-slider .swiper', {
            slidesPerView: 1,
            speed: 1500,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
            },
            pagination: {
                el: '.portfolio-pagination',
                clickable: true,
            },
            breakpoints: {
                767: {
                    slidesPerView: 2,
                },
            }
        });
    }

    /* Testimonial Slider JS */
    if ($('.testimonial-slider-14').length) {
        const testimonial_slider = new Swiper('.testimonial-slider-14 .swiper', {
            slidesPerView: 1,
            speed: 1500,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
            },
            pagination: {
                el: '.testimonial-pagination',
                clickable: true,
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                },
                1300: {
                    slidesPerView: 3,
                }
            }
        });
    }

    /* Average Rating Slider JS */
    if ($('.average-rating-slider').length) {
        const average_rating_slider = new Swiper('.average-rating-slider .swiper', {
            slidesPerView: 2,
            speed: 1500,
            spaceBetween: 30,
            loop: true,
            breakpoints: {
                768: {
                    slidesPerView: 3,
                },
                1300: {
                    slidesPerView: 4,
                }
            }
        });
    }

    /* testimonial Slider JS */
    if ($('.testimonial-slider-royal-14').length) {
        const testimonial_slider_royal = new Swiper('.testimonial-slider-royal-14 .swiper', {
            slidesPerView: 1,
            speed: 1500,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
            },
            pagination: {
                el: '.testimonial-pagination',
                clickable: true,
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                },
                1025: {
                    slidesPerView: 3,
                },
            }
        });
    }

    /* Testimonial Slider JS */
    if ($('.testimonial-slider-prime-14').length) {
        const testimonial_slider_prime = new Swiper('.testimonial-slider-prime-14 .swiper', {
            slidesPerView: 1,
            speed: 1500,
            spaceBetween: 60,
            loop: true,
            autoplay: {
                delay: 5000,
            },
            pagination: {
                el: '.testimonial-pagination-prime',
                clickable: true,
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                },
            }
        });
    }

    /* Technology Item List Prime Start */
    var $technology_item_list = $('.technology-item-list');
    if ($technology_item_list.length) {
        var $technology_item = $technology_item_list.find('.technology-item');

        if ($technology_item.length) {
            $technology_item.on({
                mouseenter: function () {
                    if (!$(this).hasClass('active')) {
                        $technology_item.removeClass('active');
                        $(this).addClass('active');
                    }
                },
                mouseleave: function () {
                    // Optional: Add logic for mouse leave if needed
                }
            });
        }
    }
    /* Technology Item List Prime End */


    /* --- from 15function.js --- */
    /* Testimonial Slider JS */
    if ($('.testimonial-slider-15').length) {
        const testimonial_slider = new Swiper('.testimonial-slider-15 .swiper', {
            slidesPerView: 1,
            speed: 2500,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
            },
            navigation: {
                nextEl: '.testimonial-button-next',
                prevEl: '.testimonial-button-prev',
            },
            breakpoints: {
                768: {
                    slidesPerView: 1,
                },
            }
        });
    }

    /* testimonial Slider Royal JS */
    if ($('.testimonial-slider-royal-15').length) {
        const testimonial_slider_royal = new Swiper('.testimonial-slider-royal-15 .swiper', {
            slidesPerView: 1,
            speed: 1500,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
            },
            navigation: {
                nextEl: '.testimonial-button-next-royal',
                prevEl: '.testimonial-button-prev-royal',
            },
            breakpoints: {
                768: {
                    slidesPerView: 1,
                },
            }
        });
    }

    /* Testimonial Slider Prime JS */
    if ($('.testimonial-slider-prime-15').length) {
        const testimonial_slider_prime = new Swiper('.testimonial-slider-prime-15 .swiper', {
            slidesPerView: 1,
            speed: 1500,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                },
                1300: {
                    slidesPerView: 3,
                }
            }
        });
    }

    /* Service Item List Start */
    var $service_item_list = $('.service-item-list');
    if ($service_item_list.length) {
        var $service_item = $service_item_list.find('.service-item');

        if ($service_item.length) {
            $service_item.on({
                mouseenter: function () {
                    if (!$(this).hasClass('active')) {
                        $service_item.removeClass('active');
                        $(this).addClass('active');
                    }
                },
                mouseleave: function () {
                    // Optional: Add logic for mouse leave if needed
                }
            });
        }
    }
    /* Service Item List End */


    /* --- from 16function.js --- */
    /* Company Support Slider JS */
    if ($('.company-logo-slider').length) {
        const company_logo_slider = new Swiper('.company-logo-slider .swiper', {
            slidesPerView: 2,
            speed: 2000,
            spaceBetween: 20,
            loop: true,
            autoplay: {
                delay: 5000,
            },
            breakpoints: {
                767: {
                    slidesPerView: 4,
                },
                1025: {
                    slidesPerView: 4,
                }
            }
        });
    }

    /* Fleets Slider JS */
    if ($('.fleets-slider').length) {
        const fleets_slider = new Swiper('.fleets-slider .swiper', {
            slidesPerView: 1,
            speed: 2000,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
            },
            pagination: {
                el: '.fleets-pagination',
                clickable: true,
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                },
                1300: {
                    slidesPerView: 3,
                }
            }
        });
    }

    /* Testimonial Slider JS */
    if ($('.testimonial-slider-16').length) {
        const testimonial_slider = new Swiper('.testimonial-slider-16 .swiper', {
            slidesPerView: 1,
            speed: 1500,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
            },
            pagination: {
                el: '.testimonial-pagination',
                clickable: true,
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                },
                1300: {
                    slidesPerView: 3,
                }
            }
        });
    }

    /* Testimonial Slider JS */
    if ($('.testimonial-slider-silver-16').length) {
        const testimonial_slider_silver = new Swiper('.testimonial-slider-silver-16 .swiper', {
            slidesPerView: 1,
            speed: 1500,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                },
                1300: {
                    slidesPerView: 3,
                }
            }
        });
    }

    /* Testimonial Slider JS */
    if ($('.testimonial-slider-gold-16').length) {
        const testimonial_slider_gold = new Swiper('.testimonial-slider-gold-16 .swiper', {
            slidesPerView: 1,
            speed: 1500,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
            },
            navigation: {
                nextEl: '.testimonial-button-next-gold',
                prevEl: '.testimonial-button-prev-gold',
            },

        });
    }

    /* Service Single Slider JS */
    if ($('.page-single-image-slider').length) {
        const page_single_image_slider = new Swiper('.page-single-image-slider .swiper', {
            slidesPerView: 1,
            speed: 2500,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
            },
            pagination: {
                el: '.page-single-image-pagination',
                clickable: true,
            }
        });
    }

    /* Appointment form validation */
    var $rentForm = $("#rentForm");
    $rentForm.validator({ focus: false }).on("submit", function (event) {
        if (!event.isDefaultPrevented()) {
            event.preventDefault();
            submitappointmentForm();
        }
    });

    function submitappointmentForm() {
        /* Ajax call to submit form */
        $.ajax({
            type: "POST",
            url: "form-car-rent.php",
            data: $rentForm.serialize(),
            success: function (text) {
                if (text === "success") {
                    appointmentformSuccess();
                } else {
                    appointmentsubmitMSG(false, text);
                }
            }
        });
    }


    /* --- from 17function.js --- */
    /* Testimonial Slider JS */
    if ($('.testimonial-slider-17').length) {
        const testimonial_slider = new Swiper('.testimonial-slider-17 .swiper', {
            slidesPerView: 1,
            speed: 1500,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                },
                1300: {
                    slidesPerView: 2,
                }
            }
        });
    }

    /* testimonial Slider JS */
    if ($('.testimonial-slider-royal-17').length) {
        const testimonial_slider_royal = new Swiper('.testimonial-slider-royal-17 .swiper', {
            slidesPerView: 1,
            speed: 1500,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
            },
            navigation: {
                nextEl: '.testimonial-button-next-royal',
                prevEl: '.testimonial-button-prev-royal',
            },
            breakpoints: {
                768: {
                    slidesPerView: 1,
                },
            }
        });
    }

    /* Testimonial Slider Prime JS */
    if ($('.testimonial-slider-prime-17').length) {
        const testimonial_slider_prime = new Swiper('.testimonial-slider-prime-17 .swiper', {
            slidesPerView: 1,
            speed: 1500,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                },
                1300: {
                    slidesPerView: 3,
                }
            }
        });
    }

    /* Our Pricing Tab JS Start  */
    if ($('.our-pricing-box').length) {
        $('#planToggle').change(function () {
            if ($(this).is(':checked')) {
                $('#monthly').addClass('d-none');
                $('#annually').removeClass('d-none');
            }
            else {
                $('#annually').addClass('d-none');
                $('#monthly').removeClass('d-none');
            }
        });
    }
    /* Our Pricing Tab JS End  */

    /* World Map Card Active Prime JS Start */
    if ($('.world-map-card-btn-prime').length) {
        $('.world-map-card-btn-prime').on('click', function () {
            var $cardItem = $(this).closest('.world-map-card-item-prime');
            $('.world-map-card-item-prime').removeClass('active');
            $cardItem.addClass('active');
        });
    }
    /* World Map Card Active Prime JS End */


    /* --- from 18function.js --- */
    /* Company Support Slider JS */
    if ($('.company-supports-slider').length) {
        const company_supports_slider = new Swiper('.company-supports-slider .swiper', {
            slidesPerView: 2,
            speed: 2000,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
            },
            breakpoints: {
                767: {
                    slidesPerView: 4,
                },
                1300: {
                    slidesPerView: 5,
                }
            }
        });
    }

    /* Testimonial Slider JS */
    if ($('.testimonial-slider-18').length) {
        const testimonial_slider = new Swiper('.testimonial-slider-18 .swiper', {
            slidesPerView: 1,
            speed: 1500,
            spaceBetween: 30,
            loop: false,
            rewind: true,
            autoplay: {
                delay: 5000,
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                },
                1300: {
                    slidesPerView: 2,
                }
            }
        });
    }

    /* Event Slider Slider JS */
    var swiper = new Swiper(".surfaces-img-item-gold", {
        spaceBetween: 15,
        slidesPerView: 3,
        loop: true,
        breakpoints: {
            767: {
                slidesPerView: 3,
                spaceBetween: 10,
            }
        }
    });

    var swiper2 = new Swiper(".surfaces-img-slider-gold", {
        spaceBetween: 10,
        effect: 'fade',
        loop: true,
        speed: 1000,
        autoplay: {
            delay: 3000,
        },
        thumbs: {
            swiper: swiper,
        },
    });

    /* Testimonial Slider Gold JS */
    if ($('.testimonial-slider-gold-18').length) {
        const testimonial_slider_gold = new Swiper('.testimonial-slider-gold-18 .swiper', {
            slidesPerView: 1,
            speed: 1500,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                },
                1300: {
                    slidesPerView: 3,
                }
            }
        });
    }

    /* Testimonial Slider Silver JS */
    if ($('.testimonial-slider-silver-18').length) {
        const testimonial_slider_silver = new Swiper('.testimonial-slider-silver-18 .swiper', {
            slidesPerView: 1,
            speed: 1500,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
            },
            breakpoints: {
                1300: {
                    slidesPerView: 2,
                }
            }
        });
    }

    /* Company Support Slider Silver JS */
    if ($('.company-supports-slider-silver').length) {
        const company_supports_slider_silver = new Swiper('.company-supports-slider-silver .swiper', {
            slidesPerView: 2,
            speed: 2000,
            spaceBetween: 20,
            loop: true,
            autoplay: {
                delay: 5000,
            },
            breakpoints: {
                767: {
                    slidesPerView: 4,
                },
                1440: {
                    slidesPerView: 5,
                }
            }
        });
    }

    /* Products Slider Silver JS */
    if ($('.product-slider-silver').length) {
        const product_slider_silver = new Swiper('.product-slider-silver .swiper', {
            slidesPerView: 1,
            speed: 2000,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
            },
            navigation: {
                nextEl: '.product-button-next-silver',
                prevEl: '.product-button-prev-silver',
            },
            breakpoints: {
                767: {
                    slidesPerView: 2,
                },
                1024: {
                    slidesPerView: 3,
                },
                1440: {
                    slidesPerView: 4,
                }
            }
        });
    }

    /* Zoom Product List Screenshot */
    $('.product-item-list').magnificPopup({
        delegate: 'a',
        type: 'image',
        closeOnContentClick: false,
        closeBtnInside: false,
        mainClass: 'mfp-with-zoom',
        zoom: {
            enabled: true,
            duration: 300, // don't foget to change the duration also in CSS
            opener: function (element) {
                return element.find('img');
            }
        }
    });

    /* Surface Item List Start */
    var $surface_item_list_silver = $('.surface-item-list-silver');
    if ($surface_item_list_silver.length) {
        var $surface_item_silver = $surface_item_list_silver.find('.surface-item-silver');

        if ($surface_item_silver.length) {
            $surface_item_silver.on({
                mouseenter: function () {
                    if (!$(this).hasClass('active')) {
                        $surface_item_silver.removeClass('active');
                        $(this).addClass('active');
                    }
                },
                mouseleave: function () {
                    // Optional: Add logic for mouse leave if needed
                }
            });
        }
    }
    /* Surface Item List End */


    /* --- from 19function.js --- */
    /* testimonial Slider JS */
    if ($('.testimonial-slider-19').length) {
        const testimonial_slider = new Swiper('.testimonial-slider-19 .swiper', {
            slidesPerView: 1,
            speed: 1500,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
            },
            pagination: {
                el: '.testimonial-pagination',
                clickable: true,
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                },
                1025: {
                    slidesPerView: 3,
                },
            }
        });
    }

    /* testimonial Slider JS */
    if ($('.testimonial-slider-elite-19').length) {
        const testimonial_slider_elite = new Swiper('.testimonial-slider-elite-19 .swiper', {
            slidesPerView: 1,
            speed: 2000,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
            },
            pagination: {
                el: '.testimonial-pagination',
                clickable: true,
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                },
                1025: {
                    slidesPerView: 3,
                },
            }
        });
    }

    /* testimonial Slider Prime JS */
    if ($('.testimonial-slider-prime-19').length) {
        const testimonial_slider_prime = new Swiper('.testimonial-slider-prime-19 .swiper', {
            slidesPerView: 1,
            speed: 2000,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
            },
            breakpoints: {
                768: {
                    slidesPerView: 1,
                },
                1025: {
                    slidesPerView: 2,
                }
            }
        });
    }

    /* Company Support Slider JS */
    if ($('.company-supports-slider-prime').length) {
        const company_supports_slider_prime = new Swiper('.company-supports-slider-prime .swiper', {
            slidesPerView: 2,
            speed: 2000,
            spaceBetween: 20,
            loop: true,
            autoplay: {
                delay: 5000,
            },
            breakpoints: {
                767: {
                    slidesPerView: 3,
                },
                1024: {
                    slidesPerView: 4,
                },
                1440: {
                    slidesPerView: 5,
                }
            }
        });
    }

    /* Core Features Item List Prime Start */
    var $core_features_item_list = $('.core-features-item-list');
    if ($core_features_item_list.length) {
        var $core_features_item = $core_features_item_list.find('.core-features-item');

        if ($core_features_item.length) {
            $core_features_item.on({
                mouseenter: function () {
                    if (!$(this).hasClass('active')) {
                        $core_features_item.removeClass('active');
                        $(this).addClass('active');
                    }
                },
                mouseleave: function () {
                    // Optional: Add logic for mouse leave if needed
                }
            });
        }
    }
    /* Core Features Item List Prime End */

    /* Approach Item List Prime Start */
    var $approach_item_list = $('.approach-item-list');
    if ($approach_item_list.length) {
        var $approach_item = $approach_item_list.find('.approach-item');

        if ($approach_item.length) {
            $approach_item.on({
                mouseenter: function () {
                    if (!$(this).hasClass('active')) {
                        $approach_item.removeClass('active');
                        $(this).addClass('active');
                    }
                },
                mouseleave: function () {
                    // Optional: Add logic for mouse leave if needed
                }
            });
        }
    }
    /* Approach Item List Prime End */

    /* Service Item List Prime Start */
    var $service_item_list_elite = $('.service-item-list-elite');
    if ($service_item_list_elite.length) {
        var $service_item_elite = $service_item_list_elite.find('.service-item-elite');

        if ($service_item_elite.length) {
            $service_item_elite.on({
                mouseenter: function () {
                    if (!$(this).hasClass('active')) {
                        $service_item_elite.removeClass('active');
                        $(this).addClass('active');
                    }
                },
                mouseleave: function () {
                    // Optional: Add logic for mouse leave if needed
                }
            });
        }
    }
    /* Service Item List Prime End */


    /* --- from 20function.js --- */
    /* Testimonial Slider JS */
    if ($('.testimonial-slider-20').length) {
        const testimonial_slider = new Swiper('.testimonial-slider-20 .swiper', {
            slidesPerView: 1,
            speed: 1500,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
            },
            navigation: {
                nextEl: '.product-button-next-silver',
                prevEl: '.product-button-prev-silver',
            },
            pagination: {
                el: '.testimonial-pagination',
                clickable: true,
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                },
                1300: {
                    slidesPerView: 3,
                }
            }
        });
    }

    /* testimonial Slider Gold JS */
    if ($('.testimonial-slider-gold-20').length) {
        const testimonial_slider_gold = new Swiper('.testimonial-slider-gold-20 .swiper', {
            slidesPerView: 1,
            speed: 1000,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
            },

            breakpoints: {
                768: {
                    slidesPerView: 2,
                },
                991: {
                    slidesPerView: 2,
                }
            }
        });
    }

    /* testimonial Slider Prime JS */
    if ($('.testimonial-slider-prime-20').length) {
        const testimonial_slider_prime = new Swiper('.testimonial-slider-prime-20 .swiper', {
            slidesPerView: 1,
            speed: 1500,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
            },
            pagination: {
                el: '.testimonial-pagination',
                clickable: true,
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                },
                1025: {
                    slidesPerView: 3,
                },
            }
        });
    }

    /* World Map Card Active JS Start */
    if ($('.world-map-card-btn').length) {
        $('.world-map-card-btn').on('click', function () {
            var $cardItem = $(this).closest('.world-map-card-item');
            $('.world-map-card-item').removeClass('active');
            $cardItem.addClass('active');
        });
    }
    /* World Map Card Active JS End */


    /* --- from 21function.js --- */
    /* Testimonial Slider JS */
    if ($('.testimonial-slider-21').length) {
        const testimonial_slider = new Swiper('.testimonial-slider-21 .swiper', {
            slidesPerView: 1,
            speed: 1500,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
            },
            navigation: {
                nextEl: '.product-button-next-silver',
                prevEl: '.product-button-prev-silver',
            },
            pagination: {
                el: '.testimonial-pagination',
                clickable: true,
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                },
                1300: {
                    slidesPerView: 3,
                }
            }
        });
    }

    /* testimonial Slider Gold JS */
    if ($('.testimonial-slider-gold-21').length) {
        const testimonial_slider_gold = new Swiper('.testimonial-slider-gold-21 .swiper', {
            slidesPerView: 1,
            speed: 1000,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
            },

            breakpoints: {
                768: {
                    slidesPerView: 2,
                },
                991: {
                    slidesPerView: 2,
                }
            }
        });
    }

    /* testimonial Slider Prime JS */
    if ($('.testimonial-slider-prime-21').length) {
        const testimonial_slider_prime = new Swiper('.testimonial-slider-prime-21 .swiper', {
            slidesPerView: 1,
            speed: 1500,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
            },
            pagination: {
                el: '.testimonial-pagination',
                clickable: true,
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                },
                1025: {
                    slidesPerView: 3,
                },
            }
        });
    }


    /* --- from 22function.js --- */
    /* Testimonial Slider JS */
    if ($('.testimonial-slider-22').length) {
        const testimonial_slider = new Swiper('.testimonial-slider-22 .swiper', {
            slidesPerView: 1,
            speed: 1500,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                },
                1300: {
                    slidesPerView: 3,
                }
            }
        });
    }

    /* Company Support Slider JS */
    if ($('.company-supports-slider').length) {
        const company_supports_slider = new Swiper('.company-supports-slider .swiper', {
            slidesPerView: 2,
            speed: 2000,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
            },
            breakpoints: {
                767: {
                    slidesPerView: 3,
                },
                991: {
                    slidesPerView: 4,
                },
                1025: {
                    slidesPerView: 5,
                }
            }
        });
    }

    /* Service Slider JS */
    if ($('.service-slider-elite').length) {
        const service_slider_elite = new Swiper('.service-slider-elite .swiper', {
            slidesPerView: 1,
            speed: 1500,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
            },
            pagination: {
                el: '.service-pagination-elite',
                clickable: true,
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                },
                1024: {
                    slidesPerView: 3,
                }
            }
        });
    }

    /* Testimonial Slider Elite JS */
    if ($('.testimonial-slider-elite-22').length) {
        const testimonial_slider_elite = new Swiper('.testimonial-slider-elite-22 .swiper', {
            slidesPerView: 1,
            speed: 1500,
            spaceBetween: 40,
            loop: true,
            autoplay: {
                delay: 5000,
            },
            breakpoints: {
                768: {
                    slidesPerView: 1,
                },
                1300: {
                    slidesPerView: 1,
                }
            },
            navigation: {
                nextEl: '.testimonial-button-next-elite',
                prevEl: '.testimonial-button-prev-elite',
            },
        });
    }

    /* Company Support Slider Elite JS */
    if ($('.company-supports-slider-elite').length) {
        const company_supports_slider_elite = new Swiper('.company-supports-slider-elite .swiper', {
            slidesPerView: 2,
            speed: 2000,
            spaceBetween: 20,
            loop: true,
            autoplay: {
                delay: 5000,
            },
            breakpoints: {
                767: {
                    slidesPerView: 3,
                },
                991: {
                    slidesPerView: 4,
                },
                1025: {
                    slidesPerView: 5,
                }
            }
        });
    }

    /* Testimonial Slider Royal JS */
    if ($('.testimonial-slider-royal-22').length) {
        const testimonial_slider_royal = new Swiper('.testimonial-slider-royal-22 .swiper', {
            slidesPerView: 1,
            speed: 1500,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                },
                1300: {
                    slidesPerView: 3,
                }
            },
        });
    }


    /* --- from 23function.js --- */
    /* Testimonial Slider JS */
    if ($('.testimonial-slider-23').length) {
        const testimonial_slider = new Swiper('.testimonial-slider-23 .swiper', {
            slidesPerView: 1,
            speed: 1500,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                },
                1300: {
                    slidesPerView: 3,
                }
            }
        });
    }

    /* Transformation Slider Royal JS */
    if ($('.transformation-slider-royal').length) {
        const transformation_slider_royal = new Swiper('.transformation-slider-royal .swiper', {
            slidesPerView: 1,
            speed: 1500,
            spaceBetween: 30,
            loop: true,
            allowTouchMove: false,
            autoplay: {
                delay: 5000,
            },
            pagination: {
                el: '.transformation-pagination-royal',
                clickable: true,
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                }
            }
        });
    }

    /* Testimonial Slider Royal JS */
    if ($('.testimonial-slider-royal-23').length) {
        const testimonial_slider_royal = new Swiper('.testimonial-slider-royal-23 .swiper', {
            slidesPerView: 1,
            speed: 1500,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
            },
            navigation: {
                nextEl: '.testimonial-button-next-royal',
                prevEl: '.testimonial-button-prev-royal',
            },
        });
    }

    /* Company Support Slider Royal JS */
    if ($('.company-supports-slider-royal').length) {
        const company_supports_slider_royal = new Swiper('.company-supports-slider-royal .swiper', {
            slidesPerView: 2,
            speed: 2000,
            spaceBetween: 20,
            loop: true,
            autoplay: {
                delay: 5000,
            },
            breakpoints: {
                767: {
                    slidesPerView: 4,
                },
                1025: {
                    slidesPerView: 5,
                }
            }
        });
    }

    /* Image Coparision JS Start */
    if ($('.transformation_image').length) {
        $(".transformation_image").twentytwenty({
            no_overlay: true,
        });
    }
    /* Image Coparision JS End */

})(jQuery);
