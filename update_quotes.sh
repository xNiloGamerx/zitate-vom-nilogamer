#!/bin/bash
rsync -avz -e ssh quotes-zvm@cdelab.de:~/zvm/quotes.json ~/test.json
