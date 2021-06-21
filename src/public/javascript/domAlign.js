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








    let daXem = document.getElementById('da-xem');
    daXem.addEventListener('click', function () {
        let spDaXem = document.getElementById('sp-da-xem');
        if (daXem.style.right == '0px') {
            spDaXem.style.display = 'block';
            daXem.style.right = '400px';
        }
        else if (daXem.style.right == '400px') {
            spDaXem.style.display = 'none';
            daXem.style.right = '0px';
        }
    }
    )
}

