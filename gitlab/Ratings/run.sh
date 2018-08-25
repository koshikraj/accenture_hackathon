kill -9 `ps aux | grep gunicorn | awk '{print $2}'`
gunicorn app:routes -k gevent --worker-connections 1000 --reload