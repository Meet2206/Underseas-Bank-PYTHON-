from collections import defaultdict


def analyze_expenses(transactions):

    summary = defaultdict(float)

    for txn in transactions:

        if txn.transaction_type == "deposit":
            summary["Deposits"] += txn.amount

        elif txn.transaction_type == "withdraw":
            summary["Withdrawals"] += txn.amount

        elif txn.transaction_type == "transfer":
            summary["Transfers"] += txn.amount

    return dict(summary)