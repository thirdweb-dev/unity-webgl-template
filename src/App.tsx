import { ConnectWallet } from "@3rdweb/react";
import { useEffect, useRef } from "react";
import { useUnity } from "./gateway/unity";

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useUnity();
  useEffect(() => {

    if(!canvasRef.current) {
      return;
    }

    const interval = setInterval(() => {
      if(!(window as any).createUnityInstance) {
        return;
      }

      clearInterval(interval);
      (window as any).createUnityInstance(canvasRef.current, (window as any).unityConfig).then((unityInstance: any) => {
        (window as any).unityInstance = unityInstance;
      });
    }, 500);
  }, [canvasRef]);
  return (
    <div>
      hello
      <canvas
        ref={canvasRef}
        id="unity-canvas"
        width="960"
        height="600"
        style={{ width: "960px", height: "600px", cursor: "default" }}
      ></canvas>
    </div>
  );
}

export default App;
