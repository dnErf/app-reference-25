import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

export class Auction {
    id = ""
    userId = ""
    title = ""
    picSrc = ""
    startingBid = 0
    currentBid = 0
    intervalBid = 0
    endAt = ""
}

@Injectable({ providedIn: 'root' })
export class AuctionService {
    private ep = "ep/auctions"

    constructor(private http: HttpClient) { }

    getAuctions(): Observable<Auction[]> {
        return this.http.get<Auction[]>(`${environment.apiUrl}/${this.ep}`)
    }

    getSingleAuction(id: string): Observable<Auction> {
        return this.http.get<Auction>(`${environment.apiUrl}/${this.ep}/${id}`)
    }

    saveNewAuction(auction: Auction): Observable<Auction[]> {
        console.log('saveNewAuction');
        console.log(auction);
        return this.http.post<Auction[]>(`${environment.apiUrl}/${this.ep}`, auction)
    }
}
