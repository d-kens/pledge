import { TriggerRecipientsTypeEnum } from "@novu/node";


export class NotificationDto {
  subscriberId: string;
  workflowId: string;
  to: { key: TriggerRecipientsTypeEnum; name: string } = {
    key: TriggerRecipientsTypeEnum.SUBSCRIBER,
    name: 'Default Recipient',
  };
  payload: any;
  attachments?: { file: string; name: string; mime: string }[];
}
