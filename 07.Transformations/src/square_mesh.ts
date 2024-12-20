import { IndexBuffer } from "./indexBuffer";
import { VertexBuffer } from "./vertexBuffer";
import { Mesh } from "./base/mesh_base";
export class SquareMesh extends Mesh {
  constructor(device: GPUDevice) {
    super();
    // x y r g b
    const vertices: Float32Array = new Float32Array([
      -0.5, 0.5, 0.0, 1.0, 0.0, 0.0,
      -0.5, -0.5, 0.0, 0.0, 1.0, 0.0,
      0.5, 0.5, 0.0, 0.0, 0.0, 1.0,
      0.5, -0.5, 0.0, 1.0, 0.0, 0.0,
    ]);
    this._vertexBuffer = new VertexBuffer(device, vertices);

    const indices: Uint32Array = new Uint32Array([0, 1, 2, 2, 1, 3]);
    this._indexCount = indices.length;

    this._indexBuffer = new IndexBuffer(device, indices);
  }
}
