import { useSelector } from "react-redux"
import ProfileHeader from "../components/ProfileHeader"


function UserProfile() {
    const username = useSelector(state => state.auth.userData?.username)
  return (
    <div>
        <ProfileHeader username={username} />
    </div>
  )
}

export default UserProfile