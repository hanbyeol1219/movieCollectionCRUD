// 1.api요청하는 함수 fetchMovieData()
const fetchMovieData = async () => {
  //
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMzFhOWNiZmI5ZmQyYjM0Zjc5NDJhMDE3ZDQzNzk1NCIsInN1YiI6IjY0NzA4OTQ1MTNhMzIwMDEzMzg2MDdhZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IRZX6ubYrGSryWyuwy-pz7rwGMOmnbvU9PitigtZTcM",
    },
  };

  const response = await fetch(
    "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=3",
    options
  );

  const data = await response.json();

  return data.results;
};
// fetchMovieData();
//--------------------------------------------------------------------//

//중복되는 부분 : 전역으로 선언
function a(item) {
  let { poster_path, title, overview, vote_average, id } = item;

  let movieCard = document.createElement("div");
  movieCard.className = "movie-card";
  movieCard.onclick = function () {
    alert(`ID : ${id}`);
  };

  let posterPathElement = document.createElement("img");
  posterPathElement.src = `https://image.tmdb.org/t/p/w400/${poster_path}`;
  posterPathElement.style.marginLeft = "20px";
  posterPathElement.style.marginTop = "20px";

  let titleElement = document.createElement("h3");
  titleElement.textContent = title;
  titleElement.style.marginLeft = "10px";
  titleElement.style.fontSize = "20px";

  let overviewElement = document.createElement("p");
  overviewElement.textContent = overview;
  overviewElement.style.marginLeft = "10px";
  overviewElement.style.marginRight = "10px";
  overviewElement.style.textAlign = "justify";

  let voteAverageElement = document.createElement("p");
  voteAverageElement.textContent = `Rating: ${vote_average}`;
  voteAverageElement.style.marginLeft = "10px";
  voteAverageElement.style.marginRight = "10px";

  let idElement = document.createElement("p");
  idElement.textContent = `id: ${id}`;
  idElement.style.marginLeft = "10px";
  idElement.style.marginRight = "10px";

  movieCard.appendChild(posterPathElement);
  movieCard.appendChild(titleElement);
  movieCard.appendChild(overviewElement);
  movieCard.appendChild(voteAverageElement);
  movieCard.appendChild(idElement);

  return movieCard;
}

// 2. 화면에 먼저 보여주기
//함수 showMovies
let showMovies = async () => {
  let movies = await fetchMovieData();
  let movieCard;
  movies.forEach((item) => {
    movieCard = a(item);
    let cardList = document.querySelector(".card-list");
    cardList.append(movieCard);
  });

  // items.forEach((item) => {
  //
  // let movieCard = a(movies);
  console.log(movieCard);

  //
};
showMovies();
//--------------------------------------------------------------------//

//3.검색 -> 필터링해서 보여주기
let sortMovies = async (event) => {
  event.preventDefault(); //❗️이게 있어야함. 없으면: 검색하고 -> 페이지 새로고침이 돼서 검색한 영화'만' 띄워줄 수가 없음.
  let movies = await fetchMovieData();

  //필터링
  let searchInput = document.querySelector("#searchInput").value;
  let filteredMovies = movies.filter(
    //얘의 결과물은 배열 -> 그래서 forEach돌린 것임
    (movie) => movie.title.toLowerCase().includes(searchInput.toLowerCase()) //⭐️{}+return이거나, {}랑 return 같이 없거나
  );
  // ❗️.map(콜백함수); //체이닝기법

  //
  let movieCard;
  filteredMovies.forEach((item) => {
    movieCard = a(item);
    let cardList = document.querySelector(".card-list");
    cardList.innerHTML = "";
    cardList.append(movieCard);
  });
  a(filteredMovies);
};
// sortMovies(); //❗️이게 지금 전역 영역에서 호출되고 있어서 preventDefault에러가 났던 것. 그럴 필요 없는 함수임. 이미 html에서 onclick으로 호출이 되고 있기 때문에. ❗️여기에 sortMovies(event)라고 한다 해도, clickevent가 아니기 때문에 event로서의 의미가 없음.

window.addEventListener("load", function () {
  let searchInput = document.querySelector("#searchInput");
  searchInput.focus();
});
