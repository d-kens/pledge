export class CreateSubscriberDto {
  subscriberId: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  avatar?: string;
  timezone?: string;
  locale?: string;
  data?: Record<string, unknown>;
}

export interface CreateSubscriberResponse {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  avatar?: string;
  locale?: string;
  topics?: string[];
  isOnline?: boolean;
  lastOnlineAt?: string;
  v?: number;
  data?: {
    [k: string]: unknown;
  } | null;
  timezone?: string;
  subscriberId: string;
  organizationId: string;
  environmentId: string;
  deleted: boolean;
  createdAt: string;
  updatedAt: string;
}
