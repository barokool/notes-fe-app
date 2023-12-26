import { IBaseModel } from "./model";

export interface INote extends IBaseModel {
  title: string;
  content: string;
  completed: boolean;
}
