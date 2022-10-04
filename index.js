const div = document.querySelector(".btn-close");
console.dir(div);

const autoCompleteList = document.querySelector(".autocomplete");



let response = [{
    name: "Redux-1",
    Owner: "Facebook",
    Stars: 145231
},
    {name: "Redux-trunk-2"},
    {name: "Redux-actions-3"},
    {name: "React-redux-4"},
    {name: "Redux-actions-5"},
    {name: "React-redux-6"},
    {name: "Redux-saga-7"}
];

let autoComplete = response.slice(0,5)
console.log(autoComplete)

const faragment = document.createDocumentFragment();

autoComplete.forEach((repo) => {
    const li = document.createElement('li');
    li.classList.add('autocomplete__list');
    const link = document.createElement("a");
    link.classList.add('autocomplete__link');
    link.textContent = repo.name;
    li.appendChild(link);
    faragment.appendChild(li);
});

autoCompleteList.appendChild(faragment);





// const octokit = new Octokit({
//     auth: 'YOUR-TOKEN'
// })
//
// await octokit.request('GET /search/repositories', {})
//
// const xhr = new XMLHttpRequest();
// xhr.open("get", "https://api.github.com/search/repositories");
// xhr.addEventListener('load',()=>{
//     console.log(xhr.responseText)
// })
//
// xhr.send()