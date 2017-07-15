var GameObject2D = function(mesh) {
  this.mesh = mesh;
  this.velocity = new Vec3(0,0,0);
  this.acceleration = new Vec3(0,0,0);
  this.position = new Vec3(0, 0, 0);
  this.angularVelocity = new Vec2(0,0);
  this.orientation = 0;
  this.yaw = 0;
  this.pitch = 0;
  this.roll = 0;
  this.scale = new Vec3(1, 1, 1);
  this.modelMatrix = new Mat4();
  //this.texScale = new Vec2(0,0);
  this.updateModelTransformation();

  this.parent = undefined;
};

GameObject2D.prototype.updateModelTransformation = function(){
  this.modelMatrix.set().
    scale(this.scale).
    rotate(this.orientation, this.pitch, this.yaw, this.roll).
    translate(this.position);
  if(this.parent !== undefined) {
    this.parent.updateModelTransformation();
    this.modelMatrix.mul(parent.modelMatrix);
  }
};

GameObject2D.prototype.draw = function(camera, lightsource, density){
  Material.shared.modelViewProjMatrix.set().
    mul(this.modelMatrix).
    mul(camera.viewProjMatrix);

  Material.shared.modelMatrix.set(this.modelMatrix);
  Material.shared.modelMatrixInverse.set(this.modelMatrix).invert();
  
  for(var i = 0; i<3; i++){
    Material.shared.lightpos[i].set(lightsource[i]);
  }
  
  for(var i = 0; i<3; i++){
    Material.shared.lightpowerdensity[i].set(density[i]);
  }

  Material.shared.view.set(camera.position);
  Material.shared.rayDirMatrix.set(camera.rayDirMatrix);


  
  this.mesh.draw();
};

