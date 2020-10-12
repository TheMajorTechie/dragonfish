import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent, LatestComponent, WatchingPageComponent, CollectionsComponent, WorksComponent,
    BlogsComponent, InboxComponent, SettingsComponent, HistoryPageComponent, AlertsComponent } from './pages/home';
  
  import { PortfolioComponent, PortHomeComponent, PortBlogComponent, PortBlogPageComponent,
    PortWorksComponent, PortCollectionsComponent, PortCollectionPageComponent } from './pages/portfolio';
  
  import { WorkPageComponent, SectionPageComponent, NewSectionComponent } from './pages/work-page';
  
  import { BrowseComponent, GroupsComponent, NewsComponent } from './pages';
  
  import { DocsPageComponent, SiteStaffComponent } from './pages/docs-page';
  
  import { RegisterComponent } from './pages/account';
  
  import { AuthGuard } from './services/auth';
  import { SearchComponent, FindUsersComponent, FindBlogsComponent, FindWorksComponent } from './pages/search';

const routes: Routes = [
    {path: '', redirectTo: '/home/latest', pathMatch: 'full'},
    {path: 'home', component: HomeComponent, children: [
      {path: '', children: [
        {path: 'latest', component: LatestComponent},
        {path: 'watching', canActivate: [AuthGuard], component: WatchingPageComponent},
        {path: 'collections', canActivate: [AuthGuard], component: CollectionsComponent},
        {path: 'history', canActivate: [AuthGuard], component: HistoryPageComponent},
        {path: 'works', canActivate: [AuthGuard], component: WorksComponent},
        {path: 'blogs', canActivate: [AuthGuard], component: BlogsComponent},
        {path: 'conversations', canActivate: [AuthGuard], component: InboxComponent},
        {path: 'settings', canActivate: [AuthGuard], component: SettingsComponent},
        {path: 'alerts', canActivate: [AuthGuard], component: AlertsComponent},
        {path: '', redirectTo: '/home/latest', pathMatch: 'full'},
      ]}
    ]},
    {path: 'browse', component: BrowseComponent},
    {path: 'groups', component: GroupsComponent},
    {path: 'news', component: NewsComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'portfolio/:id/:username', component: PortfolioComponent, children: [
      {path: 'blog', component: PortBlogComponent},
      {path: 'blog/:blogId', component: PortBlogPageComponent},
      {path: 'works', component: PortWorksComponent },
      {path: 'collections', component: PortCollectionsComponent},
      {path: 'collection/:collId', component: PortCollectionPageComponent},
      {path: '', component: PortHomeComponent},
    ]},
    {path: 'work/:workId/:title', component: WorkPageComponent, children: [    
      {path: ':sectionNum/:sectionTitle', component: SectionPageComponent},    
      {path: 'new-section', canActivate: [AuthGuard], component: NewSectionComponent}
    ]},
    {path: 'search', component: SearchComponent, children: [
      {path: 'users', component: FindUsersComponent},
      {path: 'blogs', component: FindBlogsComponent},
      {path: 'works', component: FindWorksComponent},
    ]},
    {path: 'site-staff', component: SiteStaffComponent},
    {path: 'docs/:docId', component: DocsPageComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {anchorScrolling: 'enabled'})],
    exports: [RouterModule]
})
export class AppRoutingModule {}