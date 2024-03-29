import { useEffect, useState } from 'react';

export default function useReRender() {
  const [language, setLanguage] = useState('en');
  useEffect(() => setLanguage(navigator ? navigator.language : 'en'), []);
  return language;
}
