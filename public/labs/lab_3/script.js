/* eslint-disable */
const slideArray = Array.from(document.querySelectorAll('.slide'), function(slide){return slide.dataset.background;
});


let currentSlideIndex = -1;

function setSliderItem(index) {
  currentSlideIndex = index%slideArray.length;

  if (index < 0){
    currentSlideIndex = slideArray.length + index;
  }
  console.log(slideArray.length);
  console.log(currentSlideIndex);

  document.querySelector('.slider').style.cssText = 'background: url("' + slideArray[currentSlideIndex] + '") no-repeat center center;';

  const elems = Array.from(document.getElementsByClassName('caption'));
   elems.forEach(function(elem){
     elem.style.cssText = 'opacity: 0;'; 
   
  });

  const currentCaption = document.querySelector('.caption-' + (currentSlideIndex));
  currentCaption.style.cssText = 'opacity: 1;';
}


// let intervalID = setInterval(advanceSliderItem, 3000);