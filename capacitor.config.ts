import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.capacitorapp',
  appName: 'Capacitor App',
  webDir: 'src',  // Đường dẫn tới thư mục chứa index.html
  plugins: {
    LocalNotifications: {
      smallIcon: "ic_notification",  
      iconColor: "#FF0000",          
      sound: "notification.wav"
    }
  }
};

export default config;
