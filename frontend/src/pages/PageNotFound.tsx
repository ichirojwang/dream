import LinkHome from "../components/LinkHome";

const PageNotFound = () => {
  return (
    <div className="flex flex-col gap-2 h-screen w-full justify-center items-center">
      <span>Page Not Found</span>
      <LinkHome />
    </div>
  );
};

export default PageNotFound;
