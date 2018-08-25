# from datetime import date, datetime
# from utils.logger import logger
from libs.model import repo_session
from libs.model.models import Repository, Ratings


def save_ratings(rating, votes, repo_id, user_id):
    ratings = Ratings(user_id, repo_id)
    repo_session.add(ratings)
    ratings.rating = rating
    ratings.votes = votes

    repo_session.commit()
    return True


def get_users(repo_id):
    # get users of a repo
    data = repo_session.query(Ratings).filter_by(repo_id=repo_id).all()

    users_data = []
    for d in data:
        user_dict = d.user
        users_data.append({
            'user_id': user_dict.get('id'),
            'name': user_dict.get('name'),
            'rating': d.rating,
            'votes': d.votes
        })

    return users_data
