export class NotificationDto {
  subscriberId: string;
  workflowId: string;
  to: {
    subscriberId: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
  };
  payload: Record<string, unknown>;
  attachments?: { file: string; name: string; mime: string }[];
}
