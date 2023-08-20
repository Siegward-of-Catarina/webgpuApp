import { NullCheck } from "../common";

export abstract class Shader {
  protected _module: GPUShaderModule | null;
  protected _bufferLayout: GPUVertexBufferLayout | null;
  protected _entryPoint;
  constructor() {
    this._module = null;
    this._bufferLayout = null;
    this._entryPoint = {
      Vertex: "vs_main",
      Fragment: "fs_main",
    };
  }

  get module(): GPUShaderModule {
    NullCheck(this._module);
    return this._module!;
  }

  get bufferLayout(): GPUVertexBufferLayout {
    NullCheck(this._bufferLayout);
    return this._bufferLayout!;
  }

  get entryPoint() {
    return this._entryPoint;
  }
}