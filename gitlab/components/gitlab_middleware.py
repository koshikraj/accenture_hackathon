import gitlab
import base64
# username/password authentication (for GitLab << 10.2)
gl = gitlab.Gitlab('http://hackathon.koshikraj.com', email='root', password='hackathon123')


class Repo:

    def __init__(self, repo):
        self.repo = repo

    def details(self):
        return self.repo.__dict__['_attrs']

    def files(self):

        # Returns only the root folder tree

        return self.repo.repository_tree()

    def get_file_content(self, id):

        return base64.b64decode(self.repo.repository_blob(id)['content'])



class User:

    @staticmethod
    def list_repos():

        repo_list = []
        for repo in gl.projects.list():
            repo_list.append(Repo(repo))
        return repo_list


user = User()
repos = user.list_repos()
print(repos)
print(repos[0].files())
print(repos[0].get_file_content((repos[0].files()[1]['id'])))

