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
            ctx.fillText(props.CommonFuncCanvasCellVal, nearestTopLeftPoints.xTop,nearestTopLeftPoints.yLeft);
            ctx.stroke()
            prevSelectedValX = (nearestTopLeftPoints.xTop);
            prevSelectedValY = (nearestTopLeftPoints.yLeft);
            props.SetActiveCell(convertToTitle((prevSelectedValX/90)+1) +'-'+ ((prevSelectedValY/35)+1));
        })
        canvas.addEventListener('click',function(e:any){
            let posObj = getMousePos(canvas,e);
            let editableInputPos = getNearestTopLeftPoint(posObj.x,posObj.y,90,35);
            const editableInput:any = dynamicInputRef.current;
            if(editableInput){
            editableInput.style.top = editableInputPos.yLeft+"px";
            editableInput.style.left = editableInputPos.xTop+"px";
            }
            setIsEditing(true);
        })
      }, [])
    return(
        <div style={{position:'relative'}}>
        <input
          ref={dynamicInputRef}
          type="text"
          value={props.IsEditingFx?props.CommonFuncCanvasCellVal:dynamicInputVal}
          onChange={HandleDynamicInputChange}
          style={{display:isEditing?'block':'none',position:'absolute',width:'82px',height:'30px'}}
        />
        <canvas ref={canvasRef} width={window.innerWidth} height={3500}>
        </canvas>
        </div>
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

