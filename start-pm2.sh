MY_UID=$(id -u)

MY_DBUS="unix:path=/run/user/$MY_UID/bus"

DISPLAY=:0 DBUS_SESSION_BUS_ADDRESS=$MY_DBUS pm2 start ./node_modules/.bin/electron --name "zvm" --env DISPLAY=:0 --env DBUS_SESSION_BUS_ADDRESS=$MY_DBUS -- .
