import { Mesh } from "./base/mesh_base";
import { Shader } from "./base/shader_base";
import { TriangleMesh } from "./triangle_mesh";
import { SquareMesh } from "./square_mesh";
import { VertColorShader } from "./shaders/vertColorShader";
import { TransformShader } from "./shaders/transformShader";
import { TextureShader } from "./shaders/textureShader";
import { mat4, vec2 } from "gl-matrix";
import { Material } from './material';
import { NullCheck } from "./common";
import { Sprites } from "./sprites/sprites";

class ImageData
{
  posUV: vec2;
  size: vec2;
  constructor(pos: vec2)
  {
    this.posUV = pos;
    this.size = [0.25, 0.25];
  }
}
export class Renderer
{
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
  mesh2: Mesh | null;
  sprites: Sprites | null;
  material: Material | null;
  shader: Shader | null;
  time: number;
  lastLoop: number;
  deltaTime: number;
  frame: number;
  imageData: ImageData[];
  numImage: number;
  constructor(canvas: HTMLCanvasElement)
  {
    this.canvas = canvas;
    this.adapter = null;
    this.device = null;
    this.context = null;
    this.format = null;
    this.uniformBuffer = null;
    this.bindGroup = null;
    this.pipeline = null;
    this.mesh = null;
    this.mesh2 = null;
    this.sprites = null;
    this.material = null;
    this.shader = null;

    this.time = 0;
    this.lastLoop = Date.now();
    this.deltaTime = 0;

    this.frame = 0;
    this.numImage = 4;
    this.imageData = new Array(4);
  }

  async Initialize()
  {
    //device & context
    await this.setupDevice();

    await this.createAssets();

    await this.makePipeline();
    //render
    this.render();

  }

  async setupDevice()
  {
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

  async createAssets()
  {
    const imgsize = 0.25;
    this.mesh = new SquareMesh(this.device!, [0, 0], [imgsize, imgsize]);
    this.mesh2 = new SquareMesh(this.device!, [imgsize, 0], [imgsize, imgsize]);

    var chipW = 64 / 1024;
    var chipH = 64 / 1024;
    this.sprites = new Sprites([chipW, chipH], 256, 16, 16);
    await this.sprites.createSprites(
      this.device!,
      "dist/img/ears.png",
      [0, 0]);

    this.shader = new TextureShader(this.device!);
  }

  async makePipeline()
  {

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
          resource: this.sprites!.texture.view!,
        },
        {
          binding: 2,
          resource: this.sprites!.texture.sampler!,
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
          blend: {
            color: {
              srcFactor: "src-alpha",
              dstFactor: "one-minus-src-alpha",
              operation: "add",
            },
            alpha: {
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

  render = () =>
  {

    //======== matrix =================================
    const projection = mat4.create();
    const aspect: number = (this.canvas.width / this.canvas.height);
    mat4.perspective(
      projection, (Math.PI / 4),
      aspect,
      0.1, 10);

    const view = mat4.create();
    mat4.lookAt(view, [0, 1, -2], [0, 0, 0], [0, 1, 0]);

    const model = mat4.create();
    //multiply
    //mat4.translate(model, model, [Math.sin(this.time), Math.sin(this.time * 2) * 0.25, 0]);
    const rt = Math.sin(this.time / 1.9) * 0.5 + 0.5;
    // mat4.rotate(model, model, rt * 6.28, [0, 1, 0]);
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

    //this.frame = Math.floor(Math.floor(this.time * 100) / this.sprites!.playTime[this.frame] % this.sprites!.num);
    //console.log("frame: " + this.sprites!.frame[this.frame]);
    this.sprites!.animStart(this.deltaTime);
    renderpass.setVertexBuffer(0, this.sprites!.currentBuffer);
    renderpass.setIndexBuffer(this.mesh!.indexBuffer, this.mesh!.indexFormat);
    renderpass.drawIndexed(this.mesh!.indexCount);
    renderpass.end();

    this.device!.queue.submit([commandEncoder.finish()]);

    //================ render loop ==================
    var now: number = Date.now();
    if (now - this.lastLoop < 100) this.deltaTime = now - this.lastLoop;
    this.lastLoop = now;
    this.time += 0.001 * this.deltaTime;
    if (this.time > 2.0 * Math.PI)
    {
      //this.time -= 2.0 * Math.PI;
    }
    requestAnimationFrame(this.render);
    //===============================================
  }
}
