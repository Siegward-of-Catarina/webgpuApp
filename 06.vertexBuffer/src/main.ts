import shader from "./shaders/shaders.wgsl";
import { TriangleMesh } from "./triangle_mesh";
const Initialize = async () => {
  const canvas: HTMLCanvasElement = document.getElementById(
    "gfx-main"
  ) as HTMLCanvasElement;
  const adapter: GPUAdapter =
    (await navigator.gpu?.requestAdapter()) as GPUAdapter;
  const device: GPUDevice = (await adapter?.requestDevice()) as GPUDevice;
  const context: GPUCanvasContext = canvas.getContext(
    "webgpu"
  ) as GPUCanvasContext;
  const format: GPUTextureFormat = "bgra8unorm";
  context.configure({
    device: device,
    format: format,
    alphaMode: "opaque",
  });

  const triangleMesh: TriangleMesh = new TriangleMesh(device);

  const bindGroupLayout = device.createBindGroupLayout({
    entries: [],
  });

  const bindGroup = device.createBindGroup({
    layout: bindGroupLayout,
    entries: [],
  });

  const pipelineLayout = device.createPipelineLayout({
    bindGroupLayouts: [bindGroupLayout],
  });

  const shaderModule: GPUShaderModule = device.createShaderModule({
    code: shader,
  });
  const pipeline = device.createRenderPipeline({
    vertex: {
      module: shaderModule,
      entryPoint: "vs_main",
      buffers: [triangleMesh.bufferLayout],
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

  const commandEncoder: GPUCommandEncoder = device.createCommandEncoder();
  const textureView: GPUTextureView = context.getCurrentTexture().createView();
  const renderpass: GPURenderPassEncoder = commandEncoder.beginRenderPass({
    colorAttachments: [
      {
        view: textureView,
        clearValue: [0.5, 0.0, 0.25, 1.0],
        loadOp: "clear",
        storeOp: "store",
      },
    ],
  });

  renderpass.setPipeline(pipeline);
  renderpass.setBindGroup(0, bindGroup);
  renderpass.setVertexBuffer(0, triangleMesh.buffer);
  renderpass.draw(3, 1, 0, 0);
  renderpass.end();

  device.queue.submit([commandEncoder.finish()]);
};

Initialize();
