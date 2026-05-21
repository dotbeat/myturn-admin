import { gql } from "@apollo/client";

export const UPDATE_JOB_IS_AGENT_PLAN_ONLY = gql`
  mutation UpdateJobIsAgentPlanOnly($input: UpdateJobIsAgentPlanOnlyInput!) {
    updateJobIsAgentPlanOnly(input: $input) {
      id
      isAgentPlanOnly
    }
  }
`;
