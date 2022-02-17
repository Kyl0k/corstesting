export const corsCofnig = {
  origin: "http://localhost:3000",
  credentials: true,
};

export const cookieConfig = (expiresTime) => ({
  expires: new Date(Date.now() + expiresTime),
  httpOnly: true,
  sameSite: "Strict",
});
