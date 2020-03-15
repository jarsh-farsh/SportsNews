import { Comment } from 'src/app/Models/Comment';
import { User } from './User';

export class Article{

    id: string;
    type: string;
    title: string;
    datePosted: Date;
    dateEdited: Date;
    body: string;
    author: User;
    images: string[];
    feedback: Feedback;
    comments: Comment[]
}

export class Feedback{
    id: string;
    likes: number;
    dislikes: number;

    constructor(){
        this.likes = 0;
        this.dislikes = 0;
    }
}

export class Vote{
    id: string;
    feedbackId: string;
    userId: string;
    vote: string;
}