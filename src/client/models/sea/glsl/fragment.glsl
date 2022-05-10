precision mediump float;

varying vec2 vUv;
uniform vec3 seaColor;

void main() {
  gl_FragColor = vec4(seaColor, 1.);
}