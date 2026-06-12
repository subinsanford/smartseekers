export interface LoginResponse {
  token?: string;
  message?: string;
  [key: string]: any;
}

export interface CreditSpentRecruiter {
  recruiter_id: number;
  user_name: string;
  user_type: string;
  credits_spent: number;
}

export interface CreditStatsResponse {
  success: boolean;
  wallet_owner_id: number;
  current_balance: number;
  lifetime_purchased: number;
  total_refunded: number;
  spent_breakdown: CreditSpentRecruiter[];
}

export interface InterviewStatusBreakdown {
  total_interviews: number;
  scheduled: number;
  completed: number;
  cancelled: number;
  no_show: number;
  rescheduled: number;
}

export interface ScheduledByUser {
  recruiter_id: number;
  user_name: string;
  user_type: string;
  interviews_count: number;
}

export interface InterviewsByJob {
  job_id: number;
  job_title: string;
  interviews_count: number;
}

export interface InterviewsByCandidate {
  candidate_id: number;
  candidate_name: string;
  interviews_count: number;
}

export interface InterviewStatsResponse {
  success: boolean;
  status_breakdown: InterviewStatusBreakdown;
  scheduled_by_user: ScheduledByUser[];
  interviews_by_job: InterviewsByJob[];
  interviews_by_candidate: InterviewsByCandidate[];
  completed_with_video: number;
  completed_without_video: number;
}

export interface RequestCreditsResponse {
  success: boolean;
  message: string;
}

const getBaseUrl = () => process.env.NEXT_PUBLIC_API_BASE_URL || 'https://sit-api.seekersplus.ai/api';

const getHeaders = (): HeadersInit => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }
  return headers;
};

export const login = async (email: string, password: string): Promise<LoginResponse> => {
  const response = await fetch(`${getBaseUrl()}/employer/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Login failed. Please check your credentials.');
  }

  return data;
};

export const getCreditStats = async (): Promise<CreditStatsResponse> => {
  const response = await fetch(`${getBaseUrl()}/employer/credits/stats`, {
    method: 'GET',
    headers: getHeaders(),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to fetch credit statistics.');
  }
  return data;
};

export const getInterviewStats = async (): Promise<InterviewStatsResponse> => {
  const response = await fetch(`${getBaseUrl()}/employer/interviews/stats`, {
    method: 'GET',
    headers: getHeaders(),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to fetch interview statistics.');
  }
  return data;
};

export const requestCredits = async (message?: string): Promise<RequestCreditsResponse> => {
  const response = await fetch(`${getBaseUrl()}/employer/credits/request-credits`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ message }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to send credit request.');
  }
  return data;
};

export interface JobPosting {
  job_id: number;
  unique_job_id: string;
  job_title: string;
  created_on: string;
  status: number;
  [key: string]: any;
}

export interface GetJobsResponse {
  ok: boolean;
  jobs: JobPosting[];
  page?: number;
  page_size?: number;
  total?: number;
  total_pages?: number;
}

export interface CreateJobPayload {
  job_position: string;
  description?: string;
  [key: string]: any;
}

export const getJobs = async (page = 1, pageSize = 10): Promise<GetJobsResponse> => {
  const response = await fetch(`${getBaseUrl()}/employer/jobs/all?page=${page}&page_size=${pageSize}`, {
    method: 'GET',
    headers: getHeaders(),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to fetch job postings.');
  }
  return data;
};

export const createJob = async (payload: CreateJobPayload): Promise<any> => {
  const response = await fetch(`${getBaseUrl()}/employer/jobs/create`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(payload),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to create job posting.');
  }
  return data;
};
