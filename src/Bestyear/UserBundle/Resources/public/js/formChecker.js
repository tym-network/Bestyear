function checkEmpty(obj) {
    if(!obj.val()) {
        obj.parents('span').addClass('inputError');
    } else {
        obj.parents('span').removeClass('inputError');
    } 
}

function checkFormOnSubmit() {
    checkEmpty($('.required'));
}

$('.required').keyup(function() {
    checkEmpty($(this));
});

$('.required').blur(function() {
    checkEmpty($(this));
});

$("#submit").click(function () {
    
});