export const createReview = () => {
  let newReview = {
    writer: document.querySelector("#review-writer").value,
    comment: document.querySelector("#review-comment").value,
    password: document.querySelector("#review-password").value,
  };

  let reviewsFromDB = JSON.parse(localStorage.getItem("id"));
  let reviews = reviewsFromDB ? [...reviewsFromDB, newReview] : [newReview];

  window.localStorage.setItem("id", JSON.stringify(reviews));
};

const renderReview = (reviewData) => {
  const { writer, comment } = reviewData;

  const reviewList = document.querySelector("#review-list");

  const reviewContainer = document.createElement("div");
  reviewContainer.style.display = "flex";
  reviewContainer.style.justifyContent = "space-between";
  reviewContainer.style.alignItems = "center";
  reviewContainer.style.padding = "10px";
  reviewContainer.style.margin = "10px";
  reviewContainer.style.border = "solid 1px black";

  const reviewContentContainer = document.createElement("span");
  reviewContentContainer.textContent = comment;

  const reviewWriterContainer = document.createElement("span");
  reviewWriterContainer.textContent = writer;

  reviewContainer.append(reviewContentContainer, reviewWriterContainer);

  reviewList.append(reviewContainer);
};

export const showReviews = () => {
  // 1. localStorage에서 reviews를 가져온다.
  const reviews = JSON.parse(window.localStorage.getItem("id"));

  reviews.forEach((review) => {
    renderReview(review);
  });
};

// export let sortMovies = async () => {
//   let movies = await fetchMovieData();

//   let cardList = document.querySelector(".card-list");
//   cardList.innerHTML = "";

//   //필터링
//   let searchInput = document.querySelector("#searchInput").value;
//   let filteredMovies = movies.filter((movie) =>
//     movie.title.toLowerCase().includes(searchInput.toLowerCase())
//   );
//   console.log(filteredMovies);

//   let movieCard;
//   filteredMovies.map((item) => {
//     movieCard = a(item);
//     let cardList = document.querySelector(".card-list");
//     cardList.append(movieCard);
//   });

//   a(filteredMovies);
// };
