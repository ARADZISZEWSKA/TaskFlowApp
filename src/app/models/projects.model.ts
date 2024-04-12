export class Project {
    id: string;
    projectName: string;
    description: string;
    deadline: Date;
    taskIds: string[];
    members: string[];

    constructor(id: string = '', projectName: string = '', description: string = '', deadline: Date = new Date(), taskIds: string[] = [], members: string[] = []) {
        this.id = id;
        this.projectName = projectName;
        this.description = description;
        this.deadline = deadline;
        this.taskIds = taskIds;
        this.members = members;
    }
}
