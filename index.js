var currentAngle;
var flag;
let currentRotation=[0,1];
let uRotationVector;
var currentAngle3D;
var currentAngle3DX;
var flag3D;
let currentRotation3D=[0,0,1];
let uRotationVector3D;

function main() {
  if(flag!=0){
    currentAngle=0.0;
    currentAngle3D=0.0;
    currentAngle3DX=0.0;
    flag=0;
  }
  // Inisiasi kanvas WebGL
  var leftCanvas = document.getElementById("leftCanvas");
  var rightCanvas = document.getElementById("rightCanvas");
  var leftGL = leftCanvas.getContext("webgl");
  var rightGL = rightCanvas.getContext("webgl");

  // leftCanvas.style.width = window.innerWidth/2 + "px";
  // leftCanvas.style.height = window.innerHeight + "px";
  // rightCanvas.style.width = window.innerWidth/2 + "px";
  // rightCanvas.style.height = window.innerHeight + "px";

function resizeCanvas() {
  leftCanvas.style.width = window.innerWidth/2-20 + "px";
  rightCanvas.style.width = window.innerWidth/2-20 + "px";
  setTimeout(function() {
    leftCanvas.style.height = window.innerHeight + "px";
    rightCanvas.style.height = window.innerHeight + "px";
  }, 0);
};

// Webkit/Blink will fire this on load, but Gecko doesn't.
window.onresize = resizeCanvas;

// So we fire it manually...
resizeCanvas();

  // set the s
  // Inisiasi verteks persegi
  var rectangleVertices = [
    0.055, 0.5,//garis1
    -0.055, 0.5,
    -0.06, 0.49,
    0.055, 0.5,
    -0.06, 0.49,
    0.06, 0.49,
    -0.065, 0.475,//garis2
    -0.07, 0.465,
    0.065,0.475,
    -0.07, 0.465,
    0.065,0.475,
    0.07, 0.465,
    -0.075, 0.45,//garis3
    -0.08, 0.44,
    0.075,0.45,
    -0.08, 0.44,
    0.075,0.45,
    0.08, 0.44,
    -0.4,-0.27,//garis1 bawah
    0.4,-0.27,
    -0.4,-0.28,
    0.4,-0.27,
    -0.4,-0.28,
    0.4,-0.28,
    -0.4,-0.3,//garis2 bawah
    0.4,-0.3,
    -0.4,-0.31,
    0.4,-0.3,
    -0.4,-0.31,
    0.4,-0.31,
    -0.4,-0.33,//garis3 bawah
    0.4,-0.33,
    -0.4,-0.34,
    0.4,-0.33,
    -0.4,-0.34,
    0.4,-0.34,
    -0.25,0.4,//garis1tengah
    0.25,0.4,
    -0.25,0.36,
    0.25,0.4,
    -0.25,0.36,
    0.25,0.36,
    -0.3,0.28,//garis2 tengah
    0.3,0.28,
    -0.3,0.24,
    0.3,0.28,
    -0.3,0.24,
    0.3,0.24,
    -0.35,0.14,//garis3 tengah
    0.35,0.14,
    -0.35,0.1,
    0.35,0.14,
    -0.35,0.1,
    0.35,0.1,
    -0.45,-0.2,//garis4 tengah
    0.45,-0.2,
    -0.45,-0.16,
    0.45,-0.2,
    -0.45,-0.16,
    0.45,-0.16,
    
    0,  0.6,//kiri1
    -0.5, -0.6,
    0,    0.7,
    0,  0.6,//kanan1
    0.5, -0.6,
    0,    0.7,
    -0.58, -0.6,//kiri1
    0,  0.7,
    -0.5, -0.6,
    0.5, -0.6,//kanan2
    0,    0.7,
    0.58, -0.6,
    0.2,  0.4,//tengah1
    -0.2,  0.4,
    -0.4, -0.2,
    0.2,  0.4,//tengah2
    -0.4, -0.2,
    0.4,  -0.2
  ];

  // Inisiasi verteks kubus
  var cubeVertices = [];
  var cubePoints = [
    [0.5,  0,  0.3],   // L y z x
    [0.6, 0,  0.37],   // K
    [ 0, 0.8,  0],   // J
    [ 0,  1,  0],   // I
    [-0.5,  0, 0.3],   // D
    [-0.6, 0,  0.37],   // B
    [0,  0, -0.6],   // C
    [0, 0,  -0.71],   // A
    
    // [-0.5,  0.5, -0.5],   // E, 4
    // [-0.5, -0.5, -0.5],   // F, 5
    // [ 0.5, -0.5, -0.5],   // G, 6
    // [ 0.5,  0.5, -0.5]    // H, 7 
  ];
  var cubeColors = [
      [1.0, 1.0, 0.0],
      [1.0, 0.0, 0.0],    // merah
      [0.0, 1.0, 0.0],    // hijau
      [0.0, 0.0, 1.0],    // biru
      [1.0, 1.0, 1.0],    // putih
      [1.0, 0.5, 0.0],    // oranye
      [1.0, 1.0, 0.0],    // kuning
      [1.0, 0.0, 0.0]
  ];

  function tri(a, b, c){
    var indices = [a, b, c];
    for (var i=0; i<indices.length; i++) {
        for (var j=0; j<3; j++) {
            cubeVertices.push(cubePoints[indices[i]][j]);
        }
        for (var j=0; j<3; j++) {
            cubeVertices.push(cubeColors[a][j]);
        }
    }
  }

  function quad(a, b, c, d) {
    tri(a,b,c);
    tri(c,d,a);
  }
  quad(0, 1, 3, 2); // Kubus depan
  quad(4, 5, 3, 2); // Kubus kanan
  quad(6, 7, 3, 2); // Kubus kanan
  // tri(2,0,4);
  // quad(3, 7, 4, 0); // Kubus atas
  // quad(4, 5, 1, 0); // Kubus kiri
  // quad(5, 4, 7, 6); // Kubus belakang
  // quad(6, 2, 1, 5); // Kubus bawah
  console.log(cubeVertices.length);

  // Inisiasi VBO (Vertex Buffer Object)
  var leftVertexBuffer = leftGL.createBuffer();
  leftGL.bindBuffer(leftGL.ARRAY_BUFFER, leftVertexBuffer);
  leftGL.bufferData(leftGL.ARRAY_BUFFER, new Float32Array(rectangleVertices), leftGL.STATIC_DRAW);
  leftGL.bindBuffer(leftGL.ARRAY_BUFFER, null);
  var rightVertexBuffer = rightGL.createBuffer();
  rightGL.bindBuffer(rightGL.ARRAY_BUFFER, rightVertexBuffer);
  rightGL.bufferData(rightGL.ARRAY_BUFFER, new Float32Array(cubeVertices), rightGL.STATIC_DRAW);
  rightGL.bindBuffer(rightGL.ARRAY_BUFFER, null);

  // Definisi Shaders
  var leftVertexShaderCode = `
  attribute vec2 aPosition;
  uniform vec2 uRotationVector;
  void main(void) {
    vec2 rotatedPosition=vec2(
        aPosition.x*uRotationVector.y + aPosition.y *uRotationVector.x,
        aPosition.y*uRotationVector.y - aPosition.x *uRotationVector.x
    );
    gl_Position = vec4(rotatedPosition, -0.5, 1.0);
  }
`
var leftFragmentShaderCode = `
  precision mediump float;
  void main() {
    gl_FragColor = vec4(0.3, 0.3, 0.3, 1.0);
  }
`
  var rightVertexShaderCode = `
    attribute vec3 aPosition;
    uniform vec3 uRotationVector;
    uniform vec3 uRotationVectorX;
    attribute vec3 aColor;
    varying vec3 vColor;
    void main(void) {
      vec3 rotatedPosition=vec3(
        aPosition.x*uRotationVector.z + aPosition.z *uRotationVector.x,
        aPosition.y-0.5,
        aPosition.z*uRotationVector.z - aPosition.x *uRotationVector.x
      );
      rotatedPosition=vec3(
        rotatedPosition.x,
        rotatedPosition.y*uRotationVectorX.z + rotatedPosition.z *uRotationVectorX.y,
        rotatedPosition.z*uRotationVectorX.z - rotatedPosition.y *uRotationVectorX.y
      );
      vColor = aColor;
      gl_Position = vec4(rotatedPosition , 1.0);
    }
    
  `
  var rightFragmentShaderCode = `
    precision mediump float;
    varying vec3 vColor;
    void main() {
      gl_FragColor = vec4(vColor, 1.0);
    }
  `

  // Proses kompilasi, penautan (linking), dan eksekusi Shaders
  var vertexShader = leftGL.createShader(leftGL.VERTEX_SHADER);
  leftGL.shaderSource(vertexShader, leftVertexShaderCode);
  leftGL.compileShader(vertexShader);
  var fragmentShader = leftGL.createShader(leftGL.FRAGMENT_SHADER);
  leftGL.shaderSource(fragmentShader, leftFragmentShaderCode);
  leftGL.compileShader(fragmentShader);
  var leftShaderProgram = leftGL.createProgram();
  leftGL.attachShader(leftShaderProgram, vertexShader);
  leftGL.attachShader(leftShaderProgram, fragmentShader);
  leftGL.linkProgram(leftShaderProgram);
  leftGL.useProgram(leftShaderProgram);
  var vertexShader = rightGL.createShader(rightGL.VERTEX_SHADER);
  rightGL.shaderSource(vertexShader, rightVertexShaderCode);
  rightGL.compileShader(vertexShader);
  var fragmentShader = rightGL.createShader(rightGL.FRAGMENT_SHADER);
  rightGL.shaderSource(fragmentShader, rightFragmentShaderCode);
  rightGL.compileShader(fragmentShader);
  var rightShaderProgram = rightGL.createProgram();
  rightGL.attachShader(rightShaderProgram, vertexShader);
  rightGL.attachShader(rightShaderProgram, fragmentShader);
  rightGL.linkProgram(rightShaderProgram);
  rightGL.useProgram(rightShaderProgram);

  // Pengikatan VBO dan pengarahan pointer atribut posisi dan warna
  leftGL.bindBuffer(leftGL.ARRAY_BUFFER, leftVertexBuffer);
  var leftPosition = leftGL.getAttribLocation(leftShaderProgram, "aPosition");
  leftGL.vertexAttribPointer(leftPosition, 2, leftGL.FLOAT, false, 2 * Float32Array.BYTES_PER_ELEMENT, 0);
  leftGL.enableVertexAttribArray(leftPosition);

  rightGL.bindBuffer(rightGL.ARRAY_BUFFER, rightVertexBuffer);
  var rightPosition = rightGL.getAttribLocation(rightShaderProgram, "aPosition");
  rightGL.vertexAttribPointer(rightPosition, 3, rightGL.FLOAT, false, 6 * Float32Array.BYTES_PER_ELEMENT, 0);
  rightGL.enableVertexAttribArray(rightPosition);
  var color = rightGL.getAttribLocation(rightShaderProgram, "aColor");
  rightGL.vertexAttribPointer(color, 3, rightGL.FLOAT, false, 6 * Float32Array.BYTES_PER_ELEMENT, 3 * Float32Array.BYTES_PER_ELEMENT);
  rightGL.enableVertexAttribArray(color);

  // Persiapan tampilan layar dan mulai menggambar secara berulang (animasi)
  function render() {
    let radians = currentAngle * Math.PI / 180.0; //putar 2D
    // let radians = 1 * Math.PI / 180.0;
    currentRotation[0]=Math.sin(radians);
    currentRotation[1]=Math.cos(radians);
    uRotationVector = leftGL.getUniformLocation(leftShaderProgram,"uRotationVector");
    currentAngle=(currentAngle+0.5)%360;
    leftGL.uniform2fv(uRotationVector,currentRotation);
    
    let radians3D = currentAngle3D * Math.PI / 180.0; //putar 3D terhadap sumbu Y
    currentRotation3D[0]=Math.sin(radians3D);
    currentRotation3D[1]=0;
    currentRotation3D[2]=Math.cos(radians3D);
    uRotationVector3D = rightGL.getUniformLocation(rightShaderProgram,"uRotationVector");
    currentAngle3D=(currentAngle3D+0.75)%360;
    rightGL.uniform3fv(uRotationVector3D,currentRotation3D);

    radians3D = currentAngle3DX * Math.PI / 180.0; //putar 3D terhadap sumbu X
    currentRotation3D[1]=Math.sin(radians3D);
    currentRotation3D[0]=0;
    currentRotation3D[2]=Math.cos(radians3D);
    uRotationVector3D = rightGL.getUniformLocation(rightShaderProgram,"uRotationVectorX");
    currentAngle3DX=(currentAngle3DX+0.25)%360;
    rightGL.uniform3fv(uRotationVector3D,currentRotation3D);

    leftGL.clear(leftGL.COLOR_BUFFER_BIT);
    leftGL.drawArrays(leftGL.TRIANGLES, 0, rectangleVertices.length/2);
    rightGL.clear(rightGL.COLOR_BUFFER_BIT | rightGL.DEPTH_BUFFER_BIT);
    rightGL.drawArrays(rightGL.TRIANGLES, 0, cubeVertices.length/6);
    requestAnimationFrame(render);
  }
  leftGL.clearColor(0.7, 0.7, 0.7, 1.0);
  leftGL.viewport(0, (leftGL.canvas.height - leftGL.canvas.width)/2, leftGL.canvas.width, leftGL.canvas.width);
  rightGL.clearColor(0.0, 0.0, 0.0, 1.0);
  rightGL.enable(rightGL.DEPTH_TEST);
  rightGL.viewport(0, (leftGL.canvas.height - leftGL.canvas.width)/2, rightGL.canvas.width, rightGL.canvas.width);
  console.log(leftGL.canvas.height,leftGL.canvas.width)


  
  render();
}