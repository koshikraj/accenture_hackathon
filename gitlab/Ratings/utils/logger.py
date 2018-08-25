import logging
import logging.handlers
import os


def setup_logger(module_name):
    # TODO: Do async
    log_location = 'logs/'
    # TODO - folder creation in Ansible
    if not os.path.exists(log_location):
        os.makedirs(log_location)
    file_location = log_location + 'api_logs'
    logger = logging.getLogger(module_name)
    logger.setLevel(logging.INFO)
    logger.propagate = False
    formatter = logging.Formatter('[%(asctime)s] [%(levelname)s] [%(name)s] %(message)s')
    if len(logger.handlers) is 0:
        lhandler = logging.FileHandler(file_location)
        lhandler.setFormatter(formatter)
        logger.addHandler(lhandler)
    return logger
