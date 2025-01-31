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
    // display data 2nd step catch the DOM
    const categoryContainer = document.getElementById('categories')

    categories.forEach(item => {
    // console.log(item);
        // display data 1st step, creat a button
        const button = document.createElement('button');
        button.classList= 'btn ';
        button.innerText = item.category

        // display data 3rd step, Append (show)
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

// 1st step 2, display data
const displayVideos = (videos) =>{
// console.log(videos);

    // display data 2nd step catch the DOM
    const videoContainer = document.getElementById('videos')

    videos.forEach(video =>{
    console.log(video);
        // display data 1st step, creat a video cart
        const card = document.createElement('div');
        card.classList= 'card'
        card.innerHTML = `
            <figure class='w-[280px] h-[200px]'>
                <img class='rounded-xl w-ful h-full object-cover' src=${video.thumbnail} alt="Shoes" />
            </figure>
            <div class="flex items-center px-0 py-3 gap-3 mb-10">
                <div>
                    <img class='rounded-full w-12 h-12 object-cover' src=${video.authors[0].profile_picture} alt="Shoes" />
                </div>
                <div>
                    <h2> ${video.title}</h2>
                    <div class='flex items-center gap-3'>
                        <h2 class='font-bold'> ${video.authors[0].profile_name}</h2>
                        <img class='rounded-full w-7  object-cover' src='https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png' alt="Shoes" />
                    </div>
                    
                </div>
            </div>
           
        `
        // display data 3rd step, Append (show)
        videoContainer.append(card);
    })
}

loadVideos()
