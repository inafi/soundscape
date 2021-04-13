function initialize() {
    //Detects if site is on mobile
    var isMobile = false;
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) ||
        /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) {
        isMobile = true;
    }

    //In page link scrolls
    $('a[href*="#"]')
        .not('[href="#"]')
        .not('[href="#0"]')
        .click(function (event) {
            if (
                location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
                location.hostname == this.hostname
            ) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                if (target.length) {
                    event.preventDefault();
                    $('html, body').animate({
                        scrollTop: target.offset().top - $(window).height() * 0.045
                    }, 800, function () {
                        var $target = $(target);
                        $target.focus();
                        if ($target.is(":focus")) { 
                            return false;
                        } else {
                            $target.attr('tabindex', '-1');
                            $target.focus(); 
                        };
                    });
                }
            }
        });

    //Navbar animation
    var marginleft = 0;
    var prev = -1;
    var curr = 0;
    setInterval(function () {
        curr = $(window).scrollTop() + $(window).width();
        if (curr != prev) {
            if ($(window).scrollTop() == 0 && !isMobile && $(window).width() > $(window).height() * 1.1) {
                $("nav").css('background-color', 'transparent');
                $("nav").css('box-shadow', 'none');
                $("nav").css('height', '7vh');
                $("nav .left, nav .right").css('padding-top', '1vh');
                $("nav span").css('color', '#fff');
            } else {
                $("nav").css('background-color', '#fff');
                $("nav").css('height', '6vh');
                $("nav").css('box-shadow', `
                0 2.8px 2.2px rgba(0, 0, 0, 0.014),
                0 2px 2.3px rgba(0, 0, 0, 0.018),
                0 1.5px 2px rgba(0, 0, 0, 0.01),
                0 2.3px 2px rgba(0, 0, 0, 0.01),
                0 2px 2px rgba(0, 0, 0, 0.01),
                0 2px 2px rgba(0, 0, 0, 0.01)`);
                $("nav .left, nav .right").css('padding-top', '0vh');
                $("nav span").css('color', '#3bb5fc');

                if ($("nav .navbartoggler").attr("expanded") == "true") {
                    $("nav .navbartoggler").click();
                }
            }
        }
        prev = curr;
        var timewidth = $('.ourtimeline .timeline > :last-child').offset().left - $('.ourtimeline .timeline > :first-child')
            .offset()
            .left + $('.ourtimeline .timeline > :last-child').width();
        var linewidth = timewidth - $('.ourtimeline .timeline > :first-child').width() / 2 - $(
            '.ourtimeline .timeline > :last-child').width() / 2;
        $(".ourtimeline .timeline-wrap").width(timewidth + "px");
        $(".ourtimeline .timeline").width(timewidth + "px");
        $(".ourtimeline .line").width(linewidth + "px");
        marginleft += parseInt($(".ourtimeline .line").offset().left - $('.ourtimeline .timeline > :first-child .dot').offset().left - 0.01 * $(window).height());
        $(".ourtimeline .line").css("transform", "translateX(" + (-1 * marginleft) + "px)")
    }, 50)

    //Navbar button mobile
    $("nav .navbartoggler").on("click", function (e) {
        $(this).toggleClass('open');
        if ($(this).attr("expanded") == "true") {
            $(".navbar-nav").css("opacity", "0");
            $(".navbar-nav").css("transform", "translateY(calc(-100% - 10vh))");
            $(this).attr("expanded", "false");
        } else {
            $(".navbar-nav").css("opacity", "1");
            $(".navbar-nav").css("transform", "translateY(0%)");
            $(this).attr("expanded", "true");
        }
    })

    //Prototype slider
    $('.slick').slick({
        dots: false,
        infinite: false,
        speed: 300,
        slidesToShow: 1,
        variableWidth: true,
        centerMode: true,
        focusOnSelect: true,
        nextArrow: '<button class="slick-next"><i class="fal fa-chevron-right"></i></button>',
        prevArrow: '<button class="slick-prev"><i class="fal fa-chevron-left"></i></button>'
    });
    
    //Demo
    $(".demo i").on("click touchstart", function (e) {
        if (e.type == "click" && isMobile)
            return;
        var type = $(this).attr('name');
        $(".demo img").hide();
        if ($(this).hasClass("active")) {
            $(".demo img[name='base']").show();
            $(this).removeClass("active");
        } else {
            $(".demo i").removeClass("active");
            $(".demo img[name='" + type + "']").show();
            $(this).addClass("active");
        }
    })

    //Demo and product adaptable
    var isBeforeProduct = false;
    var isBeforeDemo = false;
    setInterval(() => {
        if ($(window).width() * .94 < $(window).height() * 1.45) {
            if (!isBeforeProduct) {
                $(".product .img-wrap").insertBefore(".product .left");
                $(".product .img-wrap").css("width", "100%");
            }
            isBeforeProduct = true;
        } else {
            if (isBeforeProduct) {
                $(".product .left").insertBefore(".product .img-wrap");
                $(".product .img-wrap").css("width", "30%");
            }
            isBeforeProduct = false;
        }

        if ($(window).width() < $(window).height() * 1.6) {
            if (!isBeforeDemo) {
                $(".demo .img-wrap").insertBefore(".demo .left");
                $(".demo .img-wrap").css("width", "100%");
            }
            isBeforeDemo = true;
        } else {
            if (isBeforeDemo) {
                $(".demo .left").insertBefore(".demo .img-wrap");
                $(".demo .img-wrap").css("width", "43%");
            }
            isBeforeDemo = false;
        }

        // console.log($(window).width() * .84, $(window).height() * 1.12, $(window).height());
    }, 100);


    //Timelines slider
    const slider = document.querySelector('.ourtimeline .pad');
    let isDown = false;
    let startX;
    let scrollLeft;

    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });
    slider.addEventListener('mouseleave', () => {
        isDown = false;
    });
    slider.addEventListener('mouseup', () => {
        isDown = false;
    });
    slider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX); //scroll-fast
        slider.scrollLeft = scrollLeft - walk;
    });
    
}
$(initialize)