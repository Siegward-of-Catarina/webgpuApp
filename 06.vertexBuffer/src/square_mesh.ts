import { IndexBuffer } from './indexBuffer';
import { VertexBuffer } from "./vertexBuffer";
export class SquareMesh {
  vertexBuffer: VertexBuffer;
  indexBuffer: IndexBuffer;
  indexCount: number;
  indexFormat: GPUIndexFormat = "uint16";
  getVertexBuffer() {
    return this.vertexBuffer.buffer;
  }
  getIndexBuffer() {
    return this.indexBuffer.buffer;
  }
  constructor(device: GPUDevice) {
    // x y r g b
    const vertices: Float32Array = new Float32Array([
      -0.5, 0.5, 1.0, 0.0, 0.0,
      -0.5, -0.5, 0.0, 1.0, 0.0,
      0.5, 0.5, 0.0, 0.0, 1.0,
      0.5, -0.5, 1.0, 0.0, 0.0,
    ]);
    this.vertexBuffer = new VertexBuffer(device, vertices);

    const indices: Uint16Array = new Uint16Array([
      0, 1, 2,
      2, 1, 3
    ]);
    this.indexCount = indices.length;

    this.indexBuffer = new IndexBuffer(device, indices);
  }
}
