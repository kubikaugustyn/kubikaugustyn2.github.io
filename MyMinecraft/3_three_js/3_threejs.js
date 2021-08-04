var cubeRotation = {
	x: 0,
	y: 0
}

var cameraPosZ = 0
var cameraPosY = 0
var cameraPosX = 0

var cameraLookAt = {
	x: 0,
	y: 0,
	z: 0
}

var cameraVzdalenost = 45

var cameraNear = 1
var cameraFar = 10000

document.addEventListener('DOMContentLoaded', function(event) {
	document.body.onkeydown = function(event){
		if(event.key){
			if(event.key === "w"){
				cameraPosZ--
			}
			else if(event.key === "s"){
				cameraPosZ++
			}
			else if(event.key === "a"){
				cameraPosX--
			}
			else if(event.key === "d"){
				cameraPosX++
			}
			else if(event.key === " "){
				cameraPosY++
			}
			else if(event.key === "Shift"){
				cameraPosY--
			}
		}
		console.log(event)
	}
	
	
    window.requestAnimationFrame = (function() {
        return window.requestAnimationFrame;
    })();

    function animateScene() {
        requestAnimationFrame(animateScene);

        /*cube.rotation.y += 0.02;
        cube.rotation.x += 0.01;*/
		cube.rotation.y = cubeRotation.y;
        cube.rotation.x = cubeRotation.x;
		//cube.rotation.z += 0.01;
		//cameraPosZ++
		//cameraPosZ = cameraPosZ + 0.01
		//startScene(cube);
		var canvas = document.getElementById('canvas');

        var canvasWidth = canvas.getAttribute('width');
        var canvasHeight = canvas.getAttribute('height');
		scene = new THREE.Scene();
        var aspect = canvasWidth / canvasHeight;

        camera = new THREE.PerspectiveCamera(cameraVzdalenost, aspect, cameraNear, cameraFar);
        //camera.position.set(0, 0, 0);
        camera.position.set(cameraPosX, cameraPosY, cameraPosZ);
        //camera.lookAt(scene.position);
        camera.lookAt(cameraLookAt.x, cameraLookAt.y, cameraLookAt.z);
        scene.add(camera);

        cube.position.set(0, 0, -7.0);
        scene.add(cube);
        renderScene();
    }

    function createCube() {
        var cubeMaterials = [
            new THREE.MeshBasicMaterial({color:0x2173fd}),
            new THREE.MeshBasicMaterial({color:0xd5d918}),
            new THREE.MeshBasicMaterial({color:0xd2dbeb}),
            new THREE.MeshBasicMaterial({color:0xa3a3c6}),
            new THREE.MeshBasicMaterial({color:0xfe6b9f}),
            new THREE.MeshDepthMaterial({color:0x856af9})
        ];

        var cubeMaterial = new THREE.MeshFaceMaterial(cubeMaterials);
        var cubeGeometry = new THREE.BoxGeometry(2, 2, 2);

        cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

        return cube;
    }

    function startScene(cube) {
        var canvas = document.getElementById('canvas');
        render = new THREE.WebGLRenderer();

        render.setClearColor(0x000000, 1);

        var canvasWidth = canvas.getAttribute('width');
        var canvasHeight = canvas.getAttribute('height');
        render.setSize(canvasWidth, canvasHeight);

        canvas.appendChild(render.domElement);

        scene = new THREE.Scene();
        var aspect = canvasWidth / canvasHeight;

        camera = new THREE.PerspectiveCamera(cameraVzdalenost, aspect, cameraNear, cameraFar);
        //camera.position.set(0, 0, 0);
        camera.position.set(0, 0, cameraPosZ);
        //camera.lookAt(scene.position);
        camera.lookAt(cameraLookAt.x, cameraLookAt.y, cameraLookAt.z);
        scene.add(camera);

        cube.position.set(0, 0, -7.0);
        scene.add(cube);
    }

    function renderScene() {
        render.render(scene, camera);
    }

    var cube = createCube();
    startScene(cube);
    animateScene();
    renderScene();
    
});
