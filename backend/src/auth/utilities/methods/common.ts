export function getSplitedAuthorizationHeader(authorization: string): {
  type: string;
  token: string;
} {
  const [type, token] = authorization ? authorization.split(' ') : [];

  return {
    type,
    token,
  };
}
