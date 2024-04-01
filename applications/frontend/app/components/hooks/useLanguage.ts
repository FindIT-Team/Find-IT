import { useEffect, useState } from 'react';

export default function useLanguage() {
  const [language, setLanguage] = useState('en');
  useEffect(() => setLanguage(navigator ? navigator.language : 'en'), []);
  return language;
}
