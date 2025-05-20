import { Injectable } from '@nestjs/common';
import { InjectNovu } from '../novu/novu.provider';
import { Novu, TriggerRecipientsTypeEnum } from '@novu/node';
import { Topic } from './topic';

@Injectable()
export class TopicsService {
    constructor(@InjectNovu() private readonly novu: Novu) {}

  async createTopic(topic: Topic) {
    const result = await this.novu.topics.create({
      key: topic.key,
      name: topic.name,
    });

    return result.data;
  }

  async getAllTopics() {
    const result = await this.novu.topics.list({});

    return result.data;
  }

  async getTopicByKey(key: string) {
    const result = await this.novu.topics.get(key);

    return result.data;
  }

  async renameTopic(topic: Topic) {
    const result = await this.novu.topics.rename(topic.key, topic.name);

    return result.data;
  }

  async addTopicSubscriber(key: string, subscribers: string[]) {
    const result = await this.novu.topics.addSubscribers(key, {
      subscribers: subscribers,
    });

    return result.data;
  }

  async checkTopicSubscriber(key: string, subscriberId: string) {
    const result = await this.novu.topics.getSubscriber(key, subscriberId);

    return result.data;
  }

  async removeTopicSubscriber(key: string, subscribers: string[]) {
    const result = await this.novu.topics.removeSubscribers(key, {
      subscribers: subscribers,
    });

    return result.data;
  }

  async sendTopicNotification(key: string, description: string) {
    const result = await this.novu.trigger('email-quickstart', {
      to: [{ type: TriggerRecipientsTypeEnum.TOPIC, topicKey: key }],
      payload: { description },
    });

    return result.data;
  }

  async deleteTopic(key: string) {
    const result = await this.novu.topics.delete(key);

    return result.data;
  }
}
