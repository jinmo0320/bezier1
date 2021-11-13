const canvas = document.body.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

addEventListener("resize", () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
});

function getPoint(t, p1, p2) {
  return {
    x: (1 - t) * p1.x + t * p2.x,
    y: (1 - t) * p1.y + t * p2.y,
  };
}

const A = {
  x: canvas.width / 2 - 400,
  y: canvas.height / 2 + 200,
};
const B = {
  x: canvas.width / 2 - 100,
  y: canvas.height / 2 - 200,
};
const C = {
  x: canvas.width / 2 + 400,
  y: canvas.height / 2 + 100,
};

let mouseCount = 0;

addEventListener("mousedown", (e) => {
  ctx.lineWidth = 5;
  ctx.strokeStyle = "#BDD7EE";
  if (mouseCount === 0) {
    A.x = e.x;
    A.y = e.y;
    ctx.beginPath();
    ctx.fillStyle = "#87034B";
    ctx.arc(e.x, e.y, 20, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  } else if (mouseCount === 1) {
    B.x = e.x;
    B.y = e.y;
    ctx.beginPath();
    ctx.fillStyle = "#87034B";
    ctx.arc(e.x, e.y, 20, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  } else if (mouseCount === 2) {
    C.x = e.x;
    C.y = e.y;
    ctx.beginPath();
    ctx.fillStyle = "#87034B";
    ctx.arc(e.x, e.y, 20, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  }
  mouseCount++;
});

class Ball {
  constructor(p1, p2, color) {
    this.p1 = p1;
    this.p2 = p2;
    this.x = p1.x;
    this.y = p1.y;
    this.px = p2.x;
    this.py = p2.y;
    this.color = color;
  }
  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, 20, 0, Math.PI * 2);
    ctx.fill();
  }
  move(t) {
    const point = getPoint(t, this.p1, this.p2);
    this.x = point.x;
    this.y = point.y;
    this.draw();
  }
}

let M = undefined;
let N = undefined;
let X = undefined;
function init() {
  M = new Ball(A, B, "#E66C00");
  N = new Ball(B, C, "#E66C00");
  X = new Ball(M, N, "#F3FE4E");
}
init();

let t = 0;
let XPoints = [];

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.beginPath();
  ctx.lineWidth = 5;
  ctx.strokeStyle = "#BDD7EE";
  ctx.moveTo(A.x, A.y);
  ctx.lineTo(B.x, B.y);
  ctx.lineTo(C.x, C.y);
  ctx.stroke();

  ctx.beginPath();
  ctx.fillStyle = "#87034B";
  ctx.arc(A.x, A.y, 20, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.beginPath();
  ctx.fillStyle = "#87034B";
  ctx.arc(B.x, B.y, 20, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.beginPath();
  ctx.fillStyle = "#87034B";
  ctx.arc(C.x, C.y, 20, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.beginPath();
  ctx.lineWidth = 5;
  ctx.strokeStyle = "#E66C00";
  ctx.moveTo(M.x, M.y);
  ctx.lineTo(N.x, N.y);
  ctx.stroke();

  M.move(t);
  N.move(t);
  X.move(t);
  XPoints.push({ x: X.x, y: X.y });

  ctx.beginPath();
  ctx.strokeStyle = "#F3FE4E";
  XPoints.forEach((p) => {
    ctx.lineTo(p.x, p.y);
  });
  ctx.stroke();

  if (t < 1) {
    t += 0.005;
  }
}
addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    animate();
  }
});
