console.log('hello')

const API_KEY = 'api_key=a7f991f704db0db5e08f2e503690bf28';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?primary_release_year=2010&sort_by=vote_average.desc&' + API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');
const SEARCH_URL = BASE_URL + '/search/movie?' + API_KEY;



getMovie(API_URL);

function getMovie(url) {
    fetch(url).then(res => res.json()).then(data => {
        console.log(data.results)
        showMovie(data.results)
    })
}

function showMovie(data) {
    main.innerHTML = '';
    counter = 1

    data.forEach(content => {
        const { title, original_title, poster_path, vote_average } = content;
        const movieEl = document.createElement(`div`);
        movieEl.id = counter
        if (counter > 6) {
            movieEl.style.display = "none"
        }



        movieEl.classList.add(`content`);

        // offset = Math.floor(Math.random() * (10) + 1)
        movieEl.innerHTML = `

            <img src="${IMG_URL + poster_path}" id="img" alt="${title}">


            <div class="star"><i class="fa fa-star" style="color:#F5C518;"></i><span class="${getColor(vote_average)}">
                                    ${vote_average}</span> 
                                    &nbsp;&nbsp;&nbsp;&nbsp;<i class="fa fa-star-o" aria-hidden="true"
                    style="color:#5799ef;"></i></div> <br>
                        <div class="review">
                            <p style="size:25px" id="movieTitle_1">${original_title}</p>
                        </div>


                        <div class="show">
                            <a href="#" class="button">
                                <p style="font-size:20px"><i class=" fa fa-ticket" style="color:#5799ef">
                                </i>showtimes </p>
                            </a>
                        </div>

                        <div class="trailer">
                            <a href="#" class="button">
                                <p style="font-size:20px"><i class="fa fa-caret-right" style=" color:#a5a5a5"></i>
                                    &nbsp;
                                    Trailer</p>
                            </a>
                        </div>
                        `
        counter = counter + 1
        main.appendChild(movieEl);
    })
}
function getColor(vote_average) {
    if (vote_average >= 8) {
        return 'green';
    } else if (vote_average >= 5) {
        return 'orange'
    } else {
        return 'red'
    }
}



var sliderMain = document.getElementById("slider-main");
var content = sliderMain.getElementsByClassName("content");

function next() {
    sliderMain.append(content[0]);
    content[0].style.display = "inline-block"
    content[5].style.display = "inline-block"
}

function prev() {
    sliderMain.prepend(content[content.length - 1]);

    content[content.length - 1].style.display = "inline-block"
}



form.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchTerm = search.value;

    if (searchTerm) {
        getMovie(SEARCH_URL + '&query=' + searchTerm)
    } else {
        getMovie(API_URL);
    }
})

// const img = document.querySelectorAll("img");
// // get all links
// // console.log(img);
// img.forEach(img => {
//     if (img.src(IMG_URL)) {
//         img.style.display = "none";
//     };
// });






