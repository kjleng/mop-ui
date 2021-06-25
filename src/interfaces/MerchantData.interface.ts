import PlatformDetailsData from './PlatformDetailsData.interface';
import WorkflowStateData from './WorkflowStatesData.interface';

export default interface MerchantData {
  merchantHash: string;
  answers: PlatformDetailsData;
  states: WorkflowStateData;
}
