import React, { FC } from "react";
import { useAuth } from "../hooks/useAuth";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { EnumRole } from "../types/types";

interface Props {
  children: JSX.Element;
}

export const ProtectedAdminRoute: FC<Props> = ({ children }) => {
  const isAuth = useAuth();

  const { user } = useSelector((state: RootState) => state.user);
  let role: string = "";

  if (user) role = user.role;

  return (
    <>
      {isAuth && (role === EnumRole.ADMIN || role === EnumRole.SUPERADMIN) ? (
        children
      ) : (
        <div>
          <h1>Доступ закрыт</h1>
        </div>
      )}
    </>
  );
};
