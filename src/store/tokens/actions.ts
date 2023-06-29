export type Action = {type: "ADD_TOKEN"; payload: string};

export const addToken = (token: string): Action =>({
    type: "ADD_TOKEN",
    payload: token,
});

//ação relacionada a adição do token... utilizar para que ele valide na api