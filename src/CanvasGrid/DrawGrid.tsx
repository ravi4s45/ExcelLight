import { useEffect, useRef, useState } from "react"

export function DrawGrid(){
    const canvasRef = useRef(null)
    // const [prevSelectedValX,setPrevSelectedValX] = useState(-1)
    // const [prevSelectedValY,setPrevSelectedValY] = useState(-1)
    let prevSelectedValX = -1;
    let prevSelectedValY = -1;
    useEffect(() => {
        const canvas:any = canvasRef.current
        const ctx = canvas.getContext('2d')
        canvas.width = window.innerWidth;
        canvas.height = 3500;
        ctx.beginPath();
        for(var row=0;row<=100;row++){
        ctx.moveTo(0,(row+1)*35);
        ctx.lineTo(canvas.width,(row+1)*35);
        ctx.stroke();
        }
        //ctx.beginPath();
        for(var col=0;col<=26;col++){
        ctx.moveTo((col+1)*90,0);
        ctx.lineTo((col+1)*90,canvas.height);
        ctx.stroke();
        }
        canvas.addEventListener('mousedown', function(e:any) {
            let pos = getMousePos(canvas,e);
            let nearestTopLeftPoints = getNearestTopLeftPoint(pos.x,pos.y,90,35)
            console.log(nearestTopLeftPoints.xTop+'-'+nearestTopLeftPoints.yLeft);
            //clear the previous one
            if(!(prevSelectedValX==-1 && prevSelectedValY==-1)){
            ctx.beginPath();
            ctx.lineWidth = "2";
            ctx.strokeStyle = "black";
            ctx.rect(prevSelectedValX, prevSelectedValY, 90, 35);
            ctx.stroke()
            }
            //ctx.rect(nearestTopLeftPoints.xTop, nearestTopLeftPoints.yLeft, 90, 35);
            ctx.beginPath();
            ctx.lineWidth = "2";
            ctx.strokeStyle = "#0484fc";
            ctx.rect(nearestTopLeftPoints.xTop, nearestTopLeftPoints.yLeft, 90, 35);
            ctx.stroke()
            prevSelectedValX = (nearestTopLeftPoints.xTop);
            prevSelectedValY = (nearestTopLeftPoints.yLeft);
        })
      }, [])
    return(
        <>
        <canvas ref={canvasRef} width={window.innerWidth} height={3500}>

        </canvas>
        </>
    )
}
function getMousePos(canvas:any, evt:any) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
  }
  function getNearestTopLeftPoint(x:any,y:any,cellWidth:any,cellHeight:any){
      return {
          xTop:(Math.floor(x/cellWidth)*cellWidth),
          yLeft:(Math.floor(y/cellHeight)*cellHeight)
      }
  }