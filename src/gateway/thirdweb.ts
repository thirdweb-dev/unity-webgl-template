import { Signer } from "@ethersproject/abstract-signer";

export class ThirdWebGateway {
  private signer: Signer | null = null;

  setSigner(signer: Signer) {
    this.signer = signer;
  }

  loggedIn(payload: JSON): Promise<boolean> {
    return Promise.resolve(false);
  }

  invokeRoute(route: string, payload: JSON): Promise<any> {
    if(route === "thirdweb.logged_in") {
      return this.loggedIn(payload);
    }
    throw new Error("uknown route");
  }
}