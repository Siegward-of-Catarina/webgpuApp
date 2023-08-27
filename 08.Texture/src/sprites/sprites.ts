import { vec2 } from "gl-matrix";
import { Texture } from "./texture";
import { Mesh } from "../base/mesh_base";
import { SquareMesh } from "../square_mesh";
import { SpriteSheet } from "./spriteSheet";

export class Sprites
{
    texture: Texture;
    num: number;
    Plate: Mesh[];
    playTime: number[];
    image: SpriteSheet;
    range: vec2;
    private _currentNumber: number;
    private _animSpeed: number;
    private _animTime: number;
    private _totalTime: number;
    constructor(chipsize: vec2, chipNum: number, colm: number, row: number)
    {
        this.texture = new Texture;
        this.image = new SpriteSheet(chipsize);
        this.num = chipNum;
        this.range = [colm, row];
        this.Plate = Array<SquareMesh>(this.num);
        this.playTime = Array<number>(this.num);
        this._currentNumber = 0;
        this._animSpeed = 1;
        this._animTime = 0;
        this._totalTime = 0;
    }
    async createSprites(device: GPUDevice, imgUrl: string, startIndex: vec2)
    {

        await this.image.loadImage(imgUrl);

        this.texture.createTexture(device, this.image.data!);

        const colm = this.range[0];
        const row = this.range[1];
        var size: vec2 = this.image.chipSize;
        var i = 0;
        for (var r = 0; r < row; r++)
        {
            for (var c = 0; c < colm; c++)
            {
                if (i >= this.num) { break; }
                var dataOffset: vec2 = [startIndex[0] * size[0], startIndex[1] * size[1]];
                var pos: vec2 = [
                    size[0] * c + dataOffset[0],
                    size[1] * r + dataOffset[1]
                ];
                this.Plate![c + colm * r] = new SquareMesh(device, pos, [size[0], size[1]]);
                this.playTime[i] = 20;
                this._totalTime += this.playTime[i];
                this.playTime[i] = this._totalTime;
                ++i;
            }
        }
        //切り替え間隔指定　ふぁいるから1チップごとにデータを決めて読み込みたい
        //それなら上のずらす計算も必要ないよね。
        /*this.playTime[0] = 2;
        this._totalTime += this.playTime[0];
        this.playTime[0] = this._totalTime;

        this.playTime[1] = 14;
        this._totalTime += this.playTime[1];
        this.playTime[1] = this._totalTime;

        this.playTime[2] = 2;
        this._totalTime += this.playTime[2];
        this.playTime[2] = this._totalTime;

        this.playTime[3] = 14;
        this._totalTime += this.playTime[3];
        this.playTime[3] = this._totalTime;*/
    }
    count = 0;
    animStart(time: number)
    {
        this._animTime += time * this._animSpeed;
        if (this._animTime >= this._totalTime)
        {
            var t = Math.floor(this._animTime / this._totalTime);
            this._animTime = this._animTime - t * this._totalTime;
            this._currentNumber = 0;
            //console.log("end" + this._currentNumber);
            return true;
        }
        var i;
        for (i = this._currentNumber; i < this.num; i++)
        {
            if (this._animTime < this.playTime[i]) break;
        }
        this._currentNumber = i;
    }

    get currentBuffer(): GPUBuffer
    {
        return this.Plate[this._currentNumber].vertexBuffer;
    }
}