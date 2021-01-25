import { TestBed } from '@angular/core/testing';

import { ValidateService } from './validate.service';

describe('ValidateService', () => {
  let service: ValidateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it ('should validate register', () => {
    let user = {}
    expect(service.validateRegister(user)).toBeFalsy();
    user = {
      name: 'Adrian',
      username: 'Adrian',
      email: 'Adrian@gmail.com',
      password: 'Adrian'
    }
    expect(service.validateRegister(user)).toBeTruthy();
  });

  it ('should validate email', () => {
    expect(service.validateEmail('asdasdas')).toBeFalsy();
    expect(service.validateEmail('Adrian@gmail.com')).toBeTruthy();
  });

});
