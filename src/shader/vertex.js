export default `uniform float time;
uniform float progress;
// uniform float dataArray[512];
uniform float lowerMaxFr;
uniform float lowerAvgFr;
uniform float upperAvgFr;
varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vNormal;
varying vec3 vEye;
uniform vec2 pixels;
uniform float distortion;
uniform float scale;
uniform vec3 axis;
uniform vec3 axis2;
uniform float speed;
float PI = 3.141592653589793238;
mat4 rotationMatrix(vec3 axis, float angle) {
    axis = normalize(axis);
    float s = sin(angle);
    float c = cos(angle);
    float oc = 1.0 - c;
    
    return mat4((oc * axis.x * axis.x + c) * lowerMaxFr,           (oc * axis.x * axis.y - axis.z * s) * lowerMaxFr,  (oc * axis.z * axis.x + axis.y * s) * lowerMaxFr,  0.0,
                (oc * axis.x * axis.y + axis.z * s) * lowerAvgFr * 0.1,  (oc * axis.y * axis.y + c) * lowerAvgFr,           (oc * axis.y * axis.z - axis.x * s) * lowerMaxFr,  0.0,
                (oc * axis.z * axis.x - axis.y * s) * upperAvgFr * 0.5,  (oc * axis.y * axis.z + axis.x * s) * upperAvgFr,  oc * axis.z * axis.z + c * upperAvgFr,           0.0,
                0.0,                                0.0,                                0.0,                                1.0);
}

vec3 rotate(vec3 v, vec3 axis, float angle) {
	mat4 m = rotationMatrix(axis, angle);
	return (m * vec4(v, 1.0)).xyz;
}
float qinticInOut(float t) {
  return t < 0.5
    ? +16.0 * pow(t, 5.0)
    : -0.5 * abs(pow(2.0 * t - 2.0, 5.0)) + 1.0;
}
void main() {
  vUv = uv;
  float norm = 4.;
  // norm = 0.5;
  vec3 newpos = position;
  // float offset = ( dot(axis2,position) +norm/2.)/norm;
  float offset = ( dot(vec3(1.,0.,0.),position) +norm/2.)/norm;

  float localprogress = clamp( (fract(time*speed * upperAvgFr) - scale*distortion*offset)/(1. - 0.01*distortion),0.,1.); 

  localprogress = qinticInOut(localprogress)*PI;


  newpos = rotate(newpos,axis,localprogress);
  vec3 newnormal = rotate(normal,axis,localprogress);

  vNormal = normalMatrix*newnormal * lowerMaxFr;
  vec4 worldPosition = modelMatrix * vec4( newpos, 1.0) * upperAvgFr;
  vEye = normalize(worldPosition.xyz - cameraPosition);
  gl_Position = projectionMatrix * modelViewMatrix * vec4( newpos, 1.0 );
  vPosition = newpos * lowerMaxFr;
}`
