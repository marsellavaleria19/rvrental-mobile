import PushNotification from 'react-native-push-notification';

const PushNotificationHandler = (idChanel, chanelName, title, desription) => {
   PushNotification.createChannel({
      channelId: idChanel,
      channelName: chanelName,
      channelDescription: desription,
   });

   PushNotification.localNotification({
      channelId: idChanel,
      message: chanelName,
      title: title,
   });
};

export default PushNotificationHandler;
