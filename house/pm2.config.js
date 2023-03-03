module.exports = {
  apps : [{
    name   : "Avi8tedthoughs",
    script : "npm",
    args: "start",
    env_production: {
      PORT: 3000,
      NODE_ENV: "production"
    }
  }]
}