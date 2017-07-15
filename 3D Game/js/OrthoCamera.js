var OrthoCamera = function() {
  this.position = new Vec2(0.5, 0);
  this.rotation = 0;
  this.windowSize = new Vec2(100, 100);

  this.viewMatrix = new Mat4();
  this.updateViewMatrix();
  this.projMatrix = new Mat4();  

};

OrthoCamera.prototype.updateViewMatrix = function(){
  this.viewMatrix.set().
    scale(this.windowSize).
    rotate(this.rotation).
    translate(this.position).
    invert();
};

OrthoCamera.prototype.setAspectRatio = function(ar)
{
  this.windowSize.x = this.windowSize.y * ar;
};

