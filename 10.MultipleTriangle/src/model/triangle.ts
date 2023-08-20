import { vec3, mat4 } from "gl-matrix";
import { Deg2Rad } from "./math_stuff";

export class Triangle{
    private _position: vec3;
    /**
    *@property eulers[0] r
    *@property eulers[1] theta
    *@property eulers[2] phi
    */
    private eulers: vec3;
    private _model: mat4 | null;
    constructor(position:vec3, theta: number ){
        this._position = position;
        this.eulers = vec3.create();
        this.eulers[1] = theta;
        this._model = null;
    }

    update(){
        this.eulers[1] += 1;
        this.eulers[1] %= 360;

        this._model = mat4.create();
        mat4.translate(this._model, this._model, this._position);
        mat4.rotateY(this._model, this._model,Deg2Rad(this.eulers[1]));
    }

    get position():vec3{
        return this._position;
    }

    get model(): mat4{
        return this._model!;
    }
}