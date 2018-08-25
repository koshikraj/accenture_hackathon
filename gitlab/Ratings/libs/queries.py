# from datetime import date, datetime
from sqlalchemy import and_
from libs.model import repo_session
from libs.model.models import Ratings


def save_ratings(rating, repo_id, user_id):

    ratings = repo_session.query(Ratings).filter(
        and_(Ratings.repo_id == repo_id, Ratings.user_id == user_id)).first()

    print("got ratings data", ratings)

    ratings.rating = ratings.rating + rating
    ratings.votes = ratings.votes + 1

    repo_session.commit()
    return True


def get_users(repo_id):
    # get users of a repo
    data = repo_session.query(Ratings).filter_by(repo_id=repo_id).all()

    users_data = []
    if data:
        for d in data:
            users_data.append({
                'user_id': d.user.id,
                'name': d.user.name,
                'rating': d.rating,
                'votes': d.votes
            })

    return users_data
