const form = document.querySelector("form");

form.addEventListener("submit", handleFormSubmit);

function handleFormSubmit(event) {
    event.preventDefault();
    const amount = event.target.amount.value;
    const desc = event.target.desc.value;
    const category = event.target.category.value;

    const data = {amount, desc, category};
    const key = `${amount}-${desc}`;

    localStorage.setItem(key, JSON.stringify(data));
    event.target.amount.value = "";
    event.target.desc.value = "";
    event.target.category.value = "Open this select menu";

    display(data, key);
}

function display(data, key) {
    const parentElem = document.getElementById("expense-list");
    const childElem = document.createElement("li");
    childElem.classList = "card";
    childElem.style.width = "18rem";
    childElem.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">${data.amount}</h5>
                <p class="card-text">${data.desc}</p>
                <p class="badge text-bg-info">${data.category}</p>
            </div>
        `

    const buttonContainer = document.createElement("div");
    buttonContainer.classList = "d-block btn-group m-3 mt-0";

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList = "btn bg-danger text-white";
    deleteBtn.addEventListener("click", ()=> {
        localStorage.removeItem(key);
        parentElem.removeChild(childElem);
    })

    const editBtn = document.createElement("button");
    editBtn.classList = "btn bg-dark-subtle";
    editBtn.textContent = "Edit";
    editBtn.addEventListener("click", () => {
        localStorage.removeItem(key);
        parentElem.removeChild(childElem);
        document.getElementById("amount").value = data.amount;
        document.getElementById("desc").value = data.desc;
        document.getElementById("category").value = data.category;
    });

    buttonContainer.appendChild(editBtn);
    buttonContainer.appendChild(deleteBtn);
    childElem.appendChild(buttonContainer);
    parentElem.appendChild(childElem);
}

function loadExpenses() {
    Object.keys(localStorage).forEach((key) => {
        const data = JSON.parse(localStorage.getItem(key));
        if (data && data.amount) {
            display(data, key);
        }
    });
}

loadExpenses();