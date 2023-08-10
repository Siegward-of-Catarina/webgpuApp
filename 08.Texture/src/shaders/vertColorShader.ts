import { Shader } from "../base/shader_base";
import shader from "../shaderSource/shaders.wgsl";

export class VertColorShader extends Shader {
  constructor(device: GPUDevice) {
    super();

    this._module = device.createShaderModule({
      code: shader,
    });

    this._bufferLayout = {
      arrayStride: 24,
      attributes: [
        {
          shaderLocation: 0,
          format: "float32x3",
          offset: 0,
        },
        {
          shaderLocation: 1,
          format: "float32x3",
          offset: 12,
        },
      ],
    };
  }
}