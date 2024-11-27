import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import {AuctionDetailComponent} from './pages/auction-detail/auction-detail.component';
import {AuctionFormComponent} from './pages/auction-form/auction-form.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'auctions/:id', component: AuctionDetailComponent },
    { path: 'auction-form', component: AuctionFormComponent }
];
