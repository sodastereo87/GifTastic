// arrays lsit
var carsArray = ["Camaro", "Mustang", "Porche", "Lamborgini", "Ferrari", "BMW", "Jeep"]

// calling jquery funtion and for loop to go throught all arrays from the index 
            $(document).ready(function () {
                for (var i = 0; i < carsArray.length; i++) {
                    $("#car-buttons").append("<button type='button' onclick='searchGif(\"" + carsArray[i] + "\")' class='btn btn-primary' value=' " + carsArray[i] + "'> " + carsArray[i] + " </button>");
                }
            });
// calling the funtion to displaty a gif when the button is clicked 
            function carButtonClicked() {
                var userInput = $('#car-input').val();
                searchGif(userInput);
            }
// calling the funtion to submit a new gif when the button is clicked 
            function submitButtonClicked() {
                var userInput = $('#car-input').val();

                if (userInput) {
                    $('#car-buttons').append("<button type='button' onclick='searchGif(\"" + userInput + "\")' class='btn btn-primary' value=' " + userInput + "'> " + userInput + " </button>");
                }
            }
// calling the ajax funtion to get a gif from giphy using the url and api key
            function searchGif(gifName) {
                $.ajax({
                    url: 'https://api.giphy.com/v1/gifs/search?q= ' + gifName + ' &api_key=dc6zaTOxFJmzC&limit=10',
                    type: 'GET',
                })
                    .done(function (response) {
                        displayGif(response);
                    })
            }
// gets the information to display the rating info for each image
            function displayGif(response) {
                $('#cars').empty();
                for (var i = 0; i < response.data.length; i++) {
                    var rating = "<div class='ratings'> Rating:  " + (response.data[i].rating) + " </div>";
                    var image = rating + '<img src= " ' + response.data[i].images.fixed_height_still.url +
                        '" data-still=" ' + response.data[i].images.fixed_height_still.url +
                        ' " data-animate=" ' + response.data[i].images.fixed_height.url + '" data-state="still" class="movImage" style= "width:300px; height:300px">';

                    image = '<div class="col-md-4">' + image + "</div>";
                    $('#cars').append(image);
                }
// allows you to play or stop the gif animation when image is clicked
                $('.movImage').on('click', function () {
                    var state = $(this).attr('data-state');
                    if (state == 'still') {
                        $(this).attr('src', $(this).attr("data-animate"));
                        $(this).attr('data-state', 'animate');
                    } else {
                        $(this).attr('src', $(this).attr("data-still"));
                        $(this).attr('data-state', 'still');
                    }

                });
            }