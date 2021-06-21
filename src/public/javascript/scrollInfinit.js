let index = -1;
let x = document.getElementById('spinner');
function myScroll() {
    x.classList.add('d-none');
    if (index > 10) return;
    x.classList.remove('d-none');
    let windowRelativeBottom = document.documentElement.getBoundingClientRect().top;

    // if the user hasn't scrolled far enough (>100px to the end)
    if (windowRelativeBottom < document.documentElement.clientHeight - 800) {
        return;
    }
        index++;

        axios({
            method: 'post',
            url: '/infinite/scroll',
            params: {
                index: index,
            }
        }
        )
            .then(function (response) {
                let element = document.getElementById('block-2');
                let div = document.createElement('div')
                div.innerHTML = response.data;
                element.appendChild(div);
            }
            )

    }

window.addEventListener('scroll', myScroll);