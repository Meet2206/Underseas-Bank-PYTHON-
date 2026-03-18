from app.celery_worker import celery


@celery.task
def send_email_verification(email, otp):

    print(f"Sending OTP {otp} to {email}")

    # Later connect SMTP here