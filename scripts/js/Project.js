function Project(RENDERER, SCENE, CAMERA, TEXTURE, INFO){
    this.renderer = RENDERER;
    this.scene = SCENE;
    this.camera = CAMERA;
    this.texture = TEXTURE;
    this.texture.minFilter = THREE.LinearFilter;
    this.texture.magFilter = THREE.LinearFilter;

    this.info = INFO;
    this.material, this.geometry;
    this.mesh;
    this.seed = Math.random();
    this.init = function(){
    	// this.material = new THREE.MeshBasicMaterial({
    	// 	map: this.texture
    	// })
		this.shader = new ProjectShader();
		this.material = new THREE.ShaderMaterial({
			uniforms: this.shader.uniforms,
			vertexShader: this.shader.vertexShader,
			fragmentShader: this.shader.fragmentShader,
			transparent: true,
			side: 2,
            depthWrite: false
		})
		this.material.uniforms["texture"].value = loader.load(PATH + "textures/texture.png");
		var color = gradients[Math.floor(Math.random()*gradients.length)];
		var color0 = new THREE.Color().set(color.colors[0]);
		var color1 = new THREE.Color().set(color.colors[1]);
		// console.log(color0, color1);
		this.material.uniforms["color0"].value = color0;
		this.material.uniforms["color1"].value = color1;
  		this.geometry = new THREE.PlaneBufferGeometry(renderSize.x, renderSize.y);//this.texture.image.width/renderSize.x, this.texture.image.height/renderSize.y);
  		this.mesh = new THREE.Mesh(this.geometry, this.material);
  		this.scene.add(this.mesh);
  		this.mesh.position.z = Math.random()*100 - 50;
  		this.mesh.position.x = Math.random()*2.0 - 1.0;
  		this.mesh.position.y = Math.random()*2.0 - 1.0;
  		this.mesh.rotation.x = Math.random()*0.01 - 0.005;
  		this.mesh.rotation.y = Math.random()*0.01 - 0.005;
    }
    this.update = function(){
    	// this.mesh.position.z += Math.sin(time + this.mesh.position.z)*this.mesh.position.z;
    	this.mesh.position.x += Math.sin(time*0.1 + this.seed)*0.001;
    	this.mesh.position.y += Math.cos(time*0.1 + this.seed)*0.001;
    }
    this.setUniforms = function(UNIFORMS){
    	for(u in UNIFORMS){
    	        // if (this.buffers[i].material.uniforms[u]) this.buffers[i].material.uniforms[u].value = UNIFORMS[u];                
    	    if (this.material.uniforms[u]) this.material.uniforms[u].value = UNIFORMS[u];                
    	}
    }
}
var ProjectShader = function(){
    this.uniforms = THREE.UniformsUtils.merge([
		{
			"texture"  : { type: "t", value: null },
			"mouse"  : { type: "v2", value: null },
			"resolution"  : { type: "v2", value: null },
			"color0"  : { type: "v3", value: null },
			"color1"  : { type: "v3", value: null },
			"time"  : { type: "f", value: null },
		}
    ]);
    this.vertexShader = [
        "varying vec2 vUv;",
        "varying vec3 vNormal;",
        "void main() {",
        "    vUv = uv;",
        "    vNormal = normal;",
        "    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",
        "}"
    
    ].join("\n");
    
    this.fragmentShader = [
        
		"uniform sampler2D texture;",
		"uniform vec2 resolution;",
		"uniform vec2 mouse;",
		"uniform vec3 color0;",
		"uniform vec3 color1;",
		"uniform float time;",
		"varying vec2 vUv;",
		"varying vec3 vNormal;",
        "#define L 0.1  // interline distance",
        "#define A 10.  // amplification factor",
        "#define P 6.0  // thickness",

		"void main() {",
        "    vec4 color = vec4(vec3(0.0), 1.0);",
        // "    color -= color;",
        // "    vec2 fc = gl_FragCoord.xy;",
        "    vec2 fc = vUv*resolution;",
        "    fc /= L;",
        "    vec2  p = floor(fc+.5);",

        // "    #define T(x,y) texture2D(texture,L*vec2(x,y)/resolution.xy).g   // add .g or nothing ",

        // "    #define M(c,T) o += pow(.5+.5*cos( 6.28*(uv-p).c + A*(2.*T-1.) ),P)",
        // "    color += pow(.5+.5*cos( 6.28*(fc-p).y + A*(2.*texture2D(texture,L*vec2(fc.x, p.y)/resolution.xy).g-1.) ),P);",
        // "    color += pow(.5+.5*cos( 6.28*(fc-p).x + A*(2.*texture2D(texture,L*vec2(p.x, fc.y)/resolution.xy).g-1.) ),P);",
        "    color += pow(.5+.5*cos( 6.28*(fc-p).y + A*(2.*texture2D(texture,L*vec2(fc.x, p.y)/resolution.xy).g-1.) ),P);",
        "    color += pow(.5+.5*cos( 6.28*(fc-p).x + A*(2.*texture2D(texture,L*vec2(p.x, fc.y)/resolution.xy).g-1.) ),P);",
        "	 vec3 gradient = mix(color0.rgb, color1.rgb, vUv.x);",
		"    gl_FragColor = mix(vec4(vec3(1.0),0.0),/*vec4(gradient, 1.0)*/texture2D(texture, vUv), color.r);//dot(color.rgb, vec3(1.0)/3.0));",
		"}"
    
    ].join("\n");
}