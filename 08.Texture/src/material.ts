import { sources } from "webpack";
import { NullCheck } from "./common";

export class Material{
    texture:GPUTexture|null;
    view:GPUTextureView|null;
    sampler:GPUSampler|null;
    constructor(){
        this.texture = null;
        this.view = null;
        this.sampler = null;
    }

    initialize = async (device:GPUDevice, url:string) => {

        const response: Response = await fetch(url);
        //for binary
        const blob: Blob = await response.blob();
        const imageData : ImageBitmap = await createImageBitmap(blob); 

        await this.loadImageBitmap(device, imageData);

        //texture view
        const viewDescriptor: GPUTextureViewDescriptor = {
            format: "bgra8unorm",
            dimension: "2d",
            aspect:"all",
            baseMipLevel:0,
            mipLevelCount:1,
            baseArrayLayer:0,
            arrayLayerCount:1
        };

        this.view = this.texture!.createView(viewDescriptor);

        //sampler
        const samplerDescriptor: GPUSamplerDescriptor ={
            addressModeU: "repeat",
            addressModeW: "repeat",
            magFilter: "linear",
            minFilter: "nearest",
            mipmapFilter: "nearest",
            maxAnisotropy: 1,
        };

        this.sampler = device.createSampler(samplerDescriptor);
    }

    loadImageBitmap = async (device:GPUDevice, imageData:ImageBitmap) =>{
        const textureDescriptor:GPUTextureDescriptor ={
            size:{
                width: imageData.width,
                height: imageData.height
            },
            format: "bgra8unorm",
            usage: GPUTextureUsage.TEXTURE_BINDING | GPUTextureUsage.COPY_DST | GPUTextureUsage.RENDER_ATTACHMENT
        }

        this.texture = device.createTexture(textureDescriptor);
        NullCheck(this.texture);

        device.queue.copyExternalImageToTexture(
            {source:imageData},
            {texture:this.texture},
            textureDescriptor.size
        );
    }
}