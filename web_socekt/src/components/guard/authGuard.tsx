/**
 * AuthGuard
 * @description
 * - 로그인 유무를 확인하여 로그인 페이지로 이동시키는 컴포넌트
 */

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard = ({ children }: AuthGuardProps) => {
  const isLogin = false;

  if (!isLogin) {
    // 로그인이 되어있지 않다면 로그인 페이지로 이동
    // return <Redirect to="/login" />;
  }

  return <>{children}</>;
};

export default AuthGuard;
