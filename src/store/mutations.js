export default {
  SET_USER_CENTER (state, data) {
    console.log()
    state.userCenter = {...state.userCenter, ...data}
  },
  SET_VISITORY (state, data) {
    state.isVisitory = data
  },
  SET_APP_VERSION (state, data) {
    state.APP_VERSION = data
  },
  SET_DEVICEID (state, data) {
    state.deviceId = data
  },
  SET_ANDROID_ID (state, data) {
    state.android_id = data
  }
}
