const setCookie = (res, token) => {
  res.cookie("echodaadmin", token, {
    maxAge: 30 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    domain: "http://agatuvoice.online",
    path: "/",
  });
  return true;
};

module.exports = setCookie;
