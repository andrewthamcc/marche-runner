export interface Meal {
  _id: string;
  name: string;
  description: string;
  type: string;
  user: string;
  date: string;
  __v: number;
}

export interface AddMealData {
  name: string;
  date: string;
  description?: string;
  type: string;
}
