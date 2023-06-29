import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import './Navbar.css'
import { useDispatch, useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/tokensReducer';
import { addToken } from '../../../store/tokens/actions';
import { toast } from 'react-toastify';

function Navbar() {

    const token = useSelector<TokenState, TokenState["tokens"]>(
        (state) => state.tokens
    );
    let navigate = useNavigate()
    const dispatch = useDispatch();

    function goLogout() { //se houver algum valor no token, ele ira apagar e retornar vazio. e tem um alerta avisando que foi deslogado e retorna para tela de login
        dispatch(addToken(''));
        toast.info('Usuário deslogado', {
            position:"top-right", //define a posição 
            autoClose: 2000, //em que momento a caixinha vai sair da tela 
            hideProgressBar: false, //é pra perguntar se sim ou não tema barra de progresso
            closeOnClick: true, // posibilidade de fechar a caixinha com o click sem ter que aguardar o time
            pauseOnHover: false, //se passar o mouse em cima da notificaçao ela para e continua sendo exibida
            draggable: false, //ela pode mover a caixinha
            theme: "colored", //cor 
            progress: undefined, //é o progresso da caixinha
        });
        navigate('/login')
    }
    var navbarComponent;

    if (token != "")
        navbarComponent = <AppBar position="static">
            <Toolbar variant="dense">
                <Box className='cursor'>
                    <Typography variant="h5" color="inherit">
                        Blog Pessoal
                    </Typography>
                </Box>

                <Box display="flex" justifyContent="start">

                    <Link to="/home" className="text-decorator-none">
                        <Box mx={1} className='cursor'>
                            <Typography variant="h6" color="inherit">
                                Home
                            </Typography>
                        </Box>
                    </Link>

                    <Link to="/posts" className="text-decorator-none">
                        <Box mx={1} className='cursor'>
                            <Typography variant="h6" color="inherit">
                                Postagens
                            </Typography>
                        </Box>
                    </Link>

                    <Link to="/temas" className="text-decorator-none">
                        <Box mx={1} className='cursor'>
                            <Typography variant="h6" color="inherit">
                                Temas
                            </Typography>
                        </Box>
                    </Link>

                    <Link to="/formularioTema" className="text-decorator-none">
                        <Box mx={1} className='cursor'>
                            <Typography variant="h6" color="inherit">
                                Cadastrar tema
                            </Typography>
                        </Box>
                    </Link>

                    <Box mx={1} className='cursor' onClick={goLogout}>
                        <Typography variant="h6" color="initial">
                            Logout
                        </Typography>
                    </Box>

                </Box>

            </Toolbar>

        </AppBar>


return (
    <>
        {navbarComponent}
    </>
);

}

export default Navbar;
