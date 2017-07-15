var MultiMesh = function(gl, jsonModelFileUrl, materials) {
  this.gl = gl;
  this.meshes = [];
  this.materials = materials;
  this.request = new XMLHttpRequest();
  this.request.open("GET", jsonModelFileUrl);
  var theMultiMesh = this;
  this.request.onreadystatechange = function(){ theMultiMesh.loaded(); };
  this.request.send();
};

MultiMesh.prototype.loaded = function() {
  if (this.request.readyState === 4) {
    var meshesJson = JSON.parse(this.request.responseText).meshes;
    var theMultiMesh = this;
    for (var i = meshesJson.length - 1; i >= 0; i--) {
      theMultiMesh.meshes.push(
        new Mesh(
          new IndexedTrianglesGeometry(theMultiMesh.gl, meshesJson[i]),
          theMultiMesh.materials[i]
        )
      );
    }
  }
};

MultiMesh.prototype.draw = function(){
  for (var i = this.meshes.length - 1; i >= 0; i--) {
    this.meshes[i].draw();
  }
};


