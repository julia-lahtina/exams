/* import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { Provider, TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import axios, { AxiosError } from "axios";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

// Types
type PostType = {
    id: string;
    body: string;
    title: string;
    userId: string;
};

// Api
const instance = axios.create({ baseURL: "https://exams-frontend.kimitsu.it-incubator.ru/api/ " });

const postsAPI = {
    getPosts() {
        return instance.get<PostType[]>("posts");
    },
};

// Reducer
const initState = {
    error: null as string | null,
    posts: [] as PostType[],
};

type InitStateType = typeof initState;

const appReducer = (state: InitStateType = initState, action: ActionsType): InitStateType => {
    switch (action.type) {
        case "POSTS/GET-POSTS":
            return { ...state, posts: action.posts };

        case "POSTS/SET-ERROR":
            return { ...state, error: action.error };

        default:
            return state;
    }
};

const getPostsAC = (posts: PostType[]) => ({ type: "POSTS/GET-POSTS", posts }) as const;
const setErrorAC = (error: string | null) => ({ type: "POSTS/SET-ERROR", error }) as const;
type ActionsType = ReturnType<typeof getPostsAC> | ReturnType<typeof setErrorAC>;

// Thunk
const getPostsTC = (): AppThunk => (dispatch) => {
    postsAPI
        .getPosts()
        .then((res) => {
            dispatch(getPostsAC(res.data));
        })
        .catch((e: AxiosError) => {
            console.log(e)
            dispatch(setErrorAC(e.message))
        });
};

// Store
const rootReducer = combineReducers({
    app: appReducer,
});

const store = configureStore({ reducer: rootReducer });
type RootState = ReturnType<typeof store.getState>;
type AppDispatch = ThunkDispatch<RootState, unknown, ActionsType>;
type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, ActionsType>;
const useAppDispatch = () => useDispatch<AppDispatch>();
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Components
export const App = () => {
    const dispatch = useAppDispatch();

    const posts = useAppSelector((state) => state.app.posts);
    const error = useAppSelector((state) => state.app.error);

    useEffect(() => {
        dispatch(getPostsTC());
    }, []);

    return (
        <>
            <h1>📜 Список постов</h1>
            {posts.length ? (
                posts.map((c) => {
                    return (
                        <div key={c.id}>
                            <b>Описание</b>: {c.body}{" "}
                        </div>
                    );
                })
            ) : (
                <h3>
                    ❌ Посты не подгрузились. Произошла какая-то ошибка. Выведите сообщение об ошибке на экран
                </h3>
            )}
            <h2 style={{ color: "red" }}>{!!error && error}</h2>
        </>
    );
};

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
    <Provider store={store}>
        <App />
    </Provider>,
);

// 📜 Описание:
// ❌ Посты не подгрузились. Произошла какая-то ошибка.
// Чинить приложение не нужно (если только для себя, в ответе это не учитывается).
// Задача: вывести сообщение об ошибке на экран.
// В качестве ответа указать строку коду, которая позволит это осуществить

// 🖥 Пример ответа: const store = createStore(rootReducer, applyMiddleware(thunk)) */


/* 

import React from "react";
import ReactDOM from "react-dom/client";
import { Provider, TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { configureStore, combineReducers } from "@reduxjs/toolkit";

// Types
type PhotoType = {
    albumId: string;
    id: string;
    title: string;
    url: string;
};

// Api
const instance = axios.create({ baseURL: "https://exams-frontend.kimitsu.it-incubator.ru/api/" });

const photosAPI = {
    getPhotos() {
        return instance.get<PhotoType[]>("photos?delay=2");
    },
};

// Reducer
const initState = {
    isLoading: false,
    photos: [] as PhotoType[],
};

type InitStateType = typeof initState;

const photoReducer = (state: InitStateType = initState, action: ActionsType): InitStateType => {
    switch (action.type) {
        case "PHOTO/GET-PHOTOS":
            return { ...state, photos: action.photos };
        case "PHOTO/IS-LOADING":
            return { ...state, isLoading: action.isLoading };
        default:
            return state;
    }
};

const getPhotosAC = (photos: PhotoType[]) => ({ type: "PHOTO/GET-PHOTOS", photos }) as const;
const setLoadingAC = (isLoading: boolean) => ({ type: "PHOTO/IS-LOADING", isLoading }) as const;
type ActionsType = ReturnType<typeof getPhotosAC> | ReturnType<typeof setLoadingAC>;

const getPhotosTC = (): AppThunk => (dispatch) => {
    dispatch(setLoadingAC(true));
    photosAPI.getPhotos().then((res) => {
        dispatch(getPhotosAC(res.data));
        dispatch(setLoadingAC(false));
    });
};

// Store
const rootReducer = combineReducers({
    photo: photoReducer,
});

const store = configureStore({ reducer: rootReducer });
type RootState = ReturnType<typeof store.getState>;
type AppDispatch = ThunkDispatch<RootState, unknown, ActionsType>;
type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, ActionsType>;
const useAppDispatch = () => useDispatch<AppDispatch>();
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Loader
export const Loader = () => {
    return <h1>Loading ...</h1>;
};

// App
const App = () => {
    const dispatch = useAppDispatch();
    const photos = useAppSelector((state) => state.photo.photos);
    const isLoading = useAppSelector((state) => state.photo.isLoading);

    const getPhotosHandler = () => {
        dispatch(getPhotosTC());
    };

    return (
        <>
            <h1>📸 Фото</h1>
            <button onClick={getPhotosHandler}>Подгрузить фотографии</button>
            {isLoading && <Loader />}
            <div style={{ display: "flex", gap: "20px", margin: "20px" }}>
                {photos.map((p) => {
                    return (
                        <div key={p.id}>
                            <b>title</b>: {p.title}
                            <div>
                                <img src={p.url} alt="" />
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
    <Provider store={store}>
        <App />
    </Provider>,
);

// 📜 Описание:
// При нажатии на кнопку "Подгрузить фотографии" вы должны увидеть Loading...,
// и через 3 секунды непосредственно фотографии.
// Но после подгрузки данных Loader не убирается.
// Какой код нужно написать, чтобы Loader перестал отображаться после получения данных
// В качестве ответа напишите строку кода.

// 🖥 Пример ответа: console.log('stop Loader') */




/* 
import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { Provider, TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import axios, { AxiosError } from "axios";
import { configureStore, combineReducers } from "@reduxjs/toolkit";

// Types
type CommentType = {
    postId: string;
    id: string;
    name: string;
    email: string;
    body: string;
};

// Api
const instance = axios.create({ baseURL: "https://exams-frontend.kimitsu.it-incubator.ru/api/" });

const commentsAPI = {
    getComments() {
        return instance.get<CommentType[]>("comments");
    },
};

// Reducer
const initState = {
    comments: [] as CommentType[],
};

type InitStateType = typeof initState;

const appReducer = (state: InitStateType = initState, action: ActionsType) => {
    switch (action.type) {
        case "COMMENTS/GET-COMMENTS":
            return { ...state, comments: action.comments };

        default:
            return state;
    }
};

const getCommentsAC = (comments: CommentType[]) =>
    ({ type: "COMMENTS/GET-COMMENTS", comments }) as const;
type ActionsType = ReturnType<typeof getCommentsAC>;

// Thunk
const getCommentsTC = (): AppThunk => (dispatch) => {
    commentsAPI
        .getComments()
        .then((res) => {
            dispatch(getCommentsAC(res.data));
        })
        .catch((e: AxiosError) => {
            alert(`Сообщение об ошибке: ${e.message}`);
        });
};

// Store
const rootReducer = combineReducers({
    app: appReducer,
});

const store = configureStore({ reducer: rootReducer });
type RootState = ReturnType<typeof store.getState>;
type AppDispatch = ThunkDispatch<RootState, unknown, ActionsType>;
type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, ActionsType>;
const useAppDispatch = () => useDispatch<AppDispatch>();
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Components
export const App = () => {
    const comments = useAppSelector((state) => state.app.comments);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getCommentsTC());
    }, []);

    return (
        <>
            <h1>📝 Список комментариев</h1>
            {comments.length ? (
                comments.map((c) => {
                    return (
                        <div key={c.id}>
                            <b>Comment</b>: {c.body}{" "}
                        </div>
                    );
                })
            ) : (
                <h3>❌ Комментарии не подгрузились. Произошла какая-то ошибка. Найди и исправь ее</h3>
            )}
        </>
    );
};

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
    <Provider store={store}>
        <App />
    </Provider>,
);

// 📜 Описание:
// ❌ Комментарии не подгрузились. Произошла какая-то ошибка.
// В данном задании вам нужно найти ошибку и починить приложение.
// Если сделаете все верно, то увидите комментарии.
// В качестве ответа указать исправленную строку коду

// 🖥 Пример ответа: const store = createStore(rootReducer, applyMiddleware(thunk))
 */




/* 

import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { Provider, TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import axios, { AxiosError } from "axios";
import { configureStore, combineReducers, Dispatch } from "@reduxjs/toolkit";

// TYPES
type TodoType = {
    id: string;
    title: string;
    order: number;
    createdAt: string;
    updatedAt: string;
    completed: boolean;
};

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
const instance = axios.create({ baseURL: "https://exams-frontend.kimitsu.it-incubator.ru/api/" });

const api = {
    getTodos() {
        return instance.get<TodoType[]>("todos");
    },
    getUsers() {
        return instance.get<UsersResponseType>("users");
    },
};

// Reducer
const initState = {
    isLoading: false,
    error: null as string | null,
    todos: [] as TodoType[],
    users: [] as UserType[],
};

type InitStateType = typeof initState;

const appReducer = (state: InitStateType = initState, action: ActionsType): InitStateType => {
    switch (action.type) {
        case "APP/GET-TODOS":
            return { ...state, todos: action.todos };
        case "APP/GET-USERS":
            return { ...state, users: action.users };
        case "APP/IS-LOADING":
            return { ...state, isLoading: action.isLoading };
        case "APP/SET-ERROR":
            return { ...state, error: action.error };
        default:
            return state;
    }
};

const getUsersAC = (users: UserType[]) => ({ type: "APP/GET-USERS", users }) as const;
const getTodosAC = (todos: TodoType[]) => ({ type: "APP/GET-TODOS", todos }) as const;
const setLoadingAC = (isLoading: boolean) => ({ type: "APP/IS-LOADING", isLoading }) as const;
const setError = (error: string | null) => ({ type: "APP/SET-ERROR", error }) as const;

type ActionsType =
    | ReturnType<typeof getUsersAC>
    | ReturnType<typeof getTodosAC>
    | ReturnType<typeof setLoadingAC>
    | ReturnType<typeof setError>;

// Utils functions
function baseSuccessHandler<T>(dispatch: Dispatch, actionCreator: Function, data: T) {
    dispatch(actionCreator(data));
    dispatch(setLoadingAC(false));
}

// Thunk
const getTodosTC = (): AppThunk => (dispatch) => {
    dispatch(setLoadingAC(true));
    api
        .getTodos()
        .then(res => {
            // ❗❗❗ XXX ❗❗❗
            baseSuccessHandler(dispatch, getTodosAC, res.data)
        })
        .catch((e: AxiosError) => {
            dispatch(setError(e.message));
            dispatch(setLoadingAC(false));
        });
};

const getUsersTC = (): AppThunk => (dispatch) => {
    dispatch(setLoadingAC(true));
    api
        .getUsers()
        .then((res) => {
            // ❗❗❗ YYY ❗❗❗
            baseSuccessHandler(dispatch, getUsersAC, res.data.items)
            //console.log(res.data.items)
        })
        .catch((e: AxiosError) => {
            dispatch(setError(e.message));
            dispatch(setLoadingAC(false));
        });
};

// Store
const rootReducer = combineReducers({
    app: appReducer,
});

const store = configureStore({ reducer: rootReducer });
type RootState = ReturnType<typeof store.getState>;
type AppDispatch = ThunkDispatch<RootState, unknown, ActionsType>;
type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, ActionsType>;
const useAppDispatch = () => useDispatch<AppDispatch>();
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// COMPONENTS
// Loader
export const Loader = () => {
    return <h1>Loading ...</h1>;
};

const App = () => {
    return (
        <>
            <h1>✅Todos & 🙂Users</h1>
            <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                <Todos />
                <Users />
            </div>
        </>
    );
};

const Todos = () => {
    const dispatch = useAppDispatch();
    const todos = useAppSelector((state) => state.app.todos);
    const error = useAppSelector((state) => state.app.error);
    const isLoading = useAppSelector((state) => state.app.isLoading);

    useEffect(() => {
        dispatch(getTodosTC());
    }, []);

    return (
        <div>
            <h2>✅ Список тудулистов</h2>
            {!!error && <h2 style={{ color: "red" }}>{error}</h2>}
            {isLoading && <Loader />}
            {todos.map((t) => {
                return (
                    <div style={t.completed ? { color: "grey" } : {}} key={t.id}>
                        <input type="checkbox" checked={t.completed} />
                        <b>Описание</b>: {t.title}
                    </div>
                );
            })}
        </div>
    );
};

const Users = () => {
    const dispatch = useAppDispatch();
    const users = useAppSelector((state) => state.app.users);
    const error = useAppSelector((state) => state.app.error);
    const isLoading = useAppSelector((state) => state.app.isLoading);

    useEffect(() => {
        dispatch(getUsersTC());
    }, []);

    return (
        <div>
            <h2>🙂 Список юзеров</h2>
            {!!error && <h2 style={{ color: "red" }}>{error}</h2>}
            {isLoading && <Loader />}
            <div>
                {users.map((u) => {
                    return (
                        <div key={u.id}>
                            <b>name</b>:{u.name} - <b>age</b>:{u.age}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
    <Provider store={store}>
        <App />
    </Provider>,
);

// 📜 Описание:
// Перед вами список тудулистов и пользователей, которые находятся в постоянной загрузке.
// Откройте network и вы увидите что запросы на сервер уходят и возвращаются с хорошими данными,
// но вместо этого пользователь видит на экране Loader.
// Для обработки успешного результата написана утилитная функция baseSuccessHandler.
// Ваша задача воспользоваться этой функцией отобразить Todos и Users
// Что нужно написать вместо XXX и YYY, чтобы реализовать данную задачу?
// Ответ дайте через пробел.

// 🖥 Пример ответа: dispatch(baseSuccessHandler(1,2,3))  dispatch(baseSuccessHandler(3,2,1) */



/* 

import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { Provider, TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import axios from "axios";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { isDisabled } from "@testing-library/user-event/dist/utils";

// Types
type PostDomainType = PostType & {
    isDisabled: boolean;
};

type PostType = {
    body: string;
    id: string;
    title: string;
    userId: string;
};

// Api
const instance = axios.create({ baseURL: "https://exams-frontend.kimitsu.it-incubator.ru/api/" });

const postsAPI = {
    getPosts() {
        return instance.get<PostType[]>("posts");
    },
    deletePost(id: string) {
        return instance.delete<{ message: string }>(`posts/${id}?delay=3`);
    },
};

// Reducer
const initState = {
    isLoading: false,
    posts: [] as PostDomainType[],
};

type InitStateType = typeof initState;

const postsReducer = (state: InitStateType = initState, action: ActionsType): InitStateType => {
    switch (action.type) {
        case "POSTS/GET-POSTS":
            return {
                ...state,
                posts: action.posts.map((t) => {
                    return { ...t, isDisabled: false };
                }),
            };

        case "POSTS/DELETE-POST":
            return { ...state, posts: state.posts.filter((t) => t.id !== action.id) };

        case "POSTS/IS-LOADING":
            return { ...state, isLoading: action.isLoading };

        case "POSTS/IS-DISABLED":
            return {
                ...state,
                posts: state.posts.map((t) => {
                    if (t.id === action.id) {
                        return { ...t, isDisabled: action.isDisabled };
                    } else {
                        return t;
                    }
                }),
            };

        default:
            return state;
    }
};

const getPostsAC = (posts: PostType[]) => ({ type: "POSTS/GET-POSTS", posts }) as const;
const deletePostAC = (id: string) => ({ type: "POSTS/DELETE-POST", id }) as const;
const setLoadingAC = (isLoading: boolean) => ({ type: "POSTS/IS-LOADING", isLoading }) as const;
const setIsDisabled = (isDisabled: boolean, id: string) =>
    ({ type: "POSTS/IS-DISABLED", isDisabled, id }) as const;
type ActionsType =
    | ReturnType<typeof getPostsAC>
    | ReturnType<typeof deletePostAC>
    | ReturnType<typeof setLoadingAC>
    | ReturnType<typeof setIsDisabled>;

// Thunk
const getPostsTC = (): AppThunk => (dispatch) => {
    postsAPI.getPosts().then((res) => {
        dispatch(getPostsAC(res.data));
    });
};

const deletePostTC =
    (id: string): AppThunk =>
        (dispatch) => {
            dispatch(setIsDisabled(true, id));
            dispatch(setLoadingAC(true));
            postsAPI.deletePost(id).then((res) => {
                dispatch(deletePostAC(id));
                dispatch(setLoadingAC(false));
            });
        };

// Store
const rootReducer = combineReducers({
    posts: postsReducer,
});

const store = configureStore({ reducer: rootReducer });
type RootState = ReturnType<typeof store.getState>;
type AppDispatch = ThunkDispatch<RootState, unknown, ActionsType>;
type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, ActionsType>;
const useAppDispatch = () => useDispatch<AppDispatch>();
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Loader
export const Loader = () => {
    return <h1>Loading ...</h1>;
};

// App
const App = () => {
    const dispatch = useAppDispatch();
    const posts = useAppSelector((state) => state.posts.posts);
    const isLoading = useAppSelector((state) => state.posts.isLoading);

    useEffect(() => {
        dispatch(getPostsTC());
    }, []);

    const deletePostHandler = (id: string) => {
        dispatch(deletePostTC(id));
    };

    return (
        <div>
            <div style={{ position: "absolute", top: "0px" }}>{isLoading && <Loader />}</div>
            <div style={{ marginTop: "100px" }}>
                <h1>📜 Список постов</h1>
                {posts.map((p) => {
                    return (
                        <div key={p.id}>
                            <b>title</b>: {p.title}
                            <button style={{ marginLeft: "15px" }} onClick={() => deletePostHandler(p.id)} disabled={posts[p].isDisabled}>
                                удалить пост
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
    <Provider store={store}>
        <App />
    </Provider>,
);

// 📜 Описание:
// Перед вами список постов.
// Откройте network и быстро нажмите на кнопку удалить пост несколько раз подряд.
// Откройте вкладку Preview и проанализируйте ответ с сервера
// Первое сообщение будет "Post has been successfully deleted",
// а следующие "Post with id: 63626ac315d01f80765587ee does not exist"
// Т.е. бэкенд первый раз удаляет, а потом уже не может, т.к. пост удален из базы данных.

// Ваша задача при первом клике задизаблить кнопку удаления,
// соответсвенно не давать пользователю возможности слать повторные запросы.
// ❗ Необходимо задизаблить кнопку именно удаляемого поста, а не все кнопки.
// Необходимую строку кода для решения этой задачи напишите в качестве ответа.

// 🖥 Пример ответа: style={{marginRight: '20px'}}
 */




/* 
import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { Provider, TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import axios, { AxiosError } from "axios";
import { configureStore, combineReducers, Dispatch } from "@reduxjs/toolkit";

// TYPES
type TodoType = {
    id: string;
    title: string;
    order: number;
    createdAt: string;
    updatedAt: string;
    completed: boolean;
};

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
const instance = axios.create({ baseURL: "https://exams-frontend.kimitsu.it-incubator.ru/api/" });

const api = {
    getTodos() {
        return instance.get<TodoType[]>("todo");
    },
    getUsers() {
        return instance.get<UsersResponseType>("user");
    },
};

// Reducer
const initState = {
    isLoading: false,
    error: null as string | null,
    todos: [] as TodoType[],
    users: [] as UserType[],
};

type InitStateType = typeof initState;

const appReducer = (state: InitStateType = initState, action: ActionsType): InitStateType => {
    switch (action.type) {
        case "APP/GET-TODOS":
            return { ...state, todos: action.todos };
        case "APP/GET-USERS":
            return { ...state, users: action.users };
        case "APP/IS-LOADING":
            return { ...state, isLoading: action.isLoading };
        case "APP/SET-ERROR":
            return { ...state, error: action.error };
        default:
            return state;
    }
};

const getUsersAC = (users: UserType[]) => ({ type: "APP/GET-USERS", users }) as const;
const getTodosAC = (todos: TodoType[]) => ({ type: "APP/GET-TODOS", todos }) as const;
const setLoadingAC = (isLoading: boolean) => ({ type: "APP/IS-LOADING", isLoading }) as const;
const setError = (error: string | null) => ({ type: "APP/SET-ERROR", error }) as const;

type ActionsType =
    | ReturnType<typeof getUsersAC>
    | ReturnType<typeof getTodosAC>
    | ReturnType<typeof setLoadingAC>
    | ReturnType<typeof setError>;

// Utils functions
function baseErrorHandler(dispatch: Dispatch, message: string) {
    dispatch(setError(message));
    dispatch(setLoadingAC(false));
}

// Thunk
const getTodosTC = (): AppThunk => (dispatch) => {
    dispatch(setLoadingAC(true));
    api
        .getTodos()
        .then((res) => {
            dispatch(getTodosAC(res.data));
            dispatch(setLoadingAC(false));
        })
        .catch((e: AxiosError) => {
            // ❗❗❗ XXX ❗❗❗
            baseErrorHandler(dispatch, e.message)
        });
};

const getUsersTC = (): AppThunk => (dispatch) => {
    dispatch(setLoadingAC(true));
    api
        .getUsers()
        .then((res) => {
            dispatch(getUsersAC(res.data.items));
            dispatch(setLoadingAC(false));
        })
        .catch((e: AxiosError) => {
            // ❗❗❗ XXX ❗❗❗
            baseErrorHandler(dispatch, e.message)
        });
};

// Store
const rootReducer = combineReducers({
    app: appReducer,
});

const store = configureStore({ reducer: rootReducer });
type RootState = ReturnType<typeof store.getState>;
type AppDispatch = ThunkDispatch<RootState, unknown, ActionsType>;
type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, ActionsType>;
const useAppDispatch = () => useDispatch<AppDispatch>();
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// COMPONENTS
// Loader
export const Loader = () => {
    return <h1>Loading ...</h1>;
};

const App = () => {
    return (
        <>
            <h1>✅Todos & 🙂Users</h1>
            <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                <Todos />
                <Users />
            </div>
        </>
    );
};

const Todos = () => {
    const dispatch = useAppDispatch();
    const todos = useAppSelector((state) => state.app.todos);
    const error = useAppSelector((state) => state.app.error);
    const isLoading = useAppSelector((state) => state.app.isLoading);

    useEffect(() => {
        dispatch(getTodosTC());
    }, []);

    return (
        <div>
            <h2>✅ Список тудулистов</h2>
            {!!error && <h2 style={{ color: "red" }}>{error}</h2>}
            {isLoading && <Loader />}
            {todos.map((t) => {
                return (
                    <div style={t.completed ? { color: "grey" } : {}} key={t.id}>
                        <input type="checkbox" checked={t.completed} />
                        <b>Описание</b>: {t.title}
                    </div>
                );
            })}
        </div>
    );
};

const Users = () => {
    const dispatch = useAppDispatch();
    const users = useAppSelector((state) => state.app.users);
    const error = useAppSelector((state) => state.app.error);
    const isLoading = useAppSelector((state) => state.app.isLoading);

    useEffect(() => {
        dispatch(getUsersTC());
    }, []);

    return (
        <div>
            <h2>🙂 Список юзеров</h2>
            {!!error && <h2 style={{ color: "red" }}>{error}</h2>}
            {isLoading && <Loader />}
            <div>
                {users.map((u) => {
                    return (
                        <div key={u.id}>
                            <b>name</b>:{u.name} - <b>age</b>:{u.age}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
    <Provider store={store}>
        <App />
    </Provider>,
);

// 📜 Описание:
// Перед вами список тудулистов и пользователей, которые находятся в постоянной загрузке.
// Откройте network и вы увидите что запросы падают с ошибками,
// но в коде этот никак не обрабатывается.
// Для обработки ошибок написана утилитная функция baseErrorHandler.
// Ваша задача воспользоваться этой функцией и вывести ошибки на экран.
// Что нужно написать вместо XXX, чтобы ошибки обработались и пользователь их увидел ?
//❗ Код фиксить не нужно.

// 🖥 Пример ответа: dispatch(setLoadingAC(false)) */




/* 
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider, TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import axios, { AxiosError } from "axios";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { configureStore, combineReducers } from "@reduxjs/toolkit";

// Types
type PhotoType = {
    albumId: string;
    id: string;
    title: string;
    url: string;
};

// Api
const instance = axios.create({ baseURL: "https://exams-frontend.kimitsu.it-incubator.ru/api/" });

const photosAPI = {
    getPhotos() {
        return instance.get<PhotoType[]>("pictures?delay=3");
    },
};

// Reducer
const initState = {
    isLoading: false,
    error: null as string | null,
    photos: [] as PhotoType[],
};

type InitStateType = typeof initState;

const appReducer = (state: InitStateType = initState, action: ActionsType): InitStateType => {
    switch (action.type) {
        case "PHOTO/GET-PHOTOS":
            return { ...state, photos: action.photos };
        case "PHOTO/IS-LOADING":
            return { ...state, isLoading: action.isLoading };
        case "PHOTO/SET-ERROR":
            return { ...state, error: action.error };
        default:
            return state;
    }
};

const getPhotosAC = (photos: PhotoType[]) => ({ type: "PHOTO/GET-PHOTOS", photos }) as const;
const setLoadingAC = (isLoading: boolean) => ({ type: "PHOTO/IS-LOADING", isLoading }) as const;
const setError = (error: string | null) => ({ type: "PHOTO/SET-ERROR", error }) as const;
type ActionsType =
    | ReturnType<typeof getPhotosAC>
    | ReturnType<typeof setLoadingAC>
    | ReturnType<typeof setError>;

const getPhotosTC = (): AppThunk => (dispatch) => {
    dispatch(setLoadingAC(true));
    photosAPI
        .getPhotos()
        .then((res) => {
            dispatch(getPhotosAC(res.data));
        })
        .catch((e: AxiosError) => {
            dispatch(setError(e.message));
            dispatch(setLoadingAC(false));
        });
};

// Store
const rootReducer = combineReducers({
    app: appReducer,
});

const store = configureStore({ reducer: rootReducer });
type RootState = ReturnType<typeof store.getState>;
type AppDispatch = ThunkDispatch<RootState, unknown, ActionsType>;
type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, ActionsType>;
const useAppDispatch = () => useDispatch<AppDispatch>();
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Loader
export const Loader = () => {
    return <h1>Loading ...</h1>;
};

// App
const App = () => {
    const dispatch = useAppDispatch();

    const photos = useAppSelector((state) => state.app.photos);
    const isLoading = useAppSelector((state) => state.app.isLoading);
    const error = useAppSelector((state) => state.app.error);

    const getPhotosHandler = () => {
        dispatch(getPhotosTC());
    };

    return (
        <>
            <h1>📸 Фото</h1>
            <h2 style={{ color: "red" }}>{!!error && error}</h2>
            {isLoading && <Loader />}
            <button onClick={getPhotosHandler}>Подгрузить фотографии</button>
            <div style={{ display: "flex", gap: "20px", margin: "20px" }}>
                {photos.map((p) => {
                    return (
                        <div key={p.id}>
                            <b>title</b>: {p.title}
                            <div>
                                <img src={p.url} alt="" />
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
    <Provider store={store}>
        <App />
    </Provider>,
);

// 📜 Описание:
// При нажатии на кнопку "Подгрузить фотографии" появляется Loading... и сообщение об ошибке.
// Ваша задача состоит в том, чтобы спрятать Loader независимо от того, как завершится запрос на сервер.
// Т.е. если ответ придет успешный - Loader убираем
//      если ответ придет с ошибкой - Loader тоже убираем.
// Напишите код, с помощью которого можно реализовать данную задачу
// В качестве ответа напишите строку кода.

// 🖥 Пример ответа: .then(() =>  dispatch(getPhotosAC(res.data)))
 */




/* 

import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { Provider, TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import axios, { AxiosError } from "axios";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { configureStore, combineReducers } from "@reduxjs/toolkit";

// Types
type NullableType<T> = null | T;

type LoginFieldsType = {
    email: string;
    password: string;
};

// API
const instance = axios.create({ baseURL: "https://exams-frontend.kimitsu.it-incubator.ru/api/" });

const api = {
    login(data: LoginFieldsType) {
        return instance.post("auth/login", data);
    },
};

// Reducer
const initState = {
    isLoading: false,
    error: null as NullableType<string>,
    isLoggedIn: false,
};

type InitStateType = typeof initState;

const appReducer = (state: InitStateType = initState, action: ActionsType): InitStateType => {
    switch (action.type) {
        case "APP/SET-IS-LOGGED-IN":
            return { ...state, isLoggedIn: action.isLoggedIn };
        case "APP/IS-LOADING":
            return { ...state, isLoading: action.isLoading };
        case "APP/SET-ERROR":
            return { ...state, error: action.error };
        default:
            return state;
    }
};

// Actions
const setIsLoggedIn = (isLoggedIn: boolean) =>
    ({ type: "APP/SET-IS-LOGGED-IN", isLoggedIn }) as const;
const setLoadingAC = (isLoading: boolean) => ({ type: "APP/IS-LOADING", isLoading }) as const;
const setError = (error: string | null) => ({ type: "APP/SET-ERROR", error }) as const;
type ActionsType =
    | ReturnType<typeof setIsLoggedIn>
    | ReturnType<typeof setLoadingAC>
    | ReturnType<typeof setError>;

// Thunk
const loginTC =
    (values: LoginFieldsType): AppThunk =>
        (dispatch) => {
            dispatch(setLoadingAC(true));
            api
                .login(values)
                .then((res) => {
                    dispatch(setIsLoggedIn(true));
                    alert("Вы залогинились успешно");
                })
                .catch((e) => {
                    dispatch(setError(e.response.data.errors))

                })
                .finally(() => {
                    dispatch(setLoadingAC(false));
                });
        };

// Store
const rootReducer = combineReducers({
    app: appReducer,
});

const store = configureStore({ reducer: rootReducer });
type RootState = ReturnType<typeof store.getState>;
type AppDispatch = ThunkDispatch<RootState, unknown, ActionsType>;
type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, ActionsType>;
const useAppDispatch = () => useDispatch<AppDispatch>();
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Loader
export const Loader = () => {
    return <h1>Loading ...</h1>;
};

// App
export const App = () => {
    const dispatch = useAppDispatch();

    const [form, setForm] = useState<LoginFieldsType>({ email: "", password: "" });

    const error = useAppSelector((state) => state.app.error);
    const isLoading = useAppSelector((state) => state.app.isLoading);

    const changeFormValuesHandler = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
        if (field === "email") {
            setForm({ ...form, email: e.currentTarget.value });
        }
        if (field === "password") {
            setForm({ ...form, password: e.currentTarget.value });
        }
    };

    const submitForm = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        dispatch(loginTC(form));
    };

    return (
        <div>
            {!!error && <h2 style={{ color: "red" }}>{error}</h2>}
            {isLoading && <Loader />}
            <form>
                <div>
                    <input
                        placeholder={"Введите email"}
                        value={form.email}
                        onChange={(e) => changeFormValuesHandler(e, "email")}
                    />
                </div>
                <div>
                    <input
                        type={"password"}
                        placeholder={"Введите пароль"}
                        value={form.password}
                        onChange={(e) => changeFormValuesHandler(e, "password")}
                    />
                </div>
                <button type="submit" onClick={submitForm}>
                    Залогиниться
                </button>
            </form>
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
    <Provider store={store}>
        <App />
    </Provider>,
);

// 📜 Описание:
// Перед вами форма логинизации. Введите любые логин и пароль и попробуйте залогиниться.
// У вас это навряд ли получится 😈, т.к. вы не знаете email и пароль.
// Откройте Network и проанализируйте запрос.
// Задача: вывести сообщение об ошибке, которую возвращает сервер, говорящую о том что email или password некорректны.

// В качестве ответа указать строку коду, которая позволит это осуществить.
// 🖥 Пример ответа: dispatch('Error message')
// ❗ Типизировать ошибку не надо, т.к. там есть много нюансов, о которых вы узнаете позже */





