import { Notification } from '@app/entities/notification';

export class NotificationViewModel {
  static toHTTP(notification: Notification) {
    return {
      notification: {
        id: notification.id,
        content: notification.content.value,
        category: notification.category,
        recipientId: notification.recipientId,
      },
    };
  }
}
