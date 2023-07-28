import { IndexBuffer } from "./indexBuffer";
import { VertexBuffer } from "./vertexBuffer";
export class TriangleMesh {
  vertexBuffer: VertexBuffer;
  indexBuffer: IndexBuffer;
  indexCount: number;
  indexFormat: GPUIndexFormat = "uint32";
  getVertexBuffer() {
    return this.vertexBuffer.buffer;
  }
  getIndexBuffer() {
    return this.indexBuffer.buffer;
  }
  constructor(device: GPUDevice) {
    // x y r g b
    const vertices: Float32Array = new Float32Array([
      0.0, 0.5, 1.0, 0.0, 0.0, -0.5, -0.5, 0.0, 1.0, 0.0, 0.5, -0.5, 0.0, 0.0,
      1.0,
    ]);
    this.vertexBuffer = new VertexBuffer(device, vertices);
    const indices: Uint32Array = new Uint32Array([0, 1, 2]); //バイト数が4の倍数でないとエラーよってUint16Array(2*3=6)だと駄目ですわ
    this.indexCount = indices.length;

    this.indexBuffer = new IndexBuffer(device, indices);
  }
}
