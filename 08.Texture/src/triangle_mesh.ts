import { IndexBuffer } from "./indexBuffer";
import { VertexBuffer } from "./vertexBuffer";
import { Mesh } from "./base/mesh_base";
export class TriangleMesh extends Mesh {
  constructor(device: GPUDevice) {
    super();
    // x y z u v
    const vertices: Float32Array = new Float32Array([
      0.0, 0.5, 0.0, 0.5, 0.0,
      -0.5, -0.5, 0.0, 0.0, 1.0,
      0.5, -0.5, 0.0, 1.0, 1.0,
    ]);
    this._vertexBuffer = new VertexBuffer(device, vertices);
    const indices: Uint32Array = new Uint32Array([0, 1, 2]); //バイト数が4の倍数でないとエラーよってUint16Array(2*3=6)だと駄目ですわ
    this._indexCount = indices.length;

    this._indexBuffer = new IndexBuffer(device, indices);
  }
}
