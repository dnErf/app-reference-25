import {Component, inject} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {Auction, AuctionService} from '../../services/auction.service';

@Component({
  selector: 'app-auction-form',
    imports: [
        ReactiveFormsModule
    ],
  templateUrl: './auction-form.component.html',
  styleUrl: './auction-form.component.css'
})
export class AuctionFormComponent {
    auctionService = inject(AuctionService);
    formBuilder = inject(FormBuilder);
    f = this.formBuilder.group({
        title: ['', Validators.required],
        picSrc: [''],
        startingBid: [0],
        intervalBid: [0]
    });

    onSubmit() {
        let { title, startingBid } = this.f.value;

        if (title === null || title === undefined) {
            return
        }

        if (startingBid === 0 || startingBid === null || startingBid === undefined) {
            return
        }

        let auction = new Auction();
        auction.title = title;
        auction.startingBid = startingBid;

        this.auctionService.saveNewAuction(auction).subscribe({ error: console.log });
    }
}
