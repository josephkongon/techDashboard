import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { ChildrenType } from "../types/component-props";
import { UsersType } from "@/types/auth";
import { useAppSelector } from "@/hooks/useAppSelector.ts";
import { useDispatch } from "react-redux";
import { LocalStorageService } from "@/service/localStorage.service.ts";
import { usersActions } from "@/redux/slices/auth.ts";
// import { useCookies } from 'react-cookie';

export type AuthContextType = {
  user: UsersType | undefined;
  isAuthenticated: boolean;
  saveSession: (session: UsersType) => void;
  removeSession: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
}

export function AuthProvider({ children }: ChildrenType) {
  const navigate = useNavigate();
  const { authUser } = useAppSelector((state) => state.systemUsers);
  const dispatch = useDispatch();
  const [user, setUser] = useState<UsersType | undefined>();

  const saveSession = (user: UsersType) => {
    setUser(user);
  };

  const removeSession = () => {
    setUser(undefined);
    navigate("/auth/login");
  };

  useEffect(() => {
    setUser(authUser);
  }, [authUser]);

  useEffect(() => {
    const authUser = LocalStorageService.get("userAuth");
    if (authUser) {
      dispatch(usersActions.setCurrentUser({ currentUser: authUser }));
      navigate("/");
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!authUser,
        saveSession,
        removeSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
