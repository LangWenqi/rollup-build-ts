class App {
  static instance: App;
  static getInstance() {
    if (!App.instance) {
      App.instance = new App();
    }
    return App.instance;
  }
  platform = '';

  setPlatform(platform: string) {
    this.platform = platform;
  }

  show() {
    console.log(1111);
  }
}

export default App;