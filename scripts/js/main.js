var isMobile = false;
(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))isMobile = true})(navigator.userAgent||navigator.vendor||window.opera);
var renderSize;
var container = document.getElementById("container");
var PATH = './assets/';
var mouse = new THREE.Vector2(-10000.0, -10000.0);
var mouseStart = new THREE.Vector2(0.0,0.0);
var time = 0.0;
var scene, camera, renderer;
var material, geometry;
var textures = [];
var loader = new THREE.TextureLoader();
var capturer = new CCapture( { framerate: 60, format: 'webm', workersPath: 'js/' } );
var mouseDown = 0.0;
var timeout;
var assetCount = 0;
var totalAssetCount = 4;
var input;
var FACEINDEX, FACEPORTION;
if ( ! Detector.webgl ){
    CREATEDWEBGL = false;
    Detector.addGetWebGLMessage();
} else {
    CREATEDWEBGL = true;

}
var tooltip = document.getElementById('tooltip');

var raycaster = new THREE.Raycaster();
var raycasterMouse = new THREE.Vector2(-10000.0, -10000.0);

var INTERSECTED;
var markers =[];
var views = [
                {
                    left: 0,
                    bottom: 0,
                    width: 1.0,
                    height: 0.9,
                    background: new THREE.Color().setRGB( 0.5, 0.5, 0.7 ),
                    eye: [ 0, 300, 1800 ],
                    up: [ 0, 1, 0 ],
                    fov: 30,
                    updateCamera: function ( camera, scene, mouseX, mouseY ) {
                      // camera.position.x += mouse.x * 0.05;
                      // camera.position.x = Math.max( Math.min( camera.position.x, 2000 ), -2000 );
                      // camera.lookAt( scene.position );
                    }
                },
                {
                    left: 0.0,
                    bottom: 0.9,
                    width: 1.0,
                    height: 0.1,
                    background: new THREE.Color().setRGB( 0.7, 0.5, 0.5 ),
                    eye: [ 0, 1800, 0 ],
                    up: [ 0, 0, 1 ],
                    fov: 45,
                    updateCamera: function ( camera, scene, mouseX, mouseY ) {
                      // camera.position.x -= mouse.x * 0.05;
                      // camera.position.x = Math.max( Math.min( camera.position.x, 2000 ), -2000 );
                      // camera.lookAt( camera.position.clone().setY( 0 ) );
                    }
                }
            ];
var center = new THREE.Vector3(0.0,0.0,0.0);
var physics = new ParticleSystem(0.0, 0.0, 0.0, 5.0);
var vertIndex = 0;
var vertIndex2 = 54;
var cursor;
var cursor2;
var markerGeometry = new THREE.SphereGeometry(3,3,3);
var markerMaterial = new THREE.MeshBasicMaterial({color: 0xff0000, side: 2})
var math = 0.0, prevMath = 0.0;

var plane = new THREE.Plane();
var mouse = new THREE.Vector2(),
offset = new THREE.Vector3(),
intersection = new THREE.Vector3(),
INTERSECTED, SELECTED;

// physics.onUpdate(draw);
init();


function loadCounter(){
    assetCount++;
    if(assetCount >= totalAssetCount){
        init();
    }
}
function init() {
    
    setRenderSize();
    scene = new THREE.Scene();
    renderer = new THREE.WebGLRenderer({
        preserveDrawingBuffer: true,
        antialias: true,
        alpha: true
    });
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize(renderSize.x, renderSize.y);
    renderer.setClearColor(0xffffff, 1.0);
    camera = new THREE.OrthographicCamera( renderSize.x / - 2, renderSize.x / 2, renderSize.y / 2, renderSize.y / - 2, -100000, 100000 );
    // camera = new THREE.PerspectiveCamera(45, renderSize.x/renderSize.y, 0.01, 100000);
    orthoCamera = new THREE.OrthographicCamera( renderSize.x / - 2, renderSize.x / 2, renderSize.y / 2, renderSize.y / - 2, -100000, 100000 );

    camera.position.z = 500;
    camera.position.y = 200;
    camera.lookAt(new THREE.Vector3(0.0,0.0,0.0));

    // for (var ii =  0; ii < views.length; ++ii ) {
    //     var view = views[ii];
    //     camera = new THREE.PerspectiveCamera( view.fov, window.innerWidth / window.innerHeight, 1, 10000 );
    //     camera.position.x = view.eye[ 0 ];
    //     camera.position.y = view.eye[ 1 ];
    //     camera.position.z = view.eye[ 2 ];
    //     camera.up.x = view.up[ 0 ];
    //     camera.up.y = view.up[ 1 ];
    //     camera.up.z = view.up[ 2 ];
    //     view.camera = camera;
    // }
    views[0].camera = camera;
    views[1].camera = orthoCamera;



    controls = new THREE.OrbitControls(camera);
    // controls2 = new THREE.OrbitControls(orthoCamera);
    camera2 = new THREE.Camera();
    camera2.position.z = 1;
    
    container.appendChild(renderer.domElement);

    uniforms = {
        "resolution": new THREE.Vector2(renderSize.x, renderSize.y),
        "time": 0.0,
        "mouse": new THREE.Vector2(0.0,0.0),
    }

    rubberband = new Rubberband(renderer, scene, camera);
    rubberband.createTextures();
    rubberband.createGeometry();
    rubberband.createParticles();
    rubberband.createSprings();
    // rubberband.createMarkers();

    // rubberband.init();
    // rubberband.setUniforms(uniforms);

    cursor = new THREE.Mesh(markerGeometry, new THREE.MeshBasicMaterial({color: 0xff0000, side: 2}));
    // scene.add(cursor);

    cursor2 = new THREE.Mesh(markerGeometry, new THREE.MeshBasicMaterial({color: 0x0000ff, side: 2}));
    // scene.add(cursor2);

    debounceResize = debounce(onWindowResize, 250);
    window.addEventListener("resize", debounceResize);
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mouseup", onMouseUp);
    document.addEventListener('touchstart', onDocumentTouchStart, false);
    document.addEventListener('touchdown', onDocumentTouchStart, false);
    document.addEventListener('touchmove', onDocumentTouchMove, false);
    document.addEventListener('keydown', function() {
        screenshot(renderer)
    }, false);



    // capturer.start();
    animate();
    // physics.play();
}

function animate() {
    id = requestAnimationFrame(animate);
    draw();
}

function draw() {
    time += 0.01;    
    uniforms.time = time;    
    uniforms["mouse"].x = mouse.x;
    uniforms["mouse"].y = mouse.y;

    rubberband.update();

    physics.tick();

    raycaster.setFromCamera( mouse, camera );   
    var intersects = raycaster.intersectObjects( scene.children );

    if ( intersects.length > 0 ) {
        if ( INTERSECTED != intersects[ 0 ] ) {
            INTERSECTED = intersects[ 0 ];
            tooltip.style.display = "block";
            tooltip.children[0].innerHTML = INTERSECTED.object.userData.title;
        }
    } else {
        INTERSECTED = null;
        tooltip.style.display = "none";
    }

    renderer.render(scene, camera);

    capturer.capture( renderer.domElement );

}
function onMouseMove(event) {
    event.preventDefault();
    var x = event.clientX,
        y = event.clientY;
    tooltip.style.top = (y + 20) + 'px';
    tooltip.style.left = (x + 20) + 'px';

    mouse.x = (event.clientX / renderSize.x) * 2 - 1;  
    mouse.y = -(event.clientY / renderSize.y) * 2 + 1;   

    raycaster.setFromCamera( mouse, camera );
    if ( SELECTED ) {

        if ( raycaster.ray.intersectPlane( plane, intersection ) ) {

            // SELECTED.object.position.copy( intersection.sub( offset ) );
            var pos = intersection.sub( offset );
            if(FACEINDEX){
                physics.particles[FACEINDEX].position.x = pos.x;
                physics.particles[FACEINDEX].position.y = pos.y + 32;
                physics.particles[FACEINDEX].position.z = pos.z;
                physics.particles[FACEINDEX + FACEPORTION].position.x = pos.x;
                physics.particles[FACEINDEX + FACEPORTION].position.y = pos.y - 32;
                physics.particles[FACEINDEX + FACEPORTION].position.z = pos.z;
            }
        }

        return;

    }

    var intersects = raycaster.intersectObjects( scene.children );

    if ( intersects.length > 0 ) {

        if ( INTERSECTED != intersects[ 0 ] ) {

            // if ( INTERSECTED ) INTERSECTED.object.material.color.setHex( INTERSECTED.currentHex );

            INTERSECTED = intersects[ 0 ];
            // INTERSECTED.object.currentHex = INTERSECTED.object.material.color.getHex();

            plane.setFromNormalAndCoplanarPoint(
                camera.getWorldDirection( plane.normal ),
                new THREE.Vector3(physics.particles[FACEINDEX].position.x, 0.0, physics.particles[FACEINDEX].position.z)  );

        }

        container.style.cursor = 'pointer';

    } else {

        // if ( INTERSECTED ) INTERSECTED.object.material.color.setHex( INTERSECTED.object.currentHex );

        INTERSECTED = null;

        container.style.cursor = 'auto';

    }

    if ( mouseDown ) {

        // if ( raycaster.ray.intersectPlane( plane, intersection ) ) {

        //     // INTERSECTED.object.position.copy( intersection.sub( offset ) );
        //     var pos = intersection.sub( offset );//.normalize();
        //     pos.multiplyScalar(0.10);
        //     physics.particles[FACEINDEX].position.x = pos.x;
        //     // physics.particles[FACEINDEX].position.y += pos.y;
        //     physics.particles[FACEINDEX].position.z = pos.z;
        //     physics.particles[FACEINDEX + FACEPORTION].position.x = pos.x;
        //     // physics.particles[FACEINDEX + FACEPORTION].position.y += pos.y;
        //     physics.particles[FACEINDEX + FACEPORTION].position.z = pos.z;

        // }
    }


    if(mouseDown){
        // prevMath = math;
        // math = Math.max(Math.round(Math.sqrt(Math.pow(mouseStart.y - event.clientY, 2) +Math.pow(mouseStart.x - event.clientX, 2))), prevMath);
        // console.log(math);
        /*var vector = new THREE.Vector3();

        vector.set(
            mouse.x,
            mouse.y,
            1.0 );

        vector.unproject( camera );

        var dir = vector.sub( camera.position ).normalize();

        // var distance = - camera.position.z / dir.z;

        // var pos = camera.position.clone().add( dir.multiplyScalar( distance ) );
        // pos.multiplyScalar(0.01);
        console.log(dir);
        // physics.particles[index].position.x += Math.cos(time*10.0)*20.0;
        // physics.particles[FACEINDEX].position.z += math/10;
        physics.particles[FACEINDEX].position.add(dir);
        // physics.particles[index + portion].position.x += Math.cos(time*10.0)*10.0;
        // physics.particles[FACEINDEX + FACEPORTION].position.z += math/10;
        physics.particles[FACEINDEX + FACEPORTION].position.add(dir);*/
    }
}
function onMouseDown() {
    mouseDown = true;

    mouse.x = (event.pageX / renderSize.x) * 2 - 1;  
    mouse.y = -(event.pageY / renderSize.y) * 2 + 1;    

    mouseStart.x = event.clientX;
    mouseStart.y = event.clientY;

    raycaster.setFromCamera( mouse, camera );   
    var intersects = raycaster.intersectObjects( scene.children );
    if ( intersects.length > 0 ) {
        controls.enabled = false;
        
        SELECTED = intersects[ 0 ];

        // if ( SELECTED != intersects[ 0 ] ) {
                // SELECTED = intersects[ 0 ];
                // console.log(intersects[ 0 ]);
        var face = SELECTED.faceIndex + ((SELECTED.object.userData.title-1)*rubberband.segments[0].geometry.vertices.length);
        face /= 2;
        face = Math.floor(face);
        var half = face/rubberband.segments[0].geometry.vertices.length - (SELECTED.object.userData.title-1);
        if(face){
                var portion = (physics.particles.length/(rubberband.segments.length*2.0));
                var index = face + (SELECTED.object.userData.title-1)*portion;
                FACEINDEX = index;
                FACEPORTION = portion;
                // physics.particles[index].position.x += Math.cos(time*10.0)*20.0;
                // physics.particles[index].position.z += Math.cos(time*10.0)*20.0;
                // physics.particles[index + portion].position.x += Math.cos(time*10.0)*10.0;
                // physics.particles[index + portion].position.z += Math.cos(time*10.0)*20.0                             
        }
        if ( raycaster.ray.intersectPlane( plane, intersection ) ) {

            // offset.copy( intersection ).sub( SELECTED.object.position );
            offset.copy( intersection ).sub( new THREE.Vector3(physics.particles[FACEINDEX].position.x, 0.0, physics.particles[FACEINDEX].position.z) );

        }
        tooltip.style.display = "block";
        tooltip.children[0].innerHTML = SELECTED.object.userData.title;
            // }
    } else {
        // INTERSECTED = null;
        // tooltip.style.display = "none";
    }  
}
function onMouseUp() {
    mouseDown = false;

    controls.enabled = true;
    FACEINDEX = null;
    if ( INTERSECTED ) {

        SELECTED = null;

    }

}
function onDocumentTouchStart(event) {
    updateMouse(event);
}

function onDocumentTouchMove(event) {
    updateMouse(event);
}

function updateMouse(event) {
    if (event.touches.length === 1) {
        event.preventDefault();
        mouse.x = (event.touches[0].pageX / renderSize.x) * 2 - 1;
        mouse.y = -(event.touches[0].pageY / renderSize.y) * 2 + 1;
    }
}

function onWindowResize(event) {
    setRenderSize();
    renderer.setSize(renderSize.x, renderSize.y);
    uniforms["resolution"] = new THREE.Vector2(renderSize.x, renderSize.y);

}

function setRenderSize(){
    renderSize = new THREE.Vector2(window.innerWidth, window.innerHeight);
    // renderSize = new THREE.Vector2(window.innerHeight*2448/3264, window.innerHeight);
}
function debounce(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this, args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}
function screenshot(renderer) {
    if (event.keyCode == "32") {
        grabScreen(renderer);

        function grabScreen(renderer) {
            var blob = dataURItoBlob(renderer.domElement.toDataURL('image/png'));
            var file = window.URL.createObjectURL(blob);
            var img = new Image();
            img.src = file;
            img.onload = function(e) {
                window.open(this.src);

            }
        }
        function dataURItoBlob(dataURI) {
            var byteString;
            if (dataURI.split(',')[0].indexOf('base64') >= 0)
                byteString = atob(dataURI.split(',')[1]);
            else
                byteString = unescape(dataURI.split(',')[1]);

            var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

            var ia = new Uint8Array(byteString.length);
            for (var i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }

            return new Blob([ia], {
                type: mimeString
            });
        }

        function insertAfter(newNode, referenceNode) {
            referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
        }
    }
    if (event.keyCode == "82") {
        capturer.start();
    }
    if (event.keyCode == "84") {
        capturer.stop();
        capturer.save(function(blob) {
            window.open(blob);
        });
    }
}