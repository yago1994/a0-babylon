import { Engine } from "@babylonjs/core/Engines/engine";
import { Scene } from "@babylonjs/core/scene";
import { Vector3 } from "@babylonjs/core/Maths/math";
import { ArcRotateCamera } from "@babylonjs/core/Cameras/arcRotateCamera";
import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight";
import { PointLight } from "@babylonjs/core/Lights/pointLight";
import "@babylonjs/core/Materials/standardMaterial";

// Required side effects to populate the Create methods on the mesh class. Without this, the bundle would be smaller but the createXXX methods from mesh would not be accessible.
import {MeshBuilder} from  "@babylonjs/core/Meshes/meshBuilder";

const canvas = document.getElementById("renderCanvas") as HTMLCanvasElement; // Get the canvas element 
const engine = new Engine(canvas, true); // Generate the BABYLON 3D engine


/******* Add the Playground Class with a static CreateScene function ******/
class Playground { 
    public static CreateScene(engine: Engine, canvas: HTMLCanvasElement): Scene {
        // Create the scene space
        const scene = new Scene(engine);

        // Add a camera to the scene and attach it to the canvas
        const camera = new ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 2, 
                                         new Vector3(0,0,5), scene);
        camera.attachControl(canvas, true);

        // Add lights to the scene
        new HemisphericLight("light1", new Vector3(1, 1, 0), scene);
        new PointLight("light2", new Vector3(0, 1, -1), scene);

        // Add and manipulate meshes in the scene
        MeshBuilder.CreateSphere("sphere", {diameter:2}, scene);

        return scene;
    }
}

/******* End of the create scene function ******/    
// code to use the Class above
const createScene = function(): Scene { 
    return Playground.CreateScene(engine, 
        engine.getRenderingCanvas() as HTMLCanvasElement); 
}

const scene = createScene(); //Call the createScene function

// Register a render loop to repeatedly render the scene
engine.runRenderLoop(function () { 
    scene.render();
});

// Watch for browser/canvas resize events
window.addEventListener("resize", function () { 
    engine.resize();
});
