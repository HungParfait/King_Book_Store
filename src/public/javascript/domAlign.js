$(document).ready(function () {
    $('.star').each(function () {
        let code = starDisplayGenerator($(this).val());
        $(this).parent().html(code);
    })
});

function starDisplayGenerator(number) {
    let code = '';
    number = +number;
    const rate = '<i class="fas fa-star" style="color: #011589"></i>';
    const rateHalf = '<i class="fas fa-star-half-alt"></i>'
    const change = Math.ceil(number) - number
    for (let i = 0; i < Math.floor(number); i++) {
        code += rate;
    }
    if (change <= 0.5 && change !== 0) {
        code += rateHalf;
    }
    return code;
}

//star rating library





function toTop() {
    window.scrollTo(pageXOffset, 0);
}

$(document).scroll(function () {
    var y = $(this).scrollTop();
    $('.hook-effect').each(function () {
        var t = $(this).offset().top;
        if (y > t - 800) {
            $(this).animate({
                top: '0px'
            })
        }
    })

    $('.offset-text').each(function () {
        var t = $(this).parent().offset().top;
        if (y > t - 400) {
            $(this).fadeIn();
            $(this).animate({
                left: '0px',
                opacity: '1'
            }, 'slow')
        }
    });
    $('.offset-image').each(function () {
        var t = $(this).parent().offset().top;
        if (y > t - 400) {
            $(this).fadeIn();
            $(this).animate({
                right: '0px',
                opacity: '1'
            }, 'slow')
        }
    });
    $('#block-2 .row-image-1').each(function () {
        var t = $(this).parent().offset().top;
        if (y > t - 400) {
            $(this).fadeIn();
            $(this).animate({
                left: '0px',
                opacity: '1'
            }, 'slow')
        }
    });
});

function scrollToElement(name) {
    $([document.documentElement, document.body]).animate({
        scrollTop: $(`#${name}`).offset().top - 200
    }, 'fast');
}



function display(name) {
    $(`#${name}`).fadeIn();
}

function deDisplay(name) {
    $(`#${name}`).fadeOut();
}


var triggerTabList = [].slice.call(document.querySelectorAll('#list-tab-4 a'))
triggerTabList.forEach(function (triggerEl) {
  var tabTrigger = new bootstrap.Tab(triggerEl)

  
  triggerEl.addEventListener('click', function (event) {
    event.preventDefault()
    tabTrigger.show()
  })
})