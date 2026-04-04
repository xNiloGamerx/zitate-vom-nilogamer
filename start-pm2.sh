MY_UID=$(id -u)

MY_DBUS="unix:path=/run/user/$MY_UID/bus"

DISPLAY=:0 DBUS_SESSION_BUS_ADDRESS=$MY_DBUS pm2 start npm --name "zvm" --env DISPLAY=:0 --env DBUS_SESSION_BUS_ADDRESS=$MY_DBUS -- start
