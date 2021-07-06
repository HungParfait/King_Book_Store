var tax = 1.1;
let selectAll = document.getElementById('select-all');
let select = document.querySelectorAll("input[type='checkbox']");
let count = select.length - 1;

if (count === 0) {
    document.querySelectorAll('.pay-button').forEach(ele => {
        ele.disabled = true;
    })
}

function checkedChange() {
    let amount1 = document.querySelectorAll(`.amount-1`);
    let amount2 = document.querySelectorAll(`.amount-2`);
    let x = document.querySelectorAll('[id ^= "price-"]')
    let am1 = 0
    for (var i = 1; i < select.length; i++) {
        select[i].checked = selectAll.checked;
        count = selectAll.checked ? select.length - 1 : 0;
        if (count === 0) {
            document.querySelectorAll('.pay-button').forEach(ele => {
                ele.disabled = true;
            })
        }

    }
    if (!selectAll.checked) {
        for (var j = 0; j < x.length; j++) {
            x[j].style.color = 'rgb(0,0,0,0.2)';
        }
        amount1.forEach(ele => {
            ele.innerHTML = 0;
        })
        amount2.forEach(ele => {
            ele.innerHTML = 0;
        })
    } else {
        for (var j = 0; j < x.length; j++) {
            x[j].style.color = 'rgb(0,0,0)';
            am1 += +x[j].innerHTML
        }

        amount1.forEach(ele => {
            ele.innerHTML = am1.toFixed(2);
        })
        amount2.forEach(ele => {
            ele.innerHTML = (am1 * tax).toFixed(2);
        })

        if (count === 0) {
            document.querySelectorAll('.pay-button').forEach(ele => {
                ele.disabled = true;
            })
        } else {
            document.querySelectorAll('.pay-button').forEach(ele => {
                ele.disabled = false;
            })
        }
    }
}


function toAction() {
    count++;
    if (count === select.length - 1) {
        selectAll.checked = true;
    }
    document.querySelectorAll('.pay-button').forEach(ele => {
        ele.disabled = false;
    });
}
for (var i = 1; i < select.length; i++) {
    select[i].onchange = (event) => {
        let unCheckedId = event.currentTarget.id;
        let unCheckedEle = document.querySelector(`#price-${unCheckedId}`);
        let amount1 = document.querySelectorAll(`.amount-1`);
        let amount2 = document.querySelectorAll(`.amount-2`);
        if (!(event.currentTarget.checked)) {
            selectAll.checked = false;
            count--;
            unCheckedEle.style.color = 'rgb(0,0,0,0.2)';
            if (count === 0) {
                document.querySelectorAll('.pay-button').forEach(ele => {
                    ele.disabled = true;
                })
            }

            amount1.forEach(ele => {
                ele.innerHTML = (+ele.innerHTML - +unCheckedEle.innerHTML).toFixed(2);
            })

            amount2.forEach(ele => {
                ele.innerHTML = (+amount1[0].innerHTML * tax).toFixed(2)
            })
        } else {
            toAction();
            unCheckedEle.style.color = 'rgb(0,0,0)';
            amount1.forEach(ele => {
                ele.innerHTML = (+ele.innerHTML + +unCheckedEle.innerHTML).toFixed(2);
            })
            amount2.forEach(ele => {
                ele.innerHTML = (+amount1[0].innerHTML * tax).toFixed(2)
            })
        }
    }
}

async function changeQty(value, event) {
    let id = event.currentTarget.id.replace('display-quantity-', '');
    let toChecked = document.getElementById(id);
    if (+value > 0 && +value <= 99) {
        //id sách, id khách hàng, , số lượng
        let quantity1 = document.querySelector(`#noti-spinner-${id}`);
        let price = document.querySelector(`#price-${id}`);
        let amount1 = document.querySelectorAll(`.amount-1`);
        let amount2 = document.querySelectorAll(`.amount-2`);
        price.classList.add('d-none');
        quantity1.classList.remove('d-none');
        quantity1.classList.add('d-block');
        let response = await axios({
            method: 'put',
            url: `/books/${id}`,
            data: {
                quantity: value,
                bookId: event.currentTarget.id.replace('display-quantity-', '')
            }
        });
        //response: giá, số lượng
        if (toChecked.checked) {
            amount1.forEach(ele => {
                ele.innerHTML = (+ele.innerHTML - +price.innerHTML).toFixed(2);
            })
            price.innerHTML = response.data.price;
            amount1.forEach(ele => {
                ele.innerHTML = (+ele.innerHTML + +response.data.price).toFixed(2);
            })
            amount2.forEach(ele => {
                ele.innerHTML = (+amount1[0].innerHTML * tax).toFixed(2);
            })
        } else {
            price.innerHTML = response.data.price;
        }
        quantity1.classList.remove('d-block');
        quantity1.classList.add('d-none');
        price.classList.remove('d-none');
        price.classList.add('d-inline');
    } else {
        let quantity = document.querySelector(`#noti-quantity`);
        quantity.classList.remove('d-none');
        quantity.classList.add('d-block');
        setTimeout(() => {
            quantity.classList.remove('d-block');
            quantity.classList.add('d-none');
        }, 3000)
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

async function submitFunc(id) {
    let bookId = id.replace('submit-', '')
    let delete1 = document.querySelector(`#noti-spinner-${bookId}`);
    let amount1 = document.querySelectorAll(`.amount-1`);
    let amount2 = document.querySelectorAll(`.amount-2`);
    delete1.classList.remove('d-none');
    delete1.classList.add('d-block');
    let response = await axios({
        method: 'delete',
        url: `/books/${bookId}`,
        data: {
            id: bookId
        }
    })

    if (response.request.status === 200) {
        select = document.querySelectorAll("input[type='checkbox']");
        count = select.length - 1;
        if (count === 0) {
            document.querySelectorAll('.pay-button').forEach(ele => {
                ele.disabled = true;
            });
        }
        amount1.forEach(ele => {
            ele.innerHTML = response.data.money;
        })
        amount2.forEach(ele => {
            ele.innerHTML = (response.data.money * tax).toFixed(2);
        })
        let deleEle = document.getElementById(`products-${bookId}`);
        deleEle.remove();
        select = document.querySelectorAll("input[type='checkbox']");
        count = select.length - 1;
        if (count === 0) {
            document.querySelectorAll('.pay-button').forEach(ele => {
                ele.disabled = true;
            });
        }
    } else {
        alert('Something went wrong')
    }
}


async function subtractProds(id, event) {
    let toTested = document.getElementById(`display-quantity-${id}`);
    let toChecked = document.getElementById(id);
    if (+toTested.value > 1 && +toTested.value <= 99) {
        //id sách, id khách hàng, , số lượng
        toTested.value = +toTested.value - 1
        let quantity1 = document.querySelector(`#noti-spinner-${id}`);
        let price = document.querySelector(`#price-${id}`);
        let amount1 = document.querySelectorAll(`.amount-1`);
        let amount2 = document.querySelectorAll(`.amount-2`);
        price.classList.remove('d-block');
        price.classList.add('d-none');
        quantity1.classList.remove('d-none');
        quantity1.classList.add('d-block');
        let response = await axios({
            method: 'put',
            url: `/books/${id}`,
            data: {
                quantity: +toTested.value,
                bookId: id
            }
        });

        if (toChecked.checked) {
            amount1.forEach(ele => {
                ele.innerHTML = (+ele.innerHTML - +price.innerHTML).toFixed(2);
            })
            price.innerHTML = response.data.price;
            amount1.forEach(ele => {
                ele.innerHTML = (+ele.innerHTML + +response.data.price).toFixed(2);
            })
            amount2.forEach(ele => {
                ele.innerHTML = (+amount1[0].innerHTML * tax).toFixed(2);
            })
        } else {
            price.innerHTML = response.data.price;
        }
        quantity1.classList.remove('d-block');
        quantity1.classList.add('d-none');
        price.classList.remove('d-none');
        price.classList.add('d-inline');
    } else {
        let quantity = document.querySelector(`#noti-quantity`);
        quantity.classList.remove('d-none');
        quantity.classList.add('d-block');
        setTimeout(() => {
            quantity.classList.remove('d-block');
            quantity.classList.add('d-none');
        }, 3000)
    }
}

/*
 amount1.innerHTML = response.data.money;
        amount2.innerHTML = (response.data.money * tax).toFixed(2);
        */

async function addProds(id, event) {
    let toTested = document.getElementById(`display-quantity-${id}`);
    let toChecked = document.getElementById(id);
    if (+toTested.value > 0 && +toTested.value <= 99) {
        //id sách, id khách hàng, , số lượng
        toTested.value = +toTested.value + 1
        let quantity1 = document.querySelector(`#noti-spinner-${id}`);
        let price = document.querySelector(`#price-${id}`);
        let amount1 = document.querySelectorAll(`.amount-1`);
        let amount2 = document.querySelectorAll(`.amount-2`);
        price.classList.remove('d-block');
        price.classList.add('d-none');
        quantity1.classList.remove('d-none');
        quantity1.classList.add('d-block');
        let response = await axios({
            method: 'put',
            url: `/books/${id}`,
            data: {
                quantity: +toTested.value,
                bookId: id,
            }
        });

        if (toChecked.checked) {
            amount1.forEach(ele => {
                ele.innerHTML = (+ele.innerHTML - +price.innerHTML).toFixed(2);
            })
            price.innerHTML = response.data.price;
            amount1.forEach(ele => {
                ele.innerHTML = (+ele.innerHTML + +response.data.price).toFixed(2);
            })
            amount2.forEach(ele => {
                ele.innerHTML = (+amount1[0].innerHTML * tax).toFixed(2);
            })
        } else {
            price.innerHTML = response.data.price;
        }

        quantity1.classList.remove('d-block');
        quantity1.classList.add('d-none');
        price.classList.remove('d-none');
        price.classList.add('d-inline');
    } else {
        let quantity = document.querySelector(`#noti-quantity`);
        quantity.classList.remove('d-none');
        quantity.classList.add('d-block');
        setTimeout(() => {
            quantity.classList.remove('d-block');
            quantity.classList.add('d-none');
        }, 3000)
    }
}
/*
window.onscroll = () => {
    let element = document.querySelector('#thanh-toan-khuyen-mai');
    let windowRelativeBottom = document.documentElement.getBoundingClientRect().bottom;
    let windowRelativeTop = document.documentElement.getBoundingClientRect().top;
    // if the user hasn't scrolled far enough (>100px to the end)
    if (windowRelativeBottom < document.documentElement.clientHeight + 350) {
        return;
    }
    value = 0 - windowRelativeTop;
    element.style.top = `${value}px`;
}
*/