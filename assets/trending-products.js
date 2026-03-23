// document.addEventListener("DOMContentLoaded", () => {

// const section = document.querySelector(".trending-split")

// if(!section) return

// const observer = new IntersectionObserver((entries)=>{

// entries.forEach(entry=>{

// if(entry.isIntersecting){

// section.classList.add("active")

// }

// })

// },{
// threshold:0.6,
// rootMargin:"-20% 0px -20% 0px"
// })

// observer.observe(section)

// })
document.addEventListener("DOMContentLoaded", () => {

const section = document.querySelector(".trending-split")

if(!section) return

const productsReveal = section.querySelector(".products-reveal")
const productsGrid = section.querySelector(".products-grid")
const headingLeft = section.querySelector(".heading-left")
const headingRight = section.querySelector(".heading-right")

const observer = new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

const gridWidth = productsGrid.scrollWidth

/* expand products exactly */
productsReveal.style.width = gridWidth + "px"

/* push headings dynamically */
headingLeft.style.transform = `translateX(-${gridWidth}px)`
headingRight.style.transform = `translateX(${gridWidth}px)`

section.classList.add("active")

}

})

},{
threshold:0.6,
rootMargin:"-20% 0px -20% 0px"
})

observer.observe(section)

})