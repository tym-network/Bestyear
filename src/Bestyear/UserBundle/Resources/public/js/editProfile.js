/*
 * This file adapts the checks proceed to the edit profile form. It goes with formHandler.js
 */

var nbStep = 4;

function checkStep(id) {
    switch (id) {
        case 1:
            // Checking step 1
            checkGivenName();
            checkFamilyName();
            checkBirthdate();
            if ($('#step1').find('.inputError').length > 0) {
                $('#bubble1').addClass('errorBubble');
                return false;
            }
            $('#bubble1').removeClass('errorBubble');
            return true;
            break;
        case 2:
            // Checking step 2
            checkAddress1onSubmit();
            checkAddress2onSubmit();
            checkPostcode1();
            checkPostcode2();
            if ($('#step2').find('.inputError').length > 0) {
                $('#bubble2').addClass('errorBubble');
                return false;
            }
            $('#bubble2').removeClass('errorBubble');
            return true;
            break;
        case 3:
            // Checking step 3
            checkMail();
            checkURLFacebook();
            checkURLTwitter();
            if ($('#step3').find('.inputError').length > 0) {
                $('#bubble3').addClass('errorBubble');
                return false;
            }
            $('#bubble3').removeClass('errorBubble');
            return true;
            break;
        case 4:
            // Checking step 4
            checkTN05();
            checkTN07();
            checkTN09();
            checkTN10();
            if ($('#step4').find('.inputError').length > 0) {
                $('#bubble4').addClass('errorBubble');
                return false;
            }
            $('#bubble4').removeClass('errorBubble');
            return true;
            break;
    }
}

function focusFirstInput(id) {
    switch (id) {
        case 1:
            $("#givennameSpan input").focus(); 
            break;
        case 2:
            $("#streetnumber1").focus(); 
            break;
        case 3:
            $("#phone1").focus(); 
            break;
        case 4:
            $("#tn05_job").focus(); 
            break;
    }
}

// When a user clicks on one of the bubble in the left
$('.stepLink').click(function() {
    id = parseInt($(this).attr('id').replace('link',''));
    loadStep(id);
})