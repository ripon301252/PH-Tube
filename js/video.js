function getTimeString(time){
    const day = parseInt (time/ 86400) // 1day = 86400 Second 
    const hour = parseInt (time/3600 );    // 1hour = 3600 Second
    let second = time % 3600;
    const minuite =parseInt (second / 60);
    second = second % 60;
    return`${day} day ${hour} hour ${minuite} minuite ${second} second ago`
}

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
        const button = document.createElement('button');
        button.classList= 'btn';
        button.innerText = item.category

        // display data 3rd time, Append (show)
        categoryContainer.append(button);
    });
}

loadCatgories()


// -------------------------------------------------------------


// 2nd step 1, fetch & load data
const loadVideos = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
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

            <div class="flex items-center px-0 py-3 gap-3 mb-10">
                <div>
                    <img class='rounded-full w-12 h-12 object-cover' src=${video.authors[0].profile_picture} alt="Shoes" />
                </div>
                <div>
                    <h2> ${video.title}</h2>

                    <div class='flex items-center gap-3'>
                        <h2 class='font-bold'> ${video.authors[0].profile_name}</h2>
                        
                        ${video.authors[0].verified === true 
                        ?`<img class='rounded-full w-7  object-cover' src='https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png'/>` 
                        : ""}
                    </div>
                </div>
            </div>
        `

        // display data 3rd time, Append (show)
        videoContainer.append(card);
    })
}

loadVideos()

