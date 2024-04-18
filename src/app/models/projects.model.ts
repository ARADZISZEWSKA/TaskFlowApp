import { User } from "./user.model";

export class Project {
    id: string;
    projectName: string;
    description: string;
    deadline: Date;
    createdBy:string;
    taskIds: string[];
    members: string[];

    constructor(id: string = '', projectName: string = '', description: string = '', deadline: Date = new Date(), taskIds: string[] = [], members: string[] = [], createdBy: string='') {
        this.id = id;
        this.projectName = projectName;
        this.description = description;
        this.deadline = deadline;
        this.taskIds = taskIds;
        this.members = members;
        this.createdBy=createdBy;
    }
}
