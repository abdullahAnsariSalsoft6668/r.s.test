import * as Screens from '@/screens';
import routes from '@/constants/routes';

export const authRoutes = {
  [routes.auth.login]: Screens.Login,
  [routes.auth.forgot]: Screens.Forgot,
  [routes.auth.forgotVerifyOtp]: Screens.ForgotVerifyOtp,
  [routes.auth.forgotResetPassword]: Screens.ForgotResetPassword,
  [routes.auth.onboarding]: Screens.Onboard,
  [routes.auth.register]: Screens.Register,
  [routes.auth.completeProfile]: Screens.CompleteProfile,
};

export const tabRoutes = {
  [routes.tab.home]: Screens.Home,
  [routes.tab.transactions]: Screens.Transactions,
  [routes.tab.donate]: Screens.Donate,
  [routes.tab.analytics]: Screens.Analytics,
  [routes.tab.profile]: Screens.ProfileTab,
};

export const mainRoutes = {
  [routes.main.settings]: Screens.Settings,
  [routes.main.editProfile]: Screens.EditProfile,
  [routes.main.changePassword]: Screens.ChangePassword,
  [routes.main.subscription]: Screens.Subscription,
  [routes.main.manageSubscriptions]: Screens.ManageSubscriptions,
  [routes.main.paymentMethod]: Screens.PaymentMethod,
  [routes.main.help]: Screens.Help,
  [routes.main.support]: Screens.MainSupport,
  [routes.main.cardDetails]: Screens.CardDetails,
  [routes.main.helpAndCenter]: Screens.HelpAndCenter,
  [routes.main.profileDetails]: Screens.ProfileDetails,
  [routes.main.profile]: Screens.Profile,
  [routes.main.notification]: Screens.Notification,
  [routes.main.checkout]: Screens.Checkout,
  [routes.main.mybets]: Screens.Mybets,
  [routes.main.workHistory]: Screens.WorkHistory,
  [routes.main.wageOverview]: Screens.WageOverview,
  [routes.main.myProfile]: Screens.MyProfile,
  [routes.main.setting]: Screens.Setting,
  [routes.main.helpSupport]: Screens.HelpSupport,
};
