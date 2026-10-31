// Roles where an NSW Responsible Service of Alcohol (RSA) certificate is expected
// because the person sells, serves or supervises the service of alcohol.
// Back-of-house roles and baristas can apply without one.
export const RSA_REQUIRED_ROLES = ["Bartender", "Bar Manager", "FOH Manager", "Venue Manager"] as const;

export function roleNeedsRsa(role: string): boolean {
  return (RSA_REQUIRED_ROLES as readonly string[]).includes(role);
}
