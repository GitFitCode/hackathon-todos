//the variables with a ? are optional
//note: optional here does not mean optional to the user, but to the developer

//note: 0 value on Date properties is == to null

export interface Todo {
  //required:
  name: string;
  isCompleted: boolean;
  isUrgent: boolean;
  isImportant: boolean;
  description: string;

  //optional:
  createdDate?: number;
  completedDate?: number;
  deletedDate?: number;
  dueDate?: number;
}