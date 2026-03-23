document.querySelectorAll('.category-card').forEach(card => {
  const btn = card.querySelector('.hover-view-btn');
  if (!btn) return;

  let targetX = 0, targetY = 0;
  let currentX = 0, currentY = 0;
  let rafId = null;
  let isHovered = false;

  function lerp(a, b, t) { return a + (b - a) * t; }

  function tick() {
    currentX = lerp(currentX, targetX, 0.12);
    currentY = lerp(currentY, targetY, 0.12);

    // Position button absolutely relative to card at cursor position
    btn.style.left = currentX + 'px';
    btn.style.top  = currentY + 'px';

    if (isHovered || Math.abs(currentX - targetX) > 0.1 || Math.abs(currentY - targetY) > 0.1) {
      rafId = requestAnimationFrame(tick);
    } else {
      rafId = null;
    }
  }

  card.addEventListener('mouseenter', (e) => {
    isHovered = true;

    const r = card.getBoundingClientRect();
    // Snap instantly to cursor on enter — no lag on first appearance
    currentX = e.clientX - r.left;
    currentY = e.clientY - r.top;
    targetX  = currentX;
    targetY  = currentY;

    btn.style.left    = currentX + 'px';
    btn.style.top     = currentY + 'px';
    btn.style.opacity = '1';
    btn.style.transform = 'translate(-50%, -50%) scale(1)';
    btn.style.pointerEvents = 'auto';

    // Hide the real cursor over the whole card
    card.style.cursor = 'none';

    if (!rafId) rafId = requestAnimationFrame(tick);
  });

  card.addEventListener('mousemove', (e) => {
    const r = card.getBoundingClientRect();
    targetX = e.clientX - r.left;
    targetY = e.clientY - r.top;

    if (!rafId) rafId = requestAnimationFrame(tick);
  });

  card.addEventListener('mouseleave', () => {
    isHovered = false;

    // Restore cursor and hide button
    card.style.cursor = '';
    btn.style.opacity    = '0';
    btn.style.transform  = 'translate(-50%, -50%) scale(0)';
    btn.style.pointerEvents = 'none';

    if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
  });
});

// mobile slider code
document.addEventListener("DOMContentLoaded", function(){

const section = document.querySelector(".product-category-section");

if(!section || !section.classList.contains("mobile-slider-enabled")){
  return;
}

const slider = section.querySelector(".grid");
const leftArrow = section.querySelector(".cat-arrow--left");
const rightArrow = section.querySelector(".cat-arrow--right");

if(!slider || !leftArrow || !rightArrow) return;

/* arrow enable / disable */
function updateArrows(){

  const scrollLeft = slider.scrollLeft;
  const maxScroll = slider.scrollWidth - slider.clientWidth;

  // left arrow
  if(scrollLeft <= 0){
    leftArrow.disabled = true;
  }else{
    leftArrow.disabled = false;
  }

  // right arrow
  if(scrollLeft >= maxScroll - 1){
    rightArrow.disabled = true;
  }else{
    rightArrow.disabled = false;
  }

}

/* arrow click */
rightArrow.addEventListener("click", function(){
  slider.scrollBy({
    left: slider.offsetWidth,
    behavior: "smooth"
  });
});

leftArrow.addEventListener("click", function(){
  slider.scrollBy({
    left: -slider.offsetWidth,
    behavior: "smooth"
  });
});

/* update arrows on scroll */
slider.addEventListener("scroll", updateArrows);

/* first load check */
updateArrows();

});












// document.addEventListener("DOMContentLoaded", function(){

// const slider = document.querySelector(".product-category-section .grid");
// const leftArrow = document.querySelector(".cat-arrow--left");
// const rightArrow = document.querySelector(".cat-arrow--right");

// if(!slider || !leftArrow || !rightArrow) return;

// function updateArrows(){

//   const scrollLeft = slider.scrollLeft;
//   const maxScroll = slider.scrollWidth - slider.clientWidth;

//   // left arrow
//   if(scrollLeft <= 0){
//     leftArrow.disabled = true;
//   } else {
//     leftArrow.disabled = false;
//   }

//   // right arrow
//   if(scrollLeft >= maxScroll - 1){
//     rightArrow.disabled = true;
//   } else {
//     rightArrow.disabled = false;
//   }

// }

// rightArrow.addEventListener("click", function(){
//   slider.scrollBy({
//     left: slider.offsetWidth,
//     behavior: "smooth"
//   });
// });

// leftArrow.addEventListener("click", function(){
//   slider.scrollBy({
//     left: -slider.offsetWidth,
//     behavior: "smooth"
//   });
// });

// slider.addEventListener("scroll", updateArrows);

// updateArrows();

// });