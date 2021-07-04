window.addEventListener('DOMContentLoaded', function () {
    let container = document.querySelectorAll('.star-rating-container');
    const rate = '<i class="fas fa-star empty-star"></i>';
    const rated = '<i class="fas fa-star rated-star"></i>';
    if (container) {
        container.forEach(ele => {
            let div = document.createElement('span')
            div.className = 'empty-star-container';
            div.innerHTML = rate.repeat(5);
            ele.appendChild(div)
            let moreDiv = document.createElement('span')
            moreDiv.className = 'rated-star-container';
            moreDiv.innerHTML = rated.repeat(5);
            ele.appendChild(moreDiv)
        })
    }
})

let rating = document.querySelectorAll('.star-rating-container');

//get lấy vị trí của star-rating-container ==> biết khi nào đang di chuột vào
if (rating) {
    rating.forEach(ele => {
        ele.addEventListener('click', (event) => {
            const x = event.clientX;
            const width = ele.clientWidth;
            const left = ele.getBoundingClientRect().left;
            const percentage = (+((x-left)/width).toFixed(2)) * 100;
            ele.querySelector('.rated-star-container').style.width = `${percentage}%`
            ele.nextElementSibling.innerHTML = countStar(percentage).star_string
            ele.nextElementSibling.nextElementSibling.value = countStar(percentage).star_number
        })
    })
}

function countStar(number) {
    const star = number/20;
    const round = (Math.round(star * 10) / 10).toFixed(1)

    return  {star_string: `${round}  stars`,
            star_number: round
}
}

