function getPagination(pageNumber) {
    let url = new URLSearchParams(window.location.search);
    let query = url.get('q');
    window.scrollTo(pageXOffset, 0);
    if (query !== null) {
        axios.post('/search/result/page', {
            params: {
                page: pageNumber,
                limit: 16,
                q: query
            }
        })
            .then(function (response) {
                let code;
                let element = document.getElementById("book-list");
                element.innerHTML = '';
                for (let i = 0; i < response.data.names.length; i++) {
                    code = `<img class="mem-img-new" data-src='./image/Skateboarding.gif' src= '${response.data.names[i].image}'>` +
                        `<p class="mem-text ten-sach">` +
                        `<a href="../books/${response.data.names[i]._id}">${response.data.names[i].name}</a>` +
                        `</p>` +
                        `<div class="mem-text ten-tac-gia">${response.data.names[i].author}</div>` +
                        `<div class="mem-text hinh-thuc">${response.data.names[i].format}</div>` +
                        `<span class="mem-info">${response.data.names[i].price}${response.data.names[i].currency}</span>` +
                        `<span class="mem-info text-secondary text-decoration-line-through mx-3 small">${response.data.names[i].old_price||''}${response.data.names[i].currency}</span>`
                    let ele = document.createElement('div');
                    ele.className = 'row-image-2';
                    ele.innerHTML = code;
                    element.appendChild(ele);
                }

            })
            .catch(function (error) {
                console.log(error);
            })
    } else {
        let params = window.location.pathname.replace('/category/', '')
        axios({
            method: 'post',
            url: `/list/${params}`,
            params: {
                page: pageNumber,
                limit: 16,
            }
        }
        )
            .then(function (response) {
                let code;
                let element = document.getElementById("book-list");
                element.innerHTML = '';
                for (let i = 0; i < response.data.names.length; i++) {
                    code = `<img class="mem-img-new" src= '${response.data.names[i].image}'>` +
                        `<p class="mem-text ten-sach">` +
                        `<a href="../books/${response.data.names[i]._id}">${response.data.names[i].name}</a>` +
                        `</p>` +
                        `<div class="mem-text ten-tac-gia">${response.data.names[i].author}</div>` +
                        `<div class="mem-text hinh-thuc">${response.data.names[i].format}</div>` +
                        `<span class="mem-info">${response.data.names[i].price}${response.data.names[i].currency}</span>` +
                        `<span class="mem-info text-secondary text-decoration-line-through mx-3 small">${response.data.names[i].old_price||''}${response.data.names[i].currency}</span>`

                    let ele = document.createElement('div');
                    ele.className = 'row-image-2';
                    ele.innerHTML = code;
                    element.appendChild(ele);
                }

            })
            .catch(function (error) {
                console.log(error);
            })
    }
}


function numberPagination() {
    let url = new URLSearchParams(window.location.search);
    let query = url.get('q')
    if (query !== null) {
        axios.post('/search/result/page', {
            params: {
                q: query,
                limit: 0,
                page: 1

            }
        })
            .then(function (response) {
                let numberPage;
                numberPage = Math.floor(response.data.names.length / 16) + 1;
                init({ size: numberPage, step: 3, page: 1 });
            })
            .catch(function (error) {
                console.log(error);
            })
    } else {
        let params = window.location.pathname.replace('/category/', '')
        axios({
            method: 'post',
            url: `/list/${params}`,
            params: {
                limit: 0,
            }
        }
        )
            .then(function (response) {
                let numberPage;
                numberPage = Math.floor(response.data.names.length / 16) + 1;
                init({ size: numberPage, step: 3, page: 1 });
            })
            .catch(function (error) {
                console.log(error);
            })
    }
}


var Pagination = {

    code: '',

    // --------------------
    // Utility
    // --------------------

    // converting initialize data
    Extend: function (data) {
        data = data || {};
        Pagination.size = data.size || 1;
        Pagination.page = data.page || 1;
        Pagination.step = data.step || 3;
    },

    // add pages by number (from [s] to [f])
    Add: function (s, f) {
        for (var i = s; i < f; i++) {
            Pagination.code += '<a>' + i + '</a>';
        }
    },

    // add last page with separator
    Last: function () {
        Pagination.code += '<i>...</i><a>' + Pagination.size + '</a>';
    },

    // add first page with separator
    First: function () {
        Pagination.code += '<a>1</a><i>...</i>';
    },



    // --------------------
    // Handlers
    // --------------------

    // change page
    Click: function () {
        Pagination.page = +this.innerHTML;
        getPagination(+this.innerHTML)
        Pagination.Start();
    },

    // previous page
    Prev: function () {
        Pagination.page--;
        if (Pagination.page < 1) {
            Pagination.page = 1;
        }
        Pagination.Start();
    },

    // next page
    Next: function () {
        Pagination.page++;
        if (Pagination.page > Pagination.size) {
            Pagination.page = Pagination.size;
        }
        Pagination.Start();
    },



    // --------------------
    // Script
    // --------------------

    // binding pages
    Bind: function () {
        var a = Pagination.e.getElementsByTagName('a');
        for (var i = 0; i < a.length; i++) {
            if (+a[i].innerHTML === Pagination.page) a[i].className = 'current';
            a[i].addEventListener('click', Pagination.Click, false);
        }
    },

    // write pagination
    Finish: function () {
        Pagination.e.innerHTML = Pagination.code;
        Pagination.code = '';
        Pagination.Bind();
    },

    // find pagination type
    Start: function () {
        if (Pagination.size < Pagination.step * 2 + 6) {
            Pagination.Add(1, Pagination.size + 1);
        }
        else if (Pagination.page < Pagination.step * 2 + 1) {
            Pagination.Add(1, Pagination.step * 2 + 4);
            Pagination.Last();
        }
        else if (Pagination.page > Pagination.size - Pagination.step * 2) {
            Pagination.First();
            Pagination.Add(Pagination.size - Pagination.step * 2 - 2, Pagination.size + 1);
        }
        else {
            Pagination.First();
            Pagination.Add(Pagination.page - Pagination.step, Pagination.page + Pagination.step + 1);
            Pagination.Last();
        }
        Pagination.Finish();
    },



    // --------------------
    // Initialization
    // --------------------

    // binding buttons
    Buttons: function (e) {
        var nav = e.getElementsByTagName('a');
        nav[0].addEventListener('click', Pagination.Prev, false);
        nav[1].addEventListener('click', Pagination.Next, false);
    },

    // create skeleton
    Create: function (e) {

        var html = [
            // '<a>&#9668;</a>', // previous button
            '<span></span>' // pagination container
            //  '<a>&#9658;</a>'  // next button
        ];

        e.innerHTML = html.join('');
        Pagination.e = e.getElementsByTagName('span')[0];
        // Pagination.Buttons(e);
    },

    // init
    Init: function (e, data) {
        Pagination.Extend(data);
        Pagination.Create(e);
        Pagination.Start();
    }
};



var init = function (obj) {
    Pagination.Init(document.getElementById('pagination'), {
        size: obj.size, // pages size
        page: obj.page,  // selected page
        step: obj.step   // pages before and after current
    });
};
document.addEventListener('DOMContentLoaded', numberPagination)
