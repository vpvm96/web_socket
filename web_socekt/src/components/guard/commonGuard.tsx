/**
 * CommonGuard
 * @description
 * - 로그인과 관계없이 모든 사용자가 접근 가능한 페이지를 위한 컴포넌트
 */

interface CommonGuardProps {
  children: React.ReactNode;
}

const CommonGuard = ({ children }: CommonGuardProps) => {
  return <>{children}</>;
};

export default CommonGuard;
