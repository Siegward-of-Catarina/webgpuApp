import shader from "./shaders/shaders.wgsl";

export class VertColorShader {
  bindGroup;
  pipeline;
  constructor(device: GPUDevice, format: GPUTextureFormat) {
    //↓vertColorShader class
    const bindGroupLayout = device.createBindGroupLayout({
      entries: [],
    });

    this.bindGroup = device.createBindGroup({
      layout: bindGroupLayout,
      entries: [],
    });

    const pipelineLayout = device.createPipelineLayout({
      bindGroupLayouts: [bindGroupLayout],
    });

    const shaderModule: GPUShaderModule = device.createShaderModule({
      code: shader,
    });

    const bufferLayout: GPUVertexBufferLayout = {
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

    this.pipeline = device.createRenderPipeline({
      vertex: {
        module: shaderModule,
        entryPoint: "vs_main",
        buffers: [bufferLayout],
      },

      fragment: {
        module: shaderModule,
        entryPoint: "fs_main",
        targets: [{ format: format }],
      },

      primitive: {
        topology: "triangle-list",
      },

      layout: pipelineLayout,
    });
  }
}
