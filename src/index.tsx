/* import ReactDOM from "react-dom/client";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import {
  Provider,
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from "react-redux";
import React, { useEffect } from "react";
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

// API
const instance = axios.create({
  baseURL: "https://exams-frontend.kimitsu.it-incubator.io/api/",
});

const api = {
  getUsers() {
    return instance.get<UsersResponseType>("users");
  },
};

// Reducer
const initState = {
  users: [] as UserType[],
};
type InitStateType = typeof initState;

const appReducer = (
  state: InitStateType = initState,
  action: ActionsType
): InitStateType => {
  switch (action.type) {
    case "SET-USERS":
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
  ({ type: "SET-USERS", users } as const);
type ActionsType = ReturnType<typeof setUsersAC>;

// Thunk
const getUsersTC = (): AppThunk => (dispatch, getState) => {
  api.getUsers().then(res => {
    dispatch(setUsersAC(res.data.items));
    console.log(res.data.items);
  });
};

// Components
export const Users = () => {
  const users = useAppSelector(state => state.app.users);
  console.log(users);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUsersTC());
  }, []);

  return (
    <div>
      <h1>👪 Список пользователей</h1>
      <table style={table}>
        <thead>
          <tr>
            <th style={th}> Name</th>
            <th style={th}> Age</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td style={td}>{u.name}</td>
              <td style={td}>{u.age}</td>
            </tr>
          ))}
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
// Перед вами пустая таблица. Пользователи не подгрузились, т.к. в коде допущена ошибка
// Ваша задача найти багу, чтобы таблица с пользователями подгрузилась.
// В качестве укажите исправленную строку кода
// ❗ Есть несколько вариантов решения данной задачи, в ответах учтены различные варианты

// 🖥 Пример ответа: {users.map(u)=> таблица отрисуйся ВЖУХ ВЖУХ}
 */

/* import ReactDOM from "react-dom/client";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import {
  Provider,
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from "react-redux";
import React, { useState } from "react";
import { configureStore, combineReducers } from "@reduxjs/toolkit";

// Styles
const modal: React.CSSProperties = {
  position: "fixed",
  zIndex: 1,
  left: 0,
  top: 0,
  width: "100%",
  height: "100%",
  overflow: "auto",
  backgroundColor: "rgba(23,26,38,0.26)",
};

const modalContent: React.CSSProperties = {
  backgroundColor: "#fefefe",
  margin: "15% auto",
  padding: "20px",
  border: "1px solid #888",
  width: "80%",
};

// Reducer
const initState = { goodThings: [] as any[] };
type InitStateType = typeof initState;

const appReducer = (
  state: InitStateType = initState,
  action: ActionsType
): InitStateType => {
  switch (action.type) {
    case "LIKE":
      return {
        ...state,
        goodThings: [action.thing, ...state.goodThings],
      };
  }
  return state;
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

const addThing = (thing: any) => ({ type: "LIKE", thing } as const);
type ActionsType = ReturnType<typeof addThing>;

const Modal = (props: any) => {
  return (
    <div style={modalContent}>
      modal:
      <input
        value={props.value}
        onChange={e => props.setValue(e.target.value)}
      />
      <button onClick={props.add}>add</button>
    </div>
  );
};

// Components
export const Animals = () => {
  const goodThings = useAppSelector(state => state.app.goodThings);
  const dispatch = useAppDispatch();

  const [value, setValue] = useState("");
  const [show, setShow] = useState(false);

  const mapped = goodThings.map((t: any, i: number) => <div key={i}>{t}</div>);

  return (
    <div style={modal}>
      <button onClick={() => setShow(true)}>show modal</button>

      {show && (
        <Modal
          value={value}
          setValue={setValue}
          add={() => {
            dispatch(addThing(value));
            setValue("");
            setShow(false);
          }}
        />
      )}

      {mapped}
    </div>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <Animals />
  </Provider>
);

// 📜 Описание:
// Откройте модалку, введите любой текст и нажмите add.
// Введенный текст отобразится снизу, но модалка останется по прежнему видимой.

// 🪛 Задача:
// Необходимо сделать так, чтобы модалка пряталась сразу после добавления элемента
// В качестве ответа укажите строку коду, которую необходимо добавить для реализации данной задачи

// 🖥 Пример ответа: closeModal(true) */

/* import React from "react";
import ReactDOM from "react-dom/client";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import {
  Provider,
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from "react-redux";
import { configureStore, combineReducers } from "@reduxjs/toolkit";

// Reducer
const initState = {
  work: 0,
  donate: 0,
  balance: 0,
};
type InitStateType = typeof initState;

const appReducer = (
  state: InitStateType = initState,
  action: ActionsType
): InitStateType => {
  switch (action.type) {
    case "CHANGE_VALUE":
      return {
        ...state,
        ...action.payload,
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

const changeValue = (payload: any) =>
  ({ type: "CHANGE_VALUE", payload } as const);
type ActionsType = ReturnType<typeof changeValue>;

// Components
export const Income = () => {
  const work = useAppSelector(state => state.app.work);
  const donate = useAppSelector(state => state.app.donate);
  const balance = useAppSelector(state => state.app.balance);

  const dispatch = useAppDispatch();

  return (
    <div>
      <div>
        work:{" "}
        <input
          value={work}
          type={"number"}
          onChange={e => dispatch(changeValue({ work: +e.target.value }))}
        />
      </div>
      <div>
        donate:{" "}
        <input
          value={donate}
          type={"number"}
          onChange={e => dispatch(changeValue({ donate: +e.target.value }))}
        />
      </div>

      <h1>💵 balance: {balance}</h1>
      <button
        onClick={() => {
          dispatch(changeValue({ balance: work + donate }));
        }}
      >
        calculate balance
      </button>
    </div>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <Income />
  </Provider>
);

// 📜 Описание:
// Что нужно написать вместо XXX, чтобы вывелась сумма дохода в строке баланса
//
// 🖥 Пример ответа: console.log(work + donate) */

/* import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import {
  Provider,
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from "react-redux";
import { configureStore, combineReducers } from "@reduxjs/toolkit";

// Styles
const modal: React.CSSProperties = {
  position: "fixed",
  zIndex: 1,
  left: 0,
  top: 0,
  width: "100%",
  height: "100%",
  overflow: "auto",
  backgroundColor: "rgba(23,26,38,0.26)",
};

const modalContent: React.CSSProperties = {
  backgroundColor: "#fefefe",
  margin: "15% auto",
  padding: "20px",
  border: "1px solid #888",
  width: "80%",
};

// Reducer
const initState = { tasks: [] as any[] };
type InitStateType = typeof initState;

const appReducer = (
  state: InitStateType = initState,
  action: ActionsType
): InitStateType => {
  switch (action.type) {
    case "ADD_TASK":
      return {
        ...state,
        tasks: [action.task, ...state.tasks],
      };
    case "CHANGE_TASK":
      return {
        ...state,
        tasks: [
          action.task,
          ...state.tasks.filter((t: any) => t.id !== action.task.id),
        ],
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

const addTask = (task: any) => ({ type: "ADD_TASK", task } as const);
const changeTask = (task: any) => ({ type: "CHANGE_TASK", task } as const);
type ActionsType = ReturnType<typeof addTask> | ReturnType<typeof changeTask>;

// Components
const Modal = (props: any) => {
  const [value, setValue] = useState(props.task?.name || "");

  return (
    <div style={modalContent}>
      modal:
      <input value={value} onChange={e => setValue(e.target.value)} />
      <button onClick={() => props.callback(value)}>{props.title}</button>
    </div>
  );
};

const Task = (props: any) => {
  const [show, setShow] = useState(false);

  return (
    <div>
      {props.task.name}
      <button onClick={() => setShow(true)}>change</button>
      {show && (
        <Modal
          callback={(value: string) => {
            props.change(value);
            setShow(false);
          }}
          title={"change"}
        />
      )}
    </div>
  );
};

export const Todolist = () => {
  const tasks = useAppSelector(state => state.app.tasks);
  const dispatch = useAppDispatch();
  const [show, setShow] = useState(false);

  const getId = () =>
    tasks.reduce((acc: number, t: any) => (acc > t.id ? acc : t.id), 0) + 1;

  const mapped = tasks.map((t: any) => (
    <Task
      key={t.id}
      task={t}
      change={(value: string) =>
        dispatch(changeTask({ id: t.id, name: value }))
      }
    />
  ));

  return (
    <div style={modal}>
      <button onClick={() => setShow(true)}>open modal</button>
      {show && (
        <Modal
          callback={(value: string) => {
            dispatch(addTask({ id: getId(), name: value }));
            setShow(false);
          }}
          title={"add"}
        />
      )}
      {mapped}
    </div>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <Todolist />
  </Provider>
);

// 📜Описание:
// Откройте модалку и добавьте какой-нибудь текст.
// Теперь попробуйте изменить этот текст.
// При изменении существующей таски в инпуте не отображается старые данные.
// Ваша задача починить это поведение.
//
// В качестве ответа укажите строку кода, которую нужно изменить или добавить,
// чтобы реализовать данную задачу
//
// 🖥 Пример ответа: defaultValue={value} */

/* import React from "react";
import ReactDOM from "react-dom/client";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import {
  Provider,
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from "react-redux";
import { configureStore, combineReducers } from "@reduxjs/toolkit";

// Reducer
const initState = {
  animals: [
    { likes: 0, name: "cat" },
    { likes: 0, name: "dog" },
    { likes: 0, name: "fish" },
    { likes: 0, name: "spider" },
    { likes: 0, name: "bird" },
  ] as { likes: number; name: string }[],
};
type InitStateType = typeof initState;

const appReducer = (
  state: InitStateType = initState,
  action: ActionsType
): InitStateType => {
  switch (action.type) {
    case "LIKE":
      return {
        ...state,
        animals: state.animals.map(animal => {
          return animal.name === action.name ? { ...animal, likes: action.likes } : animal}),
      };
  }
  return state;
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

const like = (likes: any, name: any) =>
  ({ type: "LIKE", likes, name } as const);
type ActionsType = ReturnType<typeof like>;

// Components
export const Animals = () => {
  const animals = useAppSelector(state => state.app.animals);
  const dispatch = useAppDispatch();

  const mapped = animals.map((a: any, i: number) => (
    <div key={i}>
      {a.name}-{a.likes}-
      <button onClick={() => dispatch(like(a.likes + 1, a.name))}>Like!</button>
    </div>
  ));

  return <div>{mapped}</div>;
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <Animals />
  </Provider>
);

// 📜 Описание:
// На экране отображен список животных.
// Кликните на like и вы увидите, что ничего не происходит.
// Ваша задача починить лайки.
// В качестве ответа укажите исправленную версию строки
//
// 🖥 Пример ответа: -{a.likes + 1}- */

/* import ReactDOM from "react-dom/client";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import {
  Provider,
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from "react-redux";
import React, { useEffect } from "react";
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
const initState = {
  users: [] as UserType[],
  params: {
    sortBy: null,
    sortDirection: "asc",
  } as ParamsType,
};
type InitStateType = typeof initState;

const appReducer = (
  state: InitStateType = initState,
  action: ActionsType
): InitStateType => {
  switch (action.type) {
    case "SET_USERS":
      return { ...state, users: action.users };
    case "SET_PARAMS":
      return { ...state, params: { ...state.params, ...action.payload } };
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
const setParamsAC = (payload: ParamsType) =>
  ({ type: "SET_PARAMS", payload } as const);
type ActionsType =
  | ReturnType<typeof setUsersAC>
  | ReturnType<typeof setParamsAC>;

// Thunk
const getUsersTC = (): AppThunk => (dispatch, getState) => {
  const params = getState().app.params;
  api
    .getUsers(params.sortBy ? params : undefined)
    .then(res => dispatch(setUsersAC(res.data.items)));
};

export const Users = () => {
  const users = useAppSelector(state => state.app.users);
  const sortBy = useAppSelector(state => state.app.params.sortBy);
  const sortDirection = useAppSelector(state => state.app.params.sortDirection);
  console.log(users, sortBy, sortDirection);

  const dispatch = useAppDispatch();

  // ❗❗❗ XXX ❗❗❗
  useEffect(() => {
    dispatch(getUsersTC());
  }, [sortBy, sortDirection]);

  const sortHandler = (name: string) => {
    const direction = sortDirection === "asc" ? "desc" : "asc";
    dispatch(setParamsAC({ sortBy: name, sortDirection: direction }));
  };

  return (
    <div>
      <h1>👪 Список пользователей</h1>
      <table style={table}>
        <thead>
          <tr>
            <th style={th} onClick={() => sortHandler("name")}>
              Name
            </th>
            <th style={th} onClick={() => sortHandler("age")}>
              Age
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
// Перед вами таблица с пользователями. Но данные не подгружаются
// Что нужно написать вместо XXX, чтобы:
// 1) Пользователи подгрузились
// 2) Чтобы работала сортировка по имени и возрасту
// 3) Направление сортировки тоже должно работать (проверить можно нажав на одно и тоже поле 2 раза)

// 🖥 Пример ответа: console.log(users, sortBy, sortDirection)
 */

/* import React from "react";
import ReactDOM from "react-dom/client";

export const App = () => {
  return (
    <div>
      <h2>
        Какая команда позволяет на время «сдать в архив» (или отложить)
        изменения, сделанные в рабочей копии, чтобы вы могли применить их позже?
        Откладывание изменений полезно, если вам необходимо переключить контекст
        и вы пока не готовы к созданию коммита.
      </h2>
    </div>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<App />);

// 📜 Описание:
// Какая команда позволяет на время «сдать в архив» (или отложить) изменения, сделанные в рабочей
// копии, чтобы вы могли применить их позже? Откладывание изменений полезно, если вам необходимо переключить
// контекст и вы пока не готовы к созданию коммита.

// 🖥 Пример ответа: git init  ----> git stash!!!!*/

/* export const App = () => {
  return (
    <div>
      <h2>В каком случае возникают конфликты при слиянии веток ?</h2>
      <ul>
        <li>
          1 - В случае, когда в обеих ветках есть изменения одних и тех же строк
        </li>
        <li>2 - В случае когда ветки были созданы от разных коммитов</li>
        <li>3 - В случае когда ветки были созданы в разное время</li>
        <li>
          4 - Конфликты не возникают, это устаревшая проблема. Сегодня git под
          капотом все сам может разрулить
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
// В каком случае возникают конфликты при слиянии веток ?
// Может быть несколько вариантов ответа (ответ дайте через пробел).
// ❗ Ответ будет засчитан как верный, только при полном правильном совпадении.
// Если указали правильно один вариант (1),
// а нужно было указать два варианта (1 и 2), то ответ в данном случае будет засчитан как неправильный

// 🖥 Пример ответа: 1 */

/* import ReactDOM from "react-dom/client";
import React, { FC, ReactNode } from "react";

const quizStyle: React.CSSProperties = {
  background: "lightgreen",
  padding: "10px",
  margin: "10px",
};

type BtnPropsType = {
  question: ReactNode;
  children: ReactNode;
};

const Block: FC<BtnPropsType> = ({ question, children }) => {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      {question} = {children}
    </div>
  );
};

const quiz = [
  { id: 1, question: "1 + 1", answer: "2" },
  { id: 2, question: "2 + 2", answer: "4" },
  { id: 3, question: "3 + 3", answer: "6" },
];

const App = () => {
  return (
    <div>
      {quiz.map(q => {
        return (
          <Block key={q.id} question={<h2 style={quizStyle}>{q.question}</h2>}>
            <h2 style={quizStyle}>{q.answer}</h2>
          </Block>
        );
      })}
    </div>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<App />);

// 📜 Описание:
// Что необходимо написать вместо XXX и YYY, чтобы на экране отобразились вопросы и ответы из массива quiz.
// 1 + 1 = 2
// 2 + 2 = 4
// 3 + 3 = 6
// ❗ Ответ дайте через пробел

// 🖥 Пример ответа: quiz[0]=yes redux=h2 */

/* import React from "react";
import ReactDOM from "react-dom/client";

export const App = () => {
  return (
    <div>
      <h2>Какое из приведенных ниже определений верно ?</h2>
      <ul>
        <li>
          1 - После того как файл был проиндексирован с помощью git init и
          закоммичен, git будет отслеживать все следующие изменения в нём.
        </li>
        <li>
          2 - Ветки в Git представляют собой указатель на коммит. Если нужно
          добавить какую-то фичу или исправить баг (незначительный или
          серьезный), мы создаём новую ветку. Она будет содержать все изменения,
          которые мы хотим добавить в репозиторий.
        </li>
        <li>
          3 - Команда git add создает новый репозиторий Git. С ее помощью можно
          преобразовать существующий проект без управления версиями в
          репозиторий Git или инициализировать новый пустой репозиторий
        </li>
        <li>4 - Ни одно из вышеперечисленных определений не верно</li>
      </ul>
    </div>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<App />);

// 📜 Описание:
// Какое из приведенных ниже определений верно ?
// Может быть несколько вариантов ответа (ответ дайте через пробел).
// ❗ Ответ будет засчитан как верный, только при полном правильном совпадении.
// Если указали правильно один вариант (1),
// а нужно было указать два варианта (1 и 2), то ответ в данном случае будет засчитан как неправильный

// 🖥 Пример ответа: 1 ---< 2!!!*/

/* import ReactDOM from "react-dom/client";
import React, { useState } from "react";

export const Jpegs = () => {
  const [fileURL, setFileURL] = useState<any>();

  const onChange = (e: any) => {
    const maybeFile = e.target.files?.[0];
    if (maybeFile) {
      if (maybeFile.type === "image/jpeg") {
        setFileURL(maybeFile);
        return;
      } else alert("not .jpg!");
    }
    setFileURL("");
  };

  return (
    <div>
      <input type={"file"} onChange={onChange} />
      {fileURL && <img src={URL.createObjectURL(fileURL)} alt={"avatar"} />}
    </div>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<Jpegs />);

// 📜 Описание:
// Не отображается картинка при выборе.
// В качестве ответа укажите исправленную версию строки кода
//
// 🖥 Пример ответа: value={fileURL} */

/* import ReactDOM from "react-dom/client";
import React from "react";

export const Jpegs = () => {
  return (
    <div>
      <iframe
        src="//coub.com/embed/2wp0wa?muted=false&autostart=false&originalSize=false&startWithHD=true"
        frameBorder="0"
        width="640"
        height="360"
        allow="autoplay"
      />
    </div>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<Jpegs />);

// 📜 Описание:
// Пользователи жалуются, что нельзя развернуть видео на весь экран
// В качестве ответа укажите исправленную или добавленную строку кода
//
// 🖥 Пример ответа: iframe.станьНаВесьЭкранПожалуйста() */

/* import ReactDOM from "react-dom/client";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import {
  Provider,
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from "react-redux";
import React, { FC, useEffect } from "react";
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

const thActive: React.CSSProperties = {
  padding: "10px",
  border: "1px solid black",
  background: "lightblue",
  cursor: "pointer",
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
const initState = {
  users: [] as UserType[],
  params: {
    sortBy: "name",
    sortDirection: "asc",
  } as ParamsType,
};
type InitStateType = typeof initState;

const appReducer = (
  state: InitStateType = initState,
  action: ActionsType
): InitStateType => {
  switch (action.type) {
    case "SET_USERS":
      return { ...state, users: action.users };
    case "SET_PARAMS":
      return { ...state, params: { ...state.params, ...action.payload } };
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
const setParamsAC = (payload: ParamsType) =>
  ({ type: "SET_PARAMS", payload } as const);
type ActionsType =
  | ReturnType<typeof setUsersAC>
  | ReturnType<typeof setParamsAC>;

// Thunk
const getUsersTC = (): AppThunk => (dispatch, getState) => {
  const params = getState().app.params;
  api.getUsers(params).then(res => dispatch(setUsersAC(res.data.items)));
};

export const Users = () => {
  const users = useAppSelector(state => state.app.users);
  const sortBy = useAppSelector(state => state.app.params.sortBy);
  const sortDirection = useAppSelector(state => state.app.params.sortDirection);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUsersTC());
  }, [sortBy, sortDirection]);

  const sortHandler = (sortBy: string) => {
    const direction = sortDirection === "asc" ? "desc" : "asc";
    dispatch(setParamsAC({ sortBy, sortDirection: direction }));
  };

  return (
    <div>
      <h1>👪 Список пользователей</h1>
      <table style={table}>
        <thead>
          <tr>
            <Th name={"name"} sortHandler={sortHandler} />
            <Th name={"age"} sortHandler={sortHandler} />
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

type ThPropsType = {
  name: string;
  sortHandler: (name: string) => void;
};

const Th: FC<ThPropsType> = ({ name, sortHandler }) => {
  const sortBy = useAppSelector(state => state.app.params.sortBy);
  const sortDirection = useAppSelector(state => state.app.params.sortDirection);

  const condition1 = sortBy === name;
  const condition2 = sortDirection === "asc";

  return (
    <th style={condition1 ? thActive : th} onClick={() => sortHandler(name)}>
      {name}
      {condition1 && (condition2 ? <span> ⬆</span> : <span> ⬇</span>)}
    </th>
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
// Покликайте по вкладкам age и name и убедитесь, что сортировка работает верно,
// но в шапке некорректно отображаются стрелки и не видно активной колонки
// Ваша задача написать правильные условия вместо XXX и YYY, чтобы:
// 1) Стрелки соответствовали сортировке (если сортировка от меньшего к большему, то стрелка вверх)
// 2) Шапка активной колонки была голубая, а неактивной серая
// ❗ Ответ дайте через пробел

// 🖥 Пример ответа: a === '1' b !== a */
