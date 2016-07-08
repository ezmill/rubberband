function Rubberband(RENDERER, SCENE, CAMERA){
	this.renderer = RENDERER;
	this.scene = SCENE;
	this.camera = CAMERA;
	this.rubberband = new THREE.Object3D();
	this.segments = [];
	this.markers = [];
	this.mesh;
	this.images = [
		"textures/1.png",
		"textures/2.png",
		"textures/3.png",
		"textures/1.png",
		"textures/4.png",
		"textures/5.png",
		"textures/6.png",
		"textures/7.png",
		"textures/8.png"
	]
	this.textures = [];

	    this.init = function(){
			/*for(var i = 0; i < TAU; i += TAU/8.0){
				var shader = new RubberbandShader();
				// var material = new THREE.ShaderMaterial({
				// 	uniforms: shader.uniforms,
				// 	vertexShader: shader.vertexShader,
				// 	fragmentShader: shader.fragmentShader,
				// 	transparent: true,
				// 	side: 2
				// })
				var material = new THREE.MeshBasicMaterial({color: 0x00ff00, wireframe:true, side: 2})
				var texture = loader.load(PATH + "textures/UV_Grid_Sm.jpg");
				// texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
				// texture.repeat = new THREE.Vector2(0.0,0.0);
				// material.uniforms["texture"].value = texture;
				// material.uniforms["textureResolution"].value = new THREE.Vector2(1024.0, 1024.0);
				// material.uniforms["arcResolution"].value = new THREE.Vector2(renderSize.x*20.0/39.269908169, renderSize.y);//39.269908169, 20.0);
		  		var geometry = new THREE.CylinderGeometry(100,100, 20.0, 100, 1, true, i, TAU/8.0);
		  		var geometry = new THREE.CylinderGeometry(100,100, 20.0, 100, 1, true, i, TAU/8.0);
		  		var mesh = new THREE.Mesh(geometry, material);
		  		console.log(mesh);
		  		// console.log(mesh.position.x, mesh.position.y);
		  		// mesh.position.x += Math.sin(i)*10.0;
		  		// mesh.position.z += Math.cos(i)*10.0;
		  		// mesh.lookAt(center);
		  		geometry.computeBoundingSphere();
		  		var boundPos = geometry.boundingSphere.center;
		  		physics.makeParticle(2.0, boundPos.x, boundPos.y, boundPos.z);
		  		mesh.geometry.verticesNeedUpdate = true;
		  		this.segments.push(mesh);
		  		// this.scene.add(mesh);
		  		mesh.userData.title = projects[i/TAU*8.0].title;
		  		// console.log(i/TAU*8.0);
		  		this.rubberband.add(mesh);
	    	}*/
			// var material = new THREE.MeshBasicMaterial({color: 0x00ff00, wireframe:true, side: 2})
			var shader = new RubberbandShader();
			var material = new THREE.ShaderMaterial({
				uniforms: shader.uniforms,
				vertexShader: shader.vertexShader,
				fragmentShader: shader.fragmentShader,
				transparent: true,
				side: 2
			})
			var texture = loader.load(PATH + "textures/UV_Grid_Sm.jpg");

			texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
			texture.repeat = new THREE.Vector2(0.0,0.0);
			material.uniforms["texture"].value = texture;
			material.uniforms["resolution"].value = renderSize;
			material.uniforms["textureResolution"].value = new THREE.Vector2(1024.0, 1024.0);
	  		var geometry = new THREE.CylinderGeometry(200,200, 64, 256*5.0, 1, true);
	  		this.mesh = new THREE.Mesh(geometry, material);
	  		geometry.computeBoundingSphere();
	  		console.log(geometry);
	  		var boundPos = geometry.boundingSphere.center;
	  		for(var i = 0; i < geometry.vertices.length; i++){
		  		physics.makeParticle(10.0, geometry.vertices[i].x, geometry.vertices[i].y, geometry.vertices[i].z);
	  		}

	  		var markerGeometry = new THREE.SphereGeometry(1,1,1);
	  		var markerMaterial = new THREE.MeshBasicMaterial({color: 0xff0000, side: 2})

	  		var strength   = 6.0;
	  		var damping    = 1.0;
	  		var restLength = 1.0;
	  		for(var i = 0; i < physics.particles.length/2 - 1; i++){
	  		    // var mesh = new THREE.Mesh(markerGeometry, markerMaterial);
	  		    // mesh.position.x = physics.particles[i].position.x; 
	  		    // mesh.position.y = physics.particles[i].position.y; 
	  		    // mesh.position.z = physics.particles[i].position.z; 
	  		    // scene.add(mesh);
	  		    // mesh.visible = false;
	  		    if(physics.particles[i+1]){
	  		        physics.makeSpring(physics.particles[i], physics.particles[i+1], strength, damping, restLength)                
	  		    }

	  		    // markers.push(mesh);
	  		}
	  		for(var i = physics.particles.length/2; i < physics.particles.length; i++){
	  		    // var mesh = new THREE.Mesh(markerGeometry, markerMaterial);
	  		    // mesh.position.x = physics.particles[i].position.x; 
	  		    // mesh.position.y = physics.particles[i].position.y; 
	  		    // mesh.position.z = physics.particles[i].position.z; 
	  		    // scene.add(mesh);
	  		    // mesh.visible = false;
	  		    if(physics.particles[i+1]){
	  		        physics.makeSpring(physics.particles[i], physics.particles[i+1], strength, damping, restLength)                
	  		    }

	  		    // markers.push(mesh);
	  		}

	  		physics.makeSpring(physics.particles[0], physics.particles[physics.particles.length/2 - 1], strength, damping, restLength)
	  		physics.makeSpring(physics.particles[physics.particles.length - 1], physics.particles[physics.particles.length/2], strength, damping, restLength)

	  		this.mesh.geometry.verticesNeedUpdate = true;
	  		this.mesh.userData.title = projects[0].title;
	  		this.rubberband.add(this.mesh);


	    	this.scene.add(this.rubberband);
	    }

		this.createTextures = function(){
			for(var i = 0; i < this.images.length; i++){
				this.textures[i] = new THREE.TextureLoader().load(PATH + this.images[i]);
				this.textures[i].wrapS = this.textures[i].wrapT = THREE.RepeatWrapping;
				this.textures[i].repeat = new THREE.Vector2(0.0,0.0);

			}
		}
	    this.createGeometry = function(){
	    	var TAU = Math.PI*2.0;
			for(var i = 0; i < TAU; i += TAU/8.0){
		  		var geometry = new THREE.CylinderGeometry(200, 200, 64, 160/1.0, 1, true, i, TAU/8.0);
		  		geometry.computeBoundingSphere();
    			var shader = new RubberbandShader();
    			var material = new THREE.ShaderMaterial({
    				uniforms: shader.uniforms,
    				vertexShader: shader.vertexShader,
    				fragmentShader: shader.fragmentShader,
    				transparent: true,
    				side: 2
    			})
    			material.uniforms["texture"].value = this.textures[i/TAU*8.0];
    			material.uniforms["textureResolution"].value = new THREE.Vector2(1024.0, 1024.0);
    			material.uniforms["resolution"].value = renderSize;
		  		var mesh = new THREE.Mesh(geometry, material);
		  		mesh.userData.title = projects[i/TAU*8.0].title;
		  		mesh.scale.set(2.0,2.0,2.0);
		  		this.scene.add(mesh);
		  		this.segments.push(mesh);
	    	}
	    }
	    this.createParticles = function(){
	    	for(var i = 0; i < this.segments.length; i++){
		  		for(var j = 0; j < this.segments[i].geometry.vertices.length; j++){
			  		physics.makeParticle(
			  			10.0, 
			  			this.segments[i].geometry.vertices[j].x, 
			  			this.segments[i].geometry.vertices[j].y, 
			  			this.segments[i].geometry.vertices[j].z
		  			);
		  		}
	    	}
	    }
	    this.createSprings = function(){
	    	var strength   = 10.0;
	    	var damping    = 0.1;
	    	var restLength = 0.5;
	    	for(var i = 0; i < this.segments.length; i++){
	    		for(var j = 0; j < this.segments[i].geometry.vertices.length/2 - 1; j++){
					var index = j + i*(physics.particles.length/this.segments.length);
	    			if(physics.particles[index+1]){
	    			    physics.makeSpring(physics.particles[index], physics.particles[index+1], strength, damping, restLength)                
	    			}
	    		}
	    		for(var j = this.segments[i].geometry.vertices.length/2; j < this.segments[i].geometry.vertices.length - 1; j++){
					var index = j + i*(physics.particles.length/this.segments.length);
	    			if(physics.particles[index+1]){
	    			    physics.makeSpring(physics.particles[index], physics.particles[index+1], strength, damping, restLength)                
	    			}
	    		}
	    		var currentSegment = i*(physics.particles.length/this.segments.length);
	    		// console.log(currentSegment - (physics.particles.length/(this.segments.length*2) + 1), currentSegment);
	    		if(physics.particles[currentSegment - 1] && physics.particles[currentSegment - (physics.particles.length/(this.segments.length*2) + 1)]){
		  			physics.makeSpring(physics.particles[currentSegment - 1], physics.particles[currentSegment + (physics.particles.length/(this.segments.length*2))], strength, damping, restLength)
		  			physics.makeSpring(physics.particles[currentSegment - (physics.particles.length/(this.segments.length*2) + 1)], physics.particles[currentSegment], strength, damping, restLength)
	    		}           
	    	}
	  		physics.makeSpring(physics.particles[physics.particles.length - (physics.particles.length/(this.segments.length*2) + 1)], physics.particles[0], strength, damping, restLength)
	  		physics.makeSpring(physics.particles[physics.particles.length - 1], physics.particles[(physics.particles.length/(this.segments.length*2))], strength, damping, restLength)
	    }
	    this.createMarkers = function(){


	    	for(var i = 0; i < physics.particles.length; i++){
	    	    var mesh = new THREE.Mesh(markerGeometry, material);
	    	    mesh.position.x = physics.particles[i].position.x; 
	    	    mesh.position.y = physics.particles[i].position.y; 
	    	    mesh.position.z = physics.particles[i].position.z; 
	    	    // scene.add(mesh);
	    	    this.markers.push(mesh);
	    	}

	    }
	    this.update = function(){
			vertIndex = vertIndex%physics.particles.length;
			for(var i = 0; i < this.segments.length; i++){
				this.segments[i].geometry.verticesNeedUpdate = true;	
				for(var j = 0; j < this.segments[i].geometry.vertices.length; j++){
					var index = j + i*(physics.particles.length/this.segments.length);
					// physics.particles[index].position.z += Math.sin(time*10.0 + this.segments[i].geometry.vertices[j].x*0.01);
					this.segments[i].geometry.vertices[j].x = physics.particles[index].position.x;
					this.segments[i].geometry.vertices[j].y = physics.particles[index].position.y;
					this.segments[i].geometry.vertices[j].z = physics.particles[index].position.z;
					// this.markers[index].position.x = physics.particles[index].position.x;
					// this.markers[index].position.y = physics.particles[index].position.y;
					// this.markers[index].position.z = physics.particles[index].position.z;
				}			
			}
	    }
	    this.setUniforms = function(UNIFORMS){
	    	for(u in UNIFORMS){
	    		for(var i = 0; i < this.segments.length; i++){
	    			// if (this.segments[i].material.uniforms[u]) this.segments[i].material.uniforms[u].value = UNIFORMS[u];                	    			
	    		}
	    	}
	    }
}
function RubberbandShader(){
    this.uniforms = THREE.UniformsUtils.merge([
		{
			"texture"  : { type: "t", value: null },
			"mouse"  : { type: "v2", value: null },
			"textureResolution"  : { type: "v2", value: null },
			// "arcResolution"  : { type: "v2", value: null },
			"resolution"  : { type: "v2", value: null },
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
		"uniform vec2 textureResolution;",
		// "uniform vec2 arcResolution;",
		"uniform vec2 mouse;",
		"uniform float time;",
		"varying vec2 vUv;",
		"varying vec3 vNormal;",

		"void main() {",
		// "	vec2 uv = vUv;",
        "   vec2 uv = ((vUv)*vec2(resolution.xy/textureResolution.xy)) - ((((vec2(0.0)- vec2(textureResolution.xy/resolution.xy))*0.5 + 0.5)*vec2(resolution.xy/textureResolution.xy)));",
		"	uv.x *= resolution.x/resolution.y;",
		"	vec4 color = texture2D(texture, vUv);",
		// "	if(color.r > 0.5){",
		"		gl_FragColor = vec4(color.rgb, color.a);",
		// "	} else {",
		// "		discard;",
		// "	}",
		// "   gl_FragColor = mix(vec4(0.0),texture2D(texture, uv), uv.x);",
		"}"
    
    ].join("\n");
}