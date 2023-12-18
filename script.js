const accesKey="RPTrfs-Tgu5qO0lhZhbCPOgy9TQ8E8xdGsF5F82v4eA"

const form = document.querySelector("form")
const input = document.getElementById("search_input")

const search=document.querySelector(".search_results")
const show_more=document.getElementById("show_more")

let inputdata = ""
let page=1;
async function search_i(){
    inputdata=input.value;
    const url=`https://api.unsplash.com/search/photos?page=${page}&query=${inputdata}&client_id=${accesKey}`
    

    const response = await fetch(url)

    const data=await response.json()

    const results = data.results

    if(page == 1){
        search.innerHTML=""
    }

    results.map((result)=>{
        const imageWrapper = document.createElement('div')
        imageWrapper.classList.add("search_result")
        const image=document.createElement('img')
        image.src = result.urls.small
        image.alt = result.alt_description
        const imagelink=document.createElement('a')
        imagelink.href=result.links.html
        imagelink.target="_blank"
        imagelink.textContent=result.alt_description

        imageWrapper.appendChild(image)
        imageWrapper.appendChild(imagelink)
        search.appendChild(imageWrapper)

    }
    )
    page++
    if(page>1){
        show_more.style.display="block"
    }




}


form.addEventListener("submit",(event) => {
    event.preventDefault()
    page=1;
    search_i()
    
})

show_more.addEventListener("click",() => {
    
    search_i()
    
})