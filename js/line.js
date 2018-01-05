/**
 * Created by evan_qb on 2017/12/17.
 */
/*
 * constructor { line } 折线图构造函数
 * param { ctx: Context } 绘图环境
 * param { data: Array } 绘制折线图所需的数据
 * param { padding: Object } 设置坐标轴到画布的边距
 * param { arrow: Object } 设置箭头的宽高
 */
function Line(ctx,data,padding,arrow){
    this.ctx = ctx;
    this.data = data;
    this.padding = padding || { top: 10, right: 10, bottom: 10, left: 10 };
    this.arrow = arrow || { width: 10, height: 20 };
    //上顶点的坐标
    this.vertexTop = {
        x:this.padding.left,
        y:this.padding.top
    }
    //原点的坐标
    this.origin = {
        x:this.padding.left,
        y:this.ctx.canvas.height - this.padding.bottom
    }
    //右顶点的坐标
    this.vertexRight = {
        x:this.ctx.canvas.width - this.padding.right,
        y:this.ctx.canvas.height - this.padding.bottom
    }
    //计算坐标轴的最大刻度
    this.coordWidth = this.ctx.canvas.width - this.padding.left - this.padding.right - this.arrow.height;
    this.coordHeight = this.ctx.canvas.height - this.padding.top - this.padding.bottom - this.arrow.height;
}
//给原型扩充方法
Line.prototype = {
    constructor:Line,

    draw:function(){
        this.drawCoord();
        this.drawArrow();
        this.drawLine();
    },
    //绘制坐标轴
    drawCoord:function(){
        this.ctx.beginPath();
        this.ctx.moveTo(this.vertexTop.x,this.vertexTop.y);
        this.ctx.lineTo(this.origin.x,this.origin.y);
        this.ctx.lineTo(this.vertexRight.x,this.vertexRight.y);
        this.ctx.stroke();
    },
    //绘制箭头
    drawArrow:function(){
        //绘制向上的箭头
        this.ctx.beginPath();
        this.ctx.moveTo(this.vertexTop.x,this.vertexTop.y);
        this.ctx.lineTo(this.vertexTop.x - this.arrow.width / 2,this.vertexTop.y + this.arrow.height);
        this.ctx.lineTo(this.vertexTop.x , this.vertexTop.y + this.arrow.height / 2);
        this.ctx.lineTo(this.vertexTop.x + this.arrow.width / 2,this.vertexTop.y + this.arrow.height);
        this.ctx.fill();
        //绘制向右的箭头
        this.ctx.beginPath();
        this.ctx.moveTo(this.vertexRight.x,this.vertexRight.y);
        this.ctx.lineTo(this.vertexRight.x - this.arrow.height,this.vertexRight.y - this.arrow.width / 2);
        this.ctx.lineTo(this.vertexRight.x - this.arrow.height / 2,this.vertexRight.y);
        this.ctx.lineTo(this.vertexRight.x - this.arrow.height,this.vertexRight.y + this.arrow.width / 2);
        this.ctx.fill();
    },
    //根据数据绘制折线图
    drawLine:function(){
        //先清除路径
        this.ctx.beginPath();
        var self = this;
        //计算x轴和y轴的缩放比值
        var ratioX = this.coordWidth / this.data.length;
        var ratioY = this.coordHeight / Math.max.apply(null,self.data);
        //设置点的颜色
        this.ctx.fillStyle = "green";
        //根据原点计算点的坐标
        //x = self.origin.x + x
        //y = self.origin.y - y
        //遍历数据，并依次描点 数组:val：值 index:下标
        this.data.forEach(function(val,index){
            self.ctx.fillRect(self.origin.x + index*ratioX - 2,self.origin.y - val*ratioY - 2,4,4);
        });
        //设置线的颜色
        this.ctx.strokeStyle = "yellow";
        //遍历数据，连线
        this.data.forEach(function(val,index){
            self.ctx.lineTo(self.origin.x + index*ratioX,self.origin.y - val*ratioY);
        });
        this.ctx.stroke();
    }
}