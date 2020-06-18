import Scene from "../Scene.js";
import Map from "../GameObjects/Map.js";
import Status from "../Status.js";
//This Scene is used to test physics and general gameplay before making formal levels.
export default class Gameplay extends Scene {
  DEFAULT_COLOR = "#F9E4B7";
  counter = 0;
  map = Map;
  
  constructor() {
                  super();
                  this.counter = 0;
                }
  init() {
    var presetMaps = [
        "111111111111111111111111111111110000000011111110000000001111104000000011111110000200001111100000000011111110000000001111100000000011111110000000040001100000000400011110000000000001100000000000400004004000400001100000000000000000000111000401100040000004000000000111000011100001111110000000000111004011100001111110000400400111000111100001111110000011004000440111103001111110004011000000001111100001111110000111000000001111111111111111111111111111111111",
        "111111111111111111111111111111100000111100000000000000000001100000111100000000000000000001100200111100400004040000400001100000111100011110001111000001100000111100011110001111000001100000111100011110001111000001100000111100011110001111000001100000111100011110001111000001100000111100011110001111000001100000111100011110001111000001100004000040400004001111003001100000000000000000001111000001100000000000000000001111000001111111111111111111111111111111",
        "111111111111111111111111111111100000000400040000000000000001100000000011100000000000002001100400040011100000400040000001100011100011100000011100000001100011100400040004011100000001100011100000001110011100000001100400040000001110400040004001100000040004001110000001110001100000001110040004000001110001100000001110000004000401110001100300001110000000111040004001100000040004000000111000000001100000000000000000111000000001111111111111111111111111111111",
        // "111111111111111111111111111111100000000000000000000000000001100000000000000000000000000001100400000000000000000000004001100011111111111111111111110001100400000000000000000000004001100000404004040040400404000001103000010000100001000010000201100000404004040040400404000001100400000000000000000000004001100011111111111111111111110001100400000000000000000000004001100000000000000000000000000001100000000000000000000000000001111111111111111111111111111111",
        "111111111111111111111111111111100000000000000000000000000001100400040000000040004000000001100011100000000001110000002001100011100400000001110040000001100011111000000001111100000001100400111004000040011100400001100000111110000000011111000001100004001110040000400111004001100000001111100000000111110001100000040011100000004001110001100300000011100000000001110001100000000400040000000040004001100000000000000000000000000001111111111111111111111111111111",
    ];
    var randData = presetMaps[Math.floor(Math.random()*presetMaps.length)];
    this.map =
      new Map(
        15,
        30,
        480,
        960,
        // randData
        presetMaps[0]
      );
    super.push(this.map);
    return 0;
  }
  specHandle(req, i){
    switch(req.signal){
      case Status.ADDBULLET:
        //this if statement is needed to account for shots beyond the grave
        if(this.objects[req.data]){
          this.objects[req.data].availableBullets++;
        }
        break;
      default:
        break;
    }
  }
  push(obj) {
    super.push(obj);
  }
  setBackground(ctx, color) {
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, 960, 480);
  }
  update(ctx) {
    this.setBackground(ctx, this.DEFAULT_COLOR);
    super.update(ctx);
    this.counter++;
    return 0;
  }
  exit() {}
}
