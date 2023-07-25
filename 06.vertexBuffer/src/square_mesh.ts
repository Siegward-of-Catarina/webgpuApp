import { VertexBuffer } from "./vertexBuffer";
export class SquareMesh {
  v_Buffer: VertexBuffer;
  GPUBuffer() {
    return this.v_Buffer.buffer;
  }
  constructor(device: GPUDevice) {
    // x y r g b
    const vertices: Float32Array = new Float32Array([
      -0.5, 0.5, 1.0, 0.0, 0.0, -0.5, -0.5, 0.0, 1.0, 0.0, 0.5, 0.5, 0.0, 0.0,
      1.0,

      0.5, 0.5, 0.0, 0.0, 1.0, -0.5, -0.5, 0.0, 0.0, 1.0, 0.5, -0.5, 0.0, 0.0,
      1.0,
    ]);
    this.v_Buffer = new VertexBuffer(device, vertices);
  }
}
