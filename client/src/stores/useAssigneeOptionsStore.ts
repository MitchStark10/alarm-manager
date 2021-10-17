import create from 'zustand';

interface AssigneeOptionsStore {
    assigneeOptions: string[];
    setAssigneeOptions: (assigneeOptions: string[]) => void;
}

export const useAssigneeOptionsStore = create<AssigneeOptionsStore>((set) => ({
    assigneeOptions: [],
    setAssigneeOptions: (assigneeOptions: string[]) => set({assigneeOptions}),
}));


