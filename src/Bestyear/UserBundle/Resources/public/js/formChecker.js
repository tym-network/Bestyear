function checkFormOnSubmit() {
    checkLogin();
    checkPassword();
}

function checkLogin() {
    error = false;
    username = $('#username');
    if (!username.val()) {
        // If the field is empty
        error = true;
    } else if (username.val().length != 8) {
        // If the username hasn't the right size (8char)
        error = true;
    }
    
    if (error) {
        username.parents('span').addClass('inputError');
    } else {
        username.parents('span').removeClass('inputError');
    }
}

function checkPassword() {
    error = false;
    password = $('#password');
    if (!password.val()) {
        // If the field is empty
        error = true;
    }
    
    if (password.val() && password.val().length < 6) {
        // The password is 6 caracters long at least
        error = true;
    }
    
    if (error) {
        password.parents('span').addClass('inputError');
    } else {
        password.parents('span').removeClass('inputError');
    }
}

$('#username')
    .keyup(function() {checkLogin();})
    .blur(function() {checkLogin();});
    
$('#password')
    .keyup(function() {checkPassword();})
    .blur(function() {checkPassword();});

$('#formLogin').submit(function() {
    checkFormOnSubmit();
    if ($('#formLogin').find('.inputError').length > 0) {
        return false;
    }
    return true;
});

