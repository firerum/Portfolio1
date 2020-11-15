/* Slider function */
const slides = document.querySelectorAll(".slide");
const nextBtn = document.querySelector("#next");
const prevBtn = document.querySelector("#prev");
const interval = 5000;
let imageInterval;

function nextImage() {
   // Get current image
   const currentImage = document.querySelector(".current");
   // Remove current class
   currentImage.classList.remove("current");
   // Add current to the next Image to make it visible
   if(currentImage.nextElementSibling) {
      currentImage.nextElementSibling.classList.add("current");
      // Add current back to the first image if there are no more images
   } else {
      slides[0].classList.add("current");
   }
}

function previousImage() {
   // Get current image
   const currentImage = document.querySelector(".current");
   // Remove current class
   currentImage.classList.remove("current");
   // Add current to the next Image to make it visible
   if(currentImage.previousElementSibling) {
      currentImage.previousElementSibling.classList.add("current");
      // Add current back to the last image if there are no more images
   } else {
      slides[slides.length - 1].classList.add("current");
   }
}

nextBtn.addEventListener("click", nextImage);
prevBtn.addEventListener("click", previousImage);

// Auto slide
imageInterval = setInterval(nextImage, interval);
