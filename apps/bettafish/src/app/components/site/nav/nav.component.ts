import { AfterViewChecked, AfterViewInit, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { FrontendUser, Roles } from '@dragonfish/shared/models/users';
import { UserState } from '../../../repo/user';
import { isAllowed } from '@dragonfish/shared/functions';
import { AuthModalComponent } from '../../auth/auth-modal/auth-modal.component';
import { AuthService } from '../../../repo/auth/services';
import { ElectronService } from 'ngx-electron';
import { PopupComponent } from '@dragonfish/client/ui';
import { PopupModel } from '@dragonfish/shared/models/util';
import { SidenavService } from '../../../services';

@Component({
    selector: 'dragonfish-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.scss']
})
export class NavComponent {
    @Select(UserState.currUser) currentUser$: Observable<FrontendUser>;

    constructor(
        private dialog: MatDialog,
        public electron: ElectronService,
        public sidenavService: SidenavService,
    ) {}

    openAuthModal() {
        this.dialog.open(AuthModalComponent);
    }

    canSeeDash(userRoles: Roles[]) {
        return isAllowed(userRoles, [Roles.Admin, Roles.Moderator, Roles.WorkApprover]);
    }
}