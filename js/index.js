window.onload = linksChanges;

function linksChanges() {
    const links = document.querySelectorAll('a');
    for (let count = 0; count < links.length; count++) {
        links[count].setAttribute('href', '#scrollto')
    }

    // Scroll to form
    function scrollTo() {
        $('a[href="#scrollto"]').on('click', function () {
            const el = $(this),
                dest = el.attr('href');
            $('html').animate({
                scrollTop: $(dest).offset().top - 500
            }, 1000)
        });
    }

    scrollTo();
}

// Comments
const addButton = document.querySelector('.add-comment-button'),
    comment = document.querySelectorAll('.firstComment')[0];

addButton.onclick = function () {
    let nameInput = document.querySelector('.your-name'),
        textInput = document.querySelector('.txt-content');

    nameInput.value.trim().length > 0 && textInput.value.trim().length > 0 ? addComment() : false;
    nameInput.value.trim().length !== 0 && textInput.value.trim().length !== 0 ? clearInputs() : false;

    function addComment() {
        let newComment = comment.cloneNode(true),
            parent = document.getElementById('comment-component-text'),
            commentF = parent.children[2];

        newComment.classList.remove('firstComment');

        let imgSrc;

        window.cdn_path ? imgSrc = window.cdn_path + 'images/default-avatar.jpg' : imgSrc = 'images/default-avatar.jpg';

        newComment.querySelector('.comment__image').setAttribute('src', imgSrc);
        newComment.querySelector('.comment__name').innerHTML = nameInput.value.toString();
        newComment.querySelector('.comment__text').innerHTML = textInput.value.toString();

        newComment.style.display = 'flex';
        newComment.style.opacity = '0';

        parent.insertBefore(newComment, commentF);

        setTimeout(function () {
            newComment.style.opacity = '1';
            newComment.style.maxHeight = '1000px'
        }, 15);

        newComment.querySelector('.comments__like').style.fontWeight = '400';
        newComment.querySelector('.likes').innerHTML = '0';

        toggleLike(newComment);
    }

    function clearInputs () {
        nameInput.value = '';
        textInput.value = '';
    }

    linksChanges()
};

let scrollFlag = false,
    firstComment = document.querySelector('.firstComment');

window.addEventListener('scroll', function () {
    let scrollValue = window.pageYOffset + window.innerHeight,
        commentsOffsetY = firstComment.offsetTop;

    if (scrollValue > commentsOffsetY && scrollFlag === false) {
        firstComment.style.display = 'flex';
        setTimeout(function () {
            firstComment.style.opacity = '1';
            firstComment.style.maxHeight = '1000px';
        }, 2000);
        scrollFlag = true;
    }
});

// Popup
(function() {
    function fadeOut(elem) {
        elem.style.opacity = '0';
        setTimeout(function () {
            elem.style.display = 'none'
        }, 1000)
    }

    function fadeInElem(elem) {
        elem.style.display = 'block';
        setTimeout(function () {
            elem.style.opacity = '1'
        }, 15)
    }
    let confirm = document.querySelector('#confirm'),
        flag = false;
    document.addEventListener('mouseout', function (e) {
        let from = e.relatedTarget;
        if (!from || from.nodeName === 'HTML') {
            if (confirm.style.display !== 'block' && flag === false) {
                fadeInElem(confirm);
                flag = true
            }
        }
    });
    const confirmPopup = document.querySelectorAll('#confirm .close-popup, #overlay, #confirmbtn');
    for (let count = 0; count < confirmPopup.length; count++) {
        confirmPopup[count].onclick = function () {
            fadeOut(confirm)
        }
    }
})();

// Hamburger
(function () {
    const hamburgerbtn = document.querySelector('#hambutton');
    const navi = document.querySelector('#navi');
    const hamnavi = document.querySelector('#hamnavi');


    function openMenu() {
        navi.classList.toggle('hamburgeropened');
        hamnavi.classList.toggle('hamburgerwhite');
        hamnavi.addEventListener('mouseleave', closeMenu);
    }

    function closeMenu() {
        navi.classList.remove('hamburgeropened');
        hamnavi.classList.remove('hamburgerwhite');
    }

    hamburgerbtn.addEventListener('click', openMenu);
})();

// Likes
let comments = document.querySelectorAll('.comment');
for (let count = 0; count < comments.length; count++) {
    toggleLike(comments[count])
}

function toggleLike(comment) {
    let likeBtn = comment.querySelector('.comments__like');
    let likeNum = comment.querySelector('.likes');
    // checking if current theme has like buttons;
    if (likeBtn !== null && likeNum !== null) {
        if (/^\d*$/gi.test(likeNum.innerHTML)) {
            likeBtn.addEventListener('click', function () {
                if (likeBtn.style.fontWeight === '700') {
                    likeNum.innerHTML -= '1';
                    likeBtn.style.fontWeight = '400';
                } else {
                    likeNum.innerHTML = parseInt(likeNum.innerHTML) + 1;
                    likeBtn.style.fontWeight = '700';
                }
            })
        }
    }
}



