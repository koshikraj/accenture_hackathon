import json
import falcon

from gitlab_lib.middleware import User, Repo


class Repositories:

    def on_get(self, req, res):

        try:
            user = User()
            repos = user.list_repos()
            all_repo_details = [repo.details() for repo in repos]

            res.status = falcon.HTTP_200
            res.body = json.dumps({'status': True,
                               'data': all_repo_details,
                               'message': 'success'
                               })
        except Exception as e:
            res.status = falcon.HTTP_400
            res.body = json.dumps({'status': False,
                                   'data': [],
                                   'message': str(e)
                                   })


class Files:

    def on_get(self, req, res):
        try:
            repo_id = req.get_param('repo_id', 0)

            repo = Repo()
            repo_fles = repo.get_repo_files_by_id(repo_id)

            res.status = falcon.HTTP_200
            res.body = json.dumps({'status': True,
                                    'data': repo_fles,
                                    'message': 'success'
                                   })
        except Exception as e:
            res.status = falcon.HTTP_400
            res.body = json.dumps({'status': False,
                                   'data': [],
                                   'message': str(e)
                                   })

