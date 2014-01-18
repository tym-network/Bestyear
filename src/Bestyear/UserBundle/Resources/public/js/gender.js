function changeGender() {
    //Change the switch to the other position
    var genderButton = $("#genderButton");
    var genderBar = $("#genderBar");
    var genderInput = $("#fos_user_registration_form_gender");
    if (genderSwitch === 0) {
        genderInput.val('f');
        genderButton.css("left", "87px");
        genderBar.addClass("femaleSwitch");
        genderBar.removeClass("maleSwitch");
        $("#femaleSymbol").addClass("active");
        $("#maleSymbol").removeClass("active");
        genderSwitch = 1;
    } else {
        genderInput.val('m');
        genderButton.css("left", "3px");
        genderBar.addClass("maleSwitch");
        genderBar.removeClass("femaleSwitch");
        $("#maleSymbol").addClass("active");
        $("#femaleSymbol").removeClass("active");
        genderSwitch = 0;
    }
}

$("#genderBar").click(function() {
    changeGender();
});

$(".genderSymbol").click(function() {
    changeGender();
});