import { gql } from "@apollo/client";

export const SEND_COMPANY_REMINDER = gql`
  mutation SendCompanyReminder($input: SendCompanyReminderInput!) {
    sendCompanyReminder(input: $input) {
      id
      isSuccess
      errorMessage
      underThresholdCount
      createdAt
    }
  }
`;
