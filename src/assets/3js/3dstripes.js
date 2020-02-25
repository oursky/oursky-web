console.clear();

const canvas = document.querySelector("#stripesBG");
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true
});
renderer.setClearColor(0x123fae);

const scene = new THREE.Scene();

const mouse = new THREE.Vector2();

const camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientWidth, 1, 1000);
camera.position.z = 5;

const colors = [0xffffff, 0xEFCE47]

class SmoothLine {
  constructor () {
    this.offset = 0;
    this.width = 0.019;
    const colorIndex = Math.floor(Math.random() * colors.length);
    this.color = new THREE.Color(colors[colorIndex]);
    this.scale = Math.random() * 0.4 + 18;
    this.speed = Math.random() * 0.002 + 0.0005;
    this.diameter = Math.random() * 14 + 6;
    this.opacity = Math.random() * 0.4 - 0.05;
    
    this.createLine();
  }
  
  createLine() {
    // Build an array of points
    const nbrOfPoints = 140;
   var geometry = new THREE.Geometry();
for( var j = 0; j < Math.PI; j += 8 * Math.PI / 100 ) {
	var v = new THREE.Vector3( 0.2, j * 1.5 , Math.sin( j ) * 0.1 );
	geometry.vertices.push( v );
}
    
    this.line = new MeshLine();
    this.line.setGeometry(new THREE.Geometry().setFromPoints(new THREE.CatmullRomCurve3(geometry.vertices).getPoints(140)), function( p ) { return 1 * Maf.parabola( p, 1 )} );
    // Build the material with good parameters to animate it.
    const material = new MeshLineMaterial({
      lineWidth: this.width,
      color: this.color,
      transparent: true,
      opacity: this.opacity,
      depthTest: false,
      dashArray: (Math.random() * 0.2 + 0.6),
      dashRatio: 0.4,
      dashOffset: Math.random()
    });

    // Build the Mesh
    this.mesh = new THREE.Mesh(this.line.geometry, material);
    this.mesh.position.x = (Math.random() - 0.5) * 10;
    this.mesh.position.y = (Math.random() - 0.5) * 3 + 1.5 ;
    this.mesh.position.z = (Math.random() - 0.5) * 5 + 2 ;
    this.mesh.rotation.z = 54.4;
     this.mesh.rotation.x = 0.5;
     this.mesh.rotation.y = 0.4;
    scene.add(this.mesh);
  }
  update() {
    this.mesh.material.uniforms.dashOffset.value += this.speed;
  }
}


const lines = [];
for (let i = 0; i < 100; i++) {
  lines.push(new SmoothLine());
}

const center = new THREE.Vector3();
function render() {
  requestAnimationFrame(render);
  
  lines.forEach((line) => {
    line.update();
  });
  
  camera.position.x =  camera.position.x + 5000;
  
  camera.position.x = mouse.x * 0.2;
  camera.position.y = mouse.y * 0.2;
  camera.lookAt(center);

  renderer.render(scene, camera);
}

function onMouseMove(e) {
  const x = (e.clientX / (window.innerWidth * 0.5)) - 1;
  const y = -1 * (e.clientY / (window.innerHeight * 0.5)) + 1;
  updateMouse(x, y);
}
function onTouchMove(e) {
  const x = (e.touches[0].clientX / (window.innerWidth * 0.5)) - 1;
  const y = -1 * (e.touches[0].clientY / (window.innerHeight * 0.5)) + 1;
  updateMouse(x, y);
}
function updateMouse(x, y){
  TweenMax.to(mouse, 1, {
    x,
    y,
    ease: Power1.easeOut
  })
}
window.addEventListener('mousemove', onMouseMove);
window.addEventListener('touchmove', onTouchMove);

function onResize () {
  renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
  camera.aspect = canvas.clientWidth /  canvas.clientHeight;
  camera.updateProjectionMatrix();
}
window.addEventListener('resize', onResize);
onResize();
requestAnimationFrame(render);