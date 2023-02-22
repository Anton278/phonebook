export type SigninResponse = {
  token: {
    access_Token: string;
    refresh_Token: string;
  };
  displayName: string;
};
