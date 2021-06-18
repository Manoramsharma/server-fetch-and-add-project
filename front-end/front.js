const container = document.querySelector(".container");
const input = document.querySelector("input");

let usersArray = [];

const url = "http://localhost:8000";

const createCardList = (array) => {
  container.innerHTML = "";

  array.forEach((obj) => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `<div class="name">Name</div><div class="name-content">${obj.username}</div><div class="email">Email</div><div class="email-content">${obj.email}</div>`;
    container.appendChild(card);
  });
};

fetch(url)
  .then((data) => {
    return data.json();
  })
  .then((result) => {
    console.log(result);
    usersArray = result;
    createCardList(usersArray);
  });

input.addEventListener("input", (event) => {
  const searchStr = event.target.value.toLowerCase();

  const filteredArray = usersArray.filter((ele) => {
    return (
      ele.username.toLowerCase().includes(searchStr) ||
      ele.email.toLowerCase().includes(searchStr)
    );
  });

  createCardList(filteredArray);
});

// particle js configuration
//particlesJS.load("particles-js", "particles.json");

const addUserButton = document.querySelector(".controls img");

addUserButton.addEventListener("click", () => {
  const username = prompt("enter your username");
  const email = prompt("enter your email");

  const newuser = {
    username,
    email,
  };

  const secretkey = prompt("enter secret key");

  const bodyData = {
    newuser,
    secretkey,
  };

  fetch(`${url}/addUser`, {
    method: "POST",
    body: JSON.stringify(bodyData),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((data) => data.json())
    .then((result) => {
      usersArray = result;
      createCardList(result);
    })
    .catch((error) => {
      console.log(error);
      alert("User not added");
    });
});