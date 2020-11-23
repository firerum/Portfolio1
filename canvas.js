const canvas = document.getElementById("canvas");
const banner = document.getElementById("header-canvas");
const ctx = canvas.getContext("2d");

// Write constructor Object to create many circles;
function Circle(x, y, dx, dy, radius) {
   this.x = x;
   this.y = y;
   this.dx = dx;
   this.dy = dy;
   this.radius = radius;
}

// create function to draw the circle on canvas
Circle.prototype.draw = function() {
   ctx.beginPath();
   ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
   ctx.strokeStyle = "rgba(0, 255, 255, .3)";
   ctx.stroke();
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
};

let circleArray = [];

for (let i = 0; i < 80; i++) {
   //Generate random positions for x and y axis, as well as random velocities.
   let x = Math.random() * banner.offsetWidth;
   let y = Math.random() * banner.offsetHeight;
   let dy = Math.random() * 0.2;
   let dx = Math.random() * 0.2;
   const radius = 10;
   // Push the new object circles into the array.
   circleArray.push(new Circle(x, y, dx, dy, radius));
}

function animate() {
   ctx.clearRect(0, 0, banner.offsetWidth, banner.offsetWidth);
   requestAnimationFrame(animate);
   for(let i = 0; i < circleArray.length; i++) {
      circleArray[i].update();
   }
}

animate();

