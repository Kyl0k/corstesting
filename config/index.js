export const corsCofnig = {
  origin: [
    "http://localhost:3000",
    "http://localhost:3001",
    "http://localhost:3000/",
  ],
  credentials: true,
  exposedHeaders: ["set-cookie"],
  optionsSuccessStatus: 200,
};

export const cookieConfig = (expiresTime) => ({
  expires: new Date(Date.now() + expiresTime),
  httpOnly: true,
  sameSite: "Strict",
  // secure: true,
});
