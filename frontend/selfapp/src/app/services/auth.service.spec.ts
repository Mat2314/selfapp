import { HttpClient, HttpClientModule } from '@angular/common/http';
import { getTestBed, TestBed } from '@angular/core/testing';
import { registrationData } from '../interfaces/registrationData.interface';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let injector: TestBed;
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });
    injector = getTestBed();
    service = injector.get(AuthService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should save access and refresh token in localStorage', () => {
    var testTokens = { access: "access123", refresh: "refresh456" };
    service.setTokens(testTokens);

    var accessToken = localStorage.getItem('JWT_TOKEN');
    var refreshToken = localStorage.getItem('REFRESH_TOKEN');

    expect(accessToken).toEqual("access123");
    expect(refreshToken).toEqual("refresh456");
  });


  it('should create a new account', () => {
    var registration_data: registrationData = {
      username: "TestUsername123",
      first_name: "TestFirstName",
      last_name: "TestLastName",
      password: "TestPassword123",
      repeat_password: "TestPassword123"
    }

    service.registerUser(registration_data).subscribe(res => {
      expect(res.ok).toEqual("User account created");
    });

    var expected_response = {
      ok: "User account created",
      message: "Account created successfully!"
    };

    const req = httpMock.expectOne(`${service.apiUrl}/auth/registration/`);
    expect(req.request.method).toBe("POST");
    req.flush(expected_response);
  });

  it('should log in to the account', () => {
    var login_data = { username: "TestUsername123", password: "TestPassword123" };
    service.loginUser(login_data).subscribe(res => {
      expect(Object.keys(res).length).toEqual(2);
    });

    var expected_response = {
      access: "access123",
      refresh: "refresh456"
    };

    const req = httpMock.expectOne(`${service.apiUrl}/auth/token/`);
    expect(req.request.method).toBe("POST");
    req.flush(expected_response);

  });

});
