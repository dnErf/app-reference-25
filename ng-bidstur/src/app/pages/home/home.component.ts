import { Component } from '@angular/core';
import {Auction, AuctionService} from '../../services/auction.service';
import {Observable} from 'rxjs';
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
    auctions = [] as Auction[];
    $auctions = new Observable<Auction[]>();
    constructor(private auctionService: AuctionService) { }

    ngOnInit() {
        // this.$auctions = this.auctionService.getAuctions();
        // this.$auctions.subscribe(results => {
        //     this.auctions = results;
        // })
        this.auctions = [
            {
                id: "12acdb94-51a0-4d26-b8a8-1a38da68730a",
                userId: "7669cc9c-8890-43a8-a4ff-7a6611467c85",
                title: "test auction 1",
                picSrc: "https://picsum.photos/id/20/300/200",
                startingBid: 999.99,
                currentBid: 999.99,
                intervalBid: 999.99,
                endAt: "12/30/9999"
            },
            {
                id: "d19ba77a-98fc-4990-82fe-b298081bdaa4",
                userId: "6530a317-20e1-412f-be8a-0dbd462eeb77",
                title: "test auction 2",
                picSrc: "https://picsum.photos/id/20/300/200",
                startingBid: 999.99,
                currentBid: 999.99,
                intervalBid: 999.99,
                endAt: "12/30/9999"
            },
            {
                id: "94683b9a-c756-483c-8326-e2fcbf8c4d7b",
                userId: "4a2a1665-9acb-4f02-a55f-306278067efd",
                title: "test auction 3",
                picSrc: "https://picsum.photos/id/20/300/200",
                startingBid: 999.99,
                currentBid: 999.99,
                intervalBid: 999.99,
                endAt: "12/30/9999"
            },
            {
                id: "31673ad6-8799-4bc5-a99f-7869d95e6766",
                userId: "1f47b674-5e0d-43ff-b7bc-fd2d839b3039",
                title: "test auction 4",
                picSrc: "https://picsum.photos/id/20/300/200",
                startingBid: 999.99,
                currentBid: 999.99,
                intervalBid: 999.99,
                endAt: "12/30/9999"
            }
        ]
    }
}
