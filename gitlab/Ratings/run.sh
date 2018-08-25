kill -9 `ps aux | grep gunicorn | awk '{print $2}'`
gunicorn routes:app -k gevent --worker-connections 1000 --reload