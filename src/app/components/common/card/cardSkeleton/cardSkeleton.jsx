import ContentLoader from "react-content-loader";

const CardSkeleton = () => {
  return (
    <ContentLoader
      className="vh-25"
      speed={1}
      width="100%"
      backgroundColor="#f0f0f0"
      foregroundColor="#ecebeb"
    >
      <rect x="5%" y="5%" rx="3" ry="3" width="90%" height="12.5%" />
      <rect x="5%" y="22.5%" rx="3" ry="3" width="90%" height="72.5%" />
    </ContentLoader>
  );
};

export default CardSkeleton;
