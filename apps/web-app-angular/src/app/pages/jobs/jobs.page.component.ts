import { Component, OnInit, WritableSignal, signal } from '@angular/core';
import { JobCardComponent } from './components/job-card/job-card.component';
import { Apollo, gql } from 'apollo-angular';
import { map, tap } from 'rxjs';

@Component({
    selector: 'app-jobs.page',
    standalone: true,
    imports: [JobCardComponent],
    templateUrl: './jobs.page.component.html',
    styleUrl: './jobs.page.component.scss',
})
export class JobsPageComponent implements OnInit {
    jobs: WritableSignal<any[]> = signal([]);

    constructor(readonly apollo: Apollo) {}

    ngOnInit() {
        console.log('apolo');
        this.apollo
            .watchQuery({
                query: gql`
                    query {
                        jobs {
                            _id
                            urls
                            original {
                                text
                            }
                            date
                            location
                            jobTitle
                            jobDescription
                            tags
                            hasRemote
                            hasFrontend
                        }
                    }
                `,
            })
            .valueChanges.pipe(map((result: any) => result.data && result.data.jobs))
            .subscribe((jobs) => this.jobs.set(jobs));
    }
}
