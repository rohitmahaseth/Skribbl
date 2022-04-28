import React, { useCallback, useEffect, useRef, useState } from 'react';
import io from 'socket.io-client'

const socket = io.connect('https://kribbl.herokuapp.com/', { transports: ['websocket', 'polling', 'flashsocket'] })

const colors = [
  "red",
  "green",
  "yellow",
  "black",
  "blue",
  "orange",
  "tomato",
  "lightgreen",
  "skyblue",
  "brown",
  "pink",
  "white"
]

function Can() {
  const canvasRef = useRef(null);
  const ctx = useRef(null);

  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [mouseDown, setMouseDown] = useState(false);
  const [lastPosition, setPosition] = useState({
    x: 0,
    y: 0
  });

  useEffect(() => {
    if (canvasRef.current) {
      ctx.current = canvasRef.current.getContext('2d');
    }
  }, []);

  const draw = useCallback((x, y) => {
    if (mouseDown) {
      ctx.current.beginPath();
      ctx.current.strokeStyle = selectedColor;
      ctx.current.lineWidth = 10;
      ctx.current.lineJoin = 'round';
      ctx.current.moveTo(lastPosition.x, lastPosition.y);
      ctx.current.lineTo(x, y);
      ctx.current.closePath();
      ctx.current.stroke();

      console.log(x, y)
      socket.emit('drawing', {
        color: selectedColor,
        x1: lastPosition.x,
        y1: lastPosition.y,
        x: x,
        y: y
      })
      socket.on('drawing', (drew) => {
        ctx.current.beginPath();
        ctx.current.strokeStyle = drew.color;
        ctx.current.lineWidth = 10;
        ctx.current.lineJoin = 'round';
        ctx.current.moveTo(drew.x1, drew.y1);
        ctx.current.lineTo(drew.x, drew.y);
        ctx.current.closePath();
        ctx.current.stroke();
        console.log(drew)
      })

      setPosition({
        x,
        y
      })
    }
  }, [lastPosition, mouseDown, selectedColor, setPosition])



  const download = async () => {
    const image = canvasRef.current.toDataURL('image/png');
    const blob = await (await fetch(image)).blob();
    const blobURL = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = blobURL;
    link.download = "image.png";
    link.click();
  }

  const clear = () => {
    ctx.current.clearRect(0, 0, ctx.current.canvas.width, ctx.current.canvas.height)
  }

  const onMouseDown = (e) => {
    setPosition({
      x: e.pageX - 305,
      y: e.pageY - 225
    })
    setMouseDown(true)
  }

  const onMouseUp = (e) => {
    setMouseDown(false)
  }

  const onMouseMove = (e) => {
    draw(e.pageX - 305, e.pageY - 225)
  }
  console.log(lastPosition, setPosition)
  return (
    <>
      <div className="Addo">
        <center>
          <canvas
            style={{
              border: "8px solid #000", display: 'inline-block', background: 'white'
            }}
            width={900}
            height={650}
            ref={canvasRef}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
            onMouseMove={onMouseMove}
          />
        </center>
        <br />
        <center>
          <select style={{ fontSize: '2rem', fontFamily: 'cursive' }}
            value={selectedColor}
            onChange={(e) => setSelectedColor(e.target.value)}
          >
            {
              colors.map(
                color => <option key={color} value={color}>{color}</option>
              )
            }
          </select>
          <button style={{ fontSize: '2rem', fontFamily: 'cursive' }} onClick={clear}>Clear</button>
          <button style={{ fontSize: '2rem', fontFamily: 'cursive' }} onClick={download}>Download</button>
        </center>
      </div>
    </>
  );
}

export default Can;