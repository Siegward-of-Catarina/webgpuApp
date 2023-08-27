import { IndexBuffer } from "./indexBuffer";
import { VertexBuffer } from "./vertexBuffer";
import { Mesh } from "./base/mesh_base";
import { vec2 } from "gl-matrix";
export class SquareMesh extends Mesh
{
  constructor(device: GPUDevice, origin: vec2, size: vec2)
  {
    super();
    // x y z u v
    const vertices = new Float32Array([
      -0.5, 0.5, 0.0, origin[0], origin[1],
      -0.5, -0.5, 0.0, origin[0], origin[1] + size[1],
      0.5, 0.5, 0.0, origin[0] + size[0], origin[1],
      0.5, -0.5, 0.0, origin[0] + size[0], origin[1] + size[1],
    ]);
    this._vertexBuffer = new VertexBuffer(device, vertices);

    const indices: Uint32Array = new Uint32Array([0, 1, 2, 2, 1, 3]);
    this._indexCount = indices.length;

    this._indexBuffer = new IndexBuffer(device, indices);
  }
}
