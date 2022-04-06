/**common function for handling error */
export const handleError = (err) => {
  /** If there is an authentication error then we are simply logout and redirecting user to login page */
  if (err?.status === 401) {
    window.location.href = "/";
  } else {
    alert(err?.data?.message);
  }
};
