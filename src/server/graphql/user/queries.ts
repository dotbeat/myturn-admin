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
