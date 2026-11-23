import { gql } from "@apollo/client";

export const CREATE_JOB_PICKUP_PERIOD = gql`
  mutation CreateJobPickupPeriod($input: CreateJobPickupPeriodInput!) {
    createJobPickupPeriod(input: $input) {
      id
    }
  }
`;

export const UPDATE_JOB_PICKUP_PERIOD = gql`
  mutation UpdateJobPickupPeriod($input: UpdateJobPickupPeriodInput!) {
    updateJobPickupPeriod(input: $input) {
      id
    }
  }
`;

export const DELETE_JOB_PICKUP_PERIOD = gql`
  mutation DeleteJobPickupPeriod($input: DeleteJobPickupPeriodInput!) {
    deleteJobPickupPeriod(input: $input) {
      id
    }
  }
`;
