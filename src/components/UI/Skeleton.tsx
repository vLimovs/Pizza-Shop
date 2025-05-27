import ContentLoader from "react-content-loader"

const Skeleton = () => (
  <ContentLoader 
    speed={2}
    width="100%"
    height="100%"
    viewBox="0 0 438 375"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="2" y="9" rx="20" ry="10" width="438" height="365" />
  </ContentLoader>
)

export default Skeleton

