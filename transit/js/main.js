$(function () {
    $('[data-href]').on('click', function() {
        $('html, body').animate({
            scrollTop: $($(this).data('href')).offset().top
        }, 800)
    })
})