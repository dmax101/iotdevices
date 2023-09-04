class UserModel {
  firstName: string;
  lastName: string;
  email: string;
  password: string;

  constructor(
    firstName: string,
    lastName: string,
    email: string,
    password: string = 'default',
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
  }
}

const user = new UserModel('Danilo', 'Ribeiro', 'danriba@gmail.com');

const body = {
  firstName: 'Danilo',
  lastName: 'Ribeiro',
  email: 'danriba@gmail.com',
  password: 'default',
};

const newUser: Exclude<UserModel, 'password'> = body

console.log(user);
