'use client'; // if you use it as a component directly

export const logout = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token');
      localStorage.removeItem('user');
    window.location.href = '/auth/login';
  }
};
