const prod = "https://lorcana-api.onrender.com";
const dev = "http://localhost:5000";

export const getEnv = () => {
  if (window.location.href.includes("localhost")) {
    return dev;
  }
  return prod;
};
