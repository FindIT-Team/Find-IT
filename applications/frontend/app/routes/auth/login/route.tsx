import { Link } from '~/components/link';
// import LoginWith from '~/routes/auth/login/login-with';
import LoginForm from '~/routes/auth/login/login-form';
import { loginUrls } from '~/routes/auth/login/login-urls';

const LoginScreen = () => {
  return (
    <>
      <div>
        {loginUrls.map((u) => (
          <Link key={u.id} href={u.href} to={''} />
        ))}
      </div>
      <div>
        <div>
          {/*<LoginWith />*/}
          <div>
            <hr />
          </div>
          <LoginForm />
        </div>
        <div />
      </div>
    </>
  );
};
export default LoginScreen;
