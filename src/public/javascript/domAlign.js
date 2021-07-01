/*
{
    let coVN = document.getElementById('co-VN');
    let coAnh = document.getElementById("co-Anh");
    let tiengAnh = document.getElementById('tieng-Anh');
    let tiengViet = document.getElementById('tieng-Viet');
    tiengAnh.addEventListener('click', function () {
        coAnh.style.display = "inline";
        coVN.style.display = 'none';
    })

    tiengViet.addEventListener('click', function () {
        coAnh.style.display = "none";
        coVN.style.display = 'inline';
    })

    function cancelFunc() {
        let login = document.getElementById("login-area");
        login.style.display = 'none';
    }

    function cancelFunc1() {
        let login = document.getElementById("login-area-1");
        login.style.display = 'none';
    }

    let login = document.getElementById("log-in");
    login.addEventListener('click', function () {
        let login1 = document.getElementById("login-area");
        login1.style.display = 'block';
    })

    let login2 = document.getElementById("log-in-1");
    login2.addEventListener('click', function () {
        let login3 = document.getElementById("login-area-1");
        login3.style.display = 'block';
    })
}
*/
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


function toTop() {
    window.scrollTo(pageXOffset, 0);
}

$(document).scroll(function () {
    var y = $(this).scrollTop();
    $('.hook-effect').each(function () {
        var t = $(this).offset().top;
        if (y > t-600) {
            $(this).animate({top: '0px'})
        }
    })

    $('.offset-text').each(function () {
        var t = $(this).parent().offset().top;
        if (y > t-400) {
            $(this).fadeIn();
            $(this).animate({left: '0px',opacity: '1'},'slow')
        }
    });
    $('.offset-image').each(function () {
        var t = $(this).parent().offset().top;
        if (y > t-400) {
            $(this).fadeIn();
            $(this).animate({right: '0px', opacity: '1'},'slow')   
        }
    });
});




