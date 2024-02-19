import React, { FC } from 'react';
import {useAuth} from "../hooks/useAuth";
import {useSelector} from "react-redux";
import {RootState} from "../store/store";
import {EnumRole} from "../types/types";

interface Props {
  children: JSX.Element;
}

export const ProtectedRoute: FC<Props> = ({ children }) => {
  const isAuth = useAuth();

  return <>
      {isAuth ? (children) : (
          <div>
            <h1>Доступ закрыт</h1>
          </div>
        )
      }
    </>
}
