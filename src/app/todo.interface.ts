//the variables with a ? are optional
//note: optional here does not mean optional to the user, but to the developer

export interface Todo {
  //required:
  name: string;
  isCompleted: boolean;
  isUrgent: boolean;
  isImportant: boolean;
  description: string;
  //optional:
  dueDate?: Date;
}