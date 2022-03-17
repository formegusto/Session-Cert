import ApiTestStore from "./apiTest";
import SessionCertStore from "./sessionCert";
import UIStore from "./ui";

class RootStore {
  uiStore: UIStore;
  sessionCertStore: SessionCertStore;
  apiTestStore: ApiTestStore;

  constructor() {
    this.uiStore = new UIStore(this);
    this.sessionCertStore = new SessionCertStore(this);
    this.apiTestStore = new ApiTestStore(this);
  }
}

export default RootStore;
