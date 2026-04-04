#!/bin/bash
rsync -avz -e ssh cdelab:/home/quotes-zvm/zvm/quotes.json /home/kiosk-zvm/zitate-vom-nilogamer/assets/quotes.json
rsync -avz -e ssh cdelab:/home/quotes-zvm/zvm/assets/user/icons /home/kiosk-zvm/zitate-vom-nilogamer/assets/user
