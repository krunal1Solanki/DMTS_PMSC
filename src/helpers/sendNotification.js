
import axios from "axios";
const sendNotification = async (token, title, body) => {
    try {
        console.log("INININNIN")
      const fcmEndpoint = 'https://fcm.googleapis.com/fcm/send';

      const serverKey = 'AAAAruX6qgs:APA91bFj2Ay7m3NXnXr-evOY6DECFRa29pTeeCzaqIcy43E14L7Dj_JG9LXT7ZJwALvfeirSB6yb4R_FGmij8F-QUx7U6xu9FtSHM1xOp3EIkh5P7eMCpW9vtjlwVWjlopXZFsCvl-20'
  
      // FCM API request payload
      const payload = {
        to: token,
        notification: {
          title,
          body,
        },
      };
  
      // FCM API request headers
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `key=${serverKey}`,
      };
  
      // Send notification using Axios
      const response = await axios.post(fcmEndpoint, payload, { headers });
  
      console.log('FCM Response:', response.data);
      return { success: true, message: 'Notification sent successfully' };
    } catch (error) {
      console.error('Error sending notification:', error.message);
      return { success: false, error: 'Failed to send notification' };
    }
  };

  export default sendNotification