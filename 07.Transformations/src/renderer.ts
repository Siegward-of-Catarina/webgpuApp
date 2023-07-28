import { TriangleMesh } from "../../06.vertexBuffer/src/triangle_mesh";
import { VertColorShader } from "../../06.vertexBuffer/src/vertColorShader";
export class Renderer {
  canvas: HTMLCanvasElement;

  //GPU
  adapter: GPUAdapter;
  device: GPUDevice;
  context: GPUCanvasContext;
  format: GPUTextureFormat;

  //pipelineOBJ
  bindGroup: GPUBindGroup;
  pipeline: GPURenderPipeline;

  //Assets
  mesh: TriangleMesh;
  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
  }
  Initialize = async () => {
    //device & context
    this.adapter = (await navigator.gpu?.requestAdapter()) as GPUAdapter;
    this.device = (await adapter?.requestDevice()) as GPUDevice;
    this.context = canvas.getContext("webgpu") as GPUCanvasContext;
    this.format = "bgra8unorm";
    context.configure({
      device: device,
      format: format,
      alphaMode: "opaque",
    });

    //Assets
    this.mesh = new TriangleMesh(device);
    const shader: VertColorShader = new VertColorShader(this.device);

    //pipeline
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

    this.pipeline = device.createRenderPipeline({
      vertex: {
        module: shader.Module,
        entryPoint: shader.entryPoint.Vertex,
        buffers: [shader.bufferLayout],
      },

      fragment: {
        module: shader.Module,
        entryPoint: shader.entryPoint.Fragment,
        targets: [{ format: format }],
      },

      primitive: {
        topology: "triangle-list",
      },

      layout: pipelineLayout,
    });
    //render
    const commandEncoder: GPUCommandEncoder = device.createCommandEncoder();
    const textureView: GPUTextureView = context
      .getCurrentTexture()
      .createView();
    const discriptor = {
      colorAttachments: [
        {
          view: textureView,
          clearValue: [0.5, 0.0, 0.25, 1.0],
          loadOp: "clear",
          storeOp: "store",
        },
      ],
    };
    const renderpass: GPURenderPassEncoder =
      commandEncoder.beginRenderPass(discriptor);
  };
}
