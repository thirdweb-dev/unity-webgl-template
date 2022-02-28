# Example For Unity Bridge SDK

In the web project:
```
npm install @3rdweb/sdk @3rdweb/unity-bridge
```

1. In your web app, initialize `ThirdwebBridgeSDK`: https://github.com/thirdweb-dev/unity-webgl-template/blob/master/src/App.tsx#L11
2. Create `UnityInstance` in the window context for message bridging: https://github.com/thirdweb-dev/unity-webgl-template/blob/master/src/App.tsx#L20-L30
3. Update the `ThirdwebBridgeSDK` signer whenever a signer is available: https://github.com/thirdweb-dev/unity-webgl-template/blob/master/src/App.tsx#L45-L50
4. Unity SDK is now authenticated with the signer! 

### Related Project
Unity SDK: https://github.com/thirdweb-dev/unity-webgl
