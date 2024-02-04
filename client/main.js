const form = document.getElementById(`form`);
const guestContainer = document.getElementById(`guest-container`);
const newContainer = document.getElementById("new-container");
//set  base url
const baseURL = `http://localhost:7777`;

//submit  form
form.addEventListener(`submit`, async (e) => {
  e.preventDefault();
  // create weird formdata type
  const formData = new FormData(form);
  const entryData = Object.fromEntries(formData);
  // fetch response
  const response = await fetch(`${baseURL}/guestbook`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(entryData),
  });
  // response  conditionals
  if (response.ok) {
    displayGuests();
  } else {
    console.error("Failed to add guest entry", response.status);
  }
});

//fetches all entries
async function fetchGuests() {
  const guests = await fetch(`${baseURL}/guestbook`);
  //parse into array
  let result = await guests.json();
  return result;
}
// display guests
async function displayGuests() {
  console.log("function workin");
  let guests = await fetchGuests();
  guestContainer.innerHTML = "";
  guests.forEach((guest) => {
    // create guestbook in html
    let h3Tag = document.createElement("h3");
    let pTag = document.createElement("p");
    let commentTag = document.createElement("p");
    let delButton = document.createElement("p");
    let infoDiv = document.createElement(`div`);
    let guestCard = document.createElement(`div`);
    h3Tag.textContent = guest.name;
    h3Tag.setAttribute(`class`, `guestName`);
    pTag.textContent = guest.date;
    commentTag.textContent = guest.comment;
    delButton.textContent = `X`;
    // delete button
    infoDiv.appendChild(h3Tag);
    infoDiv.appendChild(pTag);
    guestCard.appendChild(infoDiv);
    guestCard.appendChild(commentTag);
    guestCard.appendChild(delButton);
    guestContainer.appendChild(guestCard);
    newContainer.appendChild(guestContainer);
    //check if html  was created
    console.log("function ran :(");
    //delete button
    delButton.addEventListener(`click`, (e) => {
      e.preventDefault();
      // delete function
      handleDelete(guest.id);
    });
  });
}

//delete function
async function handleDelete(id) {
  const result = await fetch(`${baseURL}/guestbook/${id}`, {
    method: "DELETE",
  });
  console.log(result);
  if (result.ok) {
    displayGuests();
  }
}
// call display guests
displayGuests();
