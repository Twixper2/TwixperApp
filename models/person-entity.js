class PersonEntity {
	constructor(username, userHandle, profileImgURL, userDescription, FollowingStatus, isProfileVerified) {
		this.username = username;
		this.userHandle = userHandle;
		this.profileImgURL = profileImgURL;
		this.userDescription = userDescription;
		this.FollowingStatus = FollowingStatus;
		this.isProfileVerified = isProfileVerified;

	}
}

export default PersonEntity;
