console.log('hello')

const API_KEY = 'api_key=a7f991f704db0db5e08f2e503690bf28';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?primary_release_year=2010&sort_by=vote_average.desc&' + API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');
const SEARCH_URL = BASE_URL + '/search/movie?'+API_KEY;

getMovie(API_URL);

function getMovie(url){
    fetch(url).then(res=>res.json()).then(data =>{
        console.log(data.results)
        showMovie(data.results)
    })
}

function showMovie(data){
    main.innerHTML = '';

    data.forEach(content =>{
        const {title,original_title,poster_path,vote_average} = content;
        const movieEl = document.createElement(`div`);
        movieEl.classList.add(`content`);
        offset = Math.floor(Math.random() * (9 - 0 + 1) + 0)
        movieEl.innerHTML = `
        
        <img src="${IMG_URL + poster_path}" id="img1" alt="${title}" height="100%" width="100%">

                            <div class="star"><i class="fa fa-star" style="color:#F5C518;"></i><span class="${getColor(vote_average-offset)}">
                                    ${vote_average-offset}</span>
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
        main.appendChild(movieEl);
    })
}
    function getColor(vote_average){
        if(vote_average>=8){
            return 'green';
        }else if(vote_average>=5){
            return 'orange'
        }else{
            return 'red'
        }
    }

    form.addEventListener('submit',(e)=>{
        e.preventDefault();

        const searchTerm = search.value;

        if(searchTerm){
            getMovie(SEARCH_URL +'&query='+searchTerm)
        }else{
            getMovie(API_URL);
        }
    })