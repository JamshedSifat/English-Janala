const createElements =(arr) =>{
    const htmlElements =arr.map((el) =>`<span class="btn">${el}</span>`);
    return (htmlElements.join(""));
}

const manageSPinner =(status)=>{
    if(status == true){
        document.getElementById("spinner").classList.remove("hidden")
        document.getElementById("word-container").classList.add("hidden")
    }
    else{
         document.getElementById("word-container").classList.remove("hidden")
        document.getElementById("spinner").classList.add("hidden")
    }
}

const loadLesson =()=>{
    const url = "https://openapi.programming-hero.com/api/levels/all"
    fetch(url)
    .then(response =>response.json())//promise of json data
    .then((json)=>displayLessons(json.data))
}
const removeActive =()=>{
    const lessonButtons = document.querySelectorAll(".lesson-btn")
    // console.log(lessonButtons)
    lessonButtons.forEach((btn)=> btn.classList.remove("active"))
}
const loadLevelWord = (id)=>{
    
    manageSPinner(true);
    const url =`https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
    .then(response =>response.json())
    .then((data)=>{
        
        displayLevelWord(data.data)

        removeActive()
        const clickBtn = document.getElementById(`lesson-btn-${id}`)
        
         clickBtn.classList.add("active")
    })
}

const loadWordDetail =async(id)=>{
    const url =`https://openapi.programming-hero.com/api/word/${id}`
    const res =await fetch(url);
    const details = await res.json();
    // console.log(details)
    displayWordDetails(details.data)
}
const displayWordDetails =(word)=>{
   
    const detailsBox = document.getElementById("details-container")
    detailsBox.innerHTML=` <h1 class="font-bold text-3xl space-y-4">${word.word} (<i class="fa-solid fa-microphone-lines"></i> : ${word.pronunciation})</h1>
    <h3 class="font-bold py-4 ">Meaning</h3>
    <p class="text-md pb-5">${word.meaning}</p>

    <h2 class="font-bold text-xl">Example</h2>
    <p class="py-4">${word.sentence}</p>

    <h2 class="font-bangla font-bold text-lg pb-2 ">সমার্থক শব্দ গুলো</h2>
    <div class="flex mb-4">
        <div class="">
        <h2 class="font-bold">synonym</h2>
        <div class="">${createElements(word.synonyms)}</div>
    </div>
    </div>
    <button class="btn btn-primary btn-xs sm:btn-sm btn-lg w-7/12">Complete Learning</button>
`
     document.getElementById("my_modal_5").showModal()
   
}
const displayLevelWord =(words)=>{
    //get the container & empty
    const WordContainer =document.getElementById('word-container')
     WordContainer.innerHTML =''

     if(words.length == 0){
         WordContainer.innerHTML =`
          <div class="text-center col-span-full space-y-6 font-bangla">
             <img class="mx-auto" src="./assets/alert-error.png" alt="">
        <p class="text-xl font-medium text-gray-400  ">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি। </p>
        <h1 class="font-bold text-4xl">নেক্সট Lesson এ যান</h1>
      </div>
         `
         manageSPinner(false)
         return
     }

    words.forEach ((word)=>{
        //crate div
        const card = document.createElement("div")
        card.innerHTML=`
     <div class="bg-white  py-8 text-center rounded-md shadow-md space-y-4">
            <h2 class="font-bold text-2xl">${word.word ? word.word:"শব্দ পাওয়া যায় নি "}</h2>
            <p class="font-bold">meaning/pronuctation</p>
            <h3 class="font-bangla text-2xl ">"${word.meaning ? word.meaning : "অর্থ পাওয়া যায় নি"}/${word.pronunciation ? word.pronunciation : "pronunciation পাওয়া যায় নি" }"</h3>
            <div class="icons flex justify-between px-4 pt-4">
                <button onclick="loadWordDetail(${word.id})" class="btn bg-[#1a91ff1a] hover:bg-[#1a91ff8a]"><i class="fa-solid fa-circle-info"></i></button>
                <button class="btn bg-[#1a91ff1a] hover:bg-[#1a91ff8a]"><i class="fa-solid fa-volume-high"></i></button>
            </div>
            </div>
        `
        WordContainer.append(card)
    })
    manageSPinner(false)


}

const displayLessons =(lessons)=>{
//get the container & empty
const levelContainer = document.getElementById("level-container")
levelContainer.innerHTML=''
//get into every lessons
for(let lesson of lessons){
    const btnDiv =document.createElement("div");
    btnDiv.innerHTML =` 
     <button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord('${lesson.level_no}')"
 class="btn btn-outline btn-primary lesson-btn">
   <i class="fa-solid fa-book-open"></i> Lesson-${lesson.level_no}
</button>

    `
    //append button
    levelContainer.append(btnDiv)
}
}
loadLesson()