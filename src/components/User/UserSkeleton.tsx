import ContentLoader from "react-content-loader"

const UserSkeleton = () => (
  <ContentLoader 
    speed={2}
    width={350}
    height={400}
    viewBox="0 0 350 400"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <circle cx="45" cy="45" r="44" />
    <rect x="0" y="120" rx="0" ry="0" width="200" height="20" />
    <rect x="0" y="145" rx="0" ry="0" width="200" height="20" />
    <rect x="0" y="210" rx="0" ry="0" width="100" height="20" />
    <rect x="0" y="270" rx="0" ry="0" width="100" height="20" />
    <rect x="0" y="330" rx="0" ry="0" width="100" height="20" />
  </ContentLoader>
)

export default UserSkeleton

