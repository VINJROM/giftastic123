// GLOBAL VARIABLES ===========================================

// Initial array of GIFs.
var gifs = ["Joy", "Fear", "Surprise", "Anger", "Sadness", "Interest", "Disgust"];

// API Key
var APIKEY = "B8COWoYL2EO5rDo97TV1aaTFQdaF8rma";

// FUNCTIONS =================================================
// Function re-renders HTML to display appropriate content
var gif = $('')

function displayGifInfo(gif) {
    // var gif = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=" + APIKEY + "&limit=10";

    // AJAX call
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        console.log(response.data[0].rating);

        // Storing the rating data
        var responseData = response.data;
        // console.log(response.data.rating);
        for (var i = 0; i < responseData.length; i++) {
            var gifDiv = $("<div>");
            var pRating = $("<p>").text("Rating: " + responseData[i].rating);
            var pTitle = $("<p>").text("Title: " + responseData[i].title);
            var gifImg = $("<img>");
            // Populates a still image unless clicked
            gifImg.attr("src", responseData[i].images.fixed_height_still.url);
            gifImg.attr("data-still", responseData[i].images.fixed_height_still.url);
            gifImg.attr("data-animate", responseData[i].images.fixed_height.url);
            gifImg.attr("data-state", "still");
            gifImg.attr("class", "gif");
            gifDiv.append(pRating);
            gifDiv.append(pTitle);
            gifDiv.append(gifImg)
            $('#gifs-view').prepend(gifDiv);
        }
        //IAN'S CODE
        // for (var i = 0; i < results.length; i++) {
        //     var animalDiv = $("<div>");
        //     var p = $("<p>").text("Rating: " + results[i].rating);
        //     var t = $("<p>").text("Title: " + results[i].title);
        //     var animalImage = $("<img>");
        //     // Attributes multiple URLs to GIFs for *hopeful* playback
        //     animalImage.attr("src", results[i].images.fixed_height_still.url);
        //     animalImage.attr("data-still", response.data[i].images.fixed_height_still.url);
        //     animalImage.attr("data-animate", response.data[i].images.fixed_height.url);
        //     animalImage.attr("data-state", "still");
        //     animalImage.attr("class", "gif");
        //     animalDiv.append(p);
        //     animalDiv.append(t);
        //     animalDiv.append(animalImage);
        //     $("#gifs-appear-here").prepend(animalDiv);
    });

    $('#gifs-view').empty();
}

// Function for displaying GIF buttons
function renderButtons() {

    // Deleting the movies prior to adding new movies
    // (this is necessary otherwise you will have repeat buttons)
    $("#buttons-view").empty();

    // Looping through the array of GIFs
    for (var i = 0; i < gifs.length; i++) {

        // Then dynamicaly generating buttons for each movie in the array
        // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
        var a = $("<button class='btn btn-success btn-md'>");
        // Adding a class of movie-btn to our button
        a.addClass("gif-btn");
        // Adding a data-attribute
        a.attr("data-name", gifs[i]);
        // Providing the initial button text
        a.text(gifs[i]);
        // Adding the button to the buttons-view div
        $("#buttons-view").append(a);
    }
}

// Adds GIF input to array
$("#add-gif").on("click", function(event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    var gifInput = $("#gif-input").val().trim();

    // Adding movie from the textbox to our array
    gifs.push(gifInput);

    // $('#add-gif').

    // Calling renderButtons which handles the processing of our GIF array
    renderButtons();

    // Displays GIF when button added
    // displayGifInfo(gif);

});

// Calling the renderButtons function to display the intial buttons
renderButtons();

// Adding a click event listener to all elements with a class of "gif-btn"
$(document).on("click", ".gif-btn", function() {
    // console.log($(this).attr('data-name'));
    var word = $(this).attr('data-name')
    console.log(word)
    displayGifInfo(word)


});

// Targets .gif and changes from data-type "still"to "animate" upon click
$("body").on("click", ".gif", function() {
    console.log("it worked");

    var state = $(this).attr('data-state');

    if (state === 'still') {
        var dataAnimate = $(this).attr('data-animate');
        $(this).attr('src', dataAnimate);
        $(this).attr('data-state', 'animate');
    } else if (state === 'animate') {
        var dataAnimate = $(this).attr('data-still');
        $(this).attr('src', dataAnimate);
        $(this).attr('data-state', 'still');;
    }

});