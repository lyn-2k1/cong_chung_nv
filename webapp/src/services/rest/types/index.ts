export interface WorkTypeFlow {
  id: number;
  workTypeId: number;
  workFlowId: number;
  WorkFlow: WorkFlow;
}

export interface WorkFlow {
  id: number;
  Key: string;
  Name: string;
}
