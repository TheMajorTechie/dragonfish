import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { WorkPageState } from './work-page.state';
import { WorkPageStore } from './work-page.store';
import { Pseudonym } from '@dragonfish/shared/models/accounts';

@Injectable({ providedIn: 'root' })
export class WorkPageQuery extends Query<WorkPageState> {
    public state$ = this.select();
    public content$ = this.select('content');
    public ratings$ = this.select('ratings');
    public wordCount$ = this.select('wordCount');

    constructor(protected store: WorkPageStore) {
        super(store);
    }

    public get contentTitle() {
        return this.getValue().content.title;
    }

    public get contentId() {
        return this.getValue().content._id;
    }

    public get contentKind() {
        return this.getValue().content.kind;
    }

    public get currRating() {
        return this.getValue().selectedRating;
    }

    public get authorId() {
        const author = this.getValue().content.author as Pseudonym;
        return author._id;
    }

    public get author() {
        return this.getValue().content.author as Pseudonym;
    }

    public get wordCount() {
        return this.getValue().content.stats.words;
    }

    public get likes() {
        return this.getValue().content.stats.likes;
    }

    public get dislikes() {
        return this.getValue().content.stats.dislikes;
    }
}