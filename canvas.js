const canvas = document.getElementById("canvas");
const banner = document.getElementById("header-canvas");
const ctx = canvas.getContext("2d");

// Give the circles random colors
let colorArray = ["skyblue", "#f9f871", "#57DFC2", "#d65db1"];

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

// Add touch event for moible users
window.addEventListener("touchmove", function(e) {
   mouse.x = e.x;
   mouse.y = e.y;
})
// Write constructor Object to create many circles;
function Circle(x, y, dx, dy, radius) {
   this.x = x;
   this.y = y;
   this.dx = dx;
   this.dy = dy;
   this.radius = radius;
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
   } else if(this.radius > 10) {
      this.radius -= 1;
   }
};

let circleArray = [];

for (let i = 0; i < 100; i++) {
   //Generate random positions for x and y axis, as well as random velocities.
   let x = Math.random() * banner.offsetWidth;
   let y = Math.random() * banner.offsetHeight;
   let dy = Math.random() * 0.2;
   let dx = Math.random() * 0.2;
   const radius = 10;
   // Push the new object circles into the array.
   circleArray.push(new Circle(x, y, dx, dy, radius));
}
// Redestribute circles on window resize
window.addEventListener("resize", function() {
   canvas.width = banner.offsetWidth;
   canvas.height = banner.offsetHeight;
   for(let i = 0; i < circleArray.length; i++) {
      circleArray[i].draw();
   }
});

function animate() {
   ctx.clearRect(0, 0, banner.offsetWidth, banner.offsetHeight);
   requestAnimationFrame(animate);
   for(let i = 0; i < circleArray.length; i++) {
      circleArray[i].update();
   }
}

animate();

