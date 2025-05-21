export interface TriggerResponse {
  acknowledged: boolean;
  status:
    | 'error'
    | 'trigger_not_active'
    | 'no_workflow_active_steps_defined'
    | 'no_workflow_steps_defined'
    | 'processed'
    | 'no_tenant_found'
    | 'invalid_recipients';
  error?: string[];
  transactionId?: string;
}
