const API_URL = "https://api.github.com/users/";

const searchBtn = document.querySelector(".search-btn");
const inputSearch = document.querySelector("#username");
const inputForm = document.querySelector(".form");

const imgAvatar = document.querySelector("#avatar");
const userName = document.querySelector("#user__name");
const userFollowers = document.querySelector(".followers");
const userFollowing = document.querySelector(".following");
const userLoginName = document.querySelector(".user__github__url");
const userGithubAdrress = document.querySelector(".user__github__url");

const searchUser = (event) => {
  // console.log({ input: inputSearch.value });

  let searchTerm = inputSearch.value;

  if (!searchTerm) {
    alert("Search a GitHub Username");
    return;
  }

  // 2 req: Sync / Async
  fetch(API_URL + searchTerm, { method: "GET" })
    .then(function (response) {
      return response.json();
    })
    .then((data) => {
      render(data);
    });
};

searchBtn.addEventListener("click", searchUser);
document.addEventListener("keydown", function (e) {
  console.log(e);
  if (e.key === "Enter") {
    searchUser();
  }
});

function render(data) {
  const {
    avatar_url,
    hireable,
    following,
    followers,
    location,
    name,
    html_url,
    login,
  } = data;
  imgAvatar.src = avatar_url;
  userName.innerText = name;
  userFollowers.innerText = followers;
  userFollowing.innerText = following;
  userLoginName.innerText = login;
  userGithubAdrress.href = html_url;
}
