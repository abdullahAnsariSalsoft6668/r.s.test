/**
 * Screen route maps. Route name constants live in `routeNames.ts` so screens
 * can import them without pulling in every screen component (require cycle).
 */
import * as Screens from '@/screens';

import routes from './routeNames';

export { routes };
export default routes;

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
  [routes.tab.profileTab]: Screens.ProfileTab,
};

export const mainRoutes = {
  [routes.main.settings]: Screens.Settings,
  [routes.main.editProfile]: Screens.EditProfile,
  [routes.main.changePassword]: Screens.ChangePassword,
  [routes.main.privacySettings]: Screens.PrivacySettings,
  [routes.main.privacyFirst]: Screens.PrivacyFirst,
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
  [routes.main.helpHowItWorks]: Screens.HelpHowItWorks,
  [routes.main.routeDetails]: Screens.RouteDetails,
  [routes.main.supportedStores]: Screens.SupportedStores,
  [routes.main.productDetails]: Screens.ProductDetails,
  [routes.main.savingBarcode]: Screens.SavingBarcode,
  [routes.main.savingBarcodeRedeemed]: Screens.SavingBarcodeRedeemed,
  [routes.main.languageSettings]: Screens.LanguageSettings,
  [routes.main.currencySettings]: Screens.CurrencySettings,
  [routes.main.addIncome]: Screens.AddIncome,
  [routes.main.addExpense]: Screens.AddExpense,
  [routes.main.givingSettings]: Screens.GivingSettings,
  [routes.main.recipientsList]: Screens.RecipientsList,
  [routes.main.addRecipient]: Screens.AddRecipient,
  [routes.main.addDonation]: Screens.AddDonation,
  [routes.main.zakatHub]: Screens.ZakatHub,
};
