import gitlab
import base64
# username/password authentication (for GitLab << 10.2)
gl = gitlab.Gitlab('http://hackathon.koshikraj.com', private_token='xLL3PPGkdzJfz9GTJtzi')


class Repo:

    def __init__(self, repo=None):
        if repo:
            self.repo = repo

    def details(self):
        return self.repo.__dict__['_attrs']

    def files(self):

        # Returns only the root folder tree

        return self.repo.repository_tree()

    def get_file_content(self, id):

        return base64.b64decode(self.repo.repository_blob(id)['content'])

    def get_repo_by_id(self, id):
        self.repo = gl.projects.get(id)
        return self.repo.__dict__['_attrs']

    def get_repo_files_by_id(self, id):
        repo = gl.projects.get(id)
        return repo.repository_tree()

    def get_repo_all_commits(self, id):
        repo = gl.projects.get(id)
        commit_list = repo.commits.list()
        commit_data = []
        for each_commit in commit_list:
            # print(each_commit.__dict__['_attrs'])
            commit_data.append(each_commit.__dict__['_attrs'])

        return commit_data


class User:

    @staticmethod
    def list_repos():

        repo_list = []
        for repo in gl.projects.list():
            repo_list.append(Repo(repo))
        return repo_list




# user = User()
# repos = user.list_repos()
# all_repo_details = [repo.details() for repo in repos]

# print(all_repo_details)

# repo = Repo()
# commit_list = repo.get_repo_all_commits(1)
# print(type(commit_list))
# for each_commit in commit_list:
#     print(each_commit)
    # break


# print(repos[1].get_file_content((repos[1].files()[3]['id'])))

# user = gl.users.create({'email': 'ajay@cowrks.com',
#                         'password': 'ajay1234',
#                         'username': 'ajay',
#                         'name': 'Ajay Rawat'})

