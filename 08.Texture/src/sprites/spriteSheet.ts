import { vec2 } from 'gl-matrix';
import { ImageData } from "./image";
export class SpriteSheet extends ImageData
{
    chipSize: vec2;
    constructor(chipsize: vec2)
    {
        super();
        this.chipSize = chipsize;
    }
}