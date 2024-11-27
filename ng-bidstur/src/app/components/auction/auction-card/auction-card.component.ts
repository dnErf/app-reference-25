import {Component, input} from '@angular/core';
import {Auction} from '../../../services/auction.service';

@Component({
    selector: 'app-auction-card',
    imports: [],
    templateUrl: './auction-card.component.html',
    styleUrl: './auction-card.component.css'
})
export class AuctionCardComponent {
    auction = input.required<Auction>();

    ngOnInit() {
        console.log("card===")
    }
}
