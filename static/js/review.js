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
const reviewForm = document.querySelector("#review-form");
let btnId = document.querySelectorAll(".delete-button").id;
reviewForm.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log("오고있니?");
  const createReview = () => {
    let newReview = {
      writer: document.querySelector("#review-writer").value,
      comment: document.querySelector("#review-comment").value,
      password: document.querySelector("#review-password").value,
      id: paramId,
      reviewDelBtnId: Math.random(),
      reviewEditBtnId: Math.random(),
    };
    console.log({ newReview });
    let reviewsFromDB = JSON.parse(localStorage.getItem("reviews"));
    let reviews = reviewsFromDB ? [...reviewsFromDB, newReview] : [newReview];
    console.log({ reviewsFromDB });
    console.log({ reviews });

    window.localStorage.setItem("reviews", JSON.stringify(reviews));
  };
  createReview();
  window.location.reload();
});

const renderReview = (reviewData) => {
  const { writer, comment, reviewDelBtnId, reviewEditBtnId } = reviewData;

  const reviewList = document.querySelector("#review-list");

  const reviewContainer = document.createElement("div");
  reviewContainer.style.display = "flex";
  reviewContainer.style.justifyContent = "space-between";
  reviewContainer.style.alignItems = "center";
  reviewContainer.style.padding = "10px";
  reviewContainer.style.margin = "10px";
  reviewContainer.style.border = "solid 1px black";

  const reviewWriterContainer = document.createElement("span");
  reviewWriterContainer.className = "this-review-writer";
  reviewWriterContainer.textContent = writer;

  const reviewContentContainer = document.createElement("span");
  reviewContentContainer.className = "this-review-comment";
  reviewContentContainer.textContent = comment;

  const reviewDeleteBtn = document.createElement("button");
  reviewDeleteBtn.className = "delete-button";
  reviewDeleteBtn.textContent = "삭제";
  reviewDeleteBtn.style.margin = "0px";
  reviewDeleteBtn.type = "submit";
  reviewDeleteBtn.id = reviewDelBtnId;

  const reviewEidtBtn = document.createElement("button");
  reviewEidtBtn.className = "edit-button";
  reviewEidtBtn.textContent = "수정";
  reviewEidtBtn.style.margin = "0px";
  reviewEidtBtn.type = "button";
  reviewEidtBtn.id = reviewEditBtnId;

  reviewContainer.append(
    reviewWriterContainer,
    reviewContentContainer,
    reviewDeleteBtn,
    reviewEidtBtn
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

let deleteBtns = document.querySelectorAll(".delete-button");

deleteBtns.forEach((deleteBtn) => {
  deleteBtn.addEventListener("click", reviewDelBtnClick);
});

function reviewDelBtnClick(event) {
  const clickDeleteBtn = event.target;

  const reviews = JSON.parse(window.localStorage.getItem("reviews"));
  const inputPassword = prompt("삭제를 위해 비밀번호를 입력하세요.");

  reviews.forEach((review, index) => {
    if (review.reviewDelBtnId == clickDeleteBtn.id) {
      if (review.password == inputPassword) {
        reviews.splice(index, 1);
      } else {
        alert("비밀번호가 일치하지 않습니다.");
        return;
      }
    }
  });
  window.localStorage.setItem("reviews", JSON.stringify(reviews));
  window.location.reload();
}

//---------------------------------여기부터 수정
/*
let editBtns = document.querySelectorAll(".edit-button");

editBtns.forEach((editBtn) => {
  editBtn.addEventListener("click", reviewEditBtnClick);
});

function reviewEditBtnClick(event) {
  let writer = document.querySelectorAll(".this-review-writer");
  console.log(writer);
  const clickEditBtn = event.target;

  const reviews = JSON.parse(window.localStorage.getItem("reviews"));
  const inputPassword = prompt("수정를 위해 비밀번호를 입력하세요.");

  reviews.forEach((review) => {
    if (review.reviewEditBtnId == clickEditBtn.id) {
      if (review.password == inputPassword) {
        console.log("수정을 위한 곳");
        let writerValue = review.writer;
        console.log("이것은 원래 있던 writer = ", writerValue);
        let commentValue = review.comment;
        console.log("이것은 원래 있던 comment = ", commentValue);
        // 현재 review의 writer를 담았다. 지금 내가 가져온 reviews의 내용을 수정하는게 맞나?
        // html요소의 내용을 바꾸는건 의미가 없나?
        // 이제 이 객체의 내용을 수정해야 함
        // 브라우저에서 원래 이 내용이 적혀있는 부분에 input과 수정완료 버튼이 보이게 해서 ← 수정 버튼 부분이 숨겨지고 그 부분에 수정 완료 버튼이 보이게
        // 수정할 내용을 적고 수정 완료 버튼을 누르면 바뀐 값으로 다시 localStorage에 setItem한다.

        const inputWriter = document.createElement("input");
        inputWriter.className = "editInputWriter";
        inputWriter.type = "text";
        inputWriter.style.margin = "0px";

        const inputComment = document.createElement("textarea");
        inputComment.className = "editInputComment";
        inputComment.rows = "1";
        inputComment.cols = "50";
        inputComment.style.margin = "0px";
        inputComment.style.resize = "none";

        const editDoneBtn = document.createElement("button");
        editDoneBtn.textContent = "수정완료";
        editDoneBtn.type = "submit";

        document.body.append(inputWriter, inputComment, editDoneBtn);

        editDoneBtn.addEventListener("click", function () {
          let editWriterValue =
            document.querySelector(".editInputWriter").value;
          let editCommetValue =
            document.querySelector(".editInputComment").value;
          console.log(editWriterValue, editCommetValue);

          writerValue = editWriterValue;
          commentValue = editCommetValue;
          console.log("이것은 바뀐 writer = ", writerValue);
          console.log("이것은 바뀐 comment = ", commentValue);
        });
      } else {
        alert("비밀번호가 일치하지 않습니다.");
        return;
      }
    }
  });
}
*/

//-------------------------------------------------수정 수정~

let editBtns = document.querySelectorAll(".edit-button");
const modalOverlay = document.querySelector("#overlay");
const modalCloseBtn = document.querySelector("#modal-close-btn");
const modalEditBtn = document.querySelector("#modal-review-edit-btn");

const reviews = JSON.parse(window.localStorage.getItem("reviews"));

editBtns.forEach((editBtn) => {
  editBtn.addEventListener("click", (event) => {
    const inputPassword = prompt("수정을 위해 비밀번호를 입력하세요.");
    showEditModal();
    reviews.forEach((review) => {
      if (review.reviewEditBtnId == event.target.id) {
        if (review.password == inputPassword) {
          document.querySelector("#modal-review-writer").value = review.writer;
          document.querySelector("#modal-review-comment").value =
            review.comment;
          modalEditBtn.addEventListener("click", () => {
            review.writer = document.querySelector(
              "#modal-review-writer"
            ).value;
            review.comment = document.querySelector(
              "#modal-review-comment"
            ).value;
            window.localStorage.setItem("reviews", JSON.stringify(reviews));
            window.location.reload();
            alert("리뷰가 수정되었습니다.");
            return;
          });
        } else if (inputPassword == "") {
          alert("비밀번호가 입력되지 않았습니다.");
          modalOverlay.style.display = "none";
          return;
        } else {
          alert("비밀번호가 일치하지 않습니다.");
          modalOverlay.style.display = "none";
          return;
        }
      }
    });
  });
});

function showEditModal() {
  modalOverlay.style.display = "block";
}

modalCloseBtn.addEventListener("click", function () {
  modalOverlay.style.display = "none";
});

/*
모달 창을 눌러도 꺼져버리는 문제발생
modalOverlay.addEventListener("click", function () {
  this.style.display = "none";
});
*/
