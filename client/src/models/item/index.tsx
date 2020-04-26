import { categoryType } from "../../components/Category-List";

export interface Item {
  purchased: boolean;
  _id: string;
  name: string;
  category: string;
  user: string;
  __v: number;
}

export interface AddItemData {
  name: string;
  category: categoryType;
}
