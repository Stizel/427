const debounce = (fn, debounceTime) => {
    let timer;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(this, args);
        }, debounceTime);
    };
};

const createEl = (elTag, elClass, nodeName) => {
    const el = document.createElement(elTag);
    if (elClass) el.classList.add(elClass);
    nodeName.append(el);
    return el;
};

const createSelectedInfo = (obj, node) => {
    for (let key in obj) {
        const selectedItemEl = createEl("li", "selected__text", node);
        selectedItemEl.textContent = `${key}: ${obj[key]}`;
    }
};

const clearSearchResults = () => {
    const searchResultsList = document.querySelectorAll(".results__item");
    searchResultsList.forEach((item) => {
        item.remove();
    });
};

const deleteSelectedList = (e) => {
    const item = e.target.closest(".selected__item");
    item.remove();
};

const addSelectedList = (item) => {
    const repoInfo = {
        Name: item.name,
        Owner: item.owner.login,
        Stars: item.stargazers_count
    };

    const selected = document.querySelector(".selected");
    const selectedItem = createEl("div", "selected__item", selected);
    const selectedItemInner = createEl("ul", "selected__info", selectedItem);

    createSelectedInfo(repoInfo, selectedItemInner);

    const selectedDelete = createEl("button", "selected__delete", selectedItem);
    const selectedDeleteImg = createEl("img", null, selectedDelete);
    selectedDeleteImg.src = "img/Delete.svg";

    selectedDelete.addEventListener("click", deleteSelectedList);
    input.value = "";
    input.focus();
    clearSearchResults();
};

const addSearchResult = (items) => {
    items.forEach((item) => {

        const searchResultsList = document.querySelectorAll(".results__item");

        if (searchResultsList.length < 5) {
            const searchItem = document.createElement("li");
            searchItem.classList.add("results__item");
            searchItem.textContent = item.name;
            searchItem.tabIndex = 0;

            document.querySelector(".results").append(searchItem);

            searchItem.addEventListener("click", () => addSelectedList(item));
            searchItem.addEventListener("keypress", (e) => {
                if (e.key === "Enter") addSelectedList(item);
            });
        }
    });
};

const sendRequest = async () => {
    const inputValue = input.value.trim();
    if (inputValue !== "") {
        const url = `https://api.github.com/search/repositories?q=${inputValue}`;
        const response = await fetch(url);
        const data = await response.json();
        clearSearchResults();
        addSearchResult(data.items);
    } else clearSearchResults();
};
let input = document.querySelector(".searching");

const sendRequestDebounce = debounce(sendRequest, 500);
input.addEventListener("input", sendRequestDebounce);
window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        clearSearchResults();
        input.value = "";
    }
});



