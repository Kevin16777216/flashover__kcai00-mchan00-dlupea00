import PVector from "./PVector.js";
export default class Polygon {
  DEFAULT_COLOR = "#FF0000";
  DEFAULT_OUT_COLOR = "#000000";
  vertices = [new PVector(Number, Number)];
  pos = new PVector();
  rotation = 0.0;
  stroke = true;
  constructor(pos) {
    this.vertices = [];
    this.pos = pos;
    this.color = this.DEFAULT_COLOR;
    this.outcolor = this.DEFAULT_OUT_COLOR;
    this.rotation = 0.0;
    this.stroke = true;
  }
  addPoint(x, y) {
    this.vertices.push(new PVector(x, y));
  }
  addRelativePoint(x, y) {
    this.vertices.push(new PVector(this.pos.x + x, this.pos.y + y));
  }
  destroy() {
    this.vertices = [];
  }
  rotateBody(rad) {
    this.rotation += rad;
    if (this.rotation > 2 * Math.PI) {
      this.rotation -= 2 * Math.PI;
    } else if (this.rotation < 0) {
      this.rotation += 2 * Math.PI;
    }
    this.vertices.forEach((vec) => {
      vec.rotate(this.pos, rad);
    });
  }
  rotateAbsolute(deg) {
    this.rotateBody(-this.rotation);
    this.rotateBody(deg);
  }
  translate(tvec) {
    this.pos.translate(tvec);
    this.vertices.forEach((vec) => {
      vec.translate(tvec);
    });
  }
  render(ctx) {
    if (this.vertices.length > 1) {
      ctx.fillStyle = this.color;
      ctx.strokeStyle = this.outcolor;
      ctx.beginPath();
      ctx.moveTo(this.vertices[0].x, this.vertices[0].y);
      for (let i = 1; i < this.vertices.length; i++) {
        ctx.lineTo(this.vertices[i].x, this.vertices[i].y);
      }
      ctx.lineTo(this.vertices[0].x, this.vertices[0].y);
      ctx.fill();
      if (this.stroke) {
        ctx.stroke();
      }
    }
  }
  static calculateProjection(p1, axis) {
    let min = PVector.dot(axis, p1.vertices[0]);
    let max = min;
    for (let i = 1; i < p1.vertices.length; i++) {
      let p = PVector.dot(axis, p1.vertices[i]);
      if (p < min) {
        min = p;
      }
      if (p > max) {
        max = p;
      }
    }
    return new PVector(min, max);
  }
  static isOverlap(vec1, vec2) {
    return !(vec1.x > vec2.y || vec2.x > vec1.y);
  }
  static getOverlap(vec1, vec2) {
    return Math.min(vec1.y, vec2.y) - Math.max(vec1.x, vec2.x);
  }
  static isColliding(p1, p2) {
    let overlap = 999999999;
    let mtv = new PVector();
    let n1 = [];
    let n2 = [];
    //calculate normals of edges
    for (let i = 0; i < p1.vertices.length - 1; i++) {
      n1.push(PVector.normal(p1.vertices[i], p1.vertices[i + 1]));
    }
    n1.push(
      PVector.normal(p1.vertices[p1.vertices.length - 1], p1.vertices[0])
    );
    //projcted axes of p2
    for (let i = 0; i < p2.vertices.length - 1; i++) {
      n2.push(PVector.normal(p2.vertices[i], p2.vertices[i + 1]));
    }
    n2.push(
      PVector.normal(p2.vertices[p2.vertices.length - 1], p2.vertices[0])
    );
    for (let i = 0; i < n1.length; i++) {
      let axis = n1[i];
      let proj1 = this.calculateProjection(p1, axis);
      let proj2 = this.calculateProjection(p2, axis);
      if (!this.isOverlap(proj1, proj2)) {
        return false;
      } else {
        let tmp = this.getOverlap(proj1, proj2);
        if (tmp < overlap) {
          overlap = tmp;
          mtv = axis;
        }
      }
    }
    for (let i = 0; i < n2.length; i++) {
      let axis = n2[i];
      let proj1 = this.calculateProjection(p1, axis);
      let proj2 = this.calculateProjection(p2, axis);
      if (!this.isOverlap(proj1, proj2)) {
        return false;
      } else {
        let tmp = this.getOverlap(proj1, proj2);
        if (tmp < overlap) {
          overlap = tmp;
          mtv = axis;
        }
      }
    }
    mtv.scale(overlap);
    return mtv;
  }
}
