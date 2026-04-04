module.exports = {
  apps : [{
    name: "zvm",
    script: "npm",
    args: "start",
    env: {
      DISPLAY: ":0",
      XAUTHORITY: "/home/kiosk-zvm/.Xauthority", // Wichtig für die Rechte!
      DBUS_SESSION_BUS_ADDRESS: "unix:path=/run/user/$(id -u)/bus"
    }
  }]
}
