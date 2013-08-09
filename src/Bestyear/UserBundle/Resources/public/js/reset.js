/**
 * Main variables
 */
var minSizePassword = 6;

/*
 * Set the focus on the first input 
 */
 
$(document).ready(function () {
    $("#newPassword1Span input").focus(); 
});

/*
 * Handles the tooltips when there is an error
 */

function updateErrorMessage(obj) {
    var errorLogo = obj.parent().find(".error");
    obj.qtip({
        style: {
            classes: "qtip-bootstrap",
            tip: {
                corner: true,
                width: 8,
            },
        },
        position: {
            my: 'bottom center',
            at: 'top center',
            target: errorLogo
        },
        show: {
            event: false,
            ready: true
        },
        hide: {
            event: false
        }
    });
}

$("input").focus(function() {
    if(!('object' === typeof $(this).data('qtip'))) {
        updateErrorMessage($(this));
    }
});

$("input").keyup(function() {
    if(!('object' === typeof $(this).data('qtip'))) {
        updateErrorMessage($(this));
    }
});

$("input").blur(function() {
    $(this).qtip('destroy');
});

/**
 * Tool functions
 */
function removeErrors(obj) {
    if ('object' === typeof obj.data('qtip')) {
        obj.qtip('destroy');
    }
    obj.parents('span').removeClass('inputError');
    obj.attr("title", "");
}

/**
 * Field specific functions
 */
function checkNewPass() {
    newPassword1 = $("#newPassword1Span input");
    newPassword2 = $("#newPassword2Span input");
    error1 = false;
    error2 = false;
    message1 = null;
    message2 = null;
    
    if (newPassword1.val() && newPassword1.val().length < minSizePassword) {
        error1 = true;
        message1 = "6 caractères min.";
    }
    
    if (newPassword2.val() && newPassword2.val().length < minSizePassword) {
        error2 = true;
        message2 = "6 caractères min.";
    }
    
    if (newPassword1.val() && newPassword2.val() && newPassword1.val() != newPassword2.val()) {
        error2 = true;
        message2 = "Confirmation différente";
    }
    
    if (error1) {
        newPassword1.parents('span').addClass('inputError');
        newPassword1.attr("title", message1);
    } else {
        removeErrors(newPassword1);
    }
    
    if (error2) {
        newPassword2.parents('span').addClass('inputError');
        newPassword2.attr("title", message2);
    } else {
        removeErrors(newPassword2);
    }
}

/**
 * Call the functions at the right moment
 */
$('#newPassword1Span input')
    .keyup(function() {checkNewPass();})
    .blur(function() {checkNewPass();});

$('#newPassword2Span input')
    .keyup(function() {checkNewPass();})
    .blur(function() {checkNewPass();});

/**
 * Form submission
 */
function submitForm() {
    checkNewPass();
    if ($('.inputError').length > 0) {
        return false;
    }
}

$('#form').submit(function() {
    return submitForm();
});