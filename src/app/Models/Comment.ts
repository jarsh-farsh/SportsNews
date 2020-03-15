import { User } from './User';
import { Feedback } from './Article';

export class Comment{
    id: string;
    body: string;
    dateCreated: Date;
    dateEdited: Date;
    user: User;
    feedback: Feedback;
    comments: Comment[]
}