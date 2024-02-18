import { loginUrls } from '~/routes/auth/login/login-urls';
import { Button } from '@chakra-ui/react';

const LoginWith = () => {
  return (
    <div>
      <h1>Войти с помощью</h1>
      <ul>
        {loginUrls.slice(2).map((url) => (
          <li key={url.id}>
            <Button />
          </li>
        ))}
      </ul>
    </div>
  );
};
export default LoginWith;
