const createElements =(arr)=>{
    const htmlElement = arr.map((el)=> `<span class="btn">${el}</span>`).join("");
    console.log(htmlElement);  // এখন একটানা string
    document.body.innerHTML += htmlElement; // পেজে show করবে
}

const synonyms = ["hello","hii","naya"];
createElements(synonyms);
