export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  Onboarding: undefined;
  Register: undefined;
  Forgot: undefined;
  ForgotVerifyOtp: { email: string };
  ForgotResetPassword: { email: string; otp: string };
  CompleteProfile: undefined;
};

export type MainStackParamList = {
  Tabs: undefined;
  Settings: undefined;
  EditProfile: undefined;
  ChangePassword: undefined;
  Subscription: undefined;
  ManageSubscriptions: undefined;
  PaymentMethod: undefined;
  Help: undefined;
  Support: undefined;
  CardDetails: undefined;
  HelpAndCenter: undefined;
  ProfileDetails: undefined;
  Profile: undefined;
  Home: undefined;
  Transactions: undefined;
  Donate: undefined;
  Analytics: undefined;
  ProfileTab: undefined;
  Notification: undefined;
  Checkout: undefined;
  Mybets: undefined;
  WorkHistory: undefined;
  WageOverview: undefined;
  MyProfile: undefined;
  Setting: undefined;
  HelpSupport: undefined;
};
