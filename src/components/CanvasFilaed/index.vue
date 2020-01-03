
<template>
  <div>
    <canvas
      :id="radom"
      :class="{canDraw: 'canvas'}"
      :width="width"
      :height="height"
      :style="{'width': `${width}px`,'height': `${height}px`}"
      @mousedown="canvasDown($event)"
      @touchstart="canvasDown($event)"
    />
  </div>
</template>
<script lang="javascript">
/* eslint-disable */
import { log } from "util";
import { array } from "jszip/lib/support";
// import proxy from './proxy.js'
const uuid = require("uuid");
export default {
  props: {
    canDraw: {
      // 图片路径
      type: Boolean,
      default: true
    },
    url: {
      // 图片路径
      type: String
    },
    initList: {
      type: array
    },
    istemplater: {
      type: Boolean
    },
    info: {
      // 位置点信息
      type: Array
    },
    width: {
      // 绘图区域宽度
      type: String
    },
    height: {
      // 绘图区域高度
      type: String
    },
    lineColor: {
      // 画笔颜色
      type: String,
      default: "red"
    },
    lineWidth: {
      // 画笔宽度
      type: Number,
      default: 2
    },
    lineType: {
      // 画笔类型
      type: String,
      default: "circle"
    }
  },
  data() {
    return {
      // 同一页面多次渲染时，用于区分元素的id
      radom: uuid.v4(),
      // canvas对象
      context: {},
      // 是否处于绘制状态
      canvasMoveUse: false,
      PartList: [],
      temppartlist: [],
      // 储存坐标信息
      drawInfo: [],
      // 背景图片缓存
      img: new Image()
    };
  },
  watch: {
    info(val) {
      if (val) {
        this.initDraw();
      }
    }
  },
  mounted() {
    this.initDraw();
  },
  methods: {
    // 初始化绘制信息

    makearcfill(x, y, r, s, e, color) {
      //生成圆
      var mycan = document.getElementById(this.radom);
      var ctx = mycan.getContext("2d");
      ctx.beginPath();
      ctx.fillStyle = color;
      ctx.arc(x, y, r, s, e);
      ctx.fill();
    },
    initDraw() {
      // 初始化画布
      const canvas = document.getElementById(this.radom);
      this.context = canvas.getContext("2d");
      // 初始化背景图片
      this.img.src = this.url;
      this.img.onload = () => {
        this.context.drawImage(this.img, 0, 0);
      };
      this.context.lineWidth = this.lineWidth;
      this.context.strokeStyle = this.lineColor;
      // console.table(this.initList);
      if (this.initList.length > 0 && this.initList != null) {
        this.initList.forEach(e => {
          this.makearcstroke(e[0], e[1], 30, 0, 180, "red");
        });
      }
    },
    // 鼠标按下
    canvasDown(e) {
      if (this.canDraw) {
        this.canvasMoveUse = true;
        let that = this;
        // client是基于整个页面的坐标，offset是cavas距离pictureDetail顶部以及左边的距离
        let canvasX = e.layerX; // e.clientX - e.target.parentNode.offsetLeft;
        let canvasY = e.layerY; // - e.target.parentNode.offsetTop;
        var canvas = document.getElementById(this.radom);
        let templist = this.initList;
        //let temppartlist = [];
        console.log("===========>x:", canvasX);
        console.log("===========>y:", canvasY);
        if (this.istemplater == true) {
          console.log(this.istemplater);
          let tempxy = [this.canvasX, this.canvasY];
          this.temppartlist.push(tempxy);
          this.makearcstroke(this.canvasX, this.canvasY, 30, 0, 180, "red");
        } else {
          templist.forEach(e => {
            //判断是否在圈内
            console.log("e[0] + 30 >= canvasX:", e[0] + 30 >= canvasX);
            console.log(" e[0] - 30 <= canvasX:", e[0] - 30 <= canvasX);
            console.log("e[1] + 30 >= canvasY:", e[1] + 30 >= canvasY);
            console.log("e[1] - 30 <= canvasY:", e[1] - 30 <= canvasY);
            if (
              e[0] + 30 >= canvasX &&
              e[0] - 30 <= canvasX &&
              e[1] + 30 >= canvasY &&
              e[1] - 30 <= canvasY
            ) {
              this.canvasX = e[0];
              this.canvasY = e[1];

              // console.table(this.PartList);
              if (this.PartList.length > 0 && this.PartList != null) {
                this.PartList.forEach(c => {
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
    },
    makearcstroke(x, y, r, s, e, color) {
      //生成圆
      console.log("makearcstroke");
      // console.log("")
      var mycan = document.getElementById(this.radom);
      var ctx = mycan.getContext("2d");
      ctx.beginPath();
      ctx.fillStyle = color;
      ctx.clearRect(x - r, y - r, r * 2, r * 2);
      this.clean();
      ctx.arc(x, y, r, s, e);
      ctx.stroke();
    },
    // 获取坐标信息
    getInfo() {
      return this.drawInfo;
    },
    // 清空画布
    clean() {
      this.context.drawImage(this.img, 0, 0, this.width, this.height);
      this.drawInfo = [];
      if (this.info && this.info.length !== 0) this.drawWithInfo();
    }
  }
};
</script>
<style lang="scss" scoped>
.canvas {
  cursor: crosshair;
}
</style>
