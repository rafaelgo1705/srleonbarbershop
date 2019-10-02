//Necessário para o funcionamento
import TabInicial from '../../App';
import Login from '../../App';

export default class SplashScreenController {
    abrirTelaInicial(proper){
        proper.navigation.navigate('TabInicial');
    }

    abrirTelaLogin(proper){
        proper.navigation.navigate('Login');
    }
}