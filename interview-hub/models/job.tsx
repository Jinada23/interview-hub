export type JobStatus = 'Active' | 'Inactive';
export type Candidate = {
  name: string;
  interviewDate: string;
};

export class Job {
  constructor(
    public name: string,
    public department: string,
    public recruiter: string,
    public hiring_manager: string,
    public status: JobStatus,
    public candidates: Candidate[] = []
  ) { }
}

export const jobsMock: Job[] = [
  new Job(
    'Data Analyst', 'Data', 'Recruiter 2', 'Hiring Manager 2', 'Active',
    [
      { name: 'Candidate 1', interviewDate: 'Apr 5, 2025' },
      { name: 'Candidate 2', interviewDate: 'Apr 6, 2025' },
      { name: 'Candidate 2', interviewDate: 'Apr 6, 2025' },
      { name: 'Candidate 2', interviewDate: 'Apr 6, 2025' },
      { name: 'Candidate 2', interviewDate: 'Apr 6, 2025' },
      { name: 'Candidate 2', interviewDate: 'Apr 6, 2025' },
      { name: 'Candidate 2', interviewDate: 'Apr 6, 2025' },
      { name: 'Candidate 2', interviewDate: 'Apr 6, 2025' },
      { name: 'Candidate 2', interviewDate: 'Apr 6, 2025' },
      { name: 'Candidate 2', interviewDate: 'Apr 6, 2025' },
      { name: 'Candidate 2', interviewDate: 'Apr 6, 2025' },
      { name: 'Candidate 2', interviewDate: 'Apr 6, 2025' },
      { name: 'Candidate 2', interviewDate: 'Apr 6, 2025' },
      { name: 'Candidate 2', interviewDate: 'Apr 6, 2025' },
    ]
  ),
  new Job(
    'Internship Programme', 'HR', 'Recruiter 1', 'Hiring Manager 1', 'Inactive',
    [
      { name: 'Candidate 3', interviewDate: 'Apr 6, 2025' }
    ]
  ),new Job(
    'Internship Programme', 'HR', 'Recruiter 1', 'Hiring Manager 1', 'Inactive',
    [
      { name: 'Candidate 3', interviewDate: 'Apr 6, 2025' }
    ]
  ),new Job(
    'Internship Programme', 'HR', 'Recruiter 1', 'Hiring Manager 1', 'Inactive',
    [
      { name: 'Candidate 3', interviewDate: 'Apr 6, 2025' }
    ]
  ),new Job(
    'Internship Programme', 'HR', 'Recruiter 1', 'Hiring Manager 1', 'Inactive',
    [
      { name: 'Candidate 3', interviewDate: 'Apr 6, 2025' }
    ]
  ),new Job(
    'Internship Programme', 'HR', 'Recruiter 1', 'Hiring Manager 1', 'Inactive',
    [
      { name: 'Candidate 3', interviewDate: 'Apr 6, 2025' }
    ]
  ),new Job(
    'Internship Programme', 'HR', 'Recruiter 1', 'Hiring Manager 1', 'Inactive',
    [
      { name: 'Candidate 3', interviewDate: 'Apr 6, 2025' }
    ]
  ),new Job(
    'Internship Programme', 'HR', 'Recruiter 1', 'Hiring Manager 1', 'Inactive',
    [
      { name: 'Candidate 3', interviewDate: 'Apr 6, 2025' }
    ]
  ),new Job(
    'Internship Programme', 'HR', 'Recruiter 1', 'Hiring Manager 1', 'Inactive',
    [
      { name: 'Candidate 3', interviewDate: 'Apr 6, 2025' }
    ]
  ),new Job(
    'Internship Programme', 'HR', 'Recruiter 1', 'Hiring Manager 1', 'Inactive',
    [
      { name: 'Candidate 3', interviewDate: 'Apr 6, 2025' }
    ]
  ),new Job(
    'Internship Programme', 'HR', 'Recruiter 1', 'Hiring Manager 1', 'Inactive',
    [
      { name: 'Candidate 3', interviewDate: 'Apr 6, 2025' }
    ]
  ),new Job(
    'Internship Programme', 'HR', 'Recruiter 1', 'Hiring Manager 1', 'Inactive',
    [
      { name: 'Candidate 3', interviewDate: 'Apr 6, 2025' }
    ]
  ),new Job(
    'Internship Programme', 'HR', 'Recruiter 1', 'Hiring Manager 1', 'Inactive',
    [
      { name: 'Candidate 3', interviewDate: 'Apr 6, 2025' }
    ]
  ),new Job(
    'Internship Programme', 'HR', 'Recruiter 1', 'Hiring Manager 1', 'Inactive',
    [
      { name: 'Candidate 3', interviewDate: 'Apr 6, 2025' }
    ]
  ),new Job(
    'Internship Programme', 'HR', 'Recruiter 1', 'Hiring Manager 1', 'Inactive',
    [
      { name: 'Candidate 3', interviewDate: 'Apr 6, 2025' }
    ]
  ),new Job(
    'Internship Programme', 'HR', 'Recruiter 1', 'Hiring Manager 1', 'Inactive',
    [
      { name: 'Candidate 3', interviewDate: 'Apr 6, 2025' }
    ]
  ),new Job(
    'Internship Programme', 'HR', 'Recruiter 1', 'Hiring Manager 1', 'Inactive',
    [
      { name: 'Candidate 3', interviewDate: 'Apr 6, 2025' }
    ]
  ),new Job(
    'Internship Programme', 'HR', 'Recruiter 1', 'Hiring Manager 1', 'Inactive',
    [
      { name: 'Candidate 3', interviewDate: 'Apr 6, 2025' }
    ]
  ),new Job(
    'Internship Programme', 'HR', 'Recruiter 1', 'Hiring Manager 1', 'Inactive',
    [
      { name: 'Candidate 3', interviewDate: 'Apr 6, 2025' }
    ]
  ),new Job(
    'Internship Programme', 'HR', 'Recruiter 1', 'Hiring Manager 1', 'Inactive',
    [
      { name: 'Candidate 3', interviewDate: 'Apr 6, 2025' }
    ]
  ),new Job(
    'Internship Programme', 'HR', 'Recruiter 1', 'Hiring Manager 1', 'Inactive',
    [
      { name: 'Candidate 3', interviewDate: 'Apr 6, 2025' }
    ]
  ),new Job(
    'Internship Programme', 'HR', 'Recruiter 1', 'Hiring Manager 1', 'Inactive',
    [
      { name: 'Candidate 3', interviewDate: 'Apr 6, 2025' }
    ]
  ),new Job(
    'Internship Programme', 'HR', 'Recruiter 1', 'Hiring Manager 1', 'Inactive',
    [
      { name: 'Candidate 3', interviewDate: 'Apr 6, 2025' }
    ]
  ),new Job(
    'Internship Programme', 'HR', 'Recruiter 1', 'Hiring Manager 1', 'Inactive',
    [
      { name: 'Candidate 3', interviewDate: 'Apr 6, 2025' }
    ]
  ),new Job(
    'Internship Programme', 'HR', 'Recruiter 1', 'Hiring Manager 1', 'Inactive',
    [
      { name: 'Candidate 3', interviewDate: 'Apr 6, 2025' }
    ]
  ),new Job(
    'Internship Programme', 'HR', 'Recruiter 1', 'Hiring Manager 1', 'Inactive',
    [
      { name: 'Candidate 3', interviewDate: 'Apr 6, 2025' }
    ]
  ),new Job(
    'Internship Programme', 'HR', 'Recruiter 1', 'Hiring Manager 1', 'Inactive',
    [
      { name: 'Candidate 3', interviewDate: 'Apr 6, 2025' }
    ]
  ),new Job(
    'Internship Programme', 'HR', 'Recruiter 1', 'Hiring Manager 1', 'Inactive',
    [
      { name: 'Candidate 3', interviewDate: 'Apr 6, 2025' }
    ]
  ),new Job(
    'Internship Programme', 'HR', 'Recruiter 1', 'Hiring Manager 1', 'Inactive',
    [
      { name: 'Candidate 3', interviewDate: 'Apr 6, 2025' }
    ]
  ),new Job(
    'Internship Programme', 'HR', 'Recruiter 1', 'Hiring Manager 1', 'Inactive',
    [
      { name: 'Candidate 3', interviewDate: 'Apr 6, 2025' }
    ]
  ),new Job(
    'Internship Programme', 'HR', 'Recruiter 1', 'Hiring Manager 1', 'Inactive',
    [
      { name: 'Candidate 3', interviewDate: 'Apr 6, 2025' }
    ]
  ),new Job(
    'Internship Programme', 'HR', 'Recruiter 1', 'Hiring Manager 1', 'Inactive',
    [
      { name: 'Candidate 3', interviewDate: 'Apr 6, 2025' }
    ]
  ),new Job(
    'Internship Programme', 'HR', 'Recruiter 1', 'Hiring Manager 1', 'Inactive',
    [
      { name: 'Candidate 3', interviewDate: 'Apr 6, 2025' }
    ]
  ),new Job(
    'Internship Programme', 'HR', 'Recruiter 1', 'Hiring Manager 1', 'Inactive',
    [
      { name: 'Candidate 3', interviewDate: 'Apr 6, 2025' }
    ]
  ),new Job(
    'Internship Programme', 'HR', 'Recruiter 1', 'Hiring Manager 1', 'Inactive',
    [
      { name: 'Candidate 3', interviewDate: 'Apr 6, 2025' }
    ]
  ),new Job(
    'Internship Programme', 'HR', 'Recruiter 1', 'Hiring Manager 1', 'Inactive',
    [
      { name: 'Candidate 3', interviewDate: 'Apr 6, 2025' }
    ]
  ),new Job(
    'Internship Programme', 'HR', 'Recruiter 1', 'Hiring Manager 1', 'Inactive',
    [
      { name: 'Candidate 3', interviewDate: 'Apr 6, 2025' }
    ]
  ),new Job(
    'Internship Programme', 'HR', 'Recruiter 1', 'Hiring Manager 1', 'Inactive',
    [
      { name: 'Candidate 3', interviewDate: 'Apr 6, 2025' }
    ]
  ),new Job(
    'Internship Programme', 'HR', 'Recruiter 1', 'Hiring Manager 1', 'Inactive',
    [
      { name: 'Candidate 3', interviewDate: 'Apr 6, 2025' }
    ]
  ),new Job(
    'Internship Programme', 'HR', 'Recruiter 1', 'Hiring Manager 1', 'Inactive',
    [
      { name: 'Candidate 3', interviewDate: 'Apr 6, 2025' }
    ]
  ),new Job(
    'Internship Programme', 'HR', 'Recruiter 1', 'Hiring Manager 1', 'Inactive',
    [
      { name: 'Candidate 3', interviewDate: 'Apr 6, 2025' }
    ]
  ),new Job(
    'Internship Programme', 'HR', 'Recruiter 1', 'Hiring Manager 1', 'Inactive',
    [
      { name: 'Candidate 3', interviewDate: 'Apr 6, 2025' }
    ]
  ),new Job(
    'Internship Programme', 'HR', 'Recruiter 1', 'Hiring Manager 1', 'Inactive',
    [
      { name: 'Candidate 3', interviewDate: 'Apr 6, 2025' }
    ]
  ),new Job(
    'Internship Programme', 'HR', 'Recruiter 1', 'Hiring Manager 1', 'Inactive',
    [
      { name: 'Candidate 3', interviewDate: 'Apr 6, 2025' }
    ]
  ),new Job(
    'Internship Programme', 'HR', 'Recruiter 1', 'Hiring Manager 1', 'Inactive',
    [
      { name: 'Candidate 3', interviewDate: 'Apr 6, 2025' }
    ]
  ),new Job(
    'Internship Programme', 'HR', 'Recruiter 1', 'Hiring Manager 1', 'Inactive',
    [
      { name: 'Candidate 3', interviewDate: 'Apr 6, 2025' }
    ]
  ),
];
