import { Auth } from "aws-amplify";

export async function loadAuthUserInfo() {
  try {
    const authInfo = await Auth.currentAuthenticatedUser();
    if (authInfo) {
      return authInfo.attributes;
    } else {
      return null;
    }
  } catch (err) {
    console.debug('loadAuthUserInfo failed cause', err);
    return null;
  }
}
