{
    let quantity = document.getElementById('gia-moi').innerHTML;
    let display = document.querySelectorAll('.display-quantity')[0];
    $(document).ready(function () {
        $(".span-1").click(function () {
            display.value = (+display.value >= 2) ? (+display.value - 1) : +display.value;
            $(".display-quantity").val(display.value);
            $('.tinh-tien').html((+quantity * +display.value).toFixed(2));
        })
        $('.span-2').click(function () {
            display.value = +display.value + 1;
            $(".display-quantity").val(display.value);
            $('.tinh-tien').html((+quantity * +display.value).toFixed(2));
        })
    })
}

async function toCart(e) {
    let bookID = window.location.pathname.replace('/books/', '');
    let x = document.getElementById('display-quantity');
    let y = document.getElementById('gia-moi');
    let price = y.innerHTML.replace('$', '')
    let response = await axios({
        method: 'POST',
        url: `/books/${bookID}`,
        data: {
            id: bookID,
            quantity: +x.value,
            price: price.trimEnd().trimStart()
        },
    })
    window.location.href = '/checkout/cart';
}

async function addProduct(id) {
    let quantity = document.getElementsByClassName('display-quantity')[0].value;
    console.log(quantity)
    let response = await axios({
        method: 'POST',
        url: `/books/${id}`,
        data: {
            id: id,
            quantity: quantity,
        },
    })
    let display = document.getElementById('notification-login');
    display.innerHTML = display.innerHTML + `<p class="px-2 py-3 bg-info bg-gradient small text-white border rounded border-1"> ${response.data} </p>`;
    display.classList.remove('d-none');
    display.classList.add('d-block');
    setTimeout(hide, 3000)
}

{
    function hide() {
        let display = document.getElementById('notification-login');
        display.innerHTML = `<button class="position-absolute text-warning btn" onclick="hide()" style="top:0px; right: 0px;" id="cancel-login">` +
            `<i class="fas fa-times" ></i>` + `</button>`
        display.classList.remove('d-block');
        display.classList.add('d-none');

    }
}


function checkChangeQty(event, name) {
    //name = name.replace('display-quantity-',''
    let reg = /[A-z ]/;
    if (event.type === 'paste') {
        let clipBoard = event.clipboardData.getData('text/plain');
        if (reg.test(clipBoard)) {
            event.preventDefault();
            let quantity1 = document.querySelector(`#noti-format`);
            quantity1.classList.remove('d-none');
            quantity1.classList.add('d-block');
            setTimeout(() => {
                quantity1.classList.remove('d-block');
                quantity1.classList.add('d-none');
            }, 3000)

        };
    } else {
        var x = event.which || event.keyCode;
        let input = document.querySelector(`#${name}`);
        let isNotNumber = reg.test(String.fromCharCode(x));
        if (isNotNumber) {
            event.preventDefault();
        } else {
            let Qty = parseInt(input.value + String.fromCharCode(x));
            if (Qty <= 0 || Qty > 99) {
                event.preventDefault();
                let quantity = document.querySelector(`#noti-quantity`);
                quantity.classList.remove('d-none');
                quantity.classList.add('d-block');
                setTimeout(() => {
                    quantity.classList.remove('d-block');
                    quantity.classList.add('d-none');
                }, 3000)
            }
        }
    }
}
/*
(function () {
    const second = 1000,
        minute = second * 60,
        hour = minute * 60,
        day = hour * 24;

    let countDown = new Date().getTime() + 500000000,
        x = setInterval(function () {

            let now = new Date().getTime(),
                distance = countDown - now;

            document.getElementById("hours").innerText = Math.floor((distance % (day)) / (hour)),
                document.getElementById("minutes").innerText = Math.floor((distance % (hour)) / (minute)),
                document.getElementById("seconds").innerText = Math.floor((distance % (minute)) / second);
            //do something later when date is reached
            if (distance < 0) {
                document.getElementById("hours").innerText = 0,
                    document.getElementById("minutes").innerText = 0,
                    document.getElementById("seconds").innerText = 0;

                clearInterval(x);
            }
            //seconds
        }, 0)
}());
*/