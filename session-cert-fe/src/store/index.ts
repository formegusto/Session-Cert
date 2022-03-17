import UIStore from "./ui";

class RootStore {
  uiStore: UIStore;

  constructor() {
    this.uiStore = new UIStore(this);
  }
}

export default RootStore;
