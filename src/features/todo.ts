import { v4 as uuidv4 } from "uuid";

enum ACTIONS {
  ADD = "ADD",
  REMOVE = "REMOVE",
  EDIT = "EDIT",
  VIEW_LIST = "VIEW_LIST",
}

interface ITodoList<T> {
  id: string;
  task: T;
}

interface IActions<T> {
  action: ACTIONS;
  add?: T;
  edit?: ITodoList<T>;
  remove?: string;
}

class Dispatch<T> {
  private todoList: ITodoList<T>[] = [];

  add(task: T): ITodoList<T>[] {
    const newTask: ITodoList<T> = {
      id: uuidv4(),
      task: task,
    };
    this.todoList = [...this.todoList, newTask];
    this.logAction(ACTIONS.ADD, newTask);
    return this.todoList;
  }

  remove(removeId: string): ITodoList<T>[] {
    const updatedTodoList = this.todoList.filter(
      (task) => task.id !== removeId
    );
    if (updatedTodoList.length === this.todoList.length) {
      console.warn(`Task with ID ${removeId} not found.`);
    }
    this.todoList = updatedTodoList;
    this.logAction(ACTIONS.REMOVE, { id: removeId });
    return this.todoList;
  }

  edit(edit: ITodoList<T>): ITodoList<T>[] {
    const { id, task } = edit;
    let found = false;
    const updatedTaskList = this.todoList.map((tasks) => {
      if (tasks.id === id) {
        found = true;
        return { ...tasks, task };
      }
      return tasks;
    });
    if (!found) {
      console.warn(`Task with ID ${id} not found.`);
    }
    this.todoList = updatedTaskList;
    this.logAction(ACTIONS.EDIT, edit);
    return this.todoList;
  }

  viewList(): ITodoList<T>[] {
    console.log(this.todoList);
    return this.todoList;
  }

  actions({ action, add, edit, remove }: IActions<T>): ITodoList<T>[] | null {
    switch (action) {
      case ACTIONS.ADD:
        return add ? this.add(add) : null;
      case ACTIONS.EDIT:
        return edit ? this.edit(edit) : null;
      case ACTIONS.REMOVE:
        return remove ? this.remove(remove) : null;
      case ACTIONS.VIEW_LIST:
        return this.viewList();
      default:
        console.warn(`Action ${action} is not recognized.`);
        return null;
    }
  }

  private logAction(action: ACTIONS, details: any) {
    console.log(`Action: ${action}`, details);
  }
}

const dispatch = new Dispatch<string>();

dispatch.actions({ action: ACTIONS.ADD, add: "STUDY" });
dispatch.actions({
  action: ACTIONS.EDIT,
  edit: {
    id: "non-existent-id",
    task: "SLEEP",
  },
});
dispatch.actions({
  action: ACTIONS.REMOVE,
  remove: "non-existent-id",
});
dispatch.actions({ action: ACTIONS.VIEW_LIST });
