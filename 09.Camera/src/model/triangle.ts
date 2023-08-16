import { vec3, mat4 } from "gl-matrix";
import { Deg2Rad } from "./math_stuff";

export class Triangle{
    private position: vec3;
    private eulers: vec3;
    private _model: mat4 | null;
    constructor(position:vec3, theta: number ){
        this.position = position;
        this.eulers = vec3.create();
        this.eulers[2] = theta;
        this._model = null;
    }

    update = () =>{
        this.eulers[2] += 1;
        this.eulers[2] %= 360;

        this._model = mat4.create();
        mat4.translate(this._model, this._model, this.position);
        mat4.rotateY(this._model, this._model,Deg2Rad(this.eulers[2]));
    }

    get model(): mat4{
        return this._model!;
    }
}