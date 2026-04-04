#!/bin/bash
rsync -avz -e ssh cdelab:/home/quotes-zvm/zvm/quotes.json /home/kiosk-zvm/zitate-vom-nilogamer/temp/quotes.json
