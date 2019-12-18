import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { Image } from 'element-ui'

const uuid = require("uuid")

@Component({
  name: 'CanvasFilaed',
})
export default class extends Vue {
  @Prop({ default: true }) private canDraw!: boolean
  @Prop({ default: '' }) private url!: string
  @Prop({ default: [] }) private initList!: []
  @Prop({ default: [] }) private info!: []
  // 是否为模板
  @Prop({ default: false }) private istemplater!: boolean
  @Prop({ default: '' }) private width!: String
  @Prop({ default: '' }) private height!: String
  //默认画笔颜色
  @Prop({ default: 'red' }) private lineColor!: String
  //画笔宽度
  @Prop({ default: 1 }) private lineWidth!: Number

  private radom = uuid.v4()
  private context = new Canvasmodel()
  //是否处于绘制状态
  private canvasMoveUse = false
  mycan: any
  img!: Image
  canvasX: any
  temppartlist: any
  PartList: any
  canvasY: any
  @Watch('child')
  private makearcfill(x: any, y: any, r: any, s: any, e: any, color: any) {
    //生成圆
    let mycan = document.getElementById(this.radom);
    let ctx = this.mycan.getContext("2d");
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(x, y, r, s, e);
    ctx.fill();
  }
  @Watch('child')
  private makearcstroke(x: any, y: any, r: any, s: any, e: any, color: any) {
    let mycan = document.getElementById(this.radom);
    let ctx = this.mycan.getContext("2d");
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(x, y, r, s, e);
    ctx.fill();
  }
  @Watch('child')
  private initDraw() {
    // 初始化画布
    let that = this;
    const mycan = document.getElementById(this.radom);
    that.context = this.mycan.getContext("2d");
    // 初始化背景图片
    that.img.src = that.url;
    that.context.drawImage(this.img, 0, 0);
    that.context.lineWidth = this.lineWidth;
    this.context.strokeStyle = this.lineColor;
    // console.table(this.initList);
    if (this.initList.length > 0 && this.initList != null) {
      that.initList.forEach(e => {
        this.makearcstroke(e[0], e[1], 30, 0, 180, "red");
      });
    }
  }
  //单机鼠标
  private canvasDown(e: any) {
    let that = this;
    if (that.canDraw) {
      that.canvasMoveUse = true;
      let canvasX = e.layerX; // e.clientX - e.target.parentNode.offsetLeft;
      let canvasY = e.layerY; // - e.target.parentNode.offsetTop;
      let canvas = document.getElementById(that.radom);
      let templist = that.initList;
      if (that.istemplater == true) {
        let tempxy = [that.canvasX, that.canvasY];
        that.temppartlist.push(tempxy);
        that.makearcstroke(that.canvasX, that.canvasY, 30, 0, 180, "red");
      } else {
        templist.forEach(e => {
          //判断是否在圈内
          if (
            e[0] + 30 >= canvasX &&
            e[0] - 30 <= canvasX &&
            e[1] + 30 >= canvasY &&
            e[1] - 30 <= canvasY
          ) {
            that.canvasX = e[0];
            that.canvasY = e[1];

            // console.table(this.PartList);
            if (that.PartList.length > 0 && this.PartList != null) {
              that.PartList.forEach((c: any[]) => {
                if (c[0] == e[0] && c[1] == e[1]) {
                  this.makearcstroke(
                    this.canvasX,
                    this.canvasY,
                    30,
                    0,
                    180,
                    "red"
                  );
                } else {
                  let xy = [this.canvasX, this.canvasY];
                  this.temppartlist.push(xy); //.temppartlist.push(xy);
                  this.makearcfill(
                    this.canvasX,
                    this.canvasY,
                    30,
                    0,
                    180,
                    "red"
                  );
                }
              });
            } else {
              let tempxy = [this.canvasX, this.canvasY];
              this.temppartlist.push(tempxy);
              this.makearcfill(this.canvasX, this.canvasY, 30, 0, 180, "red");
            }
          }
        });
        this.PartList = this.temppartlist;
      }
    }
  }
}
