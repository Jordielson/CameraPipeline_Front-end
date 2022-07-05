import FormLogin from "../components/FormLogin";
import LogoTitle from "../components/fragment/LogoTitle";
import "bootstrap/dist/css/bootstrap.min.css";

function LoginScreen() {
    return (
        <div className="App">
            <LogoTitle />
            <FormLogin />
        </div>
    );
}

export default LoginScreen;