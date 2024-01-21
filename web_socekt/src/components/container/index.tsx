/**
 * container
 * @param {string} type - container type (default: common)
 * @description
 * - type에 따라 다른 container를 불러옵니다.
 */

const Container = ({ type = "common", children }: { type?: string; children: React.ReactNode }) => {
  const headerHeightClass = "h-[calc(100vh-85px)]";

  switch (type) {
    case "common":
      return <div className={`${headerHeightClass} flex flex-col`}>{children}</div>;
    default:
      return <div className="container mx-auto px-4">{children}</div>;
  }
};

export default Container;
