const API_URL = "https://api.github.com/users/";

const main = document.querySelector("#main");
const searchBtn = document.querySelector(".search-btn");
const inputSearch = document.querySelector("#username");
const inputForm = document.querySelector(".form");

const imgAvatar = document.querySelector("#avatar");
const userName = document.querySelector("#user__name");
const userFollowers = document.querySelector(".followers");
const userFollowing = document.querySelector(".following");
const userLoginName = document.querySelector(".user__github__url");
const userGithubAdrress = document.querySelector(".user__github__url");
const repository = document.querySelector(".repository");

const user = document.querySelector(".github-user");

const hire = document.querySelector(".hire");

const y = document.querySelector("#snackbar--empty-input");
const x = document.querySelector("#snackbar--not-found");

// --------------- FUNCTIONS ------------------

const searchUser = (event) => {
  let searchTerm = inputSearch.value;

  if (!searchTerm) {
    // alert("Search a GitHub Username");

    y.className = "show";
    setTimeout(function () {
      y.className = y.className.replace("show", "");
    }, 3000);
    return;
  }

  // 2 req: Sync / Async
  fetch(API_URL + searchTerm, { method: "GET" })
    .then(function (response) {
      // user.classList.remove("hidden");
      if (!response.ok) {
        const err = new Error(response.status);
        throw err;
      }
      return response.json();
    })
    .then((data) => {
      user.classList.remove("hidden");
      render(data);
      console.log(data);
    })
    .catch((error) => {
      user.classList.add("hidden");
      console.log(error);

      x.className = "show";
      setTimeout(function () {
        x.className = x.className.replace("show", "");
      }, 3000);
    });
};

// ------------------ EVENT LISTENERS ------------------

searchBtn.addEventListener("click", searchUser);

document.addEventListener("keydown", function (e) {
  console.log(e);
  if (e.key === "Enter") {
    searchUser();
  }
  // hire.style.backgroundColor = "var(--green-color)";
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
    public_repos,
  } = data;
  imgAvatar.src = avatar_url;
  userName.innerText = name;
  userFollowers.innerText = followers;
  userFollowing.innerText = following;
  userLoginName.innerText = login;
  userGithubAdrress.href = html_url;
  // hire.innerText = hireable;
  if (hireable) {
    hire.classList.add("green");
  } else {
    hire.classList.remove("green");
  }
  // user.classList.remove("hidden");
  repository.innerText = public_repos;
}
