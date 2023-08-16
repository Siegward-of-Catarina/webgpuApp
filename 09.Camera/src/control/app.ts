import { Renderer } from "../view/renderer";
import { Scene } from '../model/scene';

export class App{
    private canvas: HTMLCanvasElement;
    private renderer: Renderer;
    private scene: Scene;

    constructor(canvas: HTMLCanvasElement){
        this.canvas = canvas;
        this.renderer = new Renderer(this.canvas);
        this.scene = new Scene();
    }

    initialize = async () =>{
        await this.renderer.Initialize();
    }

    run = () =>{

        var running : Boolean = true;

        this.scene.update();
        this.renderer.render(
            this.scene.player,
            this.scene.triangles
        );
        
        if( running ){
            requestAnimationFrame(this.run);
        }
    }
}