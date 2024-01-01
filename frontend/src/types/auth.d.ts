type registerFormType = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type loginFormType = {
  email: string;
  password: string;
};

export { registerFormType, loginFormType };
