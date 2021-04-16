import os, sys
from liverdb import app


def runserver(myport):
    myport = myport
    port = int(os.environ.get('PORT', myport))
    app.run(port=port,host='222.20.95.101')
    app.run()


if __name__ == '__main__':
    runserver(sys.argv[1])
