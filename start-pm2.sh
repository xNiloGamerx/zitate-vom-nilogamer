DISPLAY=:0 \
DBUS_SESSION_BUS_ADDRESS=unix:path=/run/user/$(id -u)/bus \
pm2 start npm --name "zvm" \
--env DISPLAY=:0 \
--env DBUS_SESSION_BUS_ADDRESS=unix:path=/run/user/$(id -u)/bus \
-- start