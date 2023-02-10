// @ts-nocheck
import { HttpClient } from '@angular/common/http';
import '@angular/compiler';
import { of } from 'rxjs';
import { AmadeusService } from './amadeus.service';
const airportsMocks = [
  {
    name: 'Londolovit Airport',
    city: 'Londolovit',
    iata: 'LNV',
  },
];
let apiClient: HttpClient;
describe('AmadeusService', () => {
  const http = { get: jest.fn(() => of(airportsMocks)) };
  let service: AmadeusService;
  const provide = (mock: any): any => mock;
  service = new AmadeusService(provide(http) as any);

  test('should fetch a list of airports', () => {
    let result = service.airportSearch('dhaka').subscribe((airports) => {
      // expect(http.get).toHaveBeenCalled();
      expect(http.get).toHaveBeenCalledWith(
        'https://awayfly.fly.dev/aiport/dhaka'
      );
    });
  });

  it('should fetch a list of airports with given iata code', () => {
    service.airportRoute('dhaka').subscribe((airports) => {
      expect(http.get).toHaveBeenCalled();
    });
  });

  it('should fetch a list of options', () => {
    service.searchFlight('dhaka').subscribe((airports) => {});
  });

  test('should Call the airport route with iataCode', () => {
    let result = service.airportRoute('DAC').subscribe((airports) => {
      // expect(http.get).toHaveBeenCalled();
      expect(http.get).toHaveBeenCalledWith(
        'https://awayfly.fly.dev/search-airports-routes/DAC'
      );
    });
  });
  it('should Call the Amadeus APi', () => {
    service.airportRoute('DAC').subscribe((airports) => {
      // expect(http.get).toHaveBeenCalled();
      expect(http.get).toHaveBeenCalled();
    });
  });
});

//'https://awayfly.fly.dev/search-airports-routes/${iataCode}'
