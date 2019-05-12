var apikey = 'bd22bc4344b2cde516ad4066c4e6e73a';
var keyword_api = 'https://api.themoviedb.org/3/search/movie?api_key=' + apikey + '&language=en-US&page=1&query=';
var MovieId_api = 'https://api.themoviedb.org/3/movie/';
var apirest = '?api_key=' + apikey;


$( document ).ready( () =>
{
    $( '#searchForm' ).on( 'submit', ( e ) =>
    {
        let searchText = $( '#searchText' ).val();
        getMovies( searchText );
        e.preventDefault();
    } );
} );

function getMovies ( searchText )
{
    axios.get( keyword_api + searchText )
        .then( ( response ) =>
        {
            // console.log(response);
            let movies = response.data.results;
            console.log( movies );
            let output = '';
            defaultpicture = "https://americana.org/wp-content/uploads/2018/07/default.jpg"
            $.each( movies, ( index, movie ) =>
            {
                if ( typeof movie != 'undefined' )
                {
                    imgsrc = movie.poster_path ? `https://image.tmdb.org/t/p/w185_and_h278_bestv2/${ movie.poster_path }` : defaultpicture;

                    output += `
            <div class="col-md-2 col-xs-8 offset-xs-36 col-sm-3 movie-container">
            <a onclick="movieSelected('${movie.id }')" >
            <div class=" well mcon">
            <img src=${imgsrc }>
            <h6 class="mov-title">${movie.title }</h6>

            </div>
            </a>
            </div>
            `;
                }
            } );

            $( '#movies' ).html( output );
        } )
        .catch( ( err ) =>
        {
            console.log( err );
        } );
}

function movieSelected ( id )
{
    sessionStorage.setItem( 'movieId', id );
    console.log( "srssion" + sessionStorage.getItem( 'movieId' ) );
    window.location = 'movie.html';
    return false;
}

function getMovie ()
{
    let Id = sessionStorage.getItem( 'movieId' );

    axios.get( MovieId_api + Id + apirest )
        .then( ( response ) =>
        {
            console.log( response );
            let movie = response.data;
            let genree = movie.genres;
            var g = [];
            console.log( movie.genres );
            $.each( genree, ( index, genre ) =>
            {
                g.push( genre.name );
            } );
            g = g.join();
            console.log( g );

            let output = `
        
        <div class="col-md-8">
        <h2>${movie.title }</h2>
        
        <ul class="list-group">
        <li class="list-group-item"><strong>Genre:</strong> ${g }</li>
        <li class="list-group-item"><strong>Released:</strong> ${movie.release_date }</li>
        <li class="list-group-item"><strong>Rated:</strong><span class="badge">50</span> ${movie.vote_average }</li>
        <li class="list-group-item"><strong>No of times:</strong> ${movie.id }</li>
        <li class="list-group-item"><strong>revenue</strong> ${movie.revenue }</li>
        </ul>
        </div>
        </div>
        <div class="row">
        <div class="well">
        <h3>Plot</h3>
        ${movie.overview }
        <hr>
        <a href="http://imdb.com/title/${movie.imdb_id }" target="_blank" class="btn btn-primary">View IMDB</a>
        <a href="index.html" class="btn btn-default">Go Back To Search</a>
        </div>
        </div>
        `;

            $( '#movie' ).html( output );
        } )
        .catch( ( err ) =>
        {
            console.log( err );
        } );
}
