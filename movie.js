// jquery
$(document).on("click", "#searchbutton,#gobackbutton", function () {
    var url = api_url + "?name=" + $("#searchmovie").val();
    $.ajax({
        url: url,
        datatype: 'json',
        beforeSend: function (xhr) {
        },
        success: function (e)
        {
            movieResult(e);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
        },
        complete: function (jqXHR, textStatus) {

        }
    });
});
$(document).on("click", ".viewdetail", function () {
    var url = api_url + "?movieid=" + $(this).attr("data-id");
    $.ajax({
        url: url,
        datatype: 'json',
        beforeSend: function (xhr) {
        },
        success: function (e)
        {
            viewMovie(e);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
        },
        complete: function (jqXHR, textStatus) {

        }
    });
});

// javascript
function viewMovie(response) {

    document.querySelector("#main_container").innerHTML = "";
    if (response.code == 404) {
        document.querySelector("#main_container").innerHTML = status_404();
        return;
    }
    // this gives 500 internal server error if the status code is anything other than 200.
    if (response.code != 200) {
        document.querySelector("#main_container").innerHTML = status_500();
        return;
    }
    
    // Declaring and setting the attributes to display the results
    var div2, col, back, card, third, div, div1, img, h2;
    back = document.createElement('a');
    back.setAttribute("html", "#");
    back.setAttribute("id", "gobackbutton");
    back.innerHTML = "Go back";
    //col 9 that holds head name
    col = document.createElement('div');
    col.setAttribute("class", "w3-col l12");
    col.appendChild(back);

    div2 = document.createElement('div');
    div2.setAttribute("class", "w3-row");
    div2.appendChild(col);
    document.querySelector("#main_container").appendChild(div2);

    var item = response.result;

    img = document.createElement('img');
    img.setAttribute("alt", item.Title);
    img.setAttribute("src", item.Poster);
    if (item.Poster == "N/A") {
        img.setAttribute("src", "");
    }
    img.setAttribute("class", "full-movie-image rounded border");

    div1 = document.createElement('div');
    div1.setAttribute("class", "w3-center");
    div1.appendChild(img);

    div = document.createElement('div');
    div.setAttribute("class", "w3-container");

    h2 = document.createElement('h5');
    h2.innerHTML = item.Title;

    div.appendChild(h2);

    p = document.createElement('p');
    p.setAttribute("class", "w3-text-grey");
    p.innerHTML = "Release Date : " + item.Released;

    div.appendChild(p);

    p = document.createElement('p');
    p.setAttribute("class", "w3-text-grey");
    p.innerHTML = "Genre : " + item.Genre;

    div.appendChild(p);

    p = document.createElement('p');
    p.setAttribute("class", "w3-text-grey");
    p.innerHTML = "Director : " + item.Director;

    div.appendChild(p);

    p = document.createElement('p');
    p.setAttribute("class", "w3-text-grey");
    p.innerHTML = "Writer : " + item.Writer;

    div.appendChild(p);

// this will only provide the plot of the movie if the movie was released after 2015.
    if (item.Year > 2015) {
        p = document.createElement('p');
        p.setAttribute("class", "w3-text-grey");
        p.innerHTML = "Plot : " + item.Plot;

        div.appendChild(p);
    }

    card = document.createElement('div');
    card.setAttribute("class", "w3-card w3-margin");

    card.appendChild(div1);
    card.appendChild(div);

    third = document.createElement('div');
    third.setAttribute("class", "w3-col l12");
    third.appendChild(card);
    document.querySelector("#main_container").appendChild(third);
}

function movieResult(response) {
    document.querySelector("#main_container").innerHTML = "";
    if (response.code == 404) {
        document.querySelector("#main_container").innerHTML = status_404();
        return;
    }
    if (response.code != 200) {
        document.querySelector("#main_container").innerHTML = status_500();
        return;
    }
    var div, col, item;


    item = document.createElement('h1');
    item.innerHTML = "Search result";
    //col 9 that holds head name
    col = document.createElement('div');
    col.setAttribute("class", "w3-col l12");
    col.appendChild(item);

    div = document.createElement('div');
    div.setAttribute("class", "w3-row");
    div.appendChild(col);
    document.querySelector("#main_container").appendChild(div);

    var row = document.createElement('div');
    row.setAttribute("class", "w3-row w3-padding");
    for (var i = 0; i < response.result.Search.length; i++) {
        if (i % 3 == 0) {
            document.querySelector("#main_container").appendChild(row);
            row = document.createElement('div');
            row.setAttribute("class", "w3-row w3-padding");
        }
        row.appendChild(renderSearch(response.result.Search[i]));
    }

    document.querySelector("#main_container").appendChild(row);
}

function renderSearch(item) {
    var card, third, div, img, h2, p, button;


    img = document.createElement('img');
    img.setAttribute("alt", item.Title);
    img.setAttribute("src", item.Poster);
    if (item.Poster == "N/A") {
        img.setAttribute("src", "");
    }
    img.setAttribute("class", "movie-image rounded border");

    h2 = document.createElement('h5');
    h2.innerHTML = item.Title;

    p = document.createElement('p');
    p.setAttribute("class", "w3-text-grey");
    p.innerHTML = item.Year;

    button = document.createElement('button');
    button.setAttribute("class", "viewdetail btn btn-primary");
    button.setAttribute("type", "button");
    button.setAttribute("data-id", item.imdbID);
    button.innerHTML = "View";


    div = document.createElement('div');
    div.setAttribute("class", "w3-container w3-center");

    div.appendChild(h2);
    div.appendChild(p);
    div.appendChild(button);

    card = document.createElement('div');
    card.setAttribute("class", "w3-card w3-margin");

    card.appendChild(img);
    card.appendChild(div);

    third = document.createElement('div');
    third.setAttribute("class", "w3-col l4");
    third.appendChild(card);
    return third;
}

function status_404() {
    return'<div class="w3-row w3-margin">\n\
<div class="w3-padding-48 w3-grey w3-xxxlarge w3-text-light-gray w3-center">\n\
<p>404 ERROR - NO RESULT FOUND</p></div></div>';
}

function status_500() {
    return'<div class="w3-row w3-margin">\n\
<div class="w3-padding-48 w3-red w3-xxxlarge w3-text-light-gray w3-center">\n\
<p>505 ERROR - Internal Server Error</p></div></div>';
}