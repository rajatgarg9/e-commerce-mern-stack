export function getDataWithExpireAt<D>(
  data: D & { expiresIn: number },
): D & { expiresAt: string } {
  return {
    ...data,
    expiresAt: new Date(Date.now() + data.expiresIn * 1000).toISOString(),
  };
}
