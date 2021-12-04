/**
 * isAuthenticated: true 表示登录成功 || false 表示失败
 */
export const fakeAuthProvider = {
    isAuthenticated: false,
    sigin(callback: VoidFunction) {
        fakeAuthProvider.isAuthenticated = true;
        setTimeout(callback, 100);
    },
    signout(callback: VoidFunction) {
        fakeAuthProvider.isAuthenticated = false;
        setTimeout(callback, 100);
    }
}