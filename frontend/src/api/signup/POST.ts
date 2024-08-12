import api from '../index';

export async function CheckId(loginId: string) {
  const { data } = await api.post('/api/auth/login-id/check', {
    loginId: loginId,
  });

  return data;
}

export async function CheckEmail(email: string) {
  const { data } = await api.post('/api/auth/email-auth', {
    email,
  });
  return data;
}

export async function CertificationEmail(email: string, inputAuthCode: string) {
  const { data } = await api.post('/api/auth/email-auth/check', {
    email,
    inputAuthCode: inputAuthCode,
  });
  return data;
}
