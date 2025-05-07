export type JobStatus = 'Active' | 'Inactive';

export class Job {
  constructor(
    public name: string,
    public department: string,
    public recruiter: string,
    public hiring_manager: string,
    public status: JobStatus
  ) {}
}

export const jobsMock: Job[] = [
  new Job('Data Analyst', 'Data', 'Recruiter 2', 'Hiring Manager 2', 'Active'),
  new Job('Internship Programme', 'HR', 'Recruiter 1', 'Hiring Manager 1', 'Inactive'),
  new Job('Data Analyst', 'Data', 'Recruiter 2', 'Hiring Manager 2', 'Active'),
  new Job('Data Analyst', 'Data', 'Recruiter 2', 'Hiring Manager 2', 'Active'),
  new Job('Internship Programme', 'HR', 'Recruiter 1', 'Hiring Manager 1', 'Inactive'),
  new Job('Internship Programme', 'HR', 'Recruiter 1', 'Hiring Manager 1', 'Inactive'),
  new Job('Internship Programme', 'HR', 'Recruiter 1', 'Hiring Manager 1', 'Inactive'),
  new Job('Data Analyst', 'Data', 'Recruiter 2', 'Hiring Manager 2', 'Active'),
  new Job('Internship Programme', 'HR', 'Recruiter 1', 'Hiring Manager 1', 'Inactive'),
  new Job('Data Analyst', 'Data', 'Recruiter 2', 'Hiring Manager 2', 'Active'),
  new Job('Data Analyst', 'Data', 'Recruiter 2', 'Hiring Manager 2', 'Active'),
  // adaugă mai multe după nevoie
];
