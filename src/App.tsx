import { ThirdwebBridgeSDK } from "@3rdweb/unity-bridge";
import { ethers } from "ethers";
import { Magic } from "magic-sdk";
import { useCallback, useEffect, useRef } from "react";

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Initialize ThirdwebBridgeSDK with an RPC url
  const bridge = useRef<ThirdwebBridgeSDK>(
    new ThirdwebBridgeSDK("https://rpc-mumbai.maticvigil.com")
  );

  // Setting up Unity bridge instance
  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }

    const interval = setInterval(() => {
      if (!(window as any).createUnityInstance) {
        return;
      }
      clearInterval(interval);
      (window as any)
        .createUnityInstance(canvasRef.current, (window as any).unityConfig)
        .then((unityInstance: any) => {
          (window as any).unityInstance = unityInstance;
        });
    }, 500);
  }, [canvasRef]);

  // Connect to magic.link or Metamask and setup ThirdwebSDK.
  const onClickMagicLogin = useCallback(async () => {
    // login with email (magic.link)
    const magic = new Magic("<MAGIC_PUBLISHABLE_KEY>", {
      network: {
        chainId: 80001,
        rpcUrl: "https://rpc-mumbai.maticvigil.com",
      },
    });
    await magic.auth.loginWithMagicLink({ email: "example@email.com" });

    // update the signer on thirdweb sdk
    const provider = new ethers.providers.Web3Provider(
      magic.rpcProvider as any
    );
    const signer = provider.getSigner();
    // bridge.current because of useRef
    bridge.current.setProviderOrSigner(signer);

    console.log("logged in address", await signer.getAddress());
  }, []);

  return (
    <div>
      <button onClick={onClickMagicLogin}>Connect with magic.link</button>
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
