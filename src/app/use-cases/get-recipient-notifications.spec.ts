import { Content } from '@app/entities/content';
import { Notification } from '@app/entities/notification';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { GetRecipientNotifications } from './get-recipient-notifications';

describe('Count Recipient Notifications', () => {
  it('should be able to count a recipient notifications', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const getRecipientNotifications = new GetRecipientNotifications(
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

    const { notifications } = await getRecipientNotifications.execute({
      recipientId: 'example-id-recipient-1',
    });

    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: 'example-id-recipient-1' }),
        expect.objectContaining({ recipientId: 'example-id-recipient-1' }),
      ]),
    );
  });
});
