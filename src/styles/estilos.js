import colors from './colors';

const estilos = {
    /**Tela SplashScreen*/
    splashScreen: {
        flex: 1,
        backgroundColor: colors.corApp,
        justifyContent: 'center',
        alignItems: 'center',
    },

    /**Tela de Login e cadastro*/
    scrollViewLogin: {
        flexGrow : 1, 
        justifyContent : 'center',
        backgroundColor: colors.corApp,
    },

    viewInicialLogin: {
        flex: 1,
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: colors.corApp,
    },

    viewInicialCadastro: {
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.corApp,
        flexDirection: 'row',
    },

    textLoginInicial: {
        paddingVertical: 20,
        color: colors.corBranca, 
        fontSize: 38,
        textAlign: "center",
        fontFamily:'Script MT Bold',
    },

    textLoginInput: {
        marginVertical: 12, 
        fontSize: 16, 
        borderWidth: 1,
        borderRadius: 30,
        paddingHorizontal: 20,
        borderColor: colors.corInputText,
        backgroundColor: colors.corBranca,
        height: 45
    },

    buttonLogin: {
        backgroundColor: colors.corButtonLogin,
        marginVertical: 15,
        height: 45,
        borderRadius: 30,
        justifyContent:'center', 
        alignContent:'center',
        paddingHorizontal: 20
    },

    buttonLoginTexto: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.corBranca,
        textAlign: 'center',
    },

    textLoginCadastro: {
        color: colors.corBranca, 
        fontSize: 17, 
        fontFamily: 'Segoe UI'
    },

    textLoginCadastroEvento: {
        paddingLeft: 5,
        color: colors.corBranca, 
        fontSize: 17, 
        fontFamily: 'Segoe UI',
        fontWeight: 'bold'
    },

    buttonCadastro:{
        flexDirection: 'row',
        justifyContent:'center', 
        alignContent:'center',
        marginVertical: 10,
    },

    textLoginOpcaoCadastro: {
        color: colors.corBranca, 
        textAlign: 'center', 
        marginVertical: 15, 
        fontSize: 20, 
        fontWeight: 'bold', 
        fontFamily: 'Segoe UI'
    },

    buttonLoginFacebook: {
        marginRight: 10,
        height: 50,
        width: 140,
        borderRadius: 15,
        borderColor: colors.corBranca,
        borderWidth: 2,
        marginVertical: 10,
        backgroundColor: colors.corButtonFacebook,
        justifyContent:'center', 
        alignItems:'center',
        flexDirection: 'row',
    },

    buttonLoginGoogle: {
        width: 140,
        height: 50,
        borderRadius: 15,
        marginTop: 5,
        marginBottom: 10,
        borderWidth: 2,
        borderColor: colors.corTextoNormal,
        backgroundColor: colors.corBranca,
        justifyContent:'center', 
        alignItems:'center',
        paddingHorizontal: 20,
        flexDirection: 'row',
    },

    buttonLoginTextoFacebook: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.corBranca,
        textAlign: 'center',
    },

    buttonLoginTextoGoogle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.corPreta,
        textAlign: 'center',
    },
    /**Fim Tela de Login e cadastro*/

    /**Tela Tab Home*/
    textoTitulo: {
        marginBottom: 10,
        fontFamily: 'Segoe UI',
        fontSize: 25,
        padding: 0,
        fontWeight: 'bold',
        color: colors.corBranca,
    },

    textoNormal:{
        fontFamily: 'Segoe UI Emoji',
        fontSize: 18,
        color: colors.corBranca,
        textAlign: 'center',
        lineHeight: 27,
        paddingHorizontal: 10,
        marginVertical: 10
    },

    textoNormalNegrito:{
        marginTop: 5,
        fontFamily: 'Segoe UI Emoji',
        fontSize: 18,
        color: colors.corBranca,
        textAlign: 'center',
        fontWeight: 'bold',
        lineHeight: 28
    },

    textoStatusBarbearia: {
        padding: 20,
        marginVertical: 15,
        backgroundColor: colors.corVermelhaApp,
    },

    textoStatusBarbeariaAberto:{
        marginVertical: 15,
        borderRadius: 30,
        padding: 15,
        fontFamily: 'Segoe UI',
        color: colors.corBranca,
        backgroundColor: colors.corVerdeApp,
        fontWeight: 'bold',
        fontSize: 13
    },

    textoStatusBarbeariaFechado:{
        marginVertical: 15,
        borderRadius: 30,
        padding: 15,
        fontFamily: 'Segoe UI',
        color: colors.corBranca,
        backgroundColor: colors.corVermelhaApp,
        fontWeight: 'bold',
        fontSize: 13
    },
    /**Fim Tela Tab Home*/

    /**Tela Tab Agenda*/
    viewAgenda: {
        backgroundColor: colors.corBranca, 
        flex: 1,
    },

    viewSuperiorAgenda: {
        backgroundColor: colors.corApp, 
        alignItems: 'center', 
        height: 180
    },

    scrollViewTabAgenda: {
        flexGrow : 1, 
        backgroundColor: colors.corBranca,
    },

    textoNegritoAgenda:{
        padding: 10,
        fontFamily: 'Segoe UI Emoji',
        fontSize: 18,
        color: colors.corPreta,
        textAlign: 'left',
        fontWeight: 'bold',
        lineHeight: 28
    },

    buttonAgendar: {
        backgroundColor: colors.corVerdeApp,
        height: 45,
        borderRadius: 30,
        marginTop: 5,
        marginHorizontal: 20,
        marginBottom: 10,
        justifyContent:'center', 
        alignContent: 'flex-end',
        alignItems: 'center',
    },
    /**Fim Tela Tab Agenda*/

    /**Tela Tab Status*/
    viewSuperiorStatus: {
        padding: 20,
        backgroundColor: colors.corApp, 
        alignItems: 'center',
        justifyContent: 'center',
        height: 60,
    },

    viewCorpoStatus:{
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.corBranca,
    },

    textoNegritoStatus:{
        fontFamily: 'Segoe UI Emoji',
        fontSize: 18,
        color: colors.corPreta,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    /**Fim Tela Tab Status*/

    /**Tela Tab Conta*/
    viewContaTab: {
        flex: 1,
        backgroundColor: colors.corBranca,
    },

    dadosContaSuperior: {
        height: 250,
        backgroundColor: colors.corApp
    },

    dadosContaSuperiorLinha: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        height: 200,
        alignItems: 'center',
        backgroundColor: colors.corApp
    },

    opcoesContaTab1: {
        marginTop: 20,
        marginBottom: 10,
        paddingHorizontal: 20,
        color: colors.corTextoNormal,
        fontSize: 18,
        fontWeight: 'bold',
    },

    opcoesContaTab: {
        marginVertical: 10,
        paddingHorizontal: 20,
        color: colors.corTextoNormal,
        fontSize: 18,
        fontWeight: 'bold',
    },

    sairContaTab: {
        marginTop: 10,
        paddingHorizontal: 20,
        color: colors.corVermelhaApp,
        fontSize: 18,
        fontWeight: 'bold',
    },

    buttonExcluirConta: {
        backgroundColor: colors.corVermelhaApp,
        height: 45,
        borderRadius: 30,
        marginBottom: 20,
        justifyContent:'center', 
        alignContent: 'flex-end',
        alignItems: 'center',
    },

    buttonPainelConta: {
        backgroundColor: colors.corApp,
        height: 45,
        borderRadius: 30,
        marginBottom: 10,
        justifyContent:'center', 
        alignContent: 'flex-end',
        alignItems: 'center',
    },

    buttonExcluirContaTexto: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.corBranca,
        justifyContent: 'flex-end',
    },

    textoNegritoConta: {
        fontFamily: 'Segoe UI Emoji',
        fontSize: 18,
        color: colors.corBranca,
        textAlign: 'left',
        fontWeight: 'bold',
        lineHeight: 28
    },

    textoNormalConta: {
        marginTop: 5,
        fontFamily: 'Segoe UI Emoji',
        fontSize: 18,
        color: colors.corBranca,
        textAlign: 'left',
        lineHeight: 28
    },

    viewEditarConta: {
        flexDirection: 'row',
        height: 40,
        marginRight: 15,
        alignItems: 'center',
        justifyContent: 'flex-end',
        backgroundColor: colors.corApp
    },

    textoNormalEditarConta:{
        fontFamily: 'Segoe UI Emoji',
        fontSize: 17,
        fontWeight: 'bold',
        color: colors.corBranca,
        textAlign: 'center',
        justifyContent: 'center',
        lineHeight: 27,
    },
    /**Fim Tela Tab Conta*/
    
    /**ListView Agenda */
    containerListViewAgenda: {
        flex: 1,
      },
    
      item: {
        borderBottomWidth: 0.5,
        borderColor: colors.corSelecionado,
        padding: 15,
        marginHorizontal: 10,
        flexDirection: 'row',
      },
    
      title: {
        marginLeft: 10,
        fontSize: 18,
        fontWeight: 'bold',
        justifyContent: 'flex-start'
      },
    
      textoNormalProduto: {
        marginLeft: 10,
        fontSize: 16,
        justifyContent: 'flex-end'
      },
    
      textoPreco: {
        fontWeight: 'bold',
        fontSize: 20
      },
      estiloPreco:{
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
      },
      /** Fim ListView Agenda */

    viewTabs: {
        flex: 1, 
        backgroundColor: colors.corVermelhaApp,
    },

    /**Tela Redefinir Senha */
    buttonRedefinirSenhaAlterar: {
        backgroundColor: colors.corButtonLogin,
        marginVertical: 20,
        height: 45,
        borderRadius: 30,
        justifyContent:'center', 
        alignContent:'center',
        paddingHorizontal: 20
    },

    buttonRedefinirSenhaCancelar: {
        backgroundColor: colors.corVermelhaApp,
        marginVertical: 15,
        height: 45,
        borderRadius: 30,
        justifyContent:'center', 
        alignContent:'center',
        paddingHorizontal: 20
    },

    viewRedefinirSenha: {
        flex: 1,
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: colors.corApp,
    },

    /**Fim Tela Redefinir Senha */

    /**Tela Editar Conta */
    viewPrincipalEditarConta: {
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: colors.corApp,
    },
    /**Fim Tela Editar Conta */

    /**Tela Painel */
    switchStatusBarbearia: {
        backgroundColor: colors.buttonLogin,
    },

    viewPainelAdminStatus: {
        marginTop: 15,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },

    textoStatus:{
        fontFamily: 'Segoe UI Emoji',
        fontSize: 16,
        color: colors.corBranca,
        paddingHorizontal: 10,
    },

    textInputTexto: {
        marginVertical: 12, 
        fontSize: 16, 
        borderWidth: 1,
        borderRadius: 30,
        paddingHorizontal: 20,
        borderColor: colors.corInputText,
        backgroundColor: colors.corBranca,
    },

    textHorarioAtendimentoInicial: {
        color: colors.corBranca, 
        textAlign: 'center', 
        marginVertical: 10, 
        fontSize: 18, 
        fontWeight: 'bold', 
        fontFamily: 'Segoe UI'
    },

    textHorarioAtendimento: {
        color: colors.corBranca, 
        textAlign: 'center',
        alignItems: 'center',
        fontSize: 16, 
        fontWeight: 'bold', 
        fontFamily: 'Segoe UI'
    },

    pickerHorarioAtendimento: {
        width: 105,
        color: colors.corBranca,
        borderRadius: 20,
        alignItems: 'center',
    },

    textHorarioAtendimentoNormal: {
        color: colors.corBranca,
        marginVertical: 4,
        textAlign: 'center', 
        fontSize: 16, 
        fontFamily: 'Segoe UI'
    },
    /**Fim Tela Painel */
    /**Tela cadastro agenda */
    buttonCadastroAgenda: {
        backgroundColor: colors.corButtonLogin,
        marginVertical: 15,
        height: 70,
        borderRadius: 30,
        justifyContent:'center', 
        alignContent:'center',
        paddingHorizontal: 20
    },

    buttonCadastoCabeleireiro: {
        backgroundColor: colors.corApp,
        height: 45,
        borderRadius: 30,
        marginVertical: 15,
        justifyContent:'center', 
        alignContent: 'flex-end',
        alignItems: 'center',
    },

    /**Fim Tela cadastro agenda */
}

export default estilos;