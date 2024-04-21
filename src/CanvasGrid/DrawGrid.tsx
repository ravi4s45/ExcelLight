import { useEffect, useRef } from "react"

export function DrawGrid(){
    const canvasRef = useRef(null)
    useEffect(() => {
        const canvas:any = canvasRef.current
        const ctx = canvas.getContext('2d')
        ctx.beginPath();
        for(var row=0;row<=100;row++){
          ctx.moveTo(0,(row+1)*35);
          ctx.lineTo(1200,(row+1)*35);
          ctx.stroke();
        }
        //ctx.beginPath();
        for(var col=0;col<=26;col++){
        ctx.moveTo((col+1)*90,0);
        ctx.lineTo((col+1)*90,3500);
        ctx.stroke();
        }
      }, [])
    return(
        <>
        <canvas ref={canvasRef} width={window.innerWidth} height={3500}>

        </canvas>
        </>
    )
}