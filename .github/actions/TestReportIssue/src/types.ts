export type jiraAPIField = {
  fields: {
    project: {
      key: "AIMT";
    };
    summary: string;
    description: string;
    issuetype: {
      name: "Ticket";
    };
    priority: {
      name: "None" | "1-Critical" | "2-High" | "3-Medium" | "4-Low";
    };
  };
};

export type testCase = {
  test_case_name: string;
  status: "Pass" | "Fail";
  duration: string;
  error_message: null | string;
};

export type testReport = {
  test_suite_name: string;
  test_date: string;
  test_environment: "Prod" | "Int" | "Dev" | "Stage";
  test_groups: Array<{
    group_name: string;
    test_cases: Array<testCase>;
  }>;
  individual_test_cases: Array<testCase>;
  test_summary: {
    total_tests: number;
    passed_tests: number;
    failed_tests: number;
    start_time: string;
    end_time: string;
  };
};
