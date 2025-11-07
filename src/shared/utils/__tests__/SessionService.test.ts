import { describe, it, expect, beforeEach } from 'vitest';
import { sessionService } from '../SessionService';

describe('sessionService', () => {
  beforeEach(() => sessionStorage.clear());

  it('stores and retrieves verifier', () => {
    sessionService.setVerifier('abc123');
    expect(sessionService.getVerifier()).toBe('abc123');
  });

  it('clears verifier', () => {
    sessionService.setVerifier('abc123');
    sessionService.removeVerifier();
    expect(sessionService.getVerifier()).toBeNull();
  });
});
