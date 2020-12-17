// STAR DOG CHAMPION


// setup the Contentful Client
const client = contentful.createClient({
    space:'qjtsepnj8pkr',
    accessToken:'5oxbhMS_GlBcvjqNX_obKzWopd912yg-N1g_Xay1I6s'
})

// get the Bio data
client.getEntry('6Vh2VJAwk3d67sxUO0aqJu')
.then(function (entry) {


  const education = entry.fields.education;
  const expirience = entry.fields.expirience;
  const painting = entry.fields.painting;
  const arhitektura = entry.fields.arhitektura;
  const awards = entry.fields.awards;
  const activities = entry.fields.activities;
  const portrait = entry.fields.portrait.fields.file.url;


  const portraitImg = document.getElementById('portrait');
  const roundedImg = document.getElementById('roundedPortrait');

  portraitImg.setAttribute('src', portrait)
  roundedImg.setAttribute('src', portrait)
 

    document.getElementById('education').innerHTML =
        marked(education);

    document.getElementById('expirience').innerHTML =
        marked(expirience);

    document.getElementById('painting').innerHTML =
        marked(painting);

    document.getElementById('architecture').innerHTML =
        marked(arhitektura);

    document.getElementById('awards').innerHTML =
        marked(awards);

    document.getElementById('activities').innerHTML =
        marked(activities);

})


// function that creates a new div

{/* <div class="col-lg-4 col-md-6 portfolio-item filter-web">
<div class="portfolio-wrap">
  <img src="assets/img/portfolio/portfolio-2.jpg" class="img-fluid" alt="">
  <div class="portfolio-links">
    <a href="assets/img/portfolio/portfolio-2.jpg" data-gall="portfolioGallery" 
    class="venobox" title="Web 3"><i class="bx bx-plus"></i></a>
    <a href="portfolio-details.html" title="More Details"><i class="bx bx-link"></i></a>
  </div>
</div>
</div> */}


const createCard = (title,url,bigUrl, mask, pageUrl)=>{

    const iItem = document.createElement('i');
    iItem.classList.add('bx','bx-link');

    const iPlus = document.createElement('i');
    iPlus.classList.add('bx','bx-plus');

    // start form the innermost - create links
    const imgUrl = document.createElement('a');
    imgUrl.setAttribute('href',bigUrl);
    imgUrl.setAttribute('data-gall', 'portfolioGallery');
    imgUrl.classList.add('venobox', 'vbox-item');
    imgUrl.setAttribute('title', title);
    imgUrl.appendChild(iPlus);


    const portfolioUrl = document.createElement('a');
    portfolioUrl.setAttribute('href',pageUrl);
    portfolioUrl.setAttribute('title', 'More Details');
    
    

    // add the i element
    portfolioUrl.appendChild(iItem);

    // portfolio links
    const portfolioLinks = document.createElement('div');
    portfolioLinks.className = 'portfolio-links';

    // populate portfolio links
    portfolioLinks.appendChild(imgUrl);
    portfolioLinks.appendChild(portfolioUrl);

    // wrapper div
    const wrapperDiv = document.createElement('div');
    wrapperDiv.className='portfolio-wrap';

    // wrapper image
    const mainImage = document.createElement('img');
    mainImage.setAttribute('src',url)
    mainImage.className = 'img-fluid';

    // populate wrapper div
    wrapperDiv.appendChild(mainImage);
    wrapperDiv.appendChild(portfolioLinks);


    // create outermost element
    console.log('creating main element')
    const cardDiv = document.createElement('div');

    // add classes

    // filter mask
    let filterClass = `filter-${mask}`
    cardDiv.classList.add('col-lg-4','col-md-6','portfolio-item',filterClass)
    cardDiv.appendChild(wrapperDiv);

    // locate the target
    let targetDiv = document.getElementById('portfolioTarget');
    targetDiv.appendChild(cardDiv);

}


// get all the projects types
client.getEntries({
    'content_type': 'project'
  })
  .then(function (entries) {
    console.log(JSON.stringify(entries.items[0]))
    entries.items.forEach(function (entry){
        // create a new div for each project and append it

        let pageUrl = `/project/${entry.fields.slug}.html`

        let mask

        if (entry.fields.category){
            mask = entry.fields.category
        }        

        console.log(JSON.stringify(entry))
        
        createCard(
            entry.fields.title,
            `${entry.fields.cover.fields.file.url}?w=400&h=300`,
            `${entry.fields.cover.fields.file.url}?fm=jpg&fl=progressive`,
            mask,
            pageUrl
            );
      })
  })

// this is disgusting but Contentful won't let me do it otherwise
// get all the exhibition types
client.getEntries({
    'content_type': 'exhibition'
  })
  .then(function (entries) {
    console.log(JSON.stringify(entries.items[0]))
    entries.items.forEach(function (entry){
        // create a new div for each project and append it

        let pageUrl = `/painting/${entry.fields.slug}.html`


        console.log(pageUrl)
        
        createCard(
            entry.fields.title,
            `${entry.fields.cover.fields.file.url}?w=400&h=300`,
            `${entry.fields.cover.fields.file.url}?fm=jpg&fl=progressive`,
            'slikarstvo',
            pageUrl
            );
      })
  })