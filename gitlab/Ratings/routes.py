import falcon
from controllers.ratings import Ratings
from controllers.user import UserDetails
from falcon_cors import CORS


cors = CORS(allow_all_origins=True,
            allow_all_headers=True,
            allow_methods_list=['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'])

app = falcon.API(middleware=[cors.middleware])

app.add_route('/ratings', Ratings())
app.add_route('/users', UserDetails())
