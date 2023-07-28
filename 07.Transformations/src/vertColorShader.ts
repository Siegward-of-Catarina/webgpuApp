import shader from "./shaders/shaders.wgsl";

export class VertColorShader {
  Module: GPUShaderModule;
  bufferLayout: GPUVertexBufferLayout;
  entryPoint = {
    Vertex: "vs_main",
    Fragment: "fs_main",
  };
  constructor(device: GPUDevice) {
    //↓vertColorShader class

    this.Module = device.createShaderModule({
      code: shader,
    });

    this.bufferLayout = {
      arrayStride: 20,
      attributes: [
        {
          shaderLocation: 0,
          format: "float32x2",
          offset: 0,
        },
        {
          shaderLocation: 1,
          format: "float32x3",
          offset: 8,
        },
      ],
    };
  }
}
