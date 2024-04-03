import { useEffect, useState } from 'react';

export function useLanguage() {
  const [language, setLanguage] = useState('en');
  useEffect(() => setLanguage(navigator ? navigator.language : 'en'), []);
  return language;
}
