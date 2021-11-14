import { useEffect } from "react";
import { v4 } from 'uuid';
import { ThirdWebGateway } from "./thirdweb";

let bridge: Unity | null = null;

class Unity {
  private thirdWeb: ThirdWebGateway

  constructor() {
    this.thirdWeb = new ThirdWebGateway();
    const w = (window as any);
    w.unity = {};
    w.unity.invoke = (route: string, payload: string) => {
      console.log("invoke called", route, payload);
      const ack_id = v4();
      this.thirdWeb.invokeRoute(route, JSON.parse(payload)).then(result => {
        console.log("invoke route result");
        const returnPayload = JSON.stringify({ ack_id, result });
        w.unityInstance.SendMessage("ThirdWeb", "Callback", returnPayload);
      });
      return ack_id;
    };
  }
}

export function useUnity() {
  if(!bridge) {
    bridge = new Unity();
  }
  return bridge;
}