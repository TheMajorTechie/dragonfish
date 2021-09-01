import { Component, HostListener, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ThemePref } from '@dragonfish/shared/models/users';
import { NavigationEnd, Router } from '@angular/router';
import { SessionQuery } from '@dragonfish/client/repository/session';
import { AuthService } from '@dragonfish/client/repository/session/services';
import { AppQuery } from '@dragonfish/client/repository/app';
import { DragonfishElectronService } from '@dragonfish/client/services';
import { isMobile } from '@dragonfish/shared/functions';

@UntilDestroy()
@Component({
    selector: 'dragonfish-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    mobileMode = false;
    showNav = true;

    constructor(
        private auth: AuthService,
        private router: Router,
        public sessionQuery: SessionQuery,
        private appQuery: AppQuery,
        public electron: DragonfishElectronService,
    ) {
        this.onResize();
    }

    ngOnInit(): void {
        this.appQuery.theme$.pipe(untilDestroyed(this)).subscribe((theme) => {
            const body = document.getElementsByTagName('body')[0];
            const currTheme = body.classList.item(0);
            const html = document.getElementsByTagName('html')[0];
            if (ThemePref[theme] !== null && ThemePref[theme] !== undefined) {
                if (
                    ThemePref[theme] == 'dark-aqua' ||
                    ThemePref[theme] == 'dark-crimson' ||
                    ThemePref[theme] == 'dark-field' ||
                    ThemePref[theme] == 'dark-royal' ||
                    ThemePref[theme] === 'dusk-autumn'
                ) {
                    body.classList.replace(currTheme, ThemePref[theme]);
                    html.classList.add('dark');
                } else {
                    body.classList.replace(currTheme, ThemePref[theme]);
                    html.classList.remove('dark');
                }
            } else {
                body.classList.replace(currTheme, 'crimson');
            }
        });

        this.router.events.pipe(untilDestroyed(this)).subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.showNav =
                    this.router.url !== '/registration' &&
                    this.router.url !== '/registration/select-pseud' &&
                    this.router.url !== '/registration/setup-pseud';
            }
        });
    }

    @HostListener('window:resize', ['$event'])
    onResize() {
        this.mobileMode = isMobile();
    }
}
