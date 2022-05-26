function FormLogin(){
    return(
        <>
            <label htmlFor="">email</label>
            <input type="text" />

            <label htmlFor="">senha</label>
            <input type="text" />

            <button type="submit">Entrar</button>
            <button>Cadastrar</button>

            <a href="">recuperar senha</a>
        </>
    );
}

export default FormLogin;