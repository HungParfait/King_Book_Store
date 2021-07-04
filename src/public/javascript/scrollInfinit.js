function starDisplayGenerator(number) {
    let code = '';
    number = +number;
    const rate = '<i class="fas fa-star" style="color: ></i>';
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


let x = document.getElementById('spinner');

function myScroll() {
    let index = 0;
    while (index < 9) {
        x.classList.remove('d-none');
        axios({
                method: 'post',
                url: '/infinite/scroll',
                params: {
                    index: index,
                }
            })
            .then(function (response) {
                let element = document.getElementById('block-2');
                let div = document.createElement('div')
                div.innerHTML = response.data;
                element.appendChild(div);
                $('.star').each(function () {
                    let code = starDisplayGenerator($(this).val());
                    $(this).parent().html(code);
                })
            })
            x.classList.add('d-none');
            index++;
    }
}

window.addEventListener('load', myScroll);