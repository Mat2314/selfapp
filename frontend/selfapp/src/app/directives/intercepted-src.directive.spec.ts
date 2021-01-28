import { HttpClient } from '@angular/common/http';
import { ElementRef } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { InterceptedSrcDirective } from './intercepted-src.directive';

describe('InterceptedSrcDirective', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      // declarations: [WelcomeComponent],
      providers: [
        { provide: HttpClient, useValue: {} },
        { provide: ElementRef, useValue: {} },
      ]
    })
      .compileComponents();
  }));

  it('should create an instance', () => {
    let el: ElementRef;
    let http: HttpClient;
    const directive = new InterceptedSrcDirective(el, http);
    expect(directive).toBeTruthy();
  });
});
