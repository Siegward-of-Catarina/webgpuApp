import { TriangleMesh } from "./triangle_mesh";
import { VertColorShader } from "./vertColorShader";
import { SquareMesh } from "./square_mesh";
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

  const mesh: SquareMesh = new SquareMesh(device);
  const shader: VertColorShader = new VertColorShader(device, format);
  //------------------------------

  const commandEncoder: GPUCommandEncoder = device.createCommandEncoder();
  const textureView: GPUTextureView = context.getCurrentTexture().createView();
  const colorAttachment: GPURenderPassColorAttachment = {
    view: textureView,
    clearValue: [0.5, 0.0, 0.25, 1.0],
    loadOp: "clear",
    storeOp: "store",
  };

  const renderpass: GPURenderPassEncoder = commandEncoder.beginRenderPass({
    colorAttachments: [colorAttachment],
  });

  renderpass.setPipeline(shader.pipeline);
  renderpass.setBindGroup(0, shader.bindGroup);
  renderpass.setVertexBuffer(0, mesh.getVertexBuffer());
  renderpass.setIndexBuffer(mesh.getIndexBuffer(), mesh.indexFormat);
  renderpass.drawIndexed(mesh.indexCount);
  renderpass.end();

  device.queue.submit([commandEncoder.finish()]);
};

Initialize();
