import React from "react";
import FormInput from "../../components/FormInput";
import Logo from "../../assets/from2handLogin.png";
import {Link} from 'react-router-dom';
import "./style.css";
import {
  StyledWrapper,
  StyledInputWrapper,
  StyledImage,
  StyledButton,
  Or,
  CaptchaWrapper
} from "../../components/FormInput/styles";
import { StyledLink } from "../../components/MyAdvert/styles";
import axios from "axios";
import base64 from "base-64";
import { withRouter } from "react-router-dom";
import Captcha from "react-captcha";

class LoginPage extends React.Component {
  state = {
    username: "",
    password: "",
    token: "",
    allowSend: false,
    loading: true
  };

  handleUserNameInput = e => {
    this.setState({ username: e.target.value });
  };

  handleUserPasswordInput = e => {
    this.setState({ password: e.target.value });
  };
  verifyCallback = response => {
    if (response.length > 0) {
      this.setState({ allowSend: true });
    }
  };

  parseTokenAndRedirectUser = () => {
    const token = JSON.parse(window.sessionStorage.getItem("token"));
    const parsedToken = token.data.split(".");
    const role = JSON.parse(base64.decode(parsedToken[1]));
    if (role.auth[0].authority === "ROLE_ADMIN") {
      this.props.history.push("/dashboard/admin/allAdverts");
    } else if (role.auth[0].authority === "ROLE_USER") {
      this.props.history.push("/dashboard/user/info");
    }
  };

  onSubmit = async event => {
    event.preventDefault();
    const form = new FormData();
    form.append("username", `${this.state.username}`);
    form.append("password", `${this.state.password}`);
    try {
      const response = await axios({
        method: "post",
        url: "/user/login",
        data: form,
        config: { headers: { "Content-Type": "aplication/json" } }
      });
      window.sessionStorage.setItem("token", JSON.stringify(response));
      window.sessionStorage.setItem("pass", JSON.stringify(this.state.password));
      this.parseTokenAndRedirectUser();
    } catch (err) {
      console.log(err);
    }
  };
  render() {

    return (
      <StyledWrapper>
        <Link to='/'><StyledImage src={Logo} /></Link>
        <StyledInputWrapper>
          <form onSubmit={this.onSubmit}>
            <FormInput
              onSubmit={this.onSubmit}
              changeState={this.handleUserNameInput}
              type="text"
              label=""
              placeholder="Enter username"
              value={this.state.username}
            />
            <FormInput
              onSubmit={this.onSubmit}
              changeState={this.handleUserPasswordInput}
              type="password"
              label=""
              placeholder="Enter password"
              value={this.state.password}
            />
            <Captcha
              sitekey="6Lcy_lsUAAAAAAwGCk8rJO9OL0xRPqebV-dpDQXF"
              lang="en"
              theme="light"
              type="image"
              callback={this.verifyCallback}
            />
            {this.state.allowSend === true ? (
              <StyledButton className="login" type="submit">
                Login
              </StyledButton>
            ) : (
              <StyledButton className="login" disabled>
                Click at reCaptcha
              </StyledButton>
            )}
          </form>
          <Or>or</Or>
          <StyledLink to="/registration">
            <StyledButton>SIGN UP</StyledButton>
          </StyledLink>
        </StyledInputWrapper>
      </StyledWrapper>
    );
  }
}

export default withRouter(LoginPage);
