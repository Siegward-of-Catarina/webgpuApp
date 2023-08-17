import { Renderer } from "../view/renderer";
import { Scene } from '../model/scene';
import $ from "jquery"

export class App{
    private canvas: HTMLCanvasElement;
    private renderer: Renderer;
    private scene: Scene;

    private keyLabel: HTMLElement;
    private mouseXLabel: HTMLElement;
    private mouseYLabel: HTMLElement;

    constructor(canvas: HTMLCanvasElement){
        this.canvas = canvas;
        this.renderer = new Renderer(this.canvas);
        this.scene = new Scene();

        this.keyLabel = <HTMLElement>document.getElementById("key-label");
        
        $(document).on("keypress", (event) => {this.handle_keypress(event)});

        this.mouseXLabel = <HTMLElement>document.getElementById("mouse-x-label");
        this.mouseYLabel = <HTMLElement>document.getElementById("mouse-y-label");
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

    handle_keypress = (event: JQuery.KeyPressEvent) =>{
        this.keyLabel.innerText = event.code;
    }
}