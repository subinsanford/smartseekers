# New Dashboard Analytics APIs for Frontend

Here is a simple guide on the new features we have added for dashboard analytics.

## 1. Credit Usage Statistics

This API returns various statistics about the company's shared wallet and credit usage. Use this on the billing or employer dashboard.

- **URL**: `/api/employer/credits/stats`
- **Method**: `GET`
- **Auth**: Required (Bearer Token)
- **Response**:
  ```json
  {
    "success": true,
    "wallet_owner_id": 12,
    "current_balance": 250,
    "lifetime_purchased": 1500,
    "total_refunded": 300,
    "spent_breakdown": [
      {
        "recruiter_id": 12,
        "user_name": "Jane Admin",
        "user_type": "Main Admin",
        "credits_spent": 800
      },
      {
        "recruiter_id": 15,
        "user_name": "John Recruiter",
        "user_type": "Sub-User",
        "credits_spent": 450
      }
    ]
  }
  ```
**Fields Breakdown:**
- `current_balance`: Int. The total number of credits currently available in the shared wallet.
- `lifetime_purchased`: Int. The total number of credits purchased ever since the account was created.
- `total_refunded`: Int. The total number of credits that were refunded to the account (from failed emails or deleted interviews).
- `spent_breakdown`: Array of Objects. Contains a list of how many credits each user in the company has spent. The "Main Admin" matches the wallet owner (and is first in the list).


## 2. Interview Statistics

This API provides an overall breakdown of how interviews are doing across the entire company.

- **URL**: `/api/employer/interviews/stats`
- **Method**: `GET`
- **Auth**: Required (Bearer Token)
- **Response**:
  ```json
  {
    "success": true,
    "status_breakdown": {
      "total_interviews": 67,
      "scheduled": 12,
      "completed": 45,
      "cancelled": 5,
      "no_show": 2,
      "rescheduled": 3
    },
    "scheduled_by_user": [
      {
        "recruiter_id": 12,
        "user_name": "Jane Admin",
        "user_type": "Main Admin",
        "interviews_count": 40
      },
      {
        "recruiter_id": 15,
        "user_name": "John Recruiter",
        "user_type": "Sub-User",
        "interviews_count": 27
      }
    ],
    "interviews_by_job": [
      {
        "job_id": 101,
        "job_title": "Senior Frontend Developer",
        "interviews_count": 25
      },
      {
        "job_id": 105,
        "job_title": "Backend Software Engineer",
        "interviews_count": 18
      }
    ],
    "interviews_by_candidate": [
      {
        "candidate_id": 305,
        "candidate_name": "Alice Smith",
        "interviews_count": 3
      },
      {
        "candidate_id": 411,
        "candidate_name": "Bob Johnson",
        "interviews_count": 2
      }
    ],
    "completed_with_video": 30,
    "completed_without_video": 15
  }
  ```
**Fields Breakdown:**
- `status_breakdown`: Key-Value pair of the overall counts. Always includes keys: `total_interviews`, `scheduled`, `completed`, `cancelled`, `no_show`, and `rescheduled`. 
- `scheduled_by_user`: Array of Objects sorting how many interviews each user (Main Admin or Sub-User) actually initiated (scheduled).
- `interviews_by_job`: Array of Objects providing a list of max top 20 jobs where most interviews happened. 
- `interviews_by_candidate`: Array of Objects providing a list of max top 20 candidates who have had the highest amount of interviews.
- `completed_with_video`: Int. Total number of successfully completed interviews that were conducted with video.
- `completed_without_video`: Int. Total number of successfully completed interviews that were conducted strictly via text/audio.

## 3. Request Credits

This API allows sub-users to send an email request for more credits to the main admin of the company. It will send a formatted email using a system template.

- **URL**: `/api/employer/credits/request-credits`
- **Method**: `POST`
- **Auth**: Required (Bearer Token)
- **Request Body**:
  ```json
  {
    "message": "Hey team, we need more credits to schedule 10 more candidates for the engineering role."
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "Credit request sent successfully."
  }
  ```
**Fields Breakdown:**
- `message`: String (Optional). A custom message from the sub-user to the main admin explaining why they need more credits.

