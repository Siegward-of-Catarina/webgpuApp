import { NullCheck } from "../common";
import { IndexBuffer } from '../model/indexBuffer';
import { VertexBuffer } from "../model/vertexBuffer";

export abstract class Mesh {
  protected _vertexBuffer: VertexBuffer | null;
  protected _indexBuffer: IndexBuffer | null;
  protected _indexCount: number | null;
  private _indexFormat: GPUIndexFormat;
  constructor() {
    this._vertexBuffer = null;
    this._indexBuffer = null;
    this._indexCount = null;
    this._indexFormat = "uint32"
  }
  get vertexBuffer(): GPUBuffer {
    NullCheck(this._vertexBuffer);
    return this._vertexBuffer!.buffer;
  }
  get indexBuffer(): GPUBuffer {
    NullCheck(this._indexBuffer);
    return this._indexBuffer!.buffer;
  }
  get indexCount(): number {
    NullCheck(this._indexCount);
    return this._indexCount!;
  }

  get indexFormat(): GPUIndexFormat {
    return this._indexFormat;
  }
}