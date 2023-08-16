import { Mesh } from "../base/mesh_base";
import { Shader } from "../base/shader_base";
import { TriangleMesh } from "./triangle_mesh";
import { SquareMesh } from "./square_mesh";
import { VertColorShader } from "./shaders/vertColorShader";
import { TransformShader } from "./shaders/transformShader";
import { TextureShader } from "./shaders/textureShader";
import { mat4 } from "gl-matrix";
import { Material } from './material';
import { NullCheck } from "../common";
import { Camera } from "../model/camera";
import { Triangle } from "../model/triangle";

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
  mesh: Mesh | null;
  material: Material | null;
  shader: Shader | null;

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
    this.material = null;
    this.shader = null;
  }

  Initialize = async () => {
    //device & context
    await this.setupDevice();

    await this.createAssets();

    await this.makePipeline();
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

  createAssets = async () => {
    this.mesh = new SquareMesh(this.device!);
    this.material = new Material();
    await this.material.initialize(this.device!, "dist/img/sacabambaspis.png");
    this.shader = new TextureShader(this.device!);
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
        },
        {
          binding: 1,
          visibility: GPUShaderStage.FRAGMENT,
          texture: {},
        },
        {
          binding: 2,
          visibility: GPUShaderStage.FRAGMENT,
          sampler: {},
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
        },
        {
          binding: 1,
          resource: this.material!.view!,
        },
        {
          binding: 2,
          resource: this.material!.sampler!,
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
        targets: [{ 
          format: this.format!,
          blend:{
            color:{
              srcFactor: "src-alpha",
              dstFactor: "one-minus-src-alpha",
              operation: "add",
            },
            alpha:{
              srcFactor: "one",
              dstFactor: "one-minus-src-alpha",
              operation: "add",
            }
          }
        }],
      },

      primitive: {
        topology: "triangle-list",
      },

      layout: pipelineLayout,
    });
    NullCheck(this.pipeline);
  }

  render = async (camera:Camera, triangles: Triangle[]) => {

    //======== matrix =================================
    const projection = mat4.create();
    mat4.perspective(
      projection, (Math.PI / 4),
      (this.canvas.width / this.canvas.height),
      0.1, 10);

    //const view = mat4.create();
    //mat4.lookAt(view, [0, 1, -2], [0, 0, 0], [0, 1, 0]);
    //console.log("renderer view:" + view);
    const view = camera.view;
    //multiply
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
    renderpass.setVertexBuffer(0, this.mesh!.vertexBuffer);
    renderpass.setIndexBuffer(this.mesh!.indexBuffer, this.mesh!.indexFormat);

    triangles.forEach(
      (triangle) => {
        //const model:mat4 = triangle.model;
        
      }
    )
    
    const model = triangles[0].model;
    this.device!.queue.writeBuffer(this.uniformBuffer!, 0, <ArrayBuffer>model);
    
    renderpass.setBindGroup(0, this.bindGroup!);
    renderpass.drawIndexed(this.mesh!.indexCount);

    renderpass.end();

    this.device!.queue.submit([commandEncoder.finish()]);
  }
}