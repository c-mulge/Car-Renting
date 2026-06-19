const getDashboardPath = (role) => {
  if (role === "ADMIN") {
    return "/admin";
  }

  if (role === "OWNER") {
    return "/owner";
  }

  return "/my-bookings";
};

export default getDashboardPath;
