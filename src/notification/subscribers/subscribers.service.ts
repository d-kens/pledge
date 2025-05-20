import { Injectable, Logger } from '@nestjs/common';
import { InjectNovu } from '../novu/novu.provider';
import { Novu } from '@novu/node';
import { SubscriberDto } from '../dto/subscriber.dto';
import { firstValueFrom, from } from 'rxjs';

@Injectable()
export class SubscribersService {
  private readonly logger = new Logger(SubscribersService.name);

  constructor(@InjectNovu() private readonly novu: Novu) {}

  async getSubscribers() {
    const result = await this.novu.subscribers.list();
    return result.data;
  }

  async createSubscriber(subscriber: SubscriberDto) {
    await firstValueFrom(
      from(
        this.novu.subscribers.identify(subscriber.subscriberId, {
          email: subscriber.email,
          firstName: subscriber.firstName,
          lastName: subscriber.lastName,
          phone: subscriber.phone,
          locale: 'en-KE',
        }),
      ),
    )
      .then((result) => {
        this.logger.log('Subscriber created', result.status);
      })
      .catch((err) => {
        this.logger.error('Subscriber creation error', err);
      });
  }

  async createBulkSubscribers(subscribers: SubscriberDto[]) {
    await firstValueFrom(
      from(
        this.novu.subscribers.bulkCreate(
          subscribers.map((subscriber) => ({
            subscriberId: subscriber.subscriberId,
            email: subscriber.email,
            firstName: subscriber.firstName,
            lastName: subscriber.lastName,
            phone: `+254${subscriber.phone}`,
            locale: 'en-KE',
          })),
        ),
      ),
    )
      .then((result) => {
        this.logger.log('Subscriber created', result.status);
      })
      .catch((err) => {
        this.logger.error('Subscriber creation error', err);
      });
  }

  async getSubscriber(subscriberId: string) {
    const result = await this.novu.subscribers.get(subscriberId);
    return result.data;
  }

  async deleteSubscriber(subscriberId: string) {
    const result = await this.novu.subscribers.delete(subscriberId);
    return result.data;
  }

  async updateSubscriber(subscriber: SubscriberDto) {
    console.log('subscriber updated', subscriber);
    await firstValueFrom(
      from(
        this.novu.subscribers.update(subscriber.subscriberId, {
          email: subscriber.email,
          firstName: subscriber.firstName,
          lastName: subscriber.lastName,
          phone: `+254${subscriber.phone}`,
          locale: 'en-KE',
        }),
      ),
    )
      .then((result) => {
        this.logger.log('Subscriber updated', result.status);
      })
      .catch((err) => {
        this.logger.error('Subscriber update error', err);
      });
  }
}
