/* import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { Provider, TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { configureStore, combineReducers, Dispatch } from "@reduxjs/toolkit";

// Types
type PostType = {
    body: string;
    id: string;
    title: string;
    userId: string;
};

type PayloadType = {
    title: string;
    body?: string;
};

// Api
const instance = axios.create({ baseURL: "https://exams-frontend.kimitsu.it-incubator.ru/api/" });

const postsAPI = {
    getPosts() {
        return instance.get<PostType[]>("posts");
    },
    updatePostTitle(postId: string, post: PayloadType) {
        return instance.put<PostType>(`posts/${postId}`, post);
    },
};

// Reducer
const initState = [] as PostType[];

type InitStateType = typeof initState;

const postsReducer = (state: InitStateType = initState, action: ActionsType): InitStateType => {
    switch (action.type) {
        case "POSTS/GET-POSTS":
            return action.posts;

        case "POSTS/UPDATE-POST-TITLE":
            return state.map((p) => {
                if (p.id === action.post.id) {
                    return { ...p, title: action.post.title };
                } else {
                    return p;
                }
            });

        default:
            return state;
    }
};

const getPostsAC = (posts: PostType[]) => ({ type: "POSTS/GET-POSTS", posts }) as const;
const updatePostTitleAC = (post: PostType) => ({ type: "POSTS/UPDATE-POST-TITLE", post }) as const;
type ActionsType = ReturnType<typeof getPostsAC> | ReturnType<typeof updatePostTitleAC>;

const getPostsTC = (): AppThunk => (dispatch) => {
    postsAPI.getPosts().then((res) => {
        dispatch(getPostsAC(res.data));
    });
};

const updatePostTC =
    (postId: string): AppThunk =>
        (dispatch, getState: any) => {
            try {

                const currentPost = getState().posts.find((p: PostType) => p.id === postId);

                if (currentPost) {
                    const payload = { title: "Это просто заглушка. Backend сам сгенерирует новый title" };
                    postsAPI.updatePostTitle(postId, payload).then((res) => {
                        dispatch(updatePostTitleAC(res.data));

                    });
                }
            } catch (e) {
                alert("Обновить пост не удалось 😢");
            }
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

// App
const App = () => {
    const dispatch = useAppDispatch();
    const posts = useAppSelector((state) => state.posts);

    useEffect(() => {
        dispatch(getPostsTC());
    }, []);

    const updatePostHandler = (postId: string) => {
        dispatch(updatePostTC(postId));
    };

    return (
        <>
            <h1>📜 Список постов</h1>
            {posts.map((p) => {
                return (
                    <div key={p.id}>
                        <b>title</b>: {p.title}
                        <button onClick={() => updatePostHandler(p.id)}>Обновить пост</button>
                    </div>
                );
            })}
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
// Попробуйте обновить пост и вы увидите alert с ошибкой.
// Debugger / network / console.log вам в помощь
// Найдите ошибку и вставьте исправленную строку кода в качестве ответа.

// 🖥 Пример ответа: const payload = {...currentPost, tile: 'Летим 🚀'} */




/* 
import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { Provider, TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import axios from "axios";
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
    createComment() {
        const payload = {
            body: "Это просто заглушка. Backend сам сгенерирует новый комментарий и вернет его вам",
        };
        return instance.post("comments", payload);
    },
};

// Reducer
const initState = [] as CommentType[];

type InitStateType = typeof initState;

const commentsReducer = (state: InitStateType = initState, action: ActionsType) => {
    switch (action.type) {
        case "COMMENTS/GET-COMMENTS":
            return action.comments;
        case "COMMENTS/CREATE-COMMENT":
            return [action.comment, ...state];
        default:
            return state;
    }
};

const getCommentsAC = (comments: CommentType[]) =>
    ({ type: "COMMENTS/GET-COMMENTS", comments }) as const;
const createCommentAC = (comment: CommentType) =>
    ({ type: "COMMENTS/CREATE-COMMENT", comment }) as const;

type ActionsType = ReturnType<typeof getCommentsAC> | ReturnType<typeof createCommentAC>;

const getCommentsTC = (): AppThunk => (dispatch) => {
    commentsAPI.getComments().then((res) => {
        dispatch(getCommentsAC(res.data));
    });
};

const addCommentTC = (): AppThunk => (dispatch) => {
    commentsAPI.createComment().then((res) => {
        dispatch(createCommentAC(res.data));
    });
};

// Store
const rootReducer = combineReducers({
    comments: commentsReducer,
});

const store = configureStore({ reducer: rootReducer });
type RootState = ReturnType<typeof store.getState>;
type AppDispatch = ThunkDispatch<RootState, unknown, ActionsType>;
type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, ActionsType>;
const useAppDispatch = () => useDispatch<AppDispatch>();
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// App
const App = () => {
    const dispatch = useAppDispatch();
    const comments = useAppSelector((state) => state.comments);

    useEffect(() => {
        dispatch(getCommentsTC());
    }, []);

    const addCommentHandler = () => {
        // alert("Комментарий добавить не получилось. Напишите код самостоятельно 🚀");
        dispatch(addCommentTC())
    };

    return (
        <>
            <h1>📝 Список комментариев</h1>
            <button style={{ marginBottom: "10px" }} onClick={addCommentHandler}>
                Добавить новый комментарий
            </button>
            {comments.map((p) => {
                return (
                    <div key={p.id}>
                        <b>описание</b>: {p.body}
                    </div>
                );
            })}
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
// При нажатии на кнопку "Добавить новый комментарий" комментарий должен добавиться,
// но появляется alert.
// Вместо alerta напишите код, чтобы комментарий добавлялся.
// Правильную версию строки напишите в качестве ответа.

// 🖥 Пример ответа: return instance.get<CommentType[]>('comments?_limit=10') */


/* 
import axios from "axios";
import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { Provider, TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { configureStore, combineReducers, AnyAction } from "@reduxjs/toolkit";

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
const initState = [] as CommentType[];

type InitStateType = typeof initState;

const commentsReducer = (state: InitStateType = initState, action: ActionsType): InitStateType => {
    switch (action.type) {
        case "COMMENTS/GET-COMMENTS":
            return action.comments;
        default:
            return state;
    }
};

const getCommentsAC = (comments: CommentType[]) =>
    ({ type: "COMMENTS/GET-COMMENTS", comments }) as const;
type ActionsType = ReturnType<typeof getCommentsAC>;

const getCommentsTC = (): ThunkAction<void, RootState, unknown, ActionsType> => (dispatch) => {
    commentsAPI.getComments().then((res) => {
        dispatch(getCommentsAC(res.data));
    });
};

// Store
const rootReducer = combineReducers({
    comments: commentsReducer,
});

const store = configureStore({ reducer: rootReducer });
type RootState = ReturnType<typeof store.getState>;
type AppDispatch = ThunkDispatch<RootState, unknown, ActionsType>;
const useAppDispatch = () => useDispatch<AppDispatch>();
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// App
export const App = () => {
    const comments = useAppSelector((state) => state.comments);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getCommentsTC());
    }, []);

    return (
        <>
            <h1>📝 Список комментариев</h1>
            {comments.map((c) => {
                return (
                    <div key={c.id}>
                        <b>Comment</b>: {c.body}{" "}
                    </div>
                );
            })}
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
// Ваша задача стоит в том чтобы правильно передать нужные типы в дженериковый тип ThunkAction<any, any, any, any>.
// Что нужно написать вместо any, any, any, any чтобы правильно типизировать thunk creator?
// Ответ дайте через пробел

// 🖥 Пример ответа: unknown status isDone void */




/* import axios from "axios";
import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { Provider, TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
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
const initState = [] as CommentType[];

type InitStateType = typeof initState;

const commentsReducer = (state: InitStateType = initState, action: ActionsType): InitStateType => {
    switch (action.type) {
        case "COMMENTS/GET-COMMENTS":
            return action.comments;
        default:
            return state;
    }
};

const getCommentsAC = (comments: CommentType[]) =>
    ({ type: "COMMENTS/GET-COMMENTS", comments }) as const;
type ActionsType = ReturnType<typeof getCommentsAC>;

const getCommentsTC = () => (dispatch: DispatchType) => {
    commentsAPI.getComments().then((res) => {
        dispatch(getCommentsAC(res.data));
    });
};

// Store
const rootReducer = combineReducers({
    comments: commentsReducer,
});

const store = configureStore({ reducer: rootReducer });
type RootState = ReturnType<typeof rootReducer>;
type DispatchType = ThunkDispatch<RootState, unknown, ActionsType>;
const useAppDispatch = () => useDispatch<DispatchType>();
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// App
export const App = () => {
    const comments = useAppSelector((state) => state.comments);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getCommentsTC());
    }, []);

    return (
        <>
            <h1>📝 Список комментариев</h1>
            {comments.map((c) => {
                return (
                    <div key={c.id}>
                        <b>Comment</b>: {c.body}{" "}
                    </div>
                );
            })}
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
// Ваша задача стоит в том чтобы правильно передать нужные типы в дженериковый тип ThunkDispatch<any, any, any>.
// Что нужно написать вместо any, any, any чтобы правильно типизировать dispatch ?
// Ответ дайте через пробел

// 🖥 Пример ответа: unknown status isDone */



/* 
import { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { Provider, TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import axios from "axios";
import { configureStore, combineReducers } from "@reduxjs/toolkit";

// Types
type TodoType = {
    id: string;
    title: string;
    order: number;
    createdAt: string;
    updatedAt: string;
    completed: boolean;
};

// Api
const instance = axios.create({ baseURL: "https://exams-frontend.kimitsu.it-incubator.ru/api/" });

const todosAPI = {
    getTodos() {
        return instance.get<TodoType[]>("todos");
    },
    changeTodoStatus(id: string, completed: boolean) {
        return instance.put(`todos/${id}`, { completed });
    },
};

// Reducer
const initState = [] as TodoType[];

type InitStateType = typeof initState;

const todosReducer = (state: InitStateType = initState, action: ActionsType) => {
    switch (action.type) {
        case "TODOS/GET-TODOS":
            return action.todos;

        case "TODOS/CHANGE-TODO-STATUS":
            return state.map((t) => {
                if (t.id === action.todo.id) {
                    return { ...t, completed: action.todo.completed };
                } else {
                    return t;
                }
            });

        default:
            return state;
    }
};

const getTodosAC = (todos: TodoType[]) => ({ type: "TODOS/GET-TODOS", todos }) as const;
const changeTodoStatusAC = (todo: TodoType) =>
    ({ type: "TODOS/CHANGE-TODO-STATUS", todo }) as const;
type ActionsType = ReturnType<typeof getTodosAC> | ReturnType<typeof changeTodoStatusAC>;

// Thunk
const getTodosTC = (): AppThunk => (dispatch) => {
    todosAPI.getTodos().then((res) => {
        dispatch(getTodosAC(res.data));
    });
};

const changeTodoStatusTC =
    (id: string, completed: boolean): AppThunk =>
        (dispatch) => {
            todosAPI.changeTodoStatus(id, completed).then((res) => {
                dispatch(changeTodoStatusAC(res.data));
            });
        };

// Store
const rootReducer = combineReducers({
    todos: todosReducer,
});

const store = configureStore({ reducer: rootReducer });
type RootState = ReturnType<typeof store.getState>;
type AppDispatch = ThunkDispatch<RootState, unknown, ActionsType>;
type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, ActionsType>;
const useAppDispatch = () => useDispatch<AppDispatch>();
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// App
const App = () => {
    const dispatch = useAppDispatch();
    const todos = useAppSelector((state) => state.todos);

    useEffect(() => {
        dispatch(getTodosTC());
    }, []);

    const changeStatusHandler = (id: string, completed: boolean) => {
        dispatch(changeTodoStatusTC(id, completed));
    };

    return (
        <>
            <h2>✅ Список тудулистов</h2>
            {todos.length ? (
                todos.map((t) => {
                    return (
                        <div style={t.completed ? { color: "grey" } : {}} key={t.id}>
                            <input
                                type="checkbox"
                                checked={t.completed}
                                onChange={() => changeStatusHandler(t.id, !t.completed)}
                            />
                            <b>Описание</b>: {t.title}
                        </div>
                    );
                })
            ) : (
                <h2>Тудулистов нету 😥</h2>
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
// При загрузке приложения вы должны увидеть список тудулистов,
// но из-за невнимательности была допущена ошибка.
// Найдите и исправьте ошибку.
// Исправленную версию строки напишите в качестве ответа.

// 🖥 Пример ответа: type InitStateType = typeof initState */




/* 
import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { Provider, TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { configureStore, combineReducers } from "@reduxjs/toolkit";

// Types
type PostType = {
    id: string;
    body: string;
    title: string;
    userId: string;
};

// Api
const instance = axios.create({ baseURL: "https://exams-frontend.kimitsu.it-incubator.ru/api/" });

const postsAPI = {
    getPosts() {
        return instance.get<PostType[]>("posts");
    },
};

// Reducer
const initState = [] as PostType[];

type InitStateType = typeof initState;

const postsReducer = (
    state: InitStateType = initState,
    action: GetPostsActionType,
): InitStateType => {
    switch (action.type) {
        case "POSTS/GET-POSTS":
            return action.posts;
    }
    return state;
};

const getPostsAC = (posts: PostType[]) => ({ type: "POSTS/GET-POSTS", posts }) as const;
type GetPostsActionType = ReturnType<typeof getPostsAC>;

const getPostsTC = (): AppThunk => (dispatch) => {
    postsAPI.getPosts().then((res) => {
        dispatch(getPostsAC(res.data));
    });
};

// Store
const rootReducer = combineReducers({
    posts: postsReducer,
});

const store = configureStore({ reducer: rootReducer });
type RootState = ReturnType<typeof store.getState>;
type AppDispatch = ThunkDispatch<RootState, unknown, GetPostsActionType>;
type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, GetPostsActionType>;
const useAppDispatch = () => useDispatch<AppDispatch>();
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// App
const App = () => {
    const dispatch = useAppDispatch();
    const posts = useAppSelector((state) => state.posts);

    useEffect(() => {
        dispatch(getPostsTC());
    }, []);

    return (
        <>
            <h1>📜 Список постов</h1>
            {posts.length ? (
                posts.map((p) => {
                    return (
                        <div key={p.id}>
                            <b>title</b>: {p.title}
                        </div>
                    );
                })
            ) : (
                <h2>Постов нету 😥</h2>
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
// При загрузке приложения вы должны увидеть список постов,
// но из-за невнимательности была допущена ошибка.

// Найдите и исправьте ошибку
// Исправленную версию строки напишите в качестве ответа.
// 🖥 Пример ответа: type InitStateType = typeof initState

// P.S. Эта ошибка из реальной жизни, студенты так часто ошибаются и не могут понять в чем дело. */



/* 

import React from 'react'
import ReactDOM from 'react-dom/client';


const thunkCreator = () => (dispatch: any, getState: any) => {
    // сode...
}


// App
const App = () => {
    return (
        <>
            <h1>В этом задании смотреть на экран не нужно. Ничего не изменится 😈</h1>
            <p>Читайте описание к заданию</p>
        </>
    )
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<App />)

// 📜 Описание:
// Вместо XXX и YYY через пробел напишите параметры которые приходят в санку.
//
// 🖥 Пример ответа: useCallback state */





