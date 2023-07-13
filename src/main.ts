import { CheckWebGPU } from "./helper";
import { shader } from './shader.wgsl';
import "./site.css";

const CreateTriangle = async () =>{
    const checkgpu = CheckWebGPU();
    if( checkgpu.includes('Your current Browser does not support WebGPU!')){
        console.log(checkgpu);
        throw('Your current Browser does not support WebGPU!');
    }

    const canvas = document.getElementById('canvas-webgpu') as HTMLCanvasElement;
    const adapter = await navigator.gpu?.requestAdapter() as GPUAdapter;
    const device = await adapter?.requestDevice() as GPUDevice;
    const context = canvas.getContext('webgpu') as GPUCanvasContext;
    const format = navigator.gpu?.getPreferredCanvasFormat();
    context.configure({
        device: device,
        format: format,
    });
}
