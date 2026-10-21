import { gql } from "@apollo/client";

export const UPDATE_JOB_IS_AGENT_PLAN_ONLY = gql`
  mutation UpdateJobIsAgentPlanOnly($input: UpdateJobIsAgentPlanOnlyInput!) {
    updateJobIsAgentPlanOnly(input: $input) {
      id
      isAgentPlanOnly
    }
  }
`;

export const UPDATE_JOB_STATUS = gql`
  mutation UpdateJobStatusForAdmin($input: UpdateJobStatusInput!) {
    updateJobStatusForAdmin(input: $input) {
      id
      title
      status
      updatedAt
    }
  }
`;
