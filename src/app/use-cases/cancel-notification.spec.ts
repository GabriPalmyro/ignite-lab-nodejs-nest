import { Content } from '@app/entities/content';
import { Notification } from '@app/entities/notification';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { CancelNotification } from './cancel-notification';

describe('Cancel Notification', () => {
  it('should be able to cancel a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const cancelNotification = new CancelNotification(notificationsRepository);

    const notification = new Notification({
      category: 'social',
      content: new Content('Nova solicitação de amizada'),
      recipientId: 'example-id-recipient',
    });

    await notificationsRepository.create(notification);

    await cancelNotification.execute({
      notificationId: notification.id,
    });

    expect(notificationsRepository.notifications[0].cancelAt).toEqual(
      expect.any(Date),
    );
  });

  // it('should not be able to cancel a notification if it not exists', async () => {
  //   const notificationsRepository = new InMemoryNotificationsRepository();
  //   const cancelNotification = new CancelNotification(notificationsRepository);

  //   expect(() => {
  //     cancelNotification.execute({
  //       notificationId: 'fake-id',
  //     });
  //   }).rejects.toThrow(NotificationNotFound);
  // });
});
