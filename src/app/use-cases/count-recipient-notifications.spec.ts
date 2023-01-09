import { Content } from '@app/entities/content';
import { Notification } from '@app/entities/notification';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { CountRecipientNotifications } from './count-recipient-notifications';

describe('Count Recipient Notifications', () => {
  it('should be able to count a recipient notifications', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const countRecipientNotifications = new CountRecipientNotifications(
      notificationsRepository,
    );

    await notificationsRepository.create(
      new Notification({
        category: 'social',
        content: new Content('Nova solicitação de amizada'),
        recipientId: 'example-id-recipient-1',
      }),
    );

    await notificationsRepository.create(
      new Notification({
        category: 'social',
        content: new Content('Nova solicitação de amizada'),
        recipientId: 'example-id-recipient-1',
      }),
    );

    await notificationsRepository.create(
      new Notification({
        category: 'social',
        content: new Content('Nova solicitação de amizada'),
        recipientId: 'example-id-recipient-2',
      }),
    );

    const { count } = await countRecipientNotifications.execute({
      recipientId: 'example-id-recipient-1',
    });

    expect(count).toEqual(2);
  });
});
