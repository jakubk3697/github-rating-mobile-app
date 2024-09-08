import AsyncStorage from "@react-native-async-storage/async-storage";

class AuthStorage {
  constructor(namespace = "auth") {
    this.namespace = namespace;
  }

  getAccessToken() {
    const accessToken = AsyncStorage.getItem(`${this.namespace}:access_token`);

    return accessToken;
  }

  setAccessToken(accessToken) {
    return AsyncStorage.setItem(`${this.namespace}:access_token`, accessToken);
  }

  removeAccessToken() {
    return AsyncStorage.removeItem(`${this.namespace}:access_token`);
  }
}

export default AuthStorage;
