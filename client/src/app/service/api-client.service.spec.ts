// @ts-nocheck
import { ApiClientService } from './api-client.service';

import { HttpClient } from '@angular/common/http';
import '@angular/compiler';
import { of } from 'rxjs';
//import { MockService } from 'ng-mocks';

const tripList = [
  {
    _id: '63e464b7a3d364f4327c7a9f',
    trip: [
      {
        segments: [
          {
            departure: {
              iataCode: 'DAC',
              at: '2023-02-10T19:35:00',
              _id: '63e464b7a3d364f4327c7aa2',
            },
            arrival: {
              iataCode: 'DOH',
              at: '2023-02-10T22:35:00',
              _id: '63e464b7a3d364f4327c7aa3',
            },
            _id: '63e464b7a3d364f4327c7aa1',
          },
          {
            departure: {
              iataCode: 'DOH',
              at: '2023-02-11T02:15:00',
              _id: '63e464b7a3d364f4327c7aa5',
            },
            arrival: {
              iataCode: 'AUH',
              at: '2023-02-11T04:20:00',
              _id: '63e464b7a3d364f4327c7aa6',
            },
            _id: '63e464b7a3d364f4327c7aa4',
          },
        ],
        price: '520.91',
        _id: '63e464b7a3d364f4327c7aa0',
      },
    ],
    user: 'bd@gmail.com',
    __v: 0,
  },
];

const resProfile = {
  _id: '63e46479a3d364f4327c7a9b',
  firstName: 'BD',
  lastName: 'bd',
  email: 'bd@gmail.com',
  password: '$2b$10$tfzZuZ6snqkQjBp3x/QNOu7ZeElNwFFcpmkz4HWBzDSHmc6F9/AuC',
  dob: '2005-02-08T18:00:00.000Z',
  phoneNumber: '123',
  country: 'Afghanistan',
  passport: '123',
  __v: 0,
};

const auth = {
  email: 'test@gmail.com',
  password: '123456',
};

let apiClient: HttpClient;
describe('API Client Service', () => {
  const http = { get: jest.fn(() => of(tripList)) };
  const auth = { post: jest.fn(() => of(login)) };
  let service: ApiClientService;
  const provide = (mock: any): any => mock;

  service = new ApiClientService(provide(http) as any, provide(auth) as any);
  test('Should call the APi with URL "https://awayfly.fly.dev/tripList"', () => {
    let result = service.getTripList().subscribe((airports) => {
      // expect(http.get).toHaveBeenCalled();
      expect(http.get).toHaveBeenCalledWith('https://awayfly.fly.dev/tripList');
    });
  });

  it('SHould call the tripList api', () => {
    service.getTripList().subscribe((airports) => {
      expect(http.get).toHaveBeenCalled();
    });
  });

  it('Should return a response', () => {
    service.getTripList().subscribe((airports) => {});
  });

  it('Should get the user profile', () => {
    service.getProfile().subscribe((res) => {
      expect(res).toEqual(resProfile);
    });
  });
});
