import { gql } from "@apollo/client";

export const GET_REMINDER_CANDIDATE_COMPANIES = gql`
  query GetReminderCandidateCompanies(
    $input: GetReminderCandidateCompaniesInput
  ) {
    getReminderCandidateCompanies(input: $input) {
      id
      name
      email
      overdueCount
      waitingCount
    }
  }
`;

export const GET_COMPANY_REMINDER_TARGETS = gql`
  query GetCompanyReminderTargets($input: GetCompanyReminderTargetsInput!) {
    getCompanyReminderTargets(input: $input) {
      company {
        id
        name
        email
      }
      users {
        entryId
        userId
        userName
        jobTitle
        delayType
        thresholdDays
        elapsedDays
        isOverdue
        lastRemindedAt
        lastRemindedIsOverdue
      }
    }
  }
`;

export const GET_COMPANY_REMINDERS = gql`
  query GetCompanyReminders($input: GetCompanyRemindersInput!) {
    getCompanyReminders(input: $input) {
      id
      companyId
      templateName
      subject
      body
      isSuccess
      errorMessage
      underThresholdCount
      createdAt
      users {
        id
        entryId
        userId
        userName
        jobTitle
        delayType
        elapsedDays
        isOverdue
      }
    }
  }
`;
