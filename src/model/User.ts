export default interface User {
  uid: string,
  email: string | null,
  name: string | null,
  token: string | ((forceRefresh: boolean) => Promise<string>),
  provider: string | undefined,
  imageUrl: string | null
}