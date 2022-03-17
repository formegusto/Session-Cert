import SessionCertStore from "./sessionCert";
import UIStore from "./ui";

class RootStore {
  uiStore: UIStore;
  sessionCertStore: SessionCertStore;

  constructor() {
    this.uiStore = new UIStore(this);
    this.sessionCertStore = new SessionCertStore(this);
  }
}

export default RootStore;
