import {Observable} from 'rxjs';
import {Component, inject} from '@angular/core';
import {Auction, AuctionService} from '../../services/auction.service';
import {AuctionCardComponent} from '../../components/auction/auction-card/auction-card.component';

@Component({
  selector: 'app-home',
    imports: [
        AuctionCardComponent
    ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
    auctionService = inject(AuctionService);
    $auctions = new Observable<Auction[]>();
    auctions = [] as Auction[];

    ngOnInit() {
        this.$auctions = this.auctionService.getAuctions();
        this.$auctions.subscribe(results => {
            console.log(results);
            this.auctions = results;
        })
    }
}
