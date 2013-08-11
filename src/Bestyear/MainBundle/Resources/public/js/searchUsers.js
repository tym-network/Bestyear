var num = 0;

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
    
    alert("Test");
    
    $.each(json, function () {
        // Add the case with a picture when it will be implemented
        htmlUser = '<tr><td><div class="circle male"><div class="userBigIcon"></div></div></div></div></td>';
        htmlUser += '<td><div class="infosSummary"><div class="name">' + this.fullname + '</div><div class="other">' + this.studies + ' - ' +  this.age + 'ans</div></div></td></tr>';
        
        if (num%2 == 0) {
            $(htmlUser).appendTo('#leftTable');
        } else {
            $(htmlUser).appendTo('#rightTable');
        }
        num += 1;
    });
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