export class CreateTaskDto {
    readonly id?: string;
    readonly title: string = '';
    readonly description: string = '';
    readonly dueDate?: Date;
    readonly tags?: string[];

    constructor(data: Partial<CreateTaskDto>) {
        this.id = data.id;
        this.title = data.title || '';
        this.description = data.description || '';
        this.dueDate = data.dueDate;
        this.tags = data.tags || [];
    }
}
