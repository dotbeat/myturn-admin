import { gql } from "@apollo/client";

export const SEARCH_USERS = gql`
  query SearchUsers($input: SearchUsersInput!) {
    searchUsers(input: $input) {
      items {
        id
        avatarUrl
        lastName
        firstName
        prefecture
        university
        faculty
        department
        grade
        availableDaysPerWeek
        availableHoursPerWeek
        availableDurationMonths
        entryCount
        createdAt
      }
      limit
      page
      totalCount
      totalPages
      hasNextPage
      hasPreviousPage
    }
  }
`;

export const GET_USERS_STATISTICS = gql`
  query GetUsersStatistics($input: GetUsersStatisticsInput!) {
    getUsersStatistics(input: $input) {
      totalCount
      applicantCount
      acceptedCount
      leavedCount
    }
  }
`;
