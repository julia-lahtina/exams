/* import ReactDOM from "react-dom/client";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import {
  Provider,
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from "react-redux";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { configureStore, combineReducers } from "@reduxjs/toolkit";

type UserType = {
  id: string;
  name: string;
  age: number;
};

type UsersResponseType = {
  items: UserType[];
  totalCount: number;
};

// API
const instance = axios.create({
  baseURL: "https://exams-frontend.kimitsu.it-incubator.io/api/",
});

const api = {
  getUsers(search: string) {
    return instance.get<UsersResponseType>(`users?name=${search}&pageSize=100`);
  },
};

const initState = { users: [] as UserType[] };
type InitStateType = typeof initState;

const appReducer = (
  state: InitStateType = initState,
  action: ActionsType
): InitStateType => {
  switch (action.type) {
    case "SET_USERS":
      return { ...state, users: action.users };
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

const setUsersAC = (users: UserType[]) =>
  ({ type: "SET_USERS", users } as const);
type ActionsType = ReturnType<typeof setUsersAC>;

// Thunk
const getFriends =
  (name: string): AppThunk =>
  dispatch => {
    api.getUsers(name).then(res => dispatch(setUsersAC(res.data.items)));
  };

export const Users = () => {
  const users = useAppSelector(state => state.app.users);
  const dispatch = useAppDispatch();
  const [name, setName] = useState("");
  const [timerId, setTimerId] = useState(0);

  useEffect(() => {
    setTimerId(
      +setTimeout(() => {
        dispatch(getFriends(name));
      }, 1500)
    );
    clearInterval(timerId);
  }, [name]);

  return (
    <div>
      <input value={name} onChange={e => setName(e.target.value)} />
      {users.map(u => {
        return (
          <div key={u.id}>
            <p>
              <b>name</b>: {u.name}
            </p>
          </div>
        );
      })}
    </div>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <Users />
  </Provider>
);

// 📜 Описание:
// На экране input, куда можно вводить символы.
// Откройте Network/ fetch/XHR и поробуйте вводить символы
// Обратите внимание, что все символы которые вы вводите уходят на сервер -
// это плохо.
//
// 🪛 Задача: Починить debounce
// В качестве ответа напишите строку кода которую необходимо исправить или добавить
// для реализации данной задачи
//
// 🖥 Пример ответа: value={name(1500)}
 */
/* 
import ReactDOM from "react-dom/client";
import React, { useEffect } from "react";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import {
  Provider,
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from "react-redux";
import { configureStore, combineReducers } from "@reduxjs/toolkit";

// Reducer
const initState = { find: "", words: [] as string[] };
type InitStateType = typeof initState;

const appReducer = (
  state: InitStateType = initState,
  action: ActionsType
): InitStateType => {
  switch (action.type) {
    case "SET_FIND":
      return { ...state, find: action.find };
    case "SET_WORDS":
      return { ...state, words: action.words };
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

const setFind = (find: string) => ({ type: "SET_FIND", find } as const);
const setWords = (words: string[]) => ({ type: "SET_WORDS", words } as const);
type ActionsType = ReturnType<typeof setFind> | ReturnType<typeof setWords>;

// Components
const defWords = [
  "a",
  "ab",
  "abc",
  "b",
  "bc",
  "c",
  "d",
  "ac",
  "bcd",
  "cd",
  "abcd",
  "bd",
];

export const App = () => {
  const find = useAppSelector(state => state.app.find);
  const words = useAppSelector(state => state.app.words);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setWords(defWords));
  }, []);

  const mapped = words
    .filter((w: string) => new RegExp(find, "gi").test(w))
    .map((w: string, i: number) => <div key={i}>{w}</div>);

  const onChangeHandler = (value: string) => {
    dispatch(setFind(value));
  };

  return (
    <div>
      <input value={find} onChange={e => onChangeHandler(e.target.value)} />
      {mapped}
    </div>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

// 📜 Описание:
// На экране отображен массив слов.
// Ваша задача починить фильтрацию:
// вводите символы в input и сразу видите как фильтруются данные.
// В качестве ответа укажите исправленную версию строки.
//
// 🖥 Пример ответа: dispatch(setFind(defWords))
 */
/* 
import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";

type UserType = {
  id: string;
  name: string;
  age: number;
};

// API
const instance = axios.create({
  baseURL: "https://exams-frontend.kimitsu.it-incubator.io/api/",
});

const api = {
  getUsers() {
    return instance.get(`users/pageSize=${3}/pageNumber=${2}`);
  },
};

// App
export const App = () => {
  const [users, setUsers] = useState<UserType[]>([]);

  useEffect(() => {
    api.getUsers().then(res => {
      setUsers(res.data.items);
    });
  }, []);

  return (
    <>
      <h1>👪 Список пользователей</h1>
      {users.map(u => {
        return (
          <div style={{ display: "flex", gap: "10px" }} key={u.id}>
            <p>
              <b>name</b>: {u.name}
            </p>
            <p>
              <b>age</b>: {u.age}
            </p>
          </div>
        );
      })}
    </>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<App />);

// 📜 Описание:
// На странице отображен список юзеров из 3-человек.
// Подгрузились именно эти пользователи не случайно, а из-за query параметров указанных в запросе.
// Ваша задача переписать строку с запросом таким образом, чтобы получить аналогичный результат (все тех же юзеров),
// при этом запрещено в ответе использовать символы вопроса и амперсанда.
// В качестве ответа укажите полностью исправленную строку коду (переносы разрешены)

// 🖥 Пример ответа: return instance.get('users=pageSize=3=pageNumber=2')
 */
/* 
import ReactDOM from "react-dom/client";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import {
  Provider,
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from "react-redux";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { configureStore, combineReducers } from "@reduxjs/toolkit";

// Styles
const table: React.CSSProperties = {
  borderCollapse: "collapse",
  width: "100%",
  tableLayout: "fixed",
};

const th: React.CSSProperties = {
  padding: "10px",
  border: "1px solid black",
  background: "lightgray",
  cursor: "pointer",
};

const td: React.CSSProperties = {
  padding: "10px",
  border: "1px solid black",
};

// Types
type UserType = {
  id: string;
  name: string;
  age: number;
};

type UsersResponseType = {
  items: UserType[];
  totalCount: number;
};

type ParamsType = {
  sortBy: string | null;
  sortDirection: "asc" | "desc" | null;
};

// API
const instance = axios.create({
  baseURL: "https://exams-frontend.kimitsu.it-incubator.io/api/",
});

const api = {
  getUsers(params?: ParamsType) {
    return instance.get<UsersResponseType>("users", { params });
  },
};

// Reducer
const initState = { users: [] as UserType[] };
type InitStateType = typeof initState;

const appReducer = (
  state: InitStateType = initState,
  action: ActionsType
): InitStateType => {
  switch (action.type) {
    case "SET_USERS":
      return { ...state, users: action.users };
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

const setUsersAC = (users: UserType[]) =>
  ({ type: "SET_USERS", users } as const);
type ActionsType = ReturnType<typeof setUsersAC>;

// Thunk
const getUsersTC =
  (searchParams?: ParamsType): AppThunk =>
  dispatch => {
    api
      .getUsers(searchParams)
      .then(res => dispatch(setUsersAC(res.data.items)));
  };

export const Users = () => {
  const [activeColumn, setActiveColumn] = useState<ParamsType>({
    sortBy: null,
    sortDirection: "asc",
  });

  const users = useAppSelector(state => state.app.users);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(activeColumn.sortBy ? getUsersTC(activeColumn) : getUsersTC());
  }, [activeColumn]);

  const sortHandler = (sortBy: string) => {
    // ❗❗❗ XXX ❗❗❗
    setActiveColumn({
      sortBy,
      sortDirection:
        activeColumn.sortBy === sortBy && activeColumn.sortDirection === "asc"
          ? "desc"
          : "asc",
    });
  };

  return (
    <div>
      <h1>👪 Список пользователей</h1>
      <table style={table}>
        <thead>
          <tr>
            <th style={th} onClick={() => sortHandler("name")}>
              Name
              {activeColumn?.sortBy === "name" &&
                (activeColumn.sortDirection === "asc" ? (
                  <span> &#8593;</span>
                ) : (
                  <span> &#8595;</span>
                ))}
            </th>
            <th style={th} onClick={() => sortHandler("age")}>
              Age
              {activeColumn?.sortBy === "age" &&
                (activeColumn.sortDirection === "asc" ? (
                  <span> &#8593;</span>
                ) : (
                  <span> &#8595;</span>
                ))}
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => {
            return (
              <tr key={u.id}>
                <td style={td}>{u.name}</td>
                <td style={td}>{u.age}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <Users />
  </Provider>
);

// 📜 Описание:
// Перед вами таблица с пользователями.
// Ваша задача вместо XXX написать код для сортировки пользователей по имени и возрасту.
// Т.е. при нажатии на name либо age пользователи должны сортироваться в таблице.
// При повторном нажатии на этот же столбец сортировка должна происходить в обратном порядке
// При последующих нажатиях сортировка не должна сбрасываться, а должна продолжать переключаться.
// ❗ сортировка пользователей происходит на сервере, т.е. sort использовать не нужно

// 🖥 Пример ответа: sort(a, b)
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
import axios from "axios";
import { configureStore, combineReducers } from "@reduxjs/toolkit";

type UserType = {
  id: string;
  name: string;
  age: number;
};

// API
const instance = axios.create({
  baseURL: "https://exams-frontend.kimitsu.it-incubator.io/api/",
});

const api = {
  getUsers(pageNumber: number) {
    return instance.get(`users?pageSize=${3}&pageNumber=${pageNumber}`);
  },
};

// Reducer
const initState = { page: 1, users: [] as UserType[] };
type InitStateType = typeof initState;

const appReducer = (
  state: InitStateType = initState,
  action: ActionsType
): InitStateType => {
  switch (action.type) {
    case "SET_PAGE":
      return { ...state, page: action.page };
    case "SET_USERS":
      return { ...state, users: action.users };
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

const setPageAC = (page: number) => ({ type: "SET_PAGE", page } as const);
const setUsersAC = (users: UserType[]) =>
  ({ type: "SET_USERS", users } as const);
type ActionsType = ReturnType<typeof setPageAC> | ReturnType<typeof setUsersAC>;

const getUsers = (): AppThunk => (dispatch, getState) => {
  const page = getState().app.page;
  api.getUsers(page).then(res => dispatch(setUsersAC(res.data.items)));
};

// Components
export const App = () => {
  const page = useAppSelector(state => state.app.page);
  const users = useAppSelector(state => state.app.users);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, [page]);

  const pages = new Array(4).fill(1).map((p, i) => (
    <button
      key={i}
      onClick={() => dispatch(setPageAC(i + 1))}
      disabled={page === i + 1}
    >
      {i + 1}
    </button>
  ));

  return (
    <div>
      {users.map(u => {
        return (
          <div style={{ marginBottom: "25px" }} key={u.id}>
            <p>
              <b>name</b>: {u.name}
            </p>
            <p>
              <b>age</b>: {u.age}
            </p>
          </div>
        );
      })}
      {pages}
    </div>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

// 📜 Описание:
// При переходе по страницам должны подгружаться новые пользователи.
// Однако в коде допущена ошибка и всегда подгружаются одни и теже пользователи.
// Задача: найти эту ошибку, и исправленную версию строки написать в качестве ответа.

// 🖥 Пример ответа: {pages.next()}
 */

/* import ReactDOM from "react-dom/client";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import {
  Provider,
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from "react-redux";
import React from "react";
import { configureStore, combineReducers } from "@reduxjs/toolkit";

// Reducer
const initState = {
  goodMorning: [
    { id: 1, name: "errors" },
    { id: 2, name: "bugs" },
    { id: 3, name: "fackups" },
    { id: 4, name: "laziness" },
    { id: 5, name: "work" },
  ] as { id: number; name: string }[],
};

type InitStateType = typeof initState;

const appReducer = (
  state: InitStateType = initState,
  action: ActionsType
): InitStateType => {
  switch (action.type) {
    case "DELETE":
      return {
        ...state,
        goodMorning: state.goodMorning.filter(g => g.id !== action.id),
      };
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

const deleteSome = (id: any) => ({ type: "DELETE", id } as const);
type ActionsType = ReturnType<typeof deleteSome>;

// Components
export const Monday = () => {
  const goodMorning = useAppSelector(state => state.app.goodMorning);
  const dispatch = useAppDispatch();

  const mapped = goodMorning.map((p: any, i: number) => (
    <div key={i}>
      {p.name}
      <button onClick={() => dispatch(deleteSome(p.id))}>X</button>
    </div>
  ));

  return <div>{mapped}</div>;
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <Monday />
  </Provider>
);

// 📜 Описание:
// На экране отображен список дел.
// Попробуйте удалить какой-нибудь элемент - у вас не получится.
// Найдите ошибку.
// В качестве ответа укажите исправленную версию строки
//
// 🖥 Пример ответа: delete goodMorning
 */
