function PostOmnitureData(key) {
    $.ajax({
        type: "POST",
        contentType: "application/x-www-form-urlencoded",
        url: "/Omniture/PrepareAnalytics",
        data: {key: key},
        dataType: "text",
        error: function(e) {
        },
        success: function(data) {
            eval(data);
        }
    });
}