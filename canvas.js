const canvas = document.getElementById("canvas");
const banner = document.getElementById("header-canvas");
canvas.width = banner.offsetWidth;
canvas.height = banner.offsetHeight;
const ctx = canvas.getContext("2d");

// Give the circles random colors
let colorArray = ["#F25CA2", "#0433BF", "#032CA6", "#021859", "#0B9ED9"];

// Create a mouse object to detect the mouse position
let mouse = {
   x: undefined,
   y: undefined
};

// Add mouse event to the window object
window.addEventListener("mousemove", function(e) {
   // initialize the mouse object by giving ot the current mouse position
   mouse.x = e.x;
   mouse.y = e.y;
});

// Write constructor Object to create many circles;
function Circle(x, y, dx, dy, radius) {
   this.x = x;
   this.y = y;
   this.dx = dx;
   this.dy = dy;
   this.radius = radius;
   this.minRadius = radius;
   this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
}

// create function to draw the circle on canvas
Circle.prototype.draw = function() {
   ctx.beginPath();
   ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
   ctx.strokeStyle = "rgba(0, 255, 255, .3)";
   ctx.stroke();
   ctx.strokeStyle = this.color;
   ctx.stroke();
   ctx.fill();
};

// Update the circle to enable movement on each repaint of the canvas
Circle.prototype.update = function() {
   this.draw();
   if(this.x + this.radius > banner.offsetWidth || this.x - this.radius < 0) {
      this.dx = -this.dx;
   }
   if(this.y + this.radius > banner.offsetHeight || this.y - this.radius < 0) {
      this.dy = -this.dy;
   }

   this.x += this.dx;
   this.y += this.dy;
   // Create Mouse interactivity by judging position between mouse and circle.
   if(mouse.x - this.x < 50 && mouse.x - this.x > -50 &&
      mouse.y -this.y < 50 && mouse.y -this.y > -50) {
         // Create maximum size for the circle growth
         if(this.radius > 40) {
            this.radius -= 1;
         }
         this.radius += 1;
   } /* else if(this.radius > this.minRadius) {
      this.radius -= 1;
   } */
   else {
      this.radius = this.minRadius; // Return back to original radius;
   }
};

let circleArray = [];

function init() {
   for (let i = 0; i < 100; i++) {
   //Generate random positions for x and y axis, as well as random velocities.
   let radius = Math.random() * 10;
   let x = Math.random() * (banner.offsetWidth - radius * 2) + radius; //To stop circle from getting stuck at the edge of the canvas
   let y = Math.random() * (banner.offsetHeight - radius * 2) + radius;
   let dy = Math.random() * 0.2;
   let dx = Math.random() * 0.2;
   // Push the new object circles into the array.
   circleArray.push(new Circle(x, y, dx, dy, radius));
   }
}

init();

function animate() {
   ctx.clearRect(0, 0, banner.offsetWidth, banner.offsetHeight);
   requestAnimationFrame(animate);
   for(let i = 0; i < circleArray.length; i++) {
      circleArray[i].update();
   }
}

animate();

// Redestribute circles on window resize
window.addEventListener("resize", function() {
   canvas.width = banner.offsetWidth;
   canvas.height = banner.offsetHeight;
   // Empty the array and refill it each time the window is resized.
   circleArray = [];
   if(banner.offsetWidth > 500)
      for (let i = 0; i < 250; i++) {
      //Generate random positions for x and y axis, as well as random velocities.
      const radius = Math.random() * 10;
      let x = Math.random() * (banner.offsetWidth - radius * 2) + radius; //To stop circle from getting stuck at the edge of the canvas
      let y = Math.random() * (banner.offsetHeight - radius * 2) + radius;
      let dy = Math.random() * 0.2;
      let dx = Math.random() * 0.2;
      let minRadius = radius;
      // Push the new object circles into the array.
      circleArray.push(new Circle(x, y, dx, dy, radius));
   } else {
      init();
   }
});