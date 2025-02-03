function getTimeString(time){
    const day = parseInt (time/ 86400)      // 1day = 86400 Second 
    const hour = parseInt (time/3600 );    // 1hour = 3600 Second
    let second = time % 3600;
    const minuite =parseInt (second / 60);
    second = second % 60;
    return`${day} day ${hour} hour ${minuite} minuite ${second} second ago`
}

// remove active class
const removeActiveClass = () =>{
    const buttons = document.getElementsByClassName("category-btn");
    // console.log(buttons);
    for (let btn of buttons){
        btn.classList.remove('active');
    }
}


// saperet video by button click
const loadCatgoryVideos = (id) => {
    // alert(id);
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
        .then(res => res.json())
        .then(data => {
            const activeBtn = document.getElementById(`btn-${id}`);
            // console.log(activeBtn)

            // sobaik active class remove koro
               removeActiveClass();

            // id er class k active koro
            activeBtn.classList.add('active')
            displayVideos(data.category);
        })
        .catch(err => console.log(err))
}

// Load Details
const loadDetails = async (videoId) =>{
    // console.log(videoId);
    const uri=`https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
    const res = await fetch(uri);
    const data = await res. json();
    displayDetails(data.video);
}

// display details
const displayDetails = (video) => {
    // console.log(video)
    const detailContainer = document.getElementById('modal-content');
    detailContainer.innerHTML = `
        <img src=${video.thumbnail}/>
        <p>${video.description}</p>
    `;

    // way-1
        document.getElementById('showModalData').click();

    // way-2
        // document.getElementById('customModal').showModal();
}

//----------------------------------------------------------------------------

// 1st step 1, fetch & load data
const loadCatgories = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        .then(res => res.json())
        // .then(data => console.log(data.categories))
        .then(data => displayCategories(data.categories))
        .catch(err => console.log(err))
}

// 1st step 2, display data
const displayCategories = (categories) => {
// console.log(categories)
    // display data 1st time, catch the DOM
    const categoryContainer = document.getElementById('categories')

    // display data 2nd time, creat a button by forEach Loop
    categories.forEach(item => {
    // console.log(item);
        // const button = document.createElement('button');
        // button.classList= 'btn';
        // button.innerText = item.category;
        // button.onclick = () => {
        //     alert('hello');
        // } 

        const buttonContainer = document.createElement('div');
        buttonContainer.innerHTML = `
            <button id='btn-${item.category_id}' onclick='loadCatgoryVideos(${item.category_id})' class='btn category-btn'>
                ${item.category}
            </button>
            `;

        // display data 3rd time, Append (show)
            // categoryContainer.append(button);
            categoryContainer.append(buttonContainer);
    });
}

loadCatgories()


// -------------------------------------------------------------


// 2nd step 1, fetch & load data
const loadVideos = (searchText = "") => {
    // fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`) // search
        .then(res => res.json())
        // .then(data => console.log(data.videos))
        .then(data => displayVideos(data.videos))
        .catch(err => console.log(err))
}

// 2nd step 2, display data
const displayVideos = (videos) =>{
// console.log(videos);
    // display data 1st time, catch the DOM
    const videoContainer = document.getElementById('videos');
    videoContainer.innerHTML = "";   

    if(videos.length === 0){
        // videoContainer.innerHTML = "NO CONTENT HERE"; 
        videoContainer.classList.remove('grid')
        videoContainer.innerHTML = `
        <div class=' flex flex-col gap-5 justify-center items-center'>
            <img src = 'img/Icon.png'>
            <h1 class='text-3xl font-bold'>NO CONTENT HERE IN THIS CATEGORY!</h1>
        </div>
        `;
        return;
        // min-h-screen flex flex-col gap-5 justify-center items-center
    }
    else{
        videoContainer.classList.add('grid')
    }

    // display data 2nd time, creat a video cart by forEach Loop
    videos.forEach(video =>{
    // console.log(video);
        const card = document.createElement('div');
        card.classList= 'card'
        card.innerHTML = `
            <figure class='h-[200px] relative'>
                <img 
                src=${video.thumbnail} 
                class='rounded-xl w-ful h-full object-cover'  
                alt="Shoes" />
                ${
                    video.others.posted_date?.length === 0 
                    ? "" 
                    : `<span class='absolute right-3 bottom-2 text-white bg-black p-1 rounded text-xs'>${ getTimeString(video.others.posted_date)}</span>`
                }
            </figure>
            
         <div class="px-0 py-2 flex gap-2">
            <div>
                <img class="w-10 h-10 rounded-full object-cover" src= ${video.authors[0].profile_picture} />
            </div>
            <div>
                <h2 class="font-bold">${video.title}</h2>
                <div class="flex items-center gap-2">
                    <p class="text-gray-400"> ${video.authors[0].profile_name}</p>
                    ${video.authors[0].verified == true
                    ? `<img class="w-5" src="https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png" /> `
                    : ""}
                    
                </div>
               
                <p><button onclick="loadDetails('${video.video_id}')" class="btn btn-sm btn-error mt-2">Details</button></p>
            </div>
        </div>
        ` 

        // display data 3rd time, Append (show)
        videoContainer.append(card);           
    });
};

loadVideos();


// search-input
document.getElementById('search-input').addEventListener('keyup', (e) =>{
    // console.log(e.target.value)
    loadVideos(e.target.value)
});


