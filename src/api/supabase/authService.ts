import { loginSessionAction } from '@/redux/actions/auth';
import { supabase } from '@/supabase';

export async function signInWithEmail(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    throw error;
  }

  if (!data.session || !data.user) {
    throw new Error('No session returned');
  }

  await loginSessionAction({
    user: {
      email: data.user.email,
      fullName: data.user.user_metadata?.full_name ?? 'User',
      id: data.user.id,
    },
    accessToken: data.session.access_token,
    refreshToken: data.session.refresh_token,
    setFirstTime: false,
  });

  return data;
}

export async function signUpWithEmail(fullName: string, email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({
    email: email.trim(),
    password,
    options: { data: { full_name: fullName.trim() } },
  });

  if (error) {
    throw error;
  }

  if (data.session && data.user) {
    await loginSessionAction({
      user: {
        email: data.user.email,
        fullName: data.user.user_metadata?.full_name ?? fullName.trim(),
        id: data.user.id,
      },
      accessToken: data.session.access_token,
      refreshToken: data.session.refresh_token,
      setFirstTime: false,
    });
  }

  return data;
}

export async function restoreSupabaseSession(accessToken: string, refreshToken: string) {
  const token = accessToken.trim();
  const refresh = refreshToken.trim();

  if (!token || !refresh) {
    return;
  }

  const { error } = await supabase.auth.setSession({
    access_token: token,
    refresh_token: refresh,
  });

  if (error) {
    throw error;
  }
}

export async function signOutFromSupabase() {
  await supabase.auth.signOut();
}
