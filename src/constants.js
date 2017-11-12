const CLIENT_ID = 'b02dd812498b4182b234086da2731631';
export const API_URL = `https://api.instagram.com/oauth/authorize/?client_id=${CLIENT_ID}&redirect_uri=https://sleepy-brushlands-39585.herokuapp.com/&response_type=token`;
export const TEST_API_URL = `https://api.instagram.com/oauth/authorize/?client_id=${CLIENT_ID}&redirect_uri=http://localhost:3000/&response_type=token`;
export const API_CALL_FOR_USER_PROFILE = 'https://api.instagram.com/v1/users/self/?access_token=';
export const API_CALL_FOR_USER_COMPLETE_PROFILE = 'https://api.instagram.com/v1/users/self/media/recent/?access_token=';
export const SCOPES = '&scope=public_content+follower_list+comments+relationships+likes';