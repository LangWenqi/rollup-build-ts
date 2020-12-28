
import App from './app';
function BFSDK (platform?: string): App {
  const app = App.getInstance();
  app.setPlatform(platform || 'wx');
  return app;
}
if (typeof window !== 'undefined') {
  window.BFSDK = BFSDK;
}
export default BFSDK;
