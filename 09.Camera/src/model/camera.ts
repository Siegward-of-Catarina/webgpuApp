import { vec3, mat4 } from "gl-matrix";
import { Deg2Rad } from "./math_stuff";

export class Camera {
    private _position: vec3;
    private _eulers: vec3;
    private _view: mat4 | null;
    private _forwards: vec3;
    private _right: vec3;
    private _up: vec3;
    constructor(position:vec3, theta: number, phi: number ){
        this._position = position;
        this._eulers = vec3.create();
        this._eulers = [ 0, phi, theta ];
        this._view = null;
        this._forwards = vec3.create();
        this._right = vec3.create();
        this._up = vec3.create();
    }

    update = () =>{
        this. _forwards = [
            Math.sin(Deg2Rad(this._eulers[2])) * Math.cos(Deg2Rad(this._eulers[1])),
            Math.sin(Deg2Rad(this._eulers[1])),
            Math.cos(Deg2Rad(this._eulers[2])) * Math.cos(Deg2Rad(this._eulers[1])),
        ];
        vec3.cross(this._right, [0,1,0], this._forwards );
        vec3.cross(this._up, this._forwards, this._right);
        var target:vec3 = vec3.create();
        //位置ベクトル　＋　方向ベクトル的な考え方
        vec3.add( target, this._forwards, this._position);
        this._view = mat4.create();
        mat4.lookAt(this._view, this._position, target, this._up);
    }

    get view(): mat4{
        return this._view!;
    }
}