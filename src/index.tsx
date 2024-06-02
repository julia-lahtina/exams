/* import React, { ChangeEvent, useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import {
  Provider,
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from "react-redux";
import axios from "axios";
import { configureStore, combineReducers } from "@reduxjs/toolkit";

// Types
type LoginFieldsType = {
  email: string;
  password: string;
};

// API
const instance = axios.create({
  baseURL: "https://exams-frontend.kimitsu.it-incubator.io/api/",
});

const api = {
  login(data: LoginFieldsType) {
    return instance.post("auth/login", data);
  },
};

// Reducer
const initState = { isAuth: false };
type InitStateType = typeof initState;

const appReducer = (
  state: InitStateType = initState,
  action: ActionsType
): InitStateType => {
  switch (action.type) {
    case "SET_AUTH":
      return { ...state, isAuth: action.isAuth };
    default:
      return state;
  }
};

// Store
const rootReducer = combineReducers({ app: appReducer });

const store = configureStore({ reducer: rootReducer });
type RootState = ReturnType<typeof store.getState>;
type AppDispatch = ThunkDispatch<RootState, unknown, ActionsType>;
type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  ActionsType
>;
const useAppDispatch = () => useDispatch<AppDispatch>();
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const setAuth = (isAuth: boolean) => ({ type: "SET_AUTH", isAuth } as const);
type ActionsType = ReturnType<typeof setAuth>;

// Thunk
const loginTC =
  (email: string, password: string): AppThunk =>
  async dispatch => {
    try {
      await api.login({ email, password });
      dispatch(setAuth(true));
    } catch (e: any) {
      alert(`❌ ${e.response.data.errors} ❌`);
    }
  };

// Components
const Login = () => {
  const isAuth = useAppSelector(state => state.app.isAuth);

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const [email, setEmail] = useState("darrell@gmail.com");
  const [password, setPassword] = useState("123");

  const changeEmailHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const changePasswordHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  if (isAuth) {
    navigate("/profile");
  }

  return (
    <div>
      <input type={"text"} value={email} onChange={changeEmailHandler} />
      <input
        type={"password"}
        value={password}
        onChange={changePasswordHandler}
      />
      <button
        disabled={!email || !password}
        onClick={() => dispatch(loginTC(email, password))}
      >
        login
      </button>
    </div>
  );
};

export const App = () => {
  return (
    <Routes>
      <Route path={"/"} element={<Login />} />
      <Route path={"/profile"} element={<h2>😎 Profile</h2>} />
    </Routes>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
); */

// 📜 Описание:
// ❗ Email и password менять не надо. Это тестовые данные с которыми будет происходить успешный запрос.
// Помогите разработчику исправить код так, чтобы успешно залогиниться (и редиректнуться на Profile)
// В качестве ответа укажите код, который необходимо добавить, чтобы реализовать данную задачу.

// 🖥 Пример ответа: navigate('/profile')

/* 
import React from "react";
import ReactDOM from "react-dom/client";

export const App = () => {
  return (
    <div>
      <h2>Для чего надо добавлять файлы в .gitignore ?</h2>
      <ul>
        <li>1 - Чтобы git удалял их историю, храня только последнюю версию</li>
        <li>
          2 - Чтобы git при работе с этими файлам уведомлял при их изменении
        </li>
        <li>3 - Чтобы git не следил за изменениями в данных файлах</li>
        <li>
          4 - Файл .gitignore не несет никакой смысловой нагрузки, т.к. все
          файлы с которыми мы работаем должны отслеживаться. Соответственно
          никакие файлы в .gitignore добавлять не нужно
        </li>
        <li>5 - Нет правильного ответа</li>
      </ul>
    </div>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<App />);

// 📜 Описание:
// Для чего надо добавлять файлы в .gitignore ?
// Может быть несколько вариантов ответа (ответ дайте через пробел).
// ❗ Ответ будет засчитан как верный, только при полном правильном совпадении.
// Если указали правильно один вариант (1),
// а нужно было указать два варианта (1 и 2), то ответ в данном случае будет засчитан как неправильный

// 🖥 Пример ответа: 1
 */

/* import ReactDOM from "react-dom/client";
import React, { useEffect, useState } from "react";

export const Mining = () => {
  const [btc, setBtc] = useState(0);

  useEffect(() => {
    setInterval(() => {
      // ❗❗❗ XXX ❗❗❗
      setBtc(prevState => prevState + 1);
    }, 1000);
  }, []);

  return <h1>🪙 BTC: {btc}</h1>;
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<Mining />);

// 📜 Описание:
// Помогите разработчику намайнить биткоинов.
// Что-то не майнятся 😥.
// Что необходимо написать вместо XXX чтобы биткоины майнились (каждую секунду прибавлялся 1 биткоин) ?
// ❗В качестве переменной используйте значение prevState

// 🖥 Пример ответа: btc = 1000000
 */
/* 
import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import {
  Provider,
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from "react-redux";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import axios from "axios";
import { configureStore, combineReducers } from "@reduxjs/toolkit";

// API
const instance = axios.create({
  baseURL: "https://exams-frontend.kimitsu.it-incubator.io/api/",
});

const api = {
  me() {
    return instance.get("auth/me?delay=3");
  },
};

// Reducer
const initState = {
  isInitialized: false,
  isLoading: false,
  isLoggedIn: false,
};
type InitStateType = typeof initState;

const appReducer = (
  state: InitStateType = initState,
  action: ActionsType
): InitStateType => {
  switch (action.type) {
    case "SET_IS_INITIALIZED":
      return { ...state, isInitialized: action.isInitialized };
    case "SET_LOADING":
      return { ...state, isLoading: action.isLoading };
    case "SET_IS_LOGGED_IN":
      return { ...state, isLoggedIn: action.isLoggedIn };
    default:
      return state;
  }
};

// Store
const rootReducer = combineReducers({ app: appReducer });

const store = configureStore({ reducer: rootReducer });
type RootState = ReturnType<typeof store.getState>;
type AppDispatch = ThunkDispatch<RootState, unknown, ActionsType>;
type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  ActionsType
>;
const useAppDispatch = () => useDispatch<AppDispatch>();
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const setIsInitialized = (isInitialized: boolean) =>
  ({ type: "SET_IS_INITIALIZED", isInitialized } as const);
const setLoading = (isLoading: boolean) =>
  ({ type: "SET_LOADING", isLoading } as const);
const setIsLoggedIn = (isLoggedIn: boolean) =>
  ({ type: "SET_IS_LOGGED_IN", isLoggedIn } as const);
type ActionsType =
  | ReturnType<typeof setLoading>
  | ReturnType<typeof setIsInitialized>
  | ReturnType<typeof setIsLoggedIn>;

// Thunk
const me = (): AppThunk => async dispatch => {
  dispatch(setLoading(true));
  api
    .me()
    .then(res => {
      dispatch(setIsLoggedIn(true));
    })
    .finally(() => {
      dispatch(setLoading(false));
      dispatch(setIsInitialized(true));
    });
};

// Components
const Loader = () => <h2>🔘 Крутилка...</h2>;

const Login = () => {
  const isInitialized = useAppSelector(state => state.app.isInitialized);
  const isLoading = useAppSelector(state => state.app.isLoading);
  const isLoggedIn = useAppSelector(state => state.app.isLoggedIn);

  if (isLoggedIn) {
    return <Navigate to={"/"} />;
  }

  return <h2>🐣 Login</h2>;
};
const Profile = () => {
  const isInitialized = useAppSelector(state => state.app.isInitialized);
  const isLoading = useAppSelector(state => state.app.isLoading);
  const isLoggedIn = useAppSelector(state => state.app.isLoggedIn);

  if (!isLoggedIn) {
    return <Navigate to={"/login"} />;
  }

  return <h2>😎 Profile </h2>;
};

export const App = () => {
  const isInitialized = useAppSelector(state => state.app.isInitialized);
  const isLoading = useAppSelector(state => state.app.isLoading);
  const isLoggedIn = useAppSelector(state => state.app.isLoggedIn);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(me());
    dispatch(setIsInitialized(true));
  }, []);

  return (
    <Routes>
      <Route path={"/"} element={<Profile />} />
      <Route path={"login"} element={<Login />} />
    </Routes>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);

// 📜 Описание:
// После старта / обновления приложения мы видим Login, а потом через 3 секунды Profile
// Но это плохое поведение.
// Ваша задача написать код при котором пользователя не будет редиректить на Login,
// пока приложение не проинициализировано,
// а во время ожидания ответа с сервера он будет видеть Loader

// 🖥 Пример ответа: <Loader/>
 */
/* 
import React from "react";
import ReactDOM from "react-dom/client";

export const App = () => {
  return (
    <div>
      <h2>
        Что нужно прописать в консоли, чтобы создать новую ветку с названием
        login и перейти на нее ?
      </h2>
    </div>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<App />);

// 📜 Описание:
// Что нужно прописать в консоли, чтобы создать новую ветку с названием login и перейти на нее ?
//❗Ответ написать одной командой

// 🖥 Пример ответа: git create login ---> git checkout -b login!!!!
 */
/* 
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Route,
  Routes,
  useNavigate,
  useParams,
} from "react-router-dom";
import React from "react";

type UserType = {
  id: number;
  name: string;
  avatar: string;
  age: number;
  address: string;
};

const users: UserType[] = [
  {
    id: 1,
    name: "my Name",
    age: 32,
    avatar: "—ฅ/ᐠ.̫ .ᐟ\\ฅ—",
    address: "my Address",
  },
  {
    id: 2,
    name: "John",
    age: 22,
    avatar: ":)",
    address: "California",
  },
  {
    id: 3,
    name: "Mike",
    age: 18,
    avatar: "^._.^",
    address: "New York",
  },
  {
    id: 4,
    name: "Emma",
    age: 38,
    avatar: "/ᐠ-ꞈ-ᐟ\\",
    address: "Washington",
  },
];

const StartPage = () => {
  const navigate = useNavigate();
  const friends = users.filter(u => u.id !== 1);

  const mappedFriends = friends.map((f, i) => {
    const go = () => {
      navigate("/friend/" + f.id);
    };

    return (
      <div
        key={i}
        onClick={go}
        style={{ paddingLeft: 24, color: "blue", cursor: "pointer" }}
      >
        {f.name}, {f.age}
      </div>
    );
  });

  return (
    <div>
      <h2>🙂 My profile</h2>
      <Profile userId={1} />
      <hr />
      <h2>👪 Friends</h2>
      {mappedFriends}
    </div>
  );
};
const Profile: React.FC<{ userId?: number }> = ({ userId }) => {
  const { id } = useParams<{ id: string }>();
  const user = users.find(u => u.id === +(id || userId || 0));

  return (
    <div>
      <div>
        <b>avatar</b> {user?.avatar}
      </div>
      <div>
        <div>
          <b>name</b>: {user?.name}
        </div>
        <div>
          <b>age</b>: {user?.age}
        </div>
        <div>
          <b>address</b>: {user?.address}
        </div>
      </div>
    </div>
  );
};

export const Friends = () => {
  return (
    <Routes>
      <Route path={"/"} element={<StartPage />} />
      <Route path={"friend/:id"} element={<Profile />} />
      <Route path={"*"} element={<div>❌404 Page Not Found❌</div>} />
    </Routes>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <Friends />
  </BrowserRouter>
);

// 📜 Описание:
// При загрузке приложения на экране отображается
// профиль пользователя и список друзей.
// Если кликнуть на пользователя, то видим ❌404 Page Not Found❌
// Исправьте код, чтобы по клику на пользователя
// отображалась странице с информацией о друге.
// В качестве ответа укажите исправленную строку кода.
//
// 🖥 Пример ответа: <Profile userId={4}/>
 */
/* 
import ReactDOM from "react-dom/client";
import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  useNavigate,
  useParams,
} from "react-router-dom";

const newSum = 1000;

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(`/balance/${newSum}`);
  }, []);

  return <h1>Login</h1>;
};

const Balance = () => {
  const [balance, setBalance] = useState(500);

  const params = useParams();

  useEffect(() => {
    if (params.bonus) {
      // ❗❗❗ XXX ❗❗❗
      setBalance(parseInt(params.bonus));
    }
  }, []);

  return <h1>💵 balance: {balance}</h1>;
};

export const Bank = () => {
  return (
    <Routes>
      <Route path={"/"} element={<Login />} />
      <Route path={"/balance/:bonus"} element={<Balance />} />
    </Routes>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <Bank />
  </BrowserRouter>
);

// 📜 Описание:
// Перед вами баланс равный 500.
// Ваша задача вместо XXX написать код,
// в результате которого баланс увеличится на сумму указанную в роуте.

// 🖥 Пример ответа: balance = newSum
 */
/* 
import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Route,
  Routes,
  useNavigate,
  useParams,
} from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/secret/JIUzI1NiIsInR5cCI6IkpXVCJ9");
  }, []);

  return <div>Login</div>;
};
const SecretToken = () => {
  const { token } = useParams(); // FIX

  return <h1>🦾 token: {token}</h1>;
};

export const App = () => {
  return (
    <Routes>
      <Route path={"/"} element={<Login />} />
      <Route path={"/secret/:token"} element={<SecretToken />} />
    </Routes>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

// 📜Описание:
// Исправьте код на 17 строке так, чтобы на странице отобразился токен.

//❗Ответ можно указывать с типизацией и без. Учтено несколько вариантов
// 🖥 Пример ответа: const token = '123'
 */

//-------------4--------------------------------------------------------------------------------------------------------------------------
import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import {
  Provider,
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from "react-redux";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import axios from "axios";
import { configureStore, combineReducers } from "@reduxjs/toolkit";

// API
const instance = axios.create({
  baseURL: "https://exams-frontend.kimitsu.it-incubator.io/api/",
});

const api = {
  me() {
    return instance.get("auth/me?delay=3");
  },
};

// Reducer
const initState = {
  isInitialized: false,
  isLoading: false,
  isLoggedIn: false,
};
type InitStateType = typeof initState;

const appReducer = (
  state: InitStateType = initState,
  action: ActionsType
): InitStateType => {
  switch (action.type) {
    case "SET_IS_INITIALIZED":
      return { ...state, isInitialized: action.isInitialized };
    case "SET_LOADING":
      return { ...state, isLoading: action.isLoading };
    case "SET_IS_LOGGED_IN":
      return { ...state, isLoggedIn: action.isLoggedIn };
    default:
      return state;
  }
};

// Store
const rootReducer = combineReducers({ app: appReducer });

const store = configureStore({ reducer: rootReducer });
type RootState = ReturnType<typeof store.getState>;
type AppDispatch = ThunkDispatch<RootState, unknown, ActionsType>;
type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  ActionsType
>;
const useAppDispatch = () => useDispatch<AppDispatch>();
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const setIsInitialized = (isInitialized: boolean) =>
  ({ type: "SET_IS_INITIALIZED", isInitialized } as const);
const setLoading = (isLoading: boolean) =>
  ({ type: "SET_LOADING", isLoading } as const);
const setIsLoggedIn = (isLoggedIn: boolean) =>
  ({ type: "SET_IS_LOGGED_IN", isLoggedIn } as const);
type ActionsType =
  | ReturnType<typeof setLoading>
  | ReturnType<typeof setIsInitialized>
  | ReturnType<typeof setIsLoggedIn>;

// Thunk
const me = (): AppThunk => async dispatch => {
  dispatch(setLoading(true));
  api
    .me()
    .then(res => {
      dispatch(setIsLoggedIn(true));
    })
    .finally(() => {
      dispatch(setLoading(false));
      dispatch(setIsInitialized(true));
    });
};

// Components
const Loader = () => <h2>🔘 Крутилка...</h2>;

const Login = () => {
  const isInitialized = useAppSelector(state => state.app.isInitialized);
  const isLoading = useAppSelector(state => state.app.isLoading);
  const isLoggedIn = useAppSelector(state => state.app.isLoggedIn);

  if (isLoggedIn) {
    return <Navigate to={"/"} />;
  }

  return <h2>🐣 Login</h2>;
};
const Profile = () => {
  const isInitialized = useAppSelector(state => state.app.isInitialized);
  const isLoading = useAppSelector(state => state.app.isLoading);
  const isLoggedIn = useAppSelector(state => state.app.isLoggedIn);

  if (!isLoggedIn) {
    return <Navigate to={"/login"} />;
  }

  return <h2>😎 Profile </h2>;
};

export const App = () => {
  const isInitialized = useAppSelector(state => state.app.isInitialized);
  const isLoading = useAppSelector(state => state.app.isLoading);
  const isLoggedIn = useAppSelector(state => state.app.isLoggedIn);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(me());
  }, []);

  return (
    <Routes>
      <Route path={"/"} element={<Profile />} />
      <Route path={"login"} element={<Login />} />
    </Routes>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);

// 📜 Описание:
// После старта / обновления приложения мы видим Login, а потом через 3 секунды Profile
// Но это плохое поведение.
// Ваша задача написать код при котором пользователя не будет редиректить на Login,
// пока приложение не проинициализировано,
// а во время ожидания ответа с сервера он будет видеть Loader

// 🖥 Пример ответа: <Loader/>
