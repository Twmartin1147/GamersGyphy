$(document).ready(function () {

    var gamers = [
        "pubg", "fortnite", "overwatch", "rocket league", "league of legend", "world of warcraft",
        "call of duty", "ark survival evolved", "tomb raider", "minecraft", "final fantasy",
        "sonic", "mario", "pokemon", "crash bandacoot", "maden football",
        "cuphead", "hollow knight", "team fortress", "diablo", "starcraft"
    ];

    // function to make buttons and add to page
    function populateButtons(arrayToUse, classToAdd, areaToAddTo) {
        $(areaToAddTo).empty();

        for (var i = 0; i < arrayToUse.length; i++) {
            var a = $("<button>");
            a.addClass(classToAdd);
            a.attr("data-type", arrayToUse[i]);
            a.text(arrayToUse[i]);
            $(areaToAddTo).append(a);
        }

    }

    $(document).on("click", ".gamer-button", function () {
        $("#gamers").empty();
        $(".gamer-button").removeClass("active");
        $(this).addClass("active");

        var type = $(this).attr("data-type");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=dc6zaTOxFJmzC&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .done(function (response) {
                var results = response.data;

                for (var i = 0; i < results.length; i++) {
                    var gamerDiv = $("<div class=\"gamer-item\">");

                    var rating = results[i].rating;

                    var p = $("<p>").text("Rating: " + rating);

                    var animated = results[i].images.fixed_height.url;
                    var still = results[i].images.fixed_height_still.url;

                    var gamerImage = $("<img>");
                    gamerImage.attr("src", still);
                    gamerImage.attr("data-still", still);
                    gamerImage.attr("data-animate", animated);
                    gamerImage.attr("data-state", "still");
                    gamerImage.addClass("gamer-image");

                    gamerDiv.append(p);
                    gamerDiv.append(gamerImage);

                    $("#gamers").append(gamerDiv);
                }
            });
    });

    $(document).on("click", ".gamer-image", function () {

        var state = $(this).attr("data-state");

        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        }
        else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });

    $("#add-gamer").on("click", function (event) {
        event.preventDefault();
        var newGamer = $("input").eq(0).val();

        if (newGamer.length > 2) {
            gamers.push(newGamer);
        }

        populateButtons(gamers, "gamer-button", "#gamer-buttons");

    });

    populateButtons(gamers, "gamer-button", "#gamer-buttons");
});
