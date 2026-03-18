import random


def generate_account_number():

    prefix = "10"   # bank prefix
    number = "".join([str(random.randint(0, 9)) for _ in range(10)])

    return prefix + number