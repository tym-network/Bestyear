function send(sUrl, oParams) {
    for (sName  in oParams) {
            if (sUrl.indexOf("?")  != -1) {
                    sUrl  += "&";
            }  else {
                    sUrl  += "?";
            }
            sUrl  += encodeURIComponent(sName) + "=" +  encodeURIComponent(oParams[sName]);
    }

    var DSLScript  = document.createElement("script");
    DSLScript.src  = sUrl;
    DSLScript.type = "text/javascript";
    document.body.appendChild(DSLScript);
    document.body.removeChild(DSLScript);
}

function handleResults(json) {
    var num = 1;
    alert(json);
}

$('#searchUser').keypress(function (e) {
    // If key "Enter" is pressed
    if (e.which == 13) {
        alert('test');
        var params = {
            "input": $('#searchUser').val(),
            "callback": "handleResults"
        };
        send("./search",params);
    }
});