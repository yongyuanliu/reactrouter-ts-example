import React from "react";

import { fakeAuthProvider } from "./auth";
import { AuthContext } from "./auth-context";

function AuthProvider({ children }: { children: React.ReactNode }) {
    let [user, setUser] = React.useState<any>(null);

    let signin = (newUser: string, callback: VoidFunction) => {
        return fakeAuthProvider.sigin(() => {
            setUser(newUser);
            callback();
        });
    };

    let signout = (callback: VoidFunction) => {
        return fakeAuthProvider.signout(() => {
            setUser(null);
            callback();
        });
    };

    let value = { user, signin, signout };
    return <AuthContext.Provider value={value}> {children} </AuthContext.Provider>
};

export default AuthProvider;