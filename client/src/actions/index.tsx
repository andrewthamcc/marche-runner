export interface IAction {
  type: string;
  payload?: any;
}

export type Dispatch = (action: IAction) => void;
