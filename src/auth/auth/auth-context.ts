import React from "react";

/**
 * React 上下文数据对象
 * user：登录的用户信息
 * signin：登录方法，user 是登录时的用户，callback 是登录成功后的回调
 * signout：登出，callback 是登出后的回调
 */
interface AuthContextType {
    user: any;
    signin: (user: string, callback: VoidFunction) => void;
    signout: (callback: VoidFunction) => void;
}

export const AuthContext = React.createContext<AuthContextType>(null!);

export function useAuth() {
    return React.useContext(AuthContext);
}