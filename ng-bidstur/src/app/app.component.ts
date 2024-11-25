import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Auction, AuctionService} from './services/auction.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
    title = 'ng-bidstur';
    $auctions!: Observable<Auction[]>;

    constructor(private auctionService: AuctionService) { }

    ngOnInit() {
        this.$auctions = this.auctionService.getAuctions();

        this.$auctions.subscribe(results => {
            console.log(results);
        })
    }
}
