import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DiscoverService {
  private zodiacTarotList = [
    { sign: 'Ariete', startTimestamp: "2000-03-21T00:00:00", endTimestamp: "2000-04-19T23:59:59", tarotCard: 'Il Carro' },
    { sign: 'Toro', startTimestamp: "2000-04-20T00:00:00", endTimestamp: "2000-05-20T23:59:59", tarotCard: 'L’Imperatore' },
    { sign: 'Gemelli', startTimestamp: "2000-05-21T00:00:00", endTimestamp: "2000-06-20T23:59:59", tarotCard: 'Gli Amanti' },
    { sign: 'Cancro', startTimestamp: "2000-06-21T00:00:00", endTimestamp: "2000-07-22T23:59:59", tarotCard: 'La Luna' },
    { sign: 'Leone', startTimestamp: "2000-07-23T00:00:00", endTimestamp: "2000-08-22T23:59:59", tarotCard: 'La Forza' },
    { sign: 'Vergine', startTimestamp: "2000-08-23T00:00:00", endTimestamp: "2000-09-22T23:59:59", tarotCard: 'L’Eremita' },
    { sign: 'Bilancia', startTimestamp: "2000-09-23T00:00:00", endTimestamp: "2000-10-22T23:59:59", tarotCard: 'La Giustizia' },
    { sign: 'Scorpione', startTimestamp: "2000-10-23T00:00:00", endTimestamp: "2000-11-21T23:59:59", tarotCard: 'La Morte' },
    { sign: 'Sagittario', startTimestamp: "2000-11-22T00:00:00", endTimestamp: "2000-12-21T23:59:59", tarotCard: 'La Temperanza' },
    { sign: 'Capricorno', startTimestamp: "2000-12-22T00:00:00", endTimestamp: "2001-01-19T23:59:59", tarotCard: 'Il Diavolo' },
    { sign: 'Acquario', startTimestamp: "2001-01-20T00:00:00", endTimestamp: "2001-02-18T23:59:59", tarotCard: 'La Stella' },
    { sign: 'Pesci', startTimestamp: "2001-02-19T00:00:00", endTimestamp: "2001-03-20T23:59:59", tarotCard: 'Il Mondo' }
  ];

  constructor() {}

  getTarotCardForZodiacSign(date: Date): string {
    const zodiacSign = this.getZodiacSign(date);
    return this.zodiacTarotList.find(z => z.sign === zodiacSign)?.tarotCard || 'Carta sconosciuta';
  }

  getZodiacSign(date: Date): string {
    const birthYear = date.getFullYear();
    const birthTimestamp = date.getTime(); 

    const zodiac = this.zodiacTarotList.find(z => {
      const startDate = new Date(z.startTimestamp);
      const endDate = new Date(z.endTimestamp);

      startDate.setFullYear(birthYear);
      endDate.setFullYear(birthYear);

      if (startDate > endDate) {
        return birthTimestamp >= startDate.getTime() || birthTimestamp <= endDate.getTime();
      }

      return birthTimestamp >= startDate.getTime() && birthTimestamp <= endDate.getTime();
    });

    return zodiac ? zodiac.sign : 'Sconosciuto';
  }
}
