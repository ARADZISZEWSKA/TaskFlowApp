export interface Task {
    id?: string; 
    taskName: string;
    description: string;
    projectId: string;
    assignedUserId: string;
    deadline: Date;
    status: string;
}
