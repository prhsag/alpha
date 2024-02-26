import {setFailed} from "@actions/core";
import { testReport } from "./types";
import axios from "axios";

const testJSON =
  '{"test_suite_name":"My Application Test Suite","test_date":"2023-10-27T14:30:00","test_environment":"Production Environment","test_groups":[{"group_name":"User Management","test_cases":[{"test_case_name":"Login Test","status":"Pass","duration":"0:02:35","error_message":null},{"test_case_name":"User Registration Test","status":"Pass","duration":"0:03:10","error_message":null}]},{"group_name":"Product Management","test_cases":[{"test_case_name":"Search Functionality Test","status":"Fail","duration":"0:04:45","error_message":"Search results not displaying correctly."},{"test_case_name":"Add to Cart Test","status":"Pass","duration":"0:01:50","error_message":null}]}],"individual_test_cases":[{"test_case_name":"Checkout Test","status":"Fail","duration":"0:05:15","error_message":"Payment gateway error."},{"test_case_name":"Product Rating Test","status":"Pass","duration":"0:02:20","error_message":null},{"test_case_name":"Order History Test","status":"Pass","duration":"0:03:40","error_message":null},{"test_case_name":"Password Reset Test","status":"Fail","duration":"0:02:55","error_message":"Email not sent for password reset."}],"test_summary":{"total_tests":10,"passed_tests":6,"failed_tests":4,"start_time":"2023-10-27T14:30:00","end_time":"2023-10-27T15:15:00"}}';

const groupTestDomain = "https://itrac.eur.ad.sag/rest/api/2/issue/bulk";
const singleTestDomain = "https://itrac.eur.ad.sag/rest/api/2/issue";

const testData: testReport = JSON.parse(testJSON);

const headers = {
  Authorization: `Basic ${process.env.ITRAC_API_KEY}`,
  Accept: "application/json",
  "Content-Type": "application/json",
};

const groupFailedTest = testData.test_groups.filter((group) =>
  group.test_cases.some((testCase) => testCase.status === "Fail")
);

const individualFailedTest = testData.individual_test_cases.filter(
  (group) => group.status === "Fail"
);

const bulkGroupTicketData = {
  issueUpdates: groupFailedTest.map((test) => {
    return {
      fields: {
        project: {
          key: "AIMT",
        },
        summary: `${test.group_name} Group Test Report [Env]: ${
          testData.test_environment
        } [Test Suite]: ${testData.test_suite_name} [Date]: ${
          testData.test_date.split("T")[0]
        }`,
        description: (function () {
          const testCasesString = test.test_cases
            .map((testCase) => {
              return `Test Case: ${testCase.test_case_name}
                    Status: ${testCase.status}
                    Duration: ${testCase.duration}
                    Error Message: ${testCase.error_message || "No error"}
                    `;
            })
            .join("\n");

          return `Group: ${test.group_name}\n${testCasesString}`;
        })(),
        issuetype: {
          name: "Ticket",
        },
        priority: "3-Medium",
      },
    };
  }),
};

const bulkIndividualTicketData = {
  issueUpdates: individualFailedTest.map((test, index) => {
    return {
      fields: {
        project: {
          key: "AIMT",
        },
        summary: `${test.test_case_name} Report [Env]: ${
          testData.test_environment
        } [Test Suite]: ${testData.test_suite_name} [Date]: ${
          testData.test_date.split("T")[0]
        }`,
        description: `
                ${index + 1} - 
                ${test.test_case_name}
                Status - ${test.status}
                Duration - ${test.duration}
                Error Message - ${test.error_message}
            `,
        issuetype: {
          name: "Ticket",
        },
        priority: "3-Medium",
      },
    };
  }),
};

const createItracIssue = async () => {
  try {
    const groupTicketResult = await axios.post(
      groupTestDomain,
      JSON.stringify(bulkGroupTicketData),
      { headers }
    );
    const individualTicketResult = await axios.post(
      groupTestDomain,
      JSON.stringify(bulkIndividualTicketData),
      { headers }
    );

    console.log({
      individualTicketResult,
      groupTicketResult,
    });
  } catch (error) {
    setFailed((error as Error)?.message ?? "Unknown error");
  }
};

createItracIssue()