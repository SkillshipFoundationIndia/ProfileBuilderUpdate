export default function authHeader() {
  const user = JSON.parse(localStorage.getItem('user'));
  const admin = JSON.parse(localStorage.getItem('admin'));


  if (user && user.accessToken) {
    return { 'x-access-token': user.accessToken };       
  }
  if (admin && admin.accessToken) {
    return { 'x-access-token': admin.accessToken };       
  } else {
    return {};
  }
}
