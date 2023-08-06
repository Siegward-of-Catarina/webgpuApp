import { Mesh } from "./base/mesh_base";
import { Shader } from "./base/shader_base";
import { TriangleMesh } from "./triangle_mesh";
import { SquareMesh } from "./square_mesh";
import { VertColorShader } from "./vertColorShader";
import { TransformShader } from "./TransformShader";
import { NullCheck } from './common';
import { mat4 } from "gl-matrix";

export class Renderer {
  canvas: HTMLCanvasElement;

  //GPU
  adapter: GPUAdapter | null;
  device: GPUDevice | null;
  context: GPUCanvasContext | null;
  format: GPUTextureFormat | null;

  //pipelineOBJ
  uniformBuffer: GPUBuffer | null;
  bindGroup: GPUBindGroup | null;
  pipeline: GPURenderPipeline | null;

  //Assets
  mesh: Mesh | null
  shader: Shader | null;
  time: number;
  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.adapter = null;
    this.device = null;
    this.context = null;
    this.format = null;
    this.uniformBuffer = null;
    this.bindGroup = null;
    this.pipeline = null;
    this.mesh = null;
    this.shader = null;

    this.time = 0.0;
  }

  Initialize = async () => {
    //device & context
    await this.setupDevice();

    this.createAssets();

    await this.makePipeline();
    //render
    this.render();

  }

  setupDevice = async () => {
    this.adapter = (await navigator.gpu?.requestAdapter()) as GPUAdapter;
    NullCheck(this.adapter);

    this.device = (await this.adapter.requestDevice()) as GPUDevice;
    NullCheck(this.device);

    this.context = this.canvas.getContext("webgpu") as GPUCanvasContext;
    NullCheck(this.context);

    this.format = "bgra8unorm";

    this.context.configure({
      device: this.device,
      format: this.format,
      alphaMode: "opaque",
    });
  }

  createAssets = () => {
    this.mesh = new SquareMesh(this.device!);
    this.shader = new TransformShader(this.device!);
  }

  makePipeline = async () => {

    this.uniformBuffer = this.device!.createBuffer({
      size: 64 * 3,
      usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
    });

    const bindGroupLayout = this.device!.createBindGroupLayout({
      entries: [
        {
          binding: 0,
          visibility: GPUShaderStage.VERTEX,
          buffer: {},
        }
      ],
    });

    this.bindGroup = this.device!.createBindGroup({
      layout: bindGroupLayout,
      entries: [
        {
          binding: 0,
          resource: {
            buffer: this.uniformBuffer,
          },
        }
      ],
    });
    NullCheck(this.bindGroup);

    const pipelineLayout = this.device!.createPipelineLayout({
      bindGroupLayouts: [bindGroupLayout],
    });

    this.pipeline = this.device!.createRenderPipeline({
      vertex: {
        module: this.shader!.module,
        entryPoint: this.shader!.entryPoint.Vertex,
        buffers: [this.shader!.bufferLayout],
      },

      fragment: {
        module: this.shader!.module,
        entryPoint: this.shader!.entryPoint.Fragment,
        targets: [{ format: this.format! }],
      },

      primitive: {
        topology: "triangle-list",
      },

      layout: pipelineLayout,
    });
    NullCheck(this.pipeline);
  }

  render = () => {

    //======== matrix =================================
    const projection = mat4.create();
    mat4.perspective(
      projection, (Math.PI / 4),
      (this.canvas.width / this.canvas.height),
      0.1, 10);

    const view = mat4.create();
    mat4.lookAt(view, [0, 1, -2], [0, 0, 0], [0, 1, 0]);

    const model = mat4.create();
    //multiply
    mat4.translate(model, model, [Math.sin(this.time), 0, 0]);
    mat4.rotate(model, model, this.time, [0, 1, 0]);
    this.device!.queue.writeBuffer(this.uniformBuffer!, 0, <ArrayBuffer>model);
    this.device!.queue.writeBuffer(this.uniformBuffer!, 64, <ArrayBuffer>view);
    this.device!.queue.writeBuffer(this.uniformBuffer!, 128, <ArrayBuffer>projection);
    //================================================================================

    const commandEncoder: GPUCommandEncoder = this.device!.createCommandEncoder();

    const textureView: GPUTextureView = this.context!.getCurrentTexture().createView();

    const discriptor: GPURenderPassDescriptor = {
      colorAttachments: [
        {
          view: textureView,
          clearValue: [0.5, 0.0, 0.25, 1.0],
          loadOp: "clear",
          storeOp: "store",
        },
      ],
    };
    const renderpass: GPURenderPassEncoder = commandEncoder.beginRenderPass(discriptor);

    renderpass.setPipeline(this.pipeline!);
    renderpass.setBindGroup(0, this.bindGroup!);
    renderpass.setVertexBuffer(0, this.mesh!.vertexBuffer);
    renderpass.setIndexBuffer(this.mesh!.indexBuffer, this.mesh!.indexFormat);
    renderpass.drawIndexed(this.mesh!.indexCount);
    renderpass.end();

    this.device!.queue.submit([commandEncoder.finish()]);

    //================ render loop ==================
    this.time += 0.01;
    if (this.time > 2.0 * Math.PI) {
      this.time -= 2.0 * Math.PI;
    }
    requestAnimationFrame(this.render);
    //===============================================
  }
}
