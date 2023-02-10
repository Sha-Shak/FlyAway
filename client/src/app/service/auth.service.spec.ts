//@ts-nocheck
import { HttpClient } from '@angular/common/http';
import '@angular/compiler';
import { of } from 'rxjs';
import { AuthService } from './auth.service';

const loginMocks = {
  email: 'test@gmail.com',
  password: '123456',
};

// const user = "bd@gmail.com";

const profile = {
  firstName: 'BD',
  lastName: 'bd',
  email: 'bd@gmail.com',
  password: '$2b$10$tfzZuZ6snqkQjBp3x/QNOu7ZeElNwFFcpmkz4HWBzDSHmc6F9/AuC',
  dob: '2005-02-08T18:00:00.000Z',
  phoneNumber: '123',
  country: 'Afghanistan',
  passport: '123',
};

let apiClient: HttpClient;
describe('Auth service', () => {
  const http = { post: jest.fn(() => of(loginMocks)) };
  let service: AuthService;
  const provide = (mock: any): any => mock;
  service = new AuthService(provide(http) as any);

  test('should call login the signin endpoint ', () => {
    let result = service
      .login('test@gmail.com', '123456')
      .subscribe((airports) => {
        // expect(http.get).toHaveBeenCalled();
        expect(http.post).toHaveBeenCalledWith(
          'https://flyaway.fly.dev/signin'
        );
      });
  });

  it('should call the login at least once', () => {
    service.login('test@gmail.com', '123456').subscribe((airports) => {
      expect(http.post).toHaveBeenCalled();
    });
  });

  it('Should call the signup endpoint', () => {
    service.signUp(profile).subscribe((res) => {
      expect(http.post).toHaveBeenCalledWith('https://flyaway.fly.dev/signup');
    });
  });

  it('Should call the signup at least once', () => {
    service.signUp(profile).subscribe((res) => {
      expect(http.post).toHaveBeenCalled();
    });
  });

  it('should return a response after signup', () => {
    service.signUp(profile).subscribe((res) => {
      expect(res).toEqual({ message: 'Sign up successful' });
    });
  });
});
