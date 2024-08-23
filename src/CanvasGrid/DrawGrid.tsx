import React, { useEffect, useRef, useState } from "react"
import { IDrawGridProps } from "./IDrawGridProps";

export function DrawGrid(props:IDrawGridProps){
    const canvasRef = useRef(null)
    const dynamicInputRef = useRef(null);
    const [value, setValue] = useState('');
    const [isEditing,setIsEditing] = useState(false);
    const [dynamicInputVal,SetDynamicInputVal] = useState('');
    const HandleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };
    const HandleDynamicInputChange = (event:any) => {
        SetDynamicInputVal(event.target.value);
        props.SetCommonFuncCanvasCellVal(event.target.value);
      };
    let prevSelectedValX = -1;
    let prevSelectedValY = -1;
    useEffect(() => {
        const canvas:any = canvasRef.current
        const ctx = canvas.getContext('2d')
        canvas.width = window.innerWidth*2;
        canvas.height = 3500;
        ctx.beginPath();
        let offset = 0;
        for(var row=0;row<=120;row++){
            if(row==1){
                ctx.moveTo(0,(row)*45);
        ctx.lineTo(canvas.width,(row)*45);
        ctx.stroke();
        offset = 15;
        continue;
            }
            if(!(row<2)){
                ctx.textAlign="center"; 
                ctx.textBaseline = "middle";
                ctx.font="16px Georgia";
                ctx.fillText(row-1,((1)*45)-8,(row)*30);
            }
        ctx.moveTo(0,(row)*30 + offset);
        ctx.lineTo(canvas.width,(row)*30 + offset);
        ctx.stroke();
        }
        //ctx.beginPath();
        offset = 0;
        for(var col=0;col<=52;col++){
            if(col==1){
                ctx.textAlign="center"; 
                ctx.textBaseline = "middle";
                ctx.font="18px Georgia";
                ctx.moveTo((col)*50,0);
                ctx.lineTo((col)*50,canvas.height);
                ctx.fillText(convertToTitle(col),(col)*50+(100/2),((col)*45)-9);
                ctx.stroke();
                offset = -40;
                continue;
            }
            if(!(col<2)){
                ctx.textAlign="center"; 
                ctx.textBaseline = "middle";
                ctx.font="18px Georgia";
                ctx.fillText(convertToTitle(col),9+(col)*100,((1)*45)-9);
            }
        ctx.moveTo((col)*100 + offset,0);
        ctx.lineTo((col)*100 + offset,canvas.height);
        ctx.stroke();
        }
        canvas.addEventListener('mousedown', function(e:any) {
            let pos = getMousePos(canvas,e);
            let nearestTopLeftPoints = getNearestTopLeftPoint(pos.x,pos.y,100,30)
            console.log(nearestTopLeftPoints.xTop+'-'+nearestTopLeftPoints.yLeft);
            //clear the previous one
            if(!(prevSelectedValX==-1 && prevSelectedValY==-1)){
            ctx.beginPath();
            ctx.lineWidth = "2";
            ctx.strokeStyle = "black";
            ctx.rect(prevSelectedValX + 50, prevSelectedValY + 45, 100, 30);
            ctx.stroke()
            }
            //ctx.rect(nearestTopLeftPoints.xTop, nearestTopLeftPoints.yLeft, 90, 35);
            ctx.beginPath();
            ctx.lineWidth = "2";
            ctx.strokeStyle = "#0484fc";
            ctx.rect(nearestTopLeftPoints.xTop + 50, nearestTopLeftPoints.yLeft + 45, 100, 30);
            ctx.fillText(props.CommonFuncCanvasCellVal, nearestTopLeftPoints.xTop + 50,nearestTopLeftPoints.yLeft + 45);
            ctx.stroke()
            prevSelectedValX = (nearestTopLeftPoints.xTop);
            prevSelectedValY = (nearestTopLeftPoints.yLeft);
            props.SetActiveCell(convertToTitle((prevSelectedValX/100)+1) +'-'+ ((prevSelectedValY/30)+1));
        })
        canvas.addEventListener('dblclick',function(e:any){
            let posObj = getMousePos(canvas,e);
            let editableInputPos = getNearestTopLeftPoint(posObj.x,posObj.y,100,30);
            const editableInput:any = dynamicInputRef.current;
            if(editableInput){
            editableInput.style.top = editableInputPos.yLeft+45+"px";
            editableInput.style.left = editableInputPos.xTop+50+"px";
            }
            setIsEditing(true);
        })
      }, [])
    return(
        <div style={{position:'relative',maxWidth:window.innerWidth+'px',maxHeight:'455px',overflow:'scroll',border: '1px solid #000'}}>
        <input
          ref={dynamicInputRef}
          type="text"
          value={props.IsEditingFx?props.CommonFuncCanvasCellVal:dynamicInputVal}
          onChange={HandleDynamicInputChange}
          style={{display:isEditing?'block':'none',position:'absolute',width:'102px',height:'24px'}}
        />
        <canvas ref={canvasRef} width={window.innerWidth} height={3500}>
        </canvas>
        </div>
    )
}
function getMousePos(canvas:any, evt:any) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left - 50,
      y: evt.clientY - rect.top - 45
    };
  }
  function getNearestTopLeftPoint(x:any,y:any,cellWidth:any,cellHeight:any){
      return {
          xTop:(Math.floor(x/cellWidth)*cellWidth),
          yLeft:(Math.floor(y/cellHeight)*cellHeight)
      }
  }

  function convertToTitle(columnNumber:number) {
    const numberToCharacterMap:any = {};
    for (let i = 1; i <= 26; i++) {
        const character = String.fromCharCode(i + 64);
        numberToCharacterMap[i] = character;
    }
    let resp = "";
    while(columnNumber > 0) {
        let remainder = columnNumber % 26;
        if (remainder === 0) {
            resp = 'Z' + resp;
            columnNumber = Math.floor(columnNumber / 26) - 1;
        } else {
            resp = numberToCharacterMap[remainder] + resp;
            columnNumber = Math.floor(columnNumber / 26);
        }
    }
    return resp;
}

