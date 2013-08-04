var shown = false;
$("#userLogo").click(function () {
    if (shown) {
        $("#userPane")
            .stop()
            .animate({"opacity": 0}, "400", function() {
                $("#userPane").css("display", "none");
                shown = false;
            });
    } else {
        $("#userPane")
            .css("display", "block")
            .stop()
            .animate({"opacity": 1}, "400", function() {
                shown = true;
            });
    }
});

$(document).click(function () {
    if (shown) {
        $("#userPane")
            .stop()
            .animate({"opacity": 0}, "400", function() {
                $("#userPane").css("display", "none");
                shown = false;
            });
    }
})