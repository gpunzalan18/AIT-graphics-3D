var Scene = function(gl) {

  var scene = this; 
  this.vsIdle = new Shader(gl, gl.VERTEX_SHADER, "idle_vs.essl");
  this.fsSolid = new Shader(gl, gl.FRAGMENT_SHADER, "solid_fs.essl");

  this.vsIdle_v2 = new Shader(gl, gl.VERTEX_SHADER, "vertexShader_env.essl");
  this.fsSolid_v2 = new Shader(gl, gl.FRAGMENT_SHADER, "fragmentShader_env.essl");

  this.fsSolid_v3 = new Shader(gl, gl.FRAGMENT_SHADER, "fragmentShader_normal.essl");
  this.fsSolid_v4 = new Shader(gl, gl.FRAGMENT_SHADER, "fragmentShader_procedural.essl");


  this.solidProgram = new Program(gl, this.vsIdle, this.fsSolid);
  this.solidProgram_v2 = new Program(gl, this.vsIdle_v2, this.fsSolid_v2);
  this.solidProgram_v3 = new Program(gl, this.vsIdle, this.fsSolid_v3);
  this.solidProgram_v4 = new Program(gl, this.vsIdle, this.fsSolid_v4);

  this.quadGeometry = new QuadGeometry(gl);

  this.timeAtLastFrame = new Date().getTime();

  //this.material0 = new Material(gl, this.solidProgram_v4);
  // this.material0.colorTexture.set(
  //   new Texture2D(gl, 'media/slowpoke/YadonDh.png'));  
  this.material1 = new Material(gl, this.solidProgram_v4);
  // this.material1.colorTexture.set(
  //   new Texture2D(gl, 'media/slowpoke/YadonEyeDh.png'));

  this.material2 = new Material(gl, this.solidProgram_v2);
  this.material2.probeTexture.set(
    new Texture2D(gl, 'media/slowpoke/pp.png'));

  this.material3 = new Material(gl, this.solidProgram);
  this.material3.colorTexture.set(
    new Texture2D(gl, 'media/slowpoke/json/chevy/chevy.png'));  

  this.material4 = new Material(gl, this.solidProgram);
  this.material4.colorTexture.set(
    new Texture2D(gl, 'media/slowpoke/pp.png'));

  this.material5 = new Material(gl, this.solidProgram_v3);
  this.material5.normTexture.set(
    new Texture2D(gl, 'media/slowpoke/pp.png'));

  this.material6 = new Material(gl, this.solidProgram);
  this.material6.colorTexture.set(
    new Texture2D(gl, 'media/slowpoke/json/heli/heli.png'));

  this.material7 = new Material(gl, this.solidProgram);
  this.material7.colorTexture.set(
    new Texture2D(gl, 'media/slowpoke/json/tree.png'));

  this.mesh = new Mesh(this.quadGeometry, this.material2);

  this.material8 = new Material(gl, this.solidProgram);
  this.material8.colorTexture.set(
    new Texture2D(gl, "media/asteroid.png"));
  this.mesh2 = new Mesh(this.quadGeometry, this.material8);



  this.multiMesh = new MultiMesh(gl, './media/slowpoke/json/balloon.json', [this.material1]);
  this.multiMesh2 = new MultiMesh(gl, './media/slowpoke/json/chevy/chassis.json', [this.material5]);
  this.multiMesh3 = new MultiMesh(gl, './media/slowpoke/json/chevy/wheel.json', [this.material4]);
  this.multiMesh4 = new MultiMesh(gl, './media/slowpoke/json/heli/heli1.json', [this.material4]);
  this.multiMesh6 = new MultiMesh(gl, './media/slowpoke/json/heli/mainrotor.json', [this.material4, this.material4]);
  this.multiMesh7 = new MultiMesh(gl, './media/slowpoke/json/smoothtree.json', [this.material7]);
  

  this.pokemonObject = new GameObject2D(this.multiMesh);
  this.pokemonObject.position.set(-20, 30, 45);
  this.carObject = new GameObject2D(this.multiMesh2);
  this.wheelObject1 = new GameObject2D(this.multiMesh3);
  this.wheelObject2 = new GameObject2D(this.multiMesh3);
  this.wheelObject3 = new GameObject2D(this.multiMesh3);
  this.wheelObject4 = new GameObject2D(this.multiMesh3);
  this.heliObject = new GameObject2D(this.multiMesh4);
  this.heliObject.position.set(30, 50, 100);
  this.mainrotorObject = new GameObject2D(this.multiMesh6);

  //this.asteroidObject = new GameObject2D(this.mesh2);
  //this.asteroidObject.scale.set(25,25,25);


  // this.pokemonObject.move = function(dt, keysPressed){
  //   this.posi
  // }

  var testright = false;
  var testleft = false;
  this.heliObject.move = function(dt, keysPressed){
    //this.position.y = 40;
    this.scale.set(-1, 1, -1);
    this.acceleration.set();
    this.velocity.mul(Math.exp(-dt * 0.225));
    // var landed = false;
    // if(this.position.y < -10){
    //   landed = true;
    // }
    
    if(keysPressed["DOWN"] == true && this.position.y > -10){
      this.acceleration.y -= 5; 
      if(this.position.y <= -10){
        this.velocity.set();
      } 

    } 
    else if(this.position.y < -10 && keysPressed["UP"] == false){
      this.velocity.y = 0;
    }
    if(keysPressed["UP"] == true){
      this.acceleration.y += 5;
    }
    if(keysPressed["X"] == true){
      this.acceleration.z -= 5;
    }
    if(keysPressed["SPACE"] == true){
      this.acceleration.z += 5;
    }
    if(keysPressed["LEFT"] == true){
      this.acceleration.x -= 5; 
      if(this.angularVelocity.x > -.051){
        this.angularVelocity.x -= .00015;
        testleft = true;
      }
    }
    else if(this.orientation >= 0 && testleft){
      this.angularVelocity.x += .00015;
      testright = false;
    
    }
    
    if(keysPressed["RIGHT"] == true){
      this.acceleration.x += 5;
      if(this.angularVelocity.x < .051){
        this.angularVelocity.x += .00015;
        testright = true;
      }

    }
    else if(this.orientation <= 0 && testright){
      this.angularVelocity.x -= .00015;
      testleft = false;
    
    }
    this.velocity.addScaled(dt, this.acceleration);
    this.position.addScaled(dt, this.velocity);
    this.orientation = -1 * this.angularVelocity.x;
    
    if(this.position.y > 75){
      this.position.y = Math.min(this.position.y, 75);
    }
    else{
      this.position.y = Math.max(this.position.y, -5);
    }
    if(this.position.z < 0){
      this.position.z = Math.max(this.position.z, 0);
    }
    else{
      this.position.z = Math.min(this.position.z, 100);
    }
    if(testright){
      this.position.x = Math.min(this.position.x, 110);
    }
    if(testleft){
      this.position.x = Math.max(this.position.x, -90);
    }
    console.log(this.position.y);
  }

  this.wheelObject1.move = function(dt, keysPressed){
     this.scale.set(1.1,1.1,1.1);
     //this.orientation = 55;
     this.position.x = (scene.carObject.position.x + 7); 
     this.position.z = scene.carObject.position.z + 11;
     this.position.y = (scene.carObject.position.y - 4 );
  }

  this.wheelObject2.move = function(dt, keysPressed){
     this.scale.set(1.1,1.1,1.1);
     this.position.x = (scene.carObject.position.x - 7); 
     this.position.z = scene.carObject.position.z + 11;
     this.position.y = (scene.carObject.position.y - 4 );
  }
  this.wheelObject3.move = function(dt, keysPressed){
     this.scale.set(1.1,1.1,1.1);
     this.position.x = (scene.carObject.position.x + 7); 
     this.position.z = scene.carObject.position.z - 14;
     this.position.y = (scene.carObject.position.y - 4 );
  }

  this.wheelObject4.move = function(dt, keysPressed){
     this.scale.set(-1.1,-1.1,-1.1);
     this.position.x = (scene.carObject.position.x - 7); 
     this.position.z = scene.carObject.position.z - 14;
     this.position.y = (scene.carObject.position.y - 4 );
  }

  this.pokemonObject.move = function(dt, keysPressed){
    this.velocity.mul(Math.exp(-dt * 0.0225));
    this.acceleration.z += .009;
    this.scale.set(.75,.75,.75);

    var distance = Math.pow((Math.pow((scene.heliObject.position.x - this.position.x), 2) + Math.pow((scene.heliObject.position.y - (this.position.y - 10)), 2) + Math.pow((scene.heliObject.position.z - this.position.z), 2)),.5);
    //console.log(distance);
    if(distance < 20){
      //this.scale.set();
      scene.heliObject.position.set(30, 50, 100);
      this.acceleration.set();
      this.position.set(scene.heliObject.position.x, Math.max(scene.heliObject.position.y, 20), scene.heliObject.position.y - 100);
    }

    if(this.position.z > scene.heliObject.position.z + 80){
      this.position.set(scene.heliObject.position.x, Math.max(scene.heliObject.position.y, 20), scene.heliObject.position.y - 100);
      this.acceleration.set();
    }


    this.velocity.addScaled(dt, this.acceleration);
    this.position.addScaled(dt, this.velocity);

    this.position.x = scene.heliObject.position.x;
    
  }

  this.carObject.move = function(dt, keysPressed){
    var distance = Math.pow((Math.pow((scene.heliObject.position.x - this.position.x), 2) + Math.pow((scene.heliObject.position.y - this.position.y - 10), 2) + Math.pow((scene.heliObject.position.z - this.position.z), 2)),.5);
    //console.log(distance);
    if(distance < 20){
      //this.scale.set();
      scene.heliObject.position.set(30, 50, 100);
      //this.acceleration.set();
      //this.position.set(scene.heliObject.position.x, Math.max(scene.heliObject.position.y, 20), scene.heliObject.position.y - 100);
    }
  }



  this.mainrotorObject.move = function(dt, keysPressed){
    //this.angularVelocity.set();
    this.position.set(scene.heliObject.position);
    this.position.y = scene.heliObject.position.y + 14;

    this.yaw = 1;
    this.pitch = 0;
    
    this.orientation += .098;
 

  }
  this.gameObjects = [];
  this.gameObjects.push(this.pokemonObject);
  this.carObject.position.set(0,0,0);
  this.gameObjects.push(this.carObject);
  this.gameObjects.push(this.wheelObject1);
  this.gameObjects.push(this.wheelObject2);
  this.gameObjects.push(this.wheelObject3);
  this.gameObjects.push(this.wheelObject4);
  this.gameObjects.push(this.heliObject);
  this.gameObjects.push(this.mainrotorObject);
  //this.gameObjects.push(this.asteroidObject);

  for(var i = 0; i < 10; i++){
    if(i<5){
      this.treeObject = new GameObject2D(this.multiMesh7);
      this.treeObject.position.set(15 * i + 10, 0, -25 * (3 - i));
      this.gameObjects.push(this.treeObject);
      this.treeObject.scale.y =  this.treeObject.scale.y * 4.0/(i + 1);
    }
    else{
      this.treeObject = new GameObject2D(this.multiMesh7);
      this.treeObject.position.set(-15 * (8 - i) - 30, 0, -25 * (i - 8));
      this.treeObject.scale.y =  this.treeObject.scale.y * (i + 1)/7.0;
      
      this.gameObjects.push(this.treeObject);
    }
    
    this.treeObject.move = function(dt, keysPressed){
      // var distance = Math.pow((Math.pow((scene.heliObject.position.x - this.position.x), 2) + Math.pow((scene.heliObject.position.y - this.position.y), 2) + Math.pow((scene.heliObject.position.z - this.position.z), 2)),.5);
      // if(distance < 45){
      //   scene.heliObject.position.set(0, 50,30);
      // }
    }
  }
  

  //this.gameObjects[1].position.set(0, -10, 0);
  this.gameObjects[1].updateModelTransformation();
  this.gameObjects.push(new GameObject2D(this.mesh));

  this.camera = new PerspectiveCamera();


  //this.lightsource = new Vec4 (10, 15, 10, 1);
  //this.lightsource = new Vec4 (0, this.carObject.position.y + 30, 10, 1);
  this.lightsource = [];
  this.density = [];
  this.l1 = new Vec4(10, 0, 10, 1);
  this.l2 = new Vec4(0,40,0, 1);
  this.l3 = new Vec4(-20, 0, 0, 0);

  this.d1 = new Vec4(0,2,0,1);
  this.d2 = new Vec4(0,0,3,1);
  this.d3 = new Vec4(4,4,4,1);

  this.lightsource.push(this.l1);
  this.lightsource.push(this.l2);
  this.lightsource.push(this.l3);

  this.density.push(this.d1);
  this.density.push(this.d2);
  this.density.push(this.d3);



  gl.enable(gl.DEPTH_TEST);
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Scene.prototype.update = function(gl, keysPressed) {
  //jshint bitwise:false
  //jshint unused:false
  var timeAtThisFrame = new Date().getTime();
  var dt = (timeAtThisFrame - this.timeAtLastFrame) / 1000.0;
  this.timeAtLastFrame = timeAtThisFrame;

  // clear the screen
  gl.clearColor(0.6, 0.0, 0.3, 1.0);
  gl.clearDepth(1.0);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);



  this.camera.move(dt, keysPressed, this.gameObjects);

  


  for(var i=0; i<this.gameObjects.length; i++){
    this.gameObjects[i].move && this.gameObjects[i].move(dt, keysPressed);
    this.gameObjects[i].updateModelTransformation();



  }  
  for(var i=0; i<this.gameObjects.length; i++){

    this.camera.position.x = this.heliObject.position.x - this.camera.ahead.x * 40;
    this.camera.position.y = this.heliObject.position.y + 24 - this.camera.ahead.y * 30;
    this.camera.position.z = this.heliObject.position.z - this.camera.ahead.z * 62;

    //this.camera.position.mul(-.75);

    this.camera.updateViewMatrix();
    this.gameObjects[i].draw(this.camera, this.lightsource, this.density);

  }
};


