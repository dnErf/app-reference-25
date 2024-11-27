import {Component, inject} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Auction, AuctionService} from '../../services/auction.service';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-auction-detail',
    imports: [],
    templateUrl: './auction-detail.component.html',
    styleUrl: './auction-detail.component.css'
})
export class AuctionDetailComponent {
    card = 'bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100'

    activatedRoute = inject(ActivatedRoute);
    auctionService = inject(AuctionService);
    $auction = new Observable<Auction>();
    auction = new Auction();

    ngOnInit() {
        let id = this.activatedRoute.snapshot.paramMap.get('id');
        console.log(id)

        if (id !== null) {
            // dev
            // id = "ead84f33-3f6d-42b4-820b-1ef6c8cb7c70";
            // this.$auction = this.auctionService.getSingleAuction(id);
            // this.$auction.subscribe((results) => {
            //     console.log(results)
            // });
            // -
            this.auction = {
                id: "d19ba77a-98fc-4990-82fe-b298081bdaa4",
                userId: "6530a317-20e1-412f-be8a-0dbd462eeb77",
                title: "test auction 2",
                picSrc: "https://picsum.photos/id/20/300/200",
                startingBid: 9.99,
                currentBid: 99.99,
                intervalBid: 999.99,
                endAt: "12/30/9999"
            }
            // -
        }
    }
}
