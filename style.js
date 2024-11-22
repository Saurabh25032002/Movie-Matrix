const searchForm=document.querySelector('form');
const movieContainer=document.querySelector('.movie-container');
const inputBox=document.querySelector('.inputBox');



//function to Fetch movie Details using OMDB API
 const getMovieinfo=async (movie)=>
 {

    try{
        const apikeyy="38311a73";
const url=`https://www.omdbapi.com/?apikey=${apikeyy}&t=${movie}`;
const response= await fetch(url);

if(!response.ok)
{
    throw new Error("Unable To Fetch Movie Data.");
}

const data= await response.json();
console.log(data);
showMovieData(data);

    }
catch(error)
{
    showErrorMessage("No Movies Found!!!");
}

// console.log(data);
 }

//Function to show movie data on screen
 const showMovieData=(data)=>{

    movieContainer.innerHTML="";

    movieContainer.classList.remove('noBackground');

    const {Title,imdbRating,Genre,Released,Runtime,Actors,Plot,Poster}=  data;

    const movieElement=document.createElement('div');


    movieElement.classList.add('movie-info');

    movieElement.innerHTML=`<h2>${Title}</h2>  
                              <p><strong>Rating: &#11088</strong>${imdbRating}</p>`
        const movieGenreElement=document.createElement('div');

        movieGenreElement.classList.add('movie-genre');

        Genre.split(",").forEach(element => {

            const p=document.createElement('p');
            p.innerText=element;
            movieGenreElement.appendChild(p);
            
        });


        movieElement.appendChild(movieGenreElement);


        movieElement.innerHTML+=` 
        <p><strong>Released Date: </strong>${Released}</p>
        <p><strong>Duration: </strong>${Runtime}</p>
        
        <p><strong>Cast: </strong>${Actors}</p>
        <p><strong>Plot: </strong>${Plot}</p>`

        //creating a div for movie poster

        const moviePosterElement=document.createElement("div");

        moviePosterElement.classList.add("movie-poster");
        moviePosterElement.innerHTML=`<img src="${Poster}"/>`;

        movieContainer.appendChild(moviePosterElement);       

        movieContainer.appendChild(movieElement);                    
 }
//Function to display Error message

const showErrorMessage=(message)=>{
    movieContainer.innerHTML=`<h2>${message}</h2>`
movieContainer.classList.add('noBackground');

}




// Additional Event Listener To Search Form
searchForm.addEventListener("submit",(e)=>{
    e.preventDefault();

    const movieName=inputBox.value.trim();
    if(movieName!=='')
    {
        showErrorMessage("Fetching Movie Information...");
        getMovieinfo(movieName);
    }
    
else{
    showErrorMessage("Enter Movie Name To Get Movie Information");

}

  
})