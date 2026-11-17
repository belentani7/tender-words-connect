import { describe, it, expect } from 'vitest';
import { CANON } from './canon-tokens';

describe('CANON Design Tokens', () => {
  it('should have all required color tokens', () => {
    expect(CANON.colors.black).toBe('#05030a');
    expect(CANON.colors.neonRed).toBe('#ff073a');
    expect(CANON.colors.gold).toBe('#d4af37');
    expect(CANON.colors.cyan).toBe('#4de8e0');
  });

  it('should have spacing tokens', () => {
    expect(CANON.spacing.xs).toBe('4px');
    expect(CANON.spacing.md).toBe('16px');
    expect(CANON.spacing.xl).toBe('32px');
  });

  it('should have typography tokens', () => {
    expect(CANON.typography.fontFamily.sans).toContain('Space Grotesk');
    expect(CANON.typography.fontFamily.mono).toContain('JetBrains Mono');
  });

  it('should have shadow tokens', () => {
    expect(CANON.shadows.glow).toContain('rgba(255, 7, 58');
    expect(CANON.shadows.glowGold).toContain('rgba(212, 175, 55');
  });
});
