import Scene from '../Scene.js';
import Map from '../GameObjects/Map.js'
//This Scene is used to test physics and general gameplay before making formal levels.
export default class Gameplay extends Scene {
    DEFAULT_COLOR = "#F9E4B7";
    constructor() {
      super();
    }
    init() {
      this.push(new Map(this,480,960,"111111111111111111111111111111100000000000000001000000000001100000000000000001000000010001100000000000000001002000000001100000000000000001000000000001100000000000000001000000000001100000000000000001111000000001100000000000000000000000200001100000000111100000000000000001100000000000100000000000000001100000000000100000000000000001100030000000100000200000000001100000000000100000000000100001100000000000100000000001200001111111111111111111111111111111"));
      return 0;
    }
    push(obj){
      super.push(obj);
    }
    setBackground(ctx, color){
        ctx.fillStyle = color;
        ctx.fillRect(0,0,960,480);
    }
    handleSignal(obj){
      switch(obj){
        case 1:
          this.objects[i].getpkt();
          break;
        //remove object
        case 2:
          this.destroy(obj);
          break;
        //go to results screen
        case 3:
          break;
        default:
      }
    }
    update(ctx) {
      this.setBackground(ctx, this.DEFAULT_COLOR);
      super.update(ctx);
      return 0;
    }
    exit() {}
  }
