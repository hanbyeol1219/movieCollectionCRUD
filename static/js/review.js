let matchObj;
// 아이디 가져오기

const urlParams = new URL(location.href).searchParams;
const paramId = urlParams.get("id");
console.log(paramId);

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZjFhODNmODg5NjI3YjBjNzRmYjY1ZGM2ZjBiNmU2YSIsInN1YiI6IjY0NzU2NGY2ZGQyNTg5MDEyMDA1OWQ3NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qYbO2zm8YucQo4jLrsGEtheiaYzCIhcxhyD8M9kAqhI",
  },
};

fetch(`https://api.themoviedb.org/3/movie/${paramId}?language=en-US`, options)
  .then((response) => response.json())
  .then((response) => console.log(response))
  .catch((err) => console.error(err));

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//
// 한별 : 리뷰 등록 test
document.querySelector("#review-writer2").value = paramId;
const reviewForm = document.querySelector("#review-form");
let btnId = document.querySelectorAll(".delete-button").id;
reviewForm.addEventListener("submit", (event) => {
  // event.preventDefault();
  console.log("오고있니?");
  const createReview = () => {
    let newReview = {
      writer: document.querySelector("#review-writer").value,
      comment: document.querySelector("#review-comment").value,
      password: document.querySelector("#review-password").value,
      id: paramId,
      reviewId: Math.random(),
    };
    // btnIndex: matchObj[matchObj.length - 1].btnIndex + 1 ,

    // newReview["btnIndex"] = matchObj?.[matchObj.length - 1]?.btnIndex + 1 || 1;
    console.log({ newReview });
    let reviewsFromDB = JSON.parse(localStorage.getItem("reviews"));
    let reviews = reviewsFromDB ? [...reviewsFromDB, newReview] : [newReview];
    console.log({ reviewsFromDB });
    console.log({ reviews });

    window.localStorage.setItem("reviews", JSON.stringify(reviews));
  };
  createReview();
  window.reload();
});

const renderReview = (reviewData) => {
  const { writer, comment, reviewId } = reviewData;

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

  const reviewDeleteBtn = document.createElement("button");
  reviewDeleteBtn.className = "delete-button";
  reviewDeleteBtn.textContent = "삭제";
  reviewDeleteBtn.style.margin = "0px";
  reviewDeleteBtn.type = "submit";
  reviewDeleteBtn.id = reviewId;

  reviewContainer.append(
    reviewContentContainer,
    reviewWriterContainer,
    reviewDeleteBtn
  );

  reviewList.append(reviewContainer);
};

const showReviews = () => {
  const reviews = JSON.parse(window.localStorage.getItem("reviews"));

  reviews.forEach((review) => {
    if (review.id == paramId) renderReview(review);
  });
};
showReviews();

//--------------------------------여기부터 삭제

// const deleteReview = () => {
//   const reviews = JSON.parse(window.localStorage.getItem("reviews"));
//   matchObj = [];
//   reviews.forEach((review) => {
//     if (review.id == paramId) {
//       matchObj.push(review);
//     }
//     return matchObj;
//   });
//   console.log("matchObj = ", matchObj);

//   const deleteBtn = document.querySelector(".delete-button");
// };
// deleteReview();
